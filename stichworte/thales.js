let r = 180;
let cx;
let cy;
let ww = r / 10;
let rsq;
let mx;

function setup() {
  let myCanvas = createCanvas(400, 210);
  myCanvas.parent('p5Container');
  cnvPos = myCanvas.position();
  cx = width / 2;
  cy = r + 15;
  mx = r/3 + (cx - r);
  rsq =r - sqrt(2*ww*ww);
}

function draw() {
  background(255);
  if (mouseIsPressed && mouseX >= cx -r &&
     mouseX <= cx +r)
    mx = mouseX;
  noFill();
  stroke(0);
  arc(cx, cy, 2*r, 2*r, Math.PI, 2*Math.PI);
//  circle(cx, cy, r * 2);
  line(cx - r, cy, cx + r, cy);
  const p1 = {
    x: cx - r,
    y: cy};
  const p2 = {x: cx + r, y:cy};
  const dx = cx - mx;
  const dy = sqrt(r * r - dx * dx);
  const p3 = {x: mx, y:cy - dy}; 
  fill(0, 191, 255, 40);
  stroke(0, 191, 255);
  triangle(p1.x, p1.y,p2.x, p2.y,p3.x, p3.y);
  circle(p1.x, p1.y, 10);
  circle(p2.x, p2.y, 10);
  circle(p3.x, p3.y, 10);
  
  const a1 = atan(dy / (p3.x - (cx - r))) - Math.PI/2;
  translate(p3.x, p3.y);
  rotate(-a1);
  square(0, 0, ww);
  strokeWeight(2);
  point(ww/2,ww/2);
//  let m1 = -dy / (mouseX - (cx - r));
//  let m2 = -1 / m1;
//  let a1 = atan(m1);
//  let x0 = cos(a1) * -ww;
//  let y0 = sin(a1) * -ww;
//  const sqp1 = {x:p3.x + x0,y:p3.y + y0};
//  circle(sqp1.x, sqp1.y, 5);
  
//  const ac = asin(dy/r);
//  const sqp2 = {x: cos(ac) * rsq, y: sin(ac) * rsq};
//  circle(sqp2.x, sqp2.y, 5);
  
 // print(m1, m2,rsq);
}