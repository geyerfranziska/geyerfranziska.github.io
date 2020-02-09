class FunPlot {
  constructor(p, ul, cnvsUL, psize, xRange, yRange) {
    this.p = p;
    this.ul = ul;
    this.cnvsUL = cnvsUL;
    this.psize = psize;
    this.xRange = xRange;
    this.yRange = yRange;

    this.ticLen = 6;

    this.xScale = psize.w / (xRange[1] - xRange[0]);
    this.yScale = psize.h / (yRange[1] - yRange[0]);
    this.scaleFactor = this.yScale / this.xScale;

    this.dx = (xRange[1] - xRange[0]) / psize.w * 2;
    //    this.dy = (yRange[1] - yRange[0]) / psize.w * 2;

    this.xdiv = this.p.createDiv('x=')
      .id('x')
      .style('color', 'black')
      .position(this.psize.w + this.ul.x + this.cnvsUL.x - 80,
        0.65 * this.psize.h + this.ul.y + this.cnvsUL.y);

    this.xVals = [];
    //    for (let i = xRange[0]; i<=xRange[1]; i+=this.dx)
    //      this.xVals.push(i);
    this.funs = [];
  }

  add_function(fun, clr, name, wght = 2) {
    let vals = [];
    for (let i = this.xRange[0]; i <= this.xRange[1]; i += this.dx)
      vals.push(this.xy2px(i, fun(i)));
    let div = this.p.createDiv(`${name}=`)
      .id(name)
      .style('color', clr)
      .position(this.psize.w + this.ul.x + this.cnvsUL.x - 80,
        0.65 * this.psize.h + this.ul.y + this.cnvsUL.y +
        (this.funs.length + 1) * 20);
    this.funs.push({
      vals: vals,
      clr: clr,
      wght: wght,
      fun: fun,
      name: name,
      div: div
    });
  }

  xy2px(x, y) {
    return [(x - this.xRange[0]) * this.xScale + this.ul.x,
      (this.yRange[1] - y) * this.yScale + this.ul.y
    ];
  }

  px2x(px) {
    return (px - this.ul.x) / this.xScale + this.xRange[0];
  }

  xy2bnd(x) {
    return Math.floor(Math.abs(x)) * Math.sign(x);
  }

  draw_grid() {
    this.p.noStroke();
    this.p.fill(255);
    this.p.rect(this.ul.x, this.ul.y, this.psize.w, this.psize.h);

    this.p.stroke(0);
    this.p.strokeWeight(2);
    this.p.line(...this.xy2px(this.xRange[0], 0), ...this.xy2px(this.xRange[1], 0));
    this.p.line(...this.xy2px(0, this.yRange[0]), ...this.xy2px(0, this.yRange[1]));

    this.p.textSize(12);
    this.p.textAlign(this.p.CENTER, this.p.TOP);
    const minX = this.xy2bnd(this.xRange[0]);
    const maxX = this.xy2bnd(this.xRange[1]);
    for (let i = minX; i <= maxX; i++) {
      let xS = this.xy2px(i, this.yRange[0]);
      let xE = this.xy2px(i, this.yRange[1]);
      let x0 = this.xy2px(i, 0);
      this.p.stroke("lightgrey");
      this.p.strokeWeight(0.5);
      this.p.line(xS[0], xS[1], xE[0], xE[1]);
      this.p.stroke(0);
      this.p.strokeWeight(2);
      this.p.line(x0[0], x0[1] - this.ticLen, x0[0], x0[1] + this.ticLen);
      if (i != 0) {
        this.p.fill(0);
        this.p.noStroke();
        this.p.text(i, x0[0], x0[1] + 11);
      }
    }
    this.p.textAlign(this.p.RIGHT, this.p.CENTER);
    const minY = this.xy2bnd(this.yRange[0]);
    const maxY = this.xy2bnd(this.yRange[1]);
    for (let i = minY; i <= maxY; i++) {
      let yS = this.xy2px(this.xRange[0], i);
      let yE = this.xy2px(this.xRange[1], i);
      let y0 = this.xy2px(0, i);
      this.p.stroke("lightgrey");
      this.p.strokeWeight(0.5);
      this.p.line(yS[0], yS[1], yE[0], yE[1]);
      this.p.stroke(0);
      this.p.strokeWeight(2);
      this.p.line(y0[0] - this.ticLen, y0[1], y0[0] + this.ticLen, y0[1]);
      if (i != 0) {
        this.p.fill(0);
        this.p.noStroke();
        this.p.text(i, y0[0] - 11, y0[1]);
      }
    }
  }
  
  adjust_divs(cnvsUL) {
    this.cnvsUL = cnvsUL;
    this.xdiv.position(this.psize.w + this.ul.x + this.cnvsUL.x - 80,
      0.65 * this.psize.h + this.ul.y + this.cnvsUL.y);
    for (let i = 0; i< this.funs.length; i++) {
      this.funs[i].div.position(this.psize.w + this.ul.x + this.cnvsUL.x - 80,
        0.65 * this.psize.h + this.ul.y + this.cnvsUL.y +
        (i + 1) * 20);
    }
  }

  draw_legend() {
    if (this.p.mouseX >= this.ul.x && this.p.mouseX <= this.ul.x + this.psize.w) {
      const x = this.px2x(this.p.mouseX);
      this.xdiv.html(`x=${Math.round(x*100)/100}`);
      for (let fun of this.funs) {
        fun.div.html(`${fun.name}=${Math.round(fun.fun(x)*100)/100}`);
      }
    }
  }

  draw_steigung(f, fm, clr) {
    if (this.p.mouseX >= this.ul.x && this.p.mouseX <= this.ul.x + this.psize.w) {
      const x = this.px2x(this.p.mouseX);
      const y = f(x);
      const p = this.xy2px(x, y);
      const m = fm(x);
      const pm = -m * this.scaleFactor;
      const angle = this.p.atan(pm);
      const dx = this.p.cos(angle) * 50;
      const x0 = p[0] - dx;
      const x1 = p[0] + dx;
      const y0 = p[1] + pm * (x0 - p[0]);
      const y1 = p[1] + pm * (x1 - p[0]);
      this.p.strokeWeight(2);
      this.p.stroke(clr);
      this.p.line(x0, y0, x1, y1);
    }
  }

  change_function(fnr, newFun, newName, tSteps = 30) {
    let fun = this.funs[fnr];
    let dy = [];
    let i = 0
    for (let x = this.xRange[0]; x <= this.xRange[1]; x += this.dx) {
      const goal = this.xy2px(x, newFun(x));
     // print(newFun(x), goal);
      dy.push((goal[1] - fun.vals[i][1]) / tSteps);
      i++;
    }
    fun.fun = newFun;
    fun.name = newName;
    fun.dy = dy;
    fun.tSteps = tSteps;
  }

  draw_functions() {
    this.p.noFill();
    for (let fun of this.funs) {
      this.p.stroke(fun.clr);
      this.p.strokeWeight(fun.wght);
      this.p.beginShape();
      for (let i = 0; i < fun.vals.length; i++) {
        //      if (abs(yA[i]) < 7.5)
        //        print(fun.vals[i]);
        if (fun.hasOwnProperty('tSteps') && fun.tSteps > 0) {
          fun.vals[i][1] += fun.dy[i];
        }
        if (fun.vals[i][1] >= this.ul.y && fun.vals[i][1] <= this.ul.y + this.psize.h)
        this.p.vertex(...fun.vals[i]);
      }
      this.p.endShape();
      if (fun.hasOwnProperty('tSteps')) {
        if (fun.tSteps > 1)
          fun.tSteps--;
        else {
          delete fun.tSteps;
          delete fun.dy;
        }
      }
    }
  }

  draw_mFunPnts() {
    if (this.p.mouseX >= this.ul.x && this.p.mouseX <= this.ul.x + this.psize.w) {
      const x = this.px2x(this.p.mouseX);
      this.xdiv.html(`x=${Math.round(x*100)/100}`);
      for (let fun of this.funs) {
        this.p.fill(fun.clr);
        this.p.noStroke();
        this.p.circle(...this.xy2px(x, fun.fun(x)), 8);
        fun.div.html(`${fun.name}=${Math.round(fun.fun(x)*100)/100}`);
      }
    }
  }
}
