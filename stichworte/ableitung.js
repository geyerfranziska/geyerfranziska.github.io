let xA = [];
let yA = [];
let ydA = [];
const scaleFx = 60;
const yxScale = 2.5;
const scaleFy = scaleFx / yxScale;
const offSx = -1 * scaleFx;

function f(x) {
  return 1.50 * x * x * x - 5.25 * x * x + 4.50 * x;
}

function fd(x) {
  return 3 * 1.50 * x * x - 2 * 5.25 * x + 4.50;
}

function draw_grid() {
  const x0 = -190;
  const x1 = 190;
  const y0 = -180;
  const y1 = 180;
  stroke(0);
  strokeWeight(2);
  line(x0, 0, x1, 0);
  line(offSx, y0, offSx, y1);
  textSize(12);
  textAlign(CENTER, TOP);
  for (let i = -2; i <= 4; i++) {
    let x = i * scaleFx + offSx;
    stroke("lightgrey");
    strokeWeight(0.5);
    line(x, y0, x, y1);
    stroke(0);
    strokeWeight(2);
    line(x, -0.3 * scaleFy, x, 0.3 * scaleFy);
    if (i != 0) {
      fill(0);
      noStroke();
      text(i, x, 0.5 * scaleFy);
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -7; i <= 7; i++) {
    let y = -i * scaleFy;
    stroke("lightgrey");
    strokeWeight(0.5);
    line(x0, y, x1, y);
    stroke(0);
    strokeWeight(2);
    line(-0.3 * scaleFy + offSx, y, 0.3 * scaleFy + offSx, y);
    if (i != 0) {
      fill(0);
      noStroke();
      text(i, -0.5 * scaleFy + offSx, y);
    }
  }
}

function draw_function(xA, yA, clr) {
  noFill();
  stroke(clr);
  beginShape();
  for (let i = 0; i < xA.length; i++) {
    if (abs(yA[i]) < 7.5)
      vertex(xA[i] * scaleFx + offSx, -yA[i] * scaleFy);
  }
  endShape();
}

function draw_streigung(x, y, m) {
  if (abs(y > 7.5)) return;
  const angle = atan(m / yxScale);
  const dx = cos(angle);
  const x0 = x - dx;
  const x1 = x + dx;
  const y0 = y + m * (x0 - x);
  const y1 = y + m * (x1 - x);
  strokeWeight(2);
  stroke("magenta");
  line(x0 * scaleFx + offSx, -y0 * scaleFy,
    x1 * scaleFx + offSx, -y1 * scaleFy);
}

function setup() {
  myCanvas = createCanvas(400, 400);
  myCanvas.parent('p5Container');
  for (let x = -1; x <= 4; x += 0.02) {
    xA.push(x);
    yA.push(f(x));
    ydA.push(fd(x));
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  draw_grid();
  draw_function(xA, yA, "red")
  draw_function(xA, ydA, "orange")
  let x = (mouseX - width / 2 - offSx) / scaleFx;
  let y = f(x);
  let yd = fd(x);
  let my = -y * scaleFy;
  let myd = -yd * scaleFy;
  if (abs(y) < 7.5) {
    draw_streigung(x, y, yd)
    noStroke();
    fill("red");
    circle(mouseX - width / 2, my, 8);
    fill("orange");
    circle(mouseX - width / 2, myd, 8);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(15);
    text(`x: ${Math.round(x*10)/10}`, -180, -175);
    fill("red");
    text(`f(x): ${Math.round(y*10)/10}`, -180, -155);
    fill("orange");
    text(`f'(x): ${Math.round(yd*10)/10}`, -180, -135);
    fill("magenta");
    text(`Steigung: ${Math.round(yd*10)/10}`, -180, -115);
  }
}