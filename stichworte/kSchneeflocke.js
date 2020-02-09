let slider;

function setup() {
  myCanvas = createCanvas(600, 600);
  myCanvas.parent('p5Container');
  angleMode(DEGREES);
  frameRate(2);
   slider = createSlider(0,7,0,1);
    slider.changed(() => loop());
}

function draw() {
  background(0);
  translate(width / 6, height / 5);
  strokeWeight(0.5);
  stroke(255);
  snowflake(400, slider.value());
  noLoop();
}

function snowflake(sz, level) {
  for (let i = 0; i < 3; i++) {
    segment(sz, level);
    rotate(120);
  }
}

function segment(sz, level) {
  if (level == 0) {
    line(0, 0, sz, 0);  
    translate(sz, 0);
  } else {
    segment( sz / 3,level-1);
 //  translate(sz / 3, 0);
    rotate(-60);

    segment( sz / 3,level-1);
   // translate(sz / 3, 0);
    rotate(120);

    segment( sz / 3,level-1);
   // translate(sz / 3, 0);
    rotate(-60);

    segment( sz / 3,level-1);
   //translate(sz / 3, 0);
  }
}