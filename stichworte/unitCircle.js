class UnitCircle {
  constructor(x, y, r, periodendauer) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.periodDur = periodendauer;
    //print(this.x, this.y, this.r);
  }
  draw(tp) {
    t = tp - this.periodDur / 4;
    t = t % this.periodDur;
    const angle = t / this.periodDur * TWO_PI;
    const x = this.x - cos(angle) * this.r;
    const y = sin(angle) * this.r + this.y;

    noFill();
    stroke(255);
    strokeWeight(2);
    circle(this.x, this.y, this.r * 2);
    strokeWeight(1);
    line(this.x, this.y + this.r, this.x, this.y - this.r);
    line(this.x + this.r, this.y, this.x - this.r, this.y);

    fill(255);
    circle(x, y, 25);
    noStroke();
    textAlign(LEFT, CENTER);
    text(0, this.x - this.r + 4, this.y);
    textAlign(CENTER, BOTTOM);
    text("𝜋/2", this.x, this.y + this.r);
    textAlign(RIGHT, CENTER);
    text("𝜋", this.x + this.r - 3, this.y);
    textAlign(CENTER, TOP);
    text("3𝜋/2", this.x, this.y - this.r + 3);
  }
}
