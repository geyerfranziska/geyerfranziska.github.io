let individuums = [];
const anzahl = 300;
let aktivRate = 0.1;
let r = 4;
let infizierte, immune, normale;
let t = 0;
let fertig = false;
let sliderAktiv;
let btnStart;
let run = false;
let lblDiv;

function startRun() {
  run = true;
  fertig = false;
  noStroke();
  fill(255);
  rect(200, 500, width - 200, height - 500);
  t = 0;
  aktivRate = sliderAktiv.value() / 100;
  individuums = [];
  for (let i = 0; i < anzahl - 1; i++) {
    individuums.push(new Individuum(false, random() < aktivRate, r));
  }
  individuums.push(new Individuum(true, true, r));
}

function setup() {
  let myCanvas = createCanvas(800, 610);
  myCanvas.parent('p5Container');
  btnStart = createButton("Start");
  btnStart.mousePressed(startRun);
  sliderAktiv = createSlider(1, 100, 100, 1);
  lblDiv = createSpan(`${sliderAktiv.value()} % aktiv`);
  sliderAktiv.changed(() =>  lblDiv.html(`${sliderAktiv.value()} % aktiv`));

  background(255);
}

function draw() {
  //    background(249);
  if (fertig) return;
  fill(249);
  noStroke();
  rect(0, 0, width, 500);
  fill(255);
  rect(0, 500, 200, 110);
  rect(200, 500, width - 200, 8);
  if (!run) return;
  noStroke();
  //p.fill(255);
  //p.rect(0, 600, p.width, p.height);
  for (let i = 0; i < anzahl - 1; i++) {
    let indi1 = individuums[i];
    for (j = i + 1; j < anzahl; j++) {
      let indi2 = individuums[j];
      //      if (dist(indi1.pos.x, indi1.pos.y, indi2.pos.x, indi2.pos.y) <= 2 * r) {
      if (indi1.pos.dist(indi2.pos) < 2 * r) {
        indi1.treffe(indi2);
        //indi2.treffe(indi1);
      }
    }
  }
  [infizierte, immune, normale] = [0, 0, 0];
  for (let i of individuums) {
    i.update();
    if (i.infiziert) infizierte++;
    else if (i.immun) immune++;
    else normale++;
    i.draw();
  }

  //       fill(255, 0, 0);
  //    else if (this.immun)
  //     fill(0, 164, 226);
  //   else
  fill(185);
  circle(20, 530, 15);
  fill(255, 0, 0);
  circle(20, 560, 15);
  fill(0, 164, 226);
  circle(20, 590, 15);
  textSize(18);
  textAlign(LEFT, CENTER);
  fill(0);
  text(`Gesunde: ${Math.round(normale/anzahl * 100)} %`, 40, 530)
  text(`Infizierte: ${Math.round(infizierte/anzahl * 100)} %`, 40, 560)
  text(`Geheilte: ${Math.round(immune/anzahl * 100)} %`, 40, 590)

  stroke(255, 0, 0);
  strokeWeight(0.5);
  let h1 = infizierte / anzahl * 80;
  line(200 + t / 5, 600, 200 + t / 5, 600 - h1);
  stroke(0, 164, 226);
  let h2 = immune / anzahl * 80 + h1;
  line(200 + t / 5, 600 - h1, 200 + t / 5, 600 - h2);
  stroke(185);
  let h3 = normale / anzahl * 80 + h2;
  line(200 + t / 5, 600 - h2, 200 + t / 5, 600 - h3);

  if (infizierte === 0) {
    fertig = true;
    run = false;
  } else
    t++;
    
  //  print(infizierte, immune, normale);
}