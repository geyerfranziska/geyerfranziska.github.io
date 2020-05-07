p5.disableFriendlyErrors = true; // disables FES

let feder;
let t = 0;
let sliderAuslenk;
let sliderLaenge;
let belehrung;
let federpendel;
let sinWelle;
let unitCircle;
let dampfung;
let radio;
let zeitlupe;
let geschwindigkeit;
let beschleunigung;
let diagramm;


function setup() {
  createCanvas(windowWidth, windowHeight);
  belehrung = createCheckbox("Beschriftung", false);
  belehrung.position(10, height - 70);
  belehrung.style('color', '#FFFFFF');
  belehrung.style('font-family', 'Arial');

  zeitlupe = createCheckbox("Zeitlupe", false);
  zeitlupe.position(width / 2, height - 30);
  zeitlupe.style('color', '#FFFFFF');
  zeitlupe.style('font-family', 'Arial');
  zeitlupe.changed(() =>
    feder.zeitlupe = zeitlupe.checked()
  );

  geschwindigkeit = createCheckbox("Geschwindigkeit", false);
  geschwindigkeit.position(width / 2, height - 50);
  geschwindigkeit.style('color', '#FFFFFF');
  geschwindigkeit.style('font-family', 'Arial');

  beschleunigung = createCheckbox("Beschleunigung", false);
  beschleunigung.position(width / 2, height - 70);
  beschleunigung.style('color', '#FFFFFF');
  beschleunigung.style('font-family', 'Arial');

  diagramm = createCheckbox("Diagramm", false);
  diagramm.position(width / 2, height - 90);
  diagramm.style('color', '#FFFFFF');
  diagramm.style('font-family', 'Arial');


  radio = createRadio();
  radio.position(width - 140, height - 60);
  radio.option('Federpendel');
  radio.option('Einheitskreis');
  radio.style('color', '#FFFFFF');
  radio.style('font-family', 'Arial');
  radio.style('width', '120px');
  radio.value('Federpendel');

  feder = new Spring(width / 6, 10, 120, 370, 30);

  unitCircle = new UnitCircle(feder.x, feder.ampliY0,
    feder.ampliY1 - feder.ampliY0, feder.periodendauer);
  sinWelle = new SinWelle(width / 5 + 120, feder.ampliY0, feder.ampliY1 - feder.ampliY0, feder.periodendauer);
}


function draw() {
  background(0);
  feder.update();

  //t += 0.1;
  if (radio.value() == 'Federpendel')
    feder.draw();
  if (belehrung.checked()) {
    sinWelle.drawBelehrung();
  }

  if (geschwindigkeit.checked()) {
    sinWelle.drawV();
  }

  if (beschleunigung.checked()) {
    sinWelle.drawA();
  }

  if (diagramm.checked()) {
    sinWelle.drawAchsen(geschwindigkeit.checked(),beschleunigung.checked());
    sinWelle.drawSin();
    sinWelle.drawBall(feder.t);

  }


  if (radio.value() == 'Federpendel')
    feder.drawBelehrung();

  if (radio.value() == 'Einheitskreis')
    unitCircle.draw(feder.t);
}