class SinWelle {
  constructor(sx, y0, amplitude, periodDur) {
    this.sx = sx;
    this.y0 = y0;
    this.amplitude = amplitude;
    this.periodDur = periodDur;
    this.pnts = [];
    this.pntsV = [];
    this.pntsA = [];
    this.n = width - this.sx;
    //    this.n = 1600 - this.sx;
    this.periodWidth = this.n / 2.3;
    this.dt = TWO_PI / this.periodWidth;
    print(this.n, this.dt);
    for (let i = 0; i < this.n; i++) {
      this.pnts.push([i + this.sx, sin(this.dt * i) * this.amplitude + this.y0]);
      this.pntsV.push([i + this.sx, cos(this.dt * i) * this.amplitude + this.y0]);
      this.pntsA.push([i + this.sx, -sin(this.dt * i) * this.amplitude + this.y0]);
    }
  }

  drawSin() {
    noFill();
    stroke(255);

    strokeWeight(1);
    beginShape();
    for (let i = 0; i < this.n; i++) {
      vertex(...this.pnts[i]);
    }
    endShape();
  }

  drawV() {
    noFill();
    stroke(255,0,255);

    strokeWeight(1);
    beginShape();
    for (let i = 0; i < this.n; i++) {
      vertex(...this.pntsV[i]);
    }
    endShape();
  }

  drawA() {
    noFill();
    stroke(0,255, 255);

    strokeWeight(1);
    beginShape();
    for (let i = 0; i < this.n; i++) {
      vertex(...this.pntsA[i]);
    }
    endShape();
  }

  drawBall(tp) {
    t = tp - this.periodDur / 4;
    t = t % (this.periodDur * 3);
    const x = (t / this.periodDur) * this.periodWidth;
    // print(t, this.periodDur, x, this.dt);
    const y = sin(x * this.dt) * this.amplitude + this.y0;
   
    noStroke();
    fill(255);
    circle(x + this.sx, y, 25);
  }
  drawAchsen(vLbl, aLbl) {
    noFill();
    stroke(255);
    strokeWeight(2);

    const yALan =-this.amplitude * 1.2;
    const yOben = this.y0 - yALan;
    const yUnten = this.y0 + yALan ;
    const xRechts =width - 30;
    
    line(this.sx, this.y0, xRechts, this.y0);
    triangle(xRechts, this.y0,xRechts -5,this.y0 -3,xRechts -5,this.y0 +3);
    line(this.sx, yOben ,this.sx, yUnten);
    triangle(this.sx, yOben,
             this.sx -3,yOben+5,
             this.sx +3,yOben+5);
    textAlign(RIGHT,CENTER);
    noStroke();
    fill(255);
    textSize(19);
    text("s", this.sx-10, yOben);
    if (vLbl) { 
      fill(255,0,255);
      text("v", this.sx-10, yOben+15);
    }
    if (aLbl) { 
      fill(0,255,255);
      text("a", this.sx-10, yOben+30);
    }
    textAlign(LEFT,CENTER);
    fill(255);
    text("t", xRechts+ 7, this.y0);
  }
  drawBelehrung(){
    stroke(255,255,0);
    strokeWeight(1);
    noFill();

    beginShape();
    for (let i = floor(this.periodWidth/4); i < floor(this.periodWidth/4*5); i++) {
      vertex(...this.pnts[i]);
    }
    endShape();

    fill(255,255,0);

    let x = this.periodWidth / 4 + this.sx;
    let x2 = x + this.periodWidth;
    let yAmpliO = this.y0 + this.amplitude;
    line(x,yAmpliO,x2,yAmpliO);
    triangle(x, yAmpliO, x+8, yAmpliO-4, x+8, yAmpliO+4);
    triangle(x2, yAmpliO, x2-8, yAmpliO-4, x2-8, yAmpliO+4);
    noStroke();
    textAlign(CENTER,BOTTOM);
    text("Periodendauer",(x+x2)/2,yAmpliO);
    stroke(255,255,0);
    
    line(x, this.y0,
         x, this.y0 + this.amplitude);
    triangle(x, this.y0, x-4, this.y0-8, x+4, this.y0-8);
    triangle(x, this.y0 + this.amplitude, x-4, this.y0 + this.amplitude+8, x+4, this.y0 + this.amplitude+8);

    x = this.periodWidth * 3 / 4 + this.sx;
    line(x, this.y0,
         x, this.y0 - this.amplitude);
    triangle(x, this.y0, x-4, this.y0+8, x+4, this.y0+8);
    triangle(x, this.y0 - this.amplitude, x-4, this.y0 - this.amplitude-8, x+4, this.y0 - this.amplitude-8);
    
    
  }
}
