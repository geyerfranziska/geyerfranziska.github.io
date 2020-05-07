class Spring {
  constructor(x, y, amplitude, to, laenge) {
    this.x = x;
    this.y = y;
    this.to = to;
    this.amplitude = amplitude;

    this.g = 9.81;

    this.damp = 0;
    this.dampStart = 0;

    this.n = 567;
    this.minAmpliFactor = (this.to - 20 - (this.amplitude * 2)) / (this.to - 20);
    this.meanAmpliFactor = (1 + this.minAmpliFactor) / 2;

    this.set_laenge(laenge);

    this.sx0 = [];
    this.sy0 = [];

    for (let p = 0; p < this.n; p++) {
      this.sx0.push(cos(p * 0.05 - PI / 2) * 40);
      this.sy0.push((sin(p * 0.05 - PI / 2) + 1) * 20);
    }
  }

  set_laenge(laenge) {
    this.laengeM = laenge / 100;
    this.laengeP = this.laengeM * 800;
    this.gPerl = sqrt(this.g / this.laengeM);
    this.millis0 = millis();
    this.periodendauer = TWO_PI * sqrt(this.laengeM / this.g);

    const ep = (sin(this.n * 0.05 - PI / 2) + 1) * 20;

    this.ampliY1 = (ep + (this.to - 20)) * this.minAmpliFactor + 20 + 60;
    this.ampliY2 = (ep + (this.to - 20)) * 1 + 20 + 30;
    this.ampliY0 = (this.ampliY1 + this.ampliY2) / 2;
    // print(this.n,ep,this.ampliY1,this.ampliY2,this.to);
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
    const t = (millis() - this.millis0) / 1000;
    const dampT = (millis() - this.dampStart) / 1000;
    let actDamp = exp(-this.damp * dampT);
    const theta = cos(this.gPerl * t);

    const tfctr = map(theta, -1, 1, this.minAmpliFactor, 1);
    const dampAusl = (tfctr - this.meanAmpliFactor) * actDamp;
    this.tfctr = this.meanAmpliFactor + dampAusl;
  }

  draw() {
    noFill();
    stroke(255);
    strokeWeight(3);
    line(this.x, this.y, this.x, this.y + 20);
    beginShape();
    for (let p = 0; p < this.n; p++) {
      // adding width/2 to center the spiral
      const x = this.sx0[p] + this.x;
      const y = this.sy0[p] + map(p, 0, this.n - 1, this.y, (this.to - 20) * this.tfctr) + 20;
      vertex(x, y);
    }
    endShape();
    const y0 = this.sy0[this.n - 1] + (this.to - 20) * this.tfctr + 20;
    line(this.x, y0, this.x, y0 + 30);
    fill(255);
    circle(this.x, y0 + 30, 25);
  }

  drawBelehrung() {
    stroke(255, 255, 0);
    strokeWeight(2);
    noFill();
    circle(this.x, this.ampliY0, 25);
    circle(this.x, this.ampliY1, 25);
    circle(this.x, this.ampliY2, 25);
    line(this.x, this.ampliY1, this.x, this.ampliY2);

    fill(255, 255, 0);
    const x2 = this.x + 4;
    const x3 = this.x - 4;
    let y1 = this.ampliY1;
    let y23 = this.ampliY1 + 8;
    triangle(this.x, y1, x2, y23, x3, y23);
    y1 = this.ampliY0;
    y23 = this.ampliY0 + 8;
    triangle(this.x, y1, x2, y23, x3, y23);
    y1 = this.ampliY0;
    y23 = this.ampliY0 - 8;
    triangle(this.x, y1, x2, y23, x3, y23);
    y1 = this.ampliY2;
    y23 = this.ampliY2 - 8;
    triangle(this.x, y1, x2, y23, x3, y23);


    noStroke();
    textAlign(LEFT, CENTER);
    text("Umkehrpunkt", this.x + 15, y1);
    text("Gleichgewichtslage", this.x + 15, this.ampliY0);
    text("Umkehrpunkt", this.x + 15, this.ampliY1);

    textAlign(CENTER, BOTTOM);
    push()
    translate(this.x + 15, (y1 + this.ampliY0) * 1 / 2);
    rotate(PI / 2);
    text("Amplitude", 0, 0);
    pop()


    push()
    translate(this.x + 15, (this.ampliY0 + this.ampliY1) * 1 / 2);
    rotate(PI / 2);
    text("Amplitude", 0, 0);
    pop()
  }
}