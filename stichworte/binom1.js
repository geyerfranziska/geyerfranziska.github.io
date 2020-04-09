let seite, aSeite, aSeiteO;
let farbe1 = [0, 191, 255];
let farbe2 = [255, 220, 0];
let farbe3;
let offSet;

let drag1 = false;
let drag2 = false;

let divFormel;

function setup() {
  offSet = 30;
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("p5Container1");
  divFormel = createDiv();
  divFormel.parent("binomWerte");

  seite = width - 2 * offSet;
  let farbe = lerpColor(color(...farbe1), color(...farbe2), 0.5);
  farbe3 = [round(red(farbe)), round(green(farbe)), round(blue(farbe))];
  aSeite = seite * 70 / 100;
  divFormel.html("<span>\\( (a + b)^2 = a^2 + 2ab + b^2 \\)</span>");
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById("binomWerte")]);
}

function draw() {
  background(255);
  fill(255);
  translate(offSet, offSet);

  rect(0, 0, seite, seite);

  if (mouseIsPressed) {
    if (drag1 || dist(mouseX - offSet, mouseY - offSet, 0, aSeite) < 6) {
      drag1 = true;
      aSeite = mouseY - offSet;
    } else if (drag2 || dist(mouseX - offSet, mouseY - offSet, aSeite, 0) < 6) {
      drag2 = true;
      aSeite = mouseX - offSet;
    }
    aSeite = constrain(floor(aSeite), 0, seite);
  } else {
    drag1 = false;
    drag2 = false;
  }

  let bSeite = seite - aSeite;
  let ax = aSeite / 2;
  let ay = ax;
  let bx = bSeite / 2 + aSeite;
  let by = bx;

  if (!(drag1 || drag2) && aSeite !== aSeiteO){
//    divFormel.html(`<span>\\(
//      \\definecolor{farbe1}{RGB}{${farbe1.join()}}
//      \\definecolor{farbe2}{RGB}{${farbe2.join()}}
//      \\definecolor{farbe3}{RGB}{${farbe3.join()}}
//      (\\color{farbe1}${aSeite} + \\color{farbe2}${bSeite})^2 = \\color{farbe1}${aSeite}^2 + 2\\cdot \\color{farbe3} ${aSeite}\\cdot ${bSeite} + \\color{farbe2}${bSeite}^2 \\)</span>`);
      divFormel.html(`<span>\\(
        \\definecolor{farbe1}{RGB}{${farbe1.join()}}
        \\definecolor{farbe2}{RGB}{${farbe2.join()}}
        \\definecolor{farbe3}{RGB}{${farbe3.join()}}
        (\\color{farbe1}${aSeite} \\color{black}+ \\color{farbe2}${bSeite}\\color{black})^2 = \\color{farbe1}${aSeite}^2 \\color{black}+ 2\\cdot \\color{farbe3} ${aSeite}\\color{black}\\cdot \\color{farbe3} ${bSeite} \\color{black}+ \\color{farbe2}${bSeite}^2 \\)</span>`);
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById("binomWerte")]);
      aSeiteO = aSeite;
    }

  fill(...farbe3, 40);
  stroke(...farbe3);
  rect(aSeite, 0, bSeite, aSeite);
  rect(0, aSeite, aSeite, bSeite);
  fill(...farbe3);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(30);
  text("a ⋅ b", ax, by);

  text("b ⋅ a", bx, ay);


  fill(...farbe1, 40);
  stroke(...farbe1);
  rect(0, 0, aSeite, aSeite);
  fill(...farbe1);
  noStroke();
  text("a²", ax, ay);


  fill(...farbe2, 40);
  stroke(...farbe2);
  rect(aSeite, aSeite, bSeite, bSeite);
  fill(...farbe2);
  noStroke();
  text("b²", bx, by);

  textAlign(CENTER, BOTTOM);
  textSize(20);
  fill(...farbe1);
  text("a", ax, 0);
  fill(...farbe2);
  text("b", bx, 0);

  textAlign(CENTER, TOP);
  fill(...farbe1);
  text("a", ax, seite + 2);
  fill(...farbe2);
  text("b", bx, seite + 2);

  textAlign(RIGHT, CENTER);
  fill(...farbe1);
  text("a", -4, ay);
  fill(...farbe2);
  text("b", -4, by);


  textAlign(LEFT, CENTER);
  fill(...farbe1);
  text("a", seite + 4, ay);
  fill(...farbe2);
  text("b", seite + 4, by);

  noFill();
  stroke(255, 0, 0);
  circle(aSeite, 0, 12);
  circle(0, aSeite, 12);

}