let r = 280;
let cx;
let cy;
let ww = r / 10;
let rsq;
let mx;

let dreieL, dreieR;

function setup() {
  let myCanvas = createCanvas(600, 310);
  myCanvas.parent('p5Container2');
  cx = width / 2;
  cy = r + 15;
  mx = r / 3 + (cx - r);
  rsq = r - sqrt(2 * ww * ww);

  dreieL = new Dreieck({x: cx-r, y: cy},
                      {x: cx, y: cy},
                      {x: cx-r/2, y: cy-r/2},
                      50, 1,
                      [0, 191, 255, 40],
                      [0, 191, 255]);
  dreieL.ecken.C.angLbl = 'α';
  dreieL.ecken.B.angLbl = 'γ';
  dreieR = new Dreieck({x: cx+r, y: cy},
                       {x: cx+r/2, y: cy-r/2},
                       {x: cx, y: cy},
                      50, 1,
                      [0, 191, 255, 40],
                      [0, 191, 255]);
  dreieR.ecken.A.angLbl = 'β';
  dreieR.ecken.C.angLbl = 'δ';
  print(dreieL);
}

function draw() {
  background(255);
  if (mouseIsPressed && mouseX >= cx - r &&
    mouseX <= cx + r)
    mx = mouseX;
  noFill();
  stroke(0);
  arc(cx, cy, 2 * r, 2 * r, Math.PI, 2 * Math.PI);
  //  circle(cx, cy, r * 2);

  line(cx - r, cy, cx + r, cy);
  const p1 = {
    x: cx - r,
    y: cy
  };
  const p2 = {
    x: cx + r,
    y: cy
  };
  const dx = cx - mx;
  const dy = sqrt(r * r - dx * dx);
  const p3 = {
    x: mx,
    y: cy - dy
  };
  
      dreieL.move_ecke('C', p3.x, p3.y);
      dreieR.move_ecke('B', p3.x, p3.y);

  textSize(20);
  dreieL.draw();
  dreieL.draw_arcs();
  dreieL.draw_winkel_label();
//  dreieL.draw_ecken_label();
  dreieL.draw_seiten();

  dreieR.draw();
  dreieR.draw_arcs();
  dreieR.draw_winkel_label();
//  dreieR.draw_ecken_label();
  dreieR.draw_seiten();
}