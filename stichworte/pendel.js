class Pendel {
  constructor(x, y, laenge, auslenkung) {
    this.x = x;
    this.y = y;
    this.laengeM = laenge / 100;
    this.laengeP = this.laengeM * 800;
    this.theta0 = auslenkung;
    this.damp = 0;
    this.dampStart = 0;

    this.g = 9.81;
    this.init();
  }

  init() {
    this.gPerl = sqrt(this.g / this.laengeM);
   // print(this.gPerl);
    this.millis0 = millis();
    this.periodendauer = TWO_PI * sqrt(this.laengeM / this.g);
    this.frequenz = 1 / this.periodendauer;
    this.amplitude = PI * 2 * this.laengeM * this.theta0 / TWO_PI;
    this.amplix1 = sin(this.theta0) * this.laengeP + this.x;
    this.amplix2 = sin(-this.theta0) * this.laengeP + this.x;
    this.ampliy = cos(this.theta0) * this.laengeP + this.y;

    this.ampliLblX1 = sin(this.theta0 / 2) * this.laengeP + this.x;
    this.ampliLblX2 = sin(-this.theta0 / 2) * this.laengeP + this.x;
    this.ampliLblY = cos(this.theta0 / 2) * this.laengeP + this.y;
    //   this.tx = this.amplix1 - cos(this.theta0)*7;
    //   this.ty = this.ampliy + sin(this.theta0)*7;
  }
  setLaengeP(laenge) {
    this.laengeM = laenge / 100;
    this.laengeP = this.laengeM * 800;
    this.init();
  }

  setAuslenkung(auslenkung) {
    this.theta0 = radians(auslenkung);
    this.init();
  }

  toggleDamp(active) {
    if (active) {
      this.damp = 0.1;
      this.dampStart = millis();
    } else {
      this.damp = 0;
    }
  }

  update() {
    //    print(this.theta0, this.gPerl, t);
    const t = (millis() - this.millis0) / 1000;
    const theta = this.theta0 * cos(this.gPerl * t);
    const dampT = (millis() - this.dampStart) / 1000;

    let actDamp = exp(-this.damp * dampT);
    this.px = sin(theta * actDamp) * this.laengeP + this.x;
    this.py = cos(theta * actDamp) * this.laengeP + this.y;
    // print(theta, this.px,this.py);
  }

  draw(clr = [255,255,255]) {
    stroke(...clr);
    strokeWeight(1);
    fill(...clr);
    line(this.x, this.y, this.px, this.py);
    circle(this.px, this.py, 20);
  }

  drawInfo() {
    noStroke();
    strokeWeight(1);
    fill(255);
    const x0 = 10;
    const y0 = 20;
    textAlign(LEFT,CENTER);
    textSize(16);
    text("Länge: ", x0, y0);
    text(`${this.laengeM} m`, x0 + 120, y0);
    text("Auslenkung: ", x0, y0 + 25);
    text(`${nf(degrees(this.theta0),1,2)} °`, x0 + 120, y0 + 25);
    text("Amplitude: ", x0, y0 + 50);
    text(`${round(this.amplitude*100)} cm`, x0 + 120, y0 + 50);
    text("Periodendauer: ", x0, y0 + 75);
    text(`${nf(this.periodendauer,1,2)} s`, x0 + 120, y0 + 75);
    text("Frequenz: ", x0, y0 + 100);
    text(`${nf(this.frequenz,1,2)} Hz`, x0 + 120, y0 + 100);

    text(`${this.laengeM} m`, x0 + 190, height - 15);
    text(`${nf(degrees(this.theta0),1,2)} °`, x0 + 190, height - 35);
  }

  drawBelehrung() {
    stroke(255, 255, 0);
    strokeWeight(1);
    noFill();
    arc(this.x, this.y, this.laengeP * 2, this.laengeP * 2, HALF_PI - this.theta0, HALF_PI + this.theta0);
    // triangle();
    // circle(this.tx,this.ty,5);

    push();
    translate(this.amplix1, this.ampliy);
    textAlign(LEFT, TOP);
    noStroke();
    fill(255, 255, 0);
    text('Umkehrpunkt', 8, 8);
    rotate(HALF_PI - this.theta0);
    stroke(255, 255, 0);
    noFill();
    circle(0, 0, 20);
    fill(255, 255, 0);
    triangle(0, 0, 3, 7, -3, 7);
    pop();

    push();
    translate(this.amplix2, this.ampliy);
    textAlign(RIGHT, TOP);
    noStroke();
    fill(255, 255, 0);
    text('Umkehrpunkt', -8, 8);
    rotate(-HALF_PI + this.theta0);
    stroke(255, 255, 0);
    noFill();
    circle(0, 0, 20);
    fill(255, 255, 0);
    triangle(0, 0, 3, 7, -3, 7);
    pop();

    push();
    translate(this.x, this.y + this.laengeP, this.ampliy);
    textAlign(CENTER, TOP);
    noStroke();
    fill(255, 255, 0);
    text('Gleich-', 0, 10);
    text('gewichtslage', 0, 30);
    stroke(255, 255, 0);
    noFill();
    circle(0, 0, 20);
    fill(255, 255, 0);
    rotate(-HALF_PI);
    triangle(0, 0, 3, 7, -3, 7);
    rotate(PI);
    triangle(0, 0, 3, 7, -3, 7);
    pop();

    push();
    translate(this.ampliLblX1, this.ampliLblY);
    textAlign(CENTER, TOP);
    noStroke();
    fill(255, 255, 0);
    rotate(-this.theta0 / 2);
    text('Amplitude', 0, 8);
    pop();

    push();
    translate(this.ampliLblX2, this.ampliLblY);
    textAlign(CENTER, TOP);
    noStroke();
    fill(255, 255, 0);
    rotate(this.theta0 / 2);
    text('Amplitude', 0, 8);
    pop();
  }
}