let pendel;
let pendel2;
let feder;
let t = 0;
let sliderAuslenk;
let sliderLaenge;
let belehrung;
let federpendel;
let cbPendel2;
let dampfung;

function setup() {
  createCanvas(windowWidth, windowHeight);
  belehrung = createCheckbox("Beschriftung", false);
  belehrung.position(10, height - 70);
  belehrung.style('color', '#FFFFFF');
  belehrung.style('font-family', 'Arial');
  federpendel = createCheckbox("Federpendel", false);
  federpendel.position(width - 150, height - 40);
  federpendel.style('color', '#FFFFFF');
  federpendel.style('font-family', 'Arial');
  cbPendel2 = createCheckbox("2. Pendel", false);
  cbPendel2.position(width - 150, height - 60);
  cbPendel2.style('color', '#FFFFFF');
  cbPendel2.style('font-family', 'Arial');
  dampfung = createCheckbox("Dämpfung", false);
  dampfung.position(10, height - 90);
  dampfung.style('color', '#FFFFFF');
  dampfung.style('font-family', 'Arial');

  sliderAuslenk = createSlider(0, 90, 20, 1);
  sliderAuslenk.position(10, height - 50);
  sliderLaenge = createSlider(10, 100, 30, 1);
  sliderLaenge.position(10, height - 30);
  pendel = new Pendel(width / 3, 10, 30, 20 / 180 * PI);
  pendel2 = new Pendel(width / 3, 10, 30, 35 / 180 * PI);
  sliderLaenge.changed(() => {
    pendel.setLaengeP(sliderLaenge.value());
    pendel2.setLaengeP(sliderLaenge.value());
    feder.set_laenge(sliderLaenge.value());
  });
  sliderAuslenk.changed(() => {
    pendel.setAuslenkung(sliderAuslenk.value());
    pendel2.setAuslenkung(sliderAuslenk.value() + 15);
    feder.set_laenge(sliderLaenge.value());
  });

  dampfung.changed(() => {
    pendel.toggleDamp(dampfung.checked());
    feder.toggleDamp(dampfung.checked());

  });

  feder = new Spring(width / 3 * 2, 10, 120, 370, 30);
}

function draw() {
  background(0);
  pendel.update(t);
  pendel.draw();
  if (cbPendel2.checked()) {
    pendel2.update(t);
    pendel2.draw([255,0,255]);
  }
  pendel.drawInfo();
  feder.update();
  if (federpendel.checked())
    feder.draw();
  if (belehrung.checked()) {
    pendel.drawBelehrung();
    if (federpendel.checked())
      feder.drawBelehrung();
  }
  //t += 0.1;
}