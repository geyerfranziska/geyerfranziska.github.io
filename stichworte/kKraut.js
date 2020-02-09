let slider;

let blumentopf;

function preload() {
  //blumentopf = loadImage('Blumentopf.png');
}

function setup() {
  myCanvas = slider = createSlider(1,10,1,1);
  myCanvas.parent('p5Container');
  createCanvas(1000, 1200);
  angleMode(DEGREES);
  imageMode(CENTER);
  slider.changed(() => loop());
}

function draw() {
  background(255);
  translate(width/2,height - 420);
//  quadrat(300);
  fill(0,255,0);
  strokeJoin(MITER);
  kraut(500, slider.value());
  fill(211, 65, 26);
  strokeWeight(14);
  strokeJoin(ROUND);
    quad(-300, -120, 300, -120,
    235,50, -235, 50);
  //image(blumentopf,0,160);
//  saveCanvas('Krautkraut.png');
  noLoop();
}

function quadrat(sz, lw) {
//  print(lw);
  strokeWeight(sz/50);
  square(-sz/2, -sz, sz);
}

function kraut(sz, lvl) {
  if (lvl > 0) {
    quadrat(sz,lvl);
    translate(-sz/2,-sz/2);
    rotate(-90);
    kraut(sz/3, lvl-1)
    translate(sz/2,sz/2);
    rotate(90);
    kraut(sz/3, lvl-1)
    translate(sz/2,sz/2);
    rotate(90);
    kraut(sz/3, lvl-1)
    translate(sz/2,sz/2);
    rotate(-90);
//    rotate(90);
//    translate(sz/2,sz/2);
  }
}
