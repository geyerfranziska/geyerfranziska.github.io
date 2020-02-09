let size = 30;
let anzahl = 30;
let yStart = 10;
let reihe = [1];
let nReihe = [];
let slider;
let sliderAnzahl;
let cnvPos;

function setup() {
  myCanvas = createCanvas(800, 800);
    myCanvas.parent('p5Container');

    print(myCanvas.position());
cnvPos = myCanvas.position();
  checkbox = createCheckbox('Zahlen anzeigen', true);
  checkbox.parent('p5Container');
  checkbox.position(cnvPos.x + 2, cnvPos.y + 10);
  slider = createSlider(1, 15, 2, 1);
  slider.parent('p5Container');
  slider.position(cnvPos.x + 2, cnvPos.y + 35);
  sliderAnzahl = createSlider(1, 50, 12, 1);
  sliderAnzahl.parent('p5Container');
    sliderAnzahl.position(cnvPos.x + 2, cnvPos.y + 60);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);
  anzahl = sliderAnzahl.value();
  let size = (height - 2*yStart) / anzahl;
  textSize(18);
  fill("#fc0fc0");
  textAlign(LEFT, CENTER);
  text(slider.value() + "er-Reihe markiert", 170, 35 + 10);
  text(sliderAnzahl.value() + " Reihen", 170, 60 + 10);
  textAlign(CENTER, CENTER);
  textSize(size/3*2);
  reihe = [1];
  nReihe = [];
  for (let i = 1; i <= anzahl; i++) {
    let y = yStart + i * size - size / 2;
    let xStart = width / 2 - i * size / 2 + size / 2;
    for (let j = 0; j < i; j++) {
      let x = xStart + j * size;
      let zahl = 0;
      if (j - 1 >= 0) zahl += reihe[j - 1];
      if (j < reihe.length) zahl += reihe[j];
      nReihe[j] = zahl;
      if (zahl % slider.value() == 0) {
        fill(230, 230, 255);
      } else {
        fill(255);
      }
      rect(x, y, size, size);
      fill(0);
      if (checkbox.checked()) {
        text(zahl, x, y);
      }
    }
    reihe = Array.from(nReihe);
  }
  // saveCanvas('pascal3eck', 'png');
  //noLoop();

}
