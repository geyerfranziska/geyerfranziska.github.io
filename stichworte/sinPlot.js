let sinPlot = function (p) {
  let fp;
  let mc, mcPos;

  p.setup = function () {
    mc = p.createCanvas(680, 140);
  //  mc.parent('graphSin');
    mcPos = { x: mc.position().x, y: mc.position().y };

    fp = new FunPlot(p, { x: 0, y: 0 }, mcPos, { w: 680, h: 140 },
      [-6.3, 6.3], [-1.2, 1.2]);
    fp.add_function(x => p.sin(x), "red", "f(x)");
    fp.add_function(x => p.cos(x), "green", "f'(x)", 1);
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }

  p.draw = function () {
    p.background(220);
    if (mc.position().x != mcPos.x || mc.position().y != mcPos.y) {
      mcPos = { x: mc.position().x, y: mc.position().y };
      fp.adjust_divs(mcPos);
    }
    fp.draw_grid();
    fp.draw_functions();
    fp.draw_steigung(x => p.sin(x), x => p.cos(x), "magenta");
    fp.draw_mFunPnts();
    fp.draw_legend();
  }
}

let cosPlot = function (p) {
  let fp;
  let mc, mcPos;

  p.setup = function () {
    mc = p.createCanvas(680, 140);
  //  mc.parent('graphSin');
    mcPos = { x: mc.position().x, y: mc.position().y };

    fp = new FunPlot(p, { x: 0, y: 0 }, mcPos, { w: 680, h: 140 },
      [-6.3, 6.3], [-1.2, 1.2]);
    fp.add_function(x => p.cos(x), "red", "f(x)");
    fp.add_function(x => -p.sin(x), "green", "f'(x)", 1);
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }

  p.draw = function () {
    p.background(220);
    if (mc.position().x != mcPos.x || mc.position().y != mcPos.y) {
      mcPos = { x: mc.position().x, y: mc.position().y };
      fp.adjust_divs(mcPos);
    }
    fp.draw_grid();
    fp.draw_functions();
    fp.draw_steigung(x => p.cos(x), x => -p.sin(x), "magenta");
    fp.draw_mFunPnts();
    fp.draw_legend();
  }
}

let minussinPlot = function (p) {
  let fp;
  let mc, mcPos;

  p.setup = function () {
    mc = p.createCanvas(680, 140);
  //  mc.parent('graphSin');
    mcPos = { x: mc.position().x, y: mc.position().y };

    fp = new FunPlot(p, { x: 0, y: 0 }, mcPos, { w: 680, h: 140 },
      [-6.3, 6.3], [-1.2, 1.2]);
    fp.add_function(x => -p.sin(x), "red", "f(x)");
    fp.add_function(x => -p.cos(x), "green", "f'(x)", 1);
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }

  p.draw = function () {
    p.background(220);
    if (mc.position().x != mcPos.x || mc.position().y != mcPos.y) {
      mcPos = { x: mc.position().x, y: mc.position().y };
      fp.adjust_divs(mcPos);
    }
    fp.draw_grid();
    fp.draw_functions();
    fp.draw_steigung(x => -p.sin(x), x => -p.cos(x), "magenta");
    fp.draw_mFunPnts();
    fp.draw_legend();
  }
}

let minuscosPlot = function (p) {
  let fp;
  let mc, mcPos;

  p.setup = function () {
    mc = p.createCanvas(680, 140);
  //  mc.parent('graphSin');
    mcPos = { x: mc.position().x, y: mc.position().y };

    fp = new FunPlot(p, { x: 0, y: 0 }, mcPos, { w: 680, h: 140 },
      [-6.3, 6.3], [-1.2, 1.2]);
    fp.add_function(x => -p.cos(x), "red", "f(x)");
    fp.add_function(x => p.sin(x), "green", "f'(x)", 1);
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }

  p.draw = function () {
    p.background(220);
    if (mc.position().x != mcPos.x || mc.position().y != mcPos.y) {
      mcPos = { x: mc.position().x, y: mc.position().y };
      fp.adjust_divs(mcPos);
    }
    fp.draw_grid();
    fp.draw_functions();
    fp.draw_steigung(x => -p.cos(x), x => p.sin(x), "magenta");
    fp.draw_mFunPnts();
    fp.draw_legend();
  }
}

let sinP5 = new p5(sinPlot, 'graphSin');
let cosP5 = new p5(cosPlot, 'graphCos');
let minussinP5 = new p5(minussinPlot, 'graphMinussin');
let minuscosP5 = new p5(minuscosPlot, 'graphMinuscos');