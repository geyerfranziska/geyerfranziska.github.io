let r = 180;
let r2 = r * 1.5;
let ly;
const lbloff = r * 0.3;
let tropfencntr;
let nWasser = 1.333;
let beschriftung;
let brechungsindex;
let strahlenschar;
let regenbogen;


let colors = ['violet', 'blue', 'cyan', 'green',
  'yellow', 'orange', 'red'
];
let waveLens = [400, 470, 510, 540, 580, 620, 750];
//let nIs = [1.47, 1.465, 1.461, 1.459, 1.456, 1.454, 1.450];
let nIs = [1.40, 1.39, 1.38, 1.37, 1.36, 1.35, 1.333];


function setup() {
  createCanvas(windowWidth, windowHeight);
  beschriftung = createCheckbox("Beschriftung");
  beschriftung.position(20, 20);
  strahlenschar = createCheckbox("Strahlenschar");
  strahlenschar.position(20, 80);
  brechungsindex = createSlider(1, 2, 1.33, 0.01);
  brechungsindex.position(20, 40);
  regenbogen = createCheckbox("Regenbogen");
  regenbogen.position(20, 100);

  r = height / 2 * 0.8;
  r2 = r * 1.5;


  tropfencntr = {
    x: width / 2,
    y: height / 2
  };
  ly = tropfencntr.y - r / 2;
}

function draw() {
  background(240);
  noStroke();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Brechungsindex: ${brechungsindex.value()}`, 20, 60);
  noFill();
  stroke(0);
  strokeWeight(1);
  fill(255);
  circle(tropfencntr.x, tropfencntr.y, r * 2);
  noFill();
  //  circle(tropfencntr.x, tropfencntr.y, r2*2);

  nWasser = brechungsindex.value();
  if (mouseIsPressed && mouseY > 60)
    ly = mouseY;

  if (strahlenschar.checked()) {
    let strahlengap = r / 13;
    for (let i = 1; i < 13; i++) {
      drawStrahl(tropfencntr.y - i * strahlengap, 0.7);
    }
  }
  if (regenbogen.checked()) {
    for (let c = 0; c < colors.length; c++) {
      drawStrahl(ly, 1, nIs[c], colors[c]);
    }
  } else {
    drawStrahl(ly, 2, nWasser, 'black', beschriftung.checked());
  }
}

function drawStrahl(sy, lw, ni = nWasser, clr = 'black', lbl = false) {
  let [s1, s2] = circleIntersection(0, sy, tropfencntr.x, tropfencntr.y);
  if (s2) {
    strokeWeight(lw);
    stroke('black');
    line(0, sy, s2[0], s2[1]);
    stroke(clr);
    const y = tropfencntr.y - sy;
    const ai = asin(y / r);
    const ar = asin(y / r / ni);
    const ap2 = 2 * ar - ai;
    // print(degrees(ap2), sin(-ap2) * r);
    const p2y = tropfencntr.y + sin(-ap2) * r;
    const p2x = tropfencntr.x + cos(ap2) * r;
    line(s2[0], s2[1], p2x, p2y);
    const ap3 = PI - 2 * ar - ap2;
    //print(degrees(ap2), degrees(ar), degrees(ap3));

    const p3y = tropfencntr.y + sin(ap3) * r;
    const p3x = tropfencntr.x + cos(ap3) * r;
    line(p2x, p2y, p3x, p3y);
    //    stroke('red');
    const ai2 = ap3 + ai;
    const p4x = p3x + cos(ai2) * r * 2 / 3;
    const p4y = p3y + sin(ai2) * r * 2 / 3;

    line(p3x, p3y, p4x, p4y);

    //circle(p4x, p4y, 10);

    //    let m2 = tan(ai2);
    //   print(m2);
    //    let b2 = p3y - m2 * p3x;
    //    line(p3x, p3y, 0, b2);

    strokeWeight(1);

    const p1xr2 = tropfencntr.x + cos(ai + PI) * r2;
    const p1yr2 = tropfencntr.y + sin(ai + PI) * r2;
    const p2yr2 = tropfencntr.y + sin(-ap2) * r2;
    const p2xr2 = tropfencntr.x + cos(ap2) * r2;
    const p3yr2 = tropfencntr.y + sin(ap3) * r2;
    const p3xr2 = tropfencntr.x + cos(ap3) * r2;

    if (lbl) {
      line(20, tropfencntr.y, width - 20, tropfencntr.y);

      line(tropfencntr.x, tropfencntr.y, p1xr2, p1yr2);
      line(tropfencntr.x, tropfencntr.y, p2xr2, p2yr2);
      line(tropfencntr.x, tropfencntr.y, p3xr2, p3yr2);
      noStroke();
      fill(0);
      text(`αi: ${degrees(ai).toFixed(1)}°`, width - 70, 20);
      text(`αr: ${degrees(ar).toFixed(1)}°`, width - 70, 40);
      //text(`t ${(sin(ai)/sin(ar)).toFixed(2)}`, width-70, 60);


      let swap = false;
      if (y < 0)
        swap = true;

      lblWinkel(PI, ai + PI, s2[0], s2[1], "αi", swap, clr);
      lblWinkel(PI, ai + PI, tropfencntr.x, tropfencntr.y, "αi", swap);
      lblWinkel(ap3, ai + ap3, p3x, p3y, "αi", swap, clr);

      lblWinkel(ai - ar, ai, s2[0], s2[1], "αr", swap, clr);
      lblWinkel(PI - ar - ap2, PI - ap2, p2x, p2y, "αr", swap, clr);
      lblWinkel(PI - ap2, PI + ar - ap2, p2x, p2y, "αr", swap, clr);
      lblWinkel(PI + ap3, PI + ar + ap3, p3x, p3y, "αr", swap, clr);
    }
    fill('black');
    stroke('black');
    triangle(s2[0], s2[1], s2[0] - 9, s2[1] - 4, s2[0] - 9, s2[1] + 4);

    fill(clr);
    stroke(clr);
    push();
    translate(p4x, p4y);
    rotate(ai2);
    triangle(0, 0, -9, -4, -9, +4);
    pop();
  }
}

function lblWinkel(w1, w2, px, py, lbl, swap = false, clr = 'black') {
  //    const a1m = (ai + PI + PI)/2; 
  if (swap)
    [w2, w1] = [w1, w2];
  const a1m = (w1 + w2) / 2;
  const lbl1x = px + cos(a1m) * lbloff;
  const lbl1y = py + sin(a1m) * lbloff;
  textAlign(CENTER, CENTER);
  noStroke();
  fill(clr);
  text(lbl, lbl1x, lbl1y);
  stroke(clr);

  noFill();
  arc(px, py, 3 * lbloff, 3 * lbloff, w1, w2);
}

function circleIntersection(m, b0, cx, cy) {
  const a = -m;

  const c = b0;
  const b = 1;
  const d = c - a * cx - b * cy;
  const ab2 = a * a + b * b;
  const uWurzel = sqrt(r * r * ab2 - d * d);
  const x1 = cx + (a * d + b * uWurzel) / ab2;
  const x2 = cx + (a * d - b * uWurzel) / ab2;
  const y1 = cy + (b * d - a * uWurzel) / ab2;
  const y2 = cy + (b * d + a * uWurzel) / ab2;
  return [
    [x1, y1],
    [x2, y2]
  ];
}

