
function setup() {
  let myCanvas = createCanvas(900, 1000);
  myCanvas.parent('p5Container');
  cnvPos = myCanvas.position();
  const x0 = -130;
  pE = {x: x0, y: -circleYforX(x0, radius)}
  btnR = createButton('beweise!');
//  btnR.style('font-family', "Computer Modern");
  btnR.style('font-size', '20px');
  btnR.position(20,cnvPos.y+50);
  btnR.mousePressed(animRedProof);
//  textFont('Computer Modern');
}

const radius = 140;

let clr0;
let clr1, clr1A;
let clr2, clr2A;

let pE = {};
let ppC, ppCs;
let animProof = false;
let animPhase = null;

let btnR;

function circleYforX(x, r) {
  return sqrt(r * r - x * x);
}

function length(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return sqrt(dx * dx + dy * dy);
}

function area(p1, p2, p3, p4) {
  const l1 = length(p1, p2);
  const l2 = length(p2, p3);
  return l1 * l2;  
}

function get_corners(pA, pE, left=true) {
  const lAE = length(pA, pE);
  const m = (pA.y - pE.y) / (pA.x - pE.x);
  const pm = -1 / m;
  let dx = lAE / sqrt(1 + pm * pm);
  if (! left) dx *= -1;
  const dy = sqrt(lAE * lAE - dx * dx);
  return [{x: pE.x - dx, y: pE.y - dy},
    {x: pA.x - dx, y: pA.y - dy}];
}

function animRedProof() {
  animProof = true;
  animPhase = 0;
//  ppC = {x: pC.x, y: pC.y};
//  ppCs = {x: pCs.x, y: pCs.y};
}

function setup() {
  let myCanvas = createCanvas(900, 1000);
  myCanvas.parent('p5Container');
  cnvPos = myCanvas.position();
  const x0 = -100;
  pE = {x: x0, y: -circleYforX(x0, radius)}
  btnR = createButton('beweise!');
//  btnR.style('font-family', "Computer Modern");
  btnR.style('font-size', '20px');
  btnR.position(20,cnvPos.y+50);
  btnR.mousePressed(animRedProof);
//  textFont('Computer Modern');
  clr0 = color(245);
clr1 = color(0, 191, 255);
clr1A = color(red(clr1), green(clr1), blue(clr1),80);
clr2 = color(240, 0, 240);
  clr2A = color(red(clr2), green(clr2), blue(clr2),80);
}

function draw() {
  background(255);
  translate(width/2, height/2);
  stroke(0);
  fill(clr0);
  rect(-radius, 0, 2 * radius, 2 * radius);

//  line(-radius, 0, radius, 0);
  
  if (mouseIsPressed) {
    const mx = mouseX - width/2;
    // const my = mouseY - height/2;
    if (abs(mx) <= radius) {
      let my = circleYforX(mx, radius);
      pE = {x: mx, y: -my};
    }
  }
  const pA = {x: -radius, y: 0};
  const pB = {x: radius, y: 0};
  
  const pC = {x: pE.x, y: pE.y};
  const pD = {x: pE.x, y: pE.y};
  
  const [pCs, pAs] = get_corners(pA, pE);
  const [pDs, pBs] = get_corners(pB, pE, false)
  
  const fA = area(pA, pE, pCs, pAs);
  const fB = area(pB, pE, pDs, pBs);

  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(22);
  // text(`fA: ${round(fA)}px, fB: ${round(fB)}px, fG: ${round(fA + fB)}px`,
  //     -width/2 + 20, -height/2 + 20);
  
  stroke(clr1);
  fill(clr1A);
  quad(pA.x, pA.y, pE.x, pE.y, pCs.x, pCs.y, pAs.x, pAs.y);
  stroke(clr2);
  fill(clr2A);
  quad(pB.x, pB.y, pE.x, pE.y, pDs.x, pDs.y, pBs.x, pBs.y);

  strokeWeight(3);
  stroke(clr1);
  line(pA.x, pA.y, pE.x, pE.y);
  line(pA.x, pA.y, pAs.x, pAs.y);
  stroke(clr2);
  line(pB.x, pB.y, pBs.x, pBs.y);
  line(pB.x, pB.y, pE.x, pE.y);

  fill(255);
  strokeWeight(1);
  stroke(0);

  circle(pE.x, pE.y, 10);

  circle(pA.x, pA.y,10);
//  circle(pE.x, pE.y,10);
  
  circle(pB.x, pB.y,10);
//  circle(pE.x, pE.y,10);

  noFill();
  stroke(0);
  strokeWeight(2);
  circle(0, 0, radius * 2);

  textAlign(CENTER, CENTER);
  noStroke();

  fill(0);
  text(`a² = ${round(fA)} px`, (pAs.x + pE.x) / 2, (pA.y + pCs.y)/2);
  fill(0);
  text(`b² = ${round(fB)} px`, (pBs.x + pE.x) / 2, (pB.y + pDs.y)/2);
  fill(0);
  text(`c² = ${4 * radius * radius} px`, 0, radius + 30);

  strokeWeight(1);
  stroke(0);
  fill(clr0);
  const y0 = 100 - 2 * radius;
  const hgt = 4 * radius - 100;
  rect(-width/2 + 20, y0, 30, hgt);
  stroke(clr1);
  fill(clr1A);
  const frcA = fA / (fA + fB);
  rect(-width/2 + 60, y0, 30, frcA * hgt);
  stroke(clr2);
  fill(clr2A);
  const frcB = 1 - frcA;
  rect(-width/2 + 60, y0 + frcA * hgt, 30, frcB * hgt);
  
  if (animProof) {
    animPhase += 0.01;
    const [animPhase1, animPhase2, animPhase3,
          animPhase4, animPhase5, animPhase6] = getPhases(animPhase);

    let dx = (radius - pE.x) * animPhase1;
    let dy = (-pE.y) * animPhase1;
    const ppCx = dx + pE.x;
    let ppCy = dy + pE.y;
    let ppCsx = dx + pCs.x;
    let ppCsy = dy + pCs.y;
    
    dx = (-radius - pAs.x) * animPhase2;
    const ppAsx = dx + pAs.x;
    let ppAsy = pAs.y;
    ppCsx = dx + ppCsx;
    
    dy = animPhase3 * 2 * radius;
    const ppAy = pA.y + dy;
    ppCy += dy;
    ppCsy += dy;
    ppAsy += dy;

    dx = (-radius - pE.x) * animPhase4;
    dy = (-pE.y) * animPhase4;
    const ppDx = dx + pE.x;
    let ppDy = dy + pE.y;
    let ppDsx = dx + pDs.x;
    let ppDsy = dy + pDs.y;

    dx = (radius - pBs.x) * animPhase5;
    const ppBsx = dx + pBs.x;
    let ppBsy = pBs.y;
    ppDsx = dx + ppDsx;
 
    dy = animPhase6 * (ppDy - ppDsy);
    const ppBy = pB.y + dy;
    ppDy += dy;
    ppDsy += dy;
    ppBsy += dy;

    noStroke(0);
    fill(clr1A);
    quad(pA.x, ppAy, ppCx, ppCy, ppCsx, ppCsy, ppAsx, ppAsy);
    if (animPhase >= 3) {
    fill(clr2A);
    quad(pB.x, ppBy, ppDx, ppDy, ppDsx, ppDsy, ppBsx, ppBsy);
    }
    if (animPhase >= 7) animProof = false;
  }
}

function getPhases(phase) {
  let p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0;
  if (animPhase < 1) return [phase, p2, p3, p4, p5, p6];
  else p1 = 1;
  if (animPhase < 2) return [p1, phase - 1, p3, p4, p5, p6];
  else p2 = 1;
  if (animPhase < 3) return [p1, p2, phase - 2, p4, p5, p6];
  else p3 = 1;
  if (animPhase < 4) return [p1, p2, p3, phase - 3, p5, p6];
  else p4 = 1;
  if (animPhase < 5) return [p1, p2, p3, p4, phase - 4, p6];
  else p5 = 1;
  if (animPhase < 6) return [p1, p2, p3, p4, p5, phase - 5];
  else p6 = 1;
  return [p1, p2, p3, p4, p5, p6];
}
