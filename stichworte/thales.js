let r;
let cx;
let cy;
let ww = r / 10;
let rsq;
let mx;

let dreieO, dreieL, dreieR;

function setup() {
  let myCanvas = createCanvas(400, 430);
  myCanvas.parent("p5Container");
  cx = width / 2;
  r = width/2 - 20;
  cy = r + 18;
  mx = r / 3 + (cx - r);
  rsq = r - sqrt(2 * ww * ww);

  dreieO = new Dreieck({
      x: cx - r,
      y: cy
    }, {
      x: cx + r,
      y: cy
    }, {
      x: cx,
      y: cy
    },
    30, 2,
    [0, 191, 255, 40],
    [0, 191, 255]);

  dreieL = new Dreieck({
      x: cx - r,
      y: cy
    }, {
      x: cx,
      y: cy
    }, {
      x: cx - r / 2,
      y: cy - r / 2
    },
    40, 2,
    [0, 191, 255, 40],
    [0, 191, 255]);
  dreieL.ecken.C.angLbl = 'α';
  dreieL.ecken.B.angLbl = 'γ';
  dreieR = new Dreieck({
      x: cx + r,
      y: cy
    }, {
      x: cx + r / 2,
      y: cy - r / 2
    }, {
      x: cx,
      y: cy
    },
    40, 2,
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
  strokeWeight(2);
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

  dreieO.move_ecke('C', p3.x, p3.y);
  dreieO.draw();
  strokeWeight(3);
  dreieO.draw_sqAngle('C');
  strokeWeight(2);
  // dreieO.draw_arcs();
  //dreieO.draw_winkel_label();
  stroke(0);
  strokeWeight(1);
  dreieO.draw_ecken_label();
  dreieO.draw_seiten();

  translate(0, r + 20);

  noFill();
  stroke(0);
  arc(cx, cy, 2 * r, 2 * r, Math.PI, 2 * Math.PI);
  //  circle(cx, cy, r * 2);

  line(cx - r, cy, cx + r, cy);

  stroke(0);
  strokeWeight(1);
  dreieO.draw_ecken_label();

  dreieL.move_ecke('C', p3.x, p3.y);
  dreieR.move_ecke('B', p3.x, p3.y);

  textSize(16);
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
