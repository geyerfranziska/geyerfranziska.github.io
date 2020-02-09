let slider;

let clrs = [
"#963F20",
"#954B25",
"#94572A",
"#94632F",
"#936F34",
"#927B39",
"#92873E",
"#919343",
"#919F48",
"#90AB4D",
"#8FB752",
"#8FC357",
"#8ECF5C",
"#8DDB61",
"#8DE766",
"#8CF36B",
"#8CFF70"
];
function setup() {
  myCanvas = createCanvas(700, 480);
  myCanvas.parent('p5Container');

  angleMode(DEGREES);
 slider = createSlider(1,17,1,1);
  slider.changed(() => loop());
}

function draw() {
  print("draw");
  background(220);
  translate(width/2, 460);
 // line(slider.value()*10,-slider.value()*10, 200,-200)
 y(100, slider.value());
noLoop();
}

function y(sz, level) {
  if (level > 0) {
    stroke(clrs[clrs.length - level]);
    strokeWeight(0.2*sz);
    line(0, 0, 0, -sz);
    translate(0, -sz);
    rotate(30);
    y(0.8 * sz, level  - 1);
    rotate(-60)
    y(0.8 * sz, level - 1);
    rotate(30);
    translate(0, sz);
  }
}