const clrs = [
  "#a50026",
  "#d73027",
  "#f46d43",
  "#fdae61",
  "#fee08b",
  "#d9ef8b",
  "#a6d96a",
  "#66bd63",
  "#1a9850",
  "#006837"
];

const da = 2 * Math.PI / 100;
const lineWidth = 7.2;
const gap = 1;
const lNr = 10;
const radius = (lNr -1) * (lineWidth + gap) + lineWidth / 2;
const cx = radius + 5;
let t = 0;

let mc;
let mcPos;
let arcSlider;

function setup() {
  mc = createCanvas(600, 220);
  mc.parent('p5Container');
  mcPos = mc.position();

  arcSlider = createSlider(-10, 110, -10, 1);
  arcSlider.parent('p5Container');
  arcSlider.position(mcPos.x, mcPos.y + height - 25);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  if (mc.position().x != mcPos.x || mc.position().y != mcPos.y) {
    mcPos = { x: mc.position().x, y: mc.position().y };
    arcSlider.position(mcPos.x, mcPos.y + height - 25);
  }

  t = arcSlider.value();
  if (t < -5) {
    noStroke();
    fill(clrs[9]);
    circle(cx, height/2, 2*radius);
  } else {
    if (t<0) t = 0;
  noFill();
  strokeWeight(lineWidth);
  const arcLen = t * da;
  //    print(degrees(arcLen));
  stroke(clrs[0]);
  if (t > 1)
    line(cx, height / 2 + lineWidth / 2,
         cx + lineWidth * PI, height / 2 + lineWidth / 2);
  else
    circle(cx, height / 2, lineWidth);
  const lLen = arcLen / TWO_PI * radius * 2 * PI;
  for (let i = 1; i < lNr; i++) {
    stroke(clrs[i]);
    const actRadius = (lineWidth + gap) * i + lineWidth / 2;
    const perimeter = actRadius * 2 * PI;
    let drawArc = true;
    let alLen = lLen;
    let actArc = alLen / perimeter * TWO_PI;
    if (lLen >= perimeter) {
      alLen = perimeter;
      drawArc = false;
    }
    line(cx, height / 2 + actRadius,
      cx + alLen, height / 2 + actRadius);
    if (drawArc)
      arc(cx + alLen, height / 2,
        2 * actRadius, 2 * actRadius,
        HALF_PI + actArc, HALF_PI);
  }
  if (t > 105) {
    stroke(0);
    strokeWeight(2);
    const p1x = cx + radius * 2 * PI;
    const p1y = height / 2 + radius;
    const p2x = cx;
    const p2y = height / 2;
    const p3x = cx;
    const p3y = p1y;
    triangle(p1x,p1y,p2x,p2y,p3x,p3y);
    noStroke();
    fill(0);
    textSize(20);
    textAlign(CENTER, TOP);
    text("2·r·π", cx + radius * PI,height / 2 + radius+10); 
    textAlign(RIGHT,CENTER);
    text("r", cx -10,height / 2 + radius/2); 
  }
  }
  //  t++;
}