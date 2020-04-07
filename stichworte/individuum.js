class Individuum {
  constructor(infiziert, aktiv, r) {
    this.r = r;
    this.speed = 1.3;
    this.infiziert = infiziert;
    this.immun = false;
    if (this.infiziert) {
      this.startpunkt = millis();
    }
    this.aktiv = aktiv;
    this.maxHgt = height - 110;
    this.pos = createVector(random(width - 2 * this.r) + this.r,
      random(this.maxHgt - 2 * this.r) + this.r);
    if (aktiv)
      this.velocity = p5.Vector.random2D().mult(this.speed);
    else
      this.velocity = createVector(0, 0);
  }
  update() {
    if (this.infiziert && millis() - this.startpunkt > 6000) {
      this.infiziert = false;
      this.immun = true;
    }

    this.pos.add(this.velocity);
    if (this.pos.x <= this.r || this.pos.x >= width - this.r) {
      this.velocity.x *= -1;
    }

    if (this.pos.y <= this.r || this.pos.y >= this.maxHgt - this.r) {
      this.velocity.y *= -1;
    }

  }

  draw() {
    noStroke();
    if (this.infiziert)
      fill(255, 0, 0);
    else if (this.immun)
      fill(0, 164, 226);
    else
      fill(185);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }

  treffe(indi, erster = true) {
    if (erster) {
      const zv = p5.Vector.sub(this.pos, indi.pos).normalize();
      // const zv = this.pos.copy().sub(indi.pos).normalize();
      const tv = createVector(-zv.y, zv.x);
      //const tv = zv.copy().rotate(this.p.HALF_PI);


      const za1 = p5.Vector.sub(indi.velocity, p5.Vector.mult(zv, zv.dot(indi.velocity)));
      const ta1 = p5.Vector.sub(this.velocity, p5.Vector.mult(tv, tv.dot(this.velocity)));

      const za2 = p5.Vector.sub(this.velocity, p5.Vector.mult(zv, zv.dot(this.velocity)));
      const ta2 = p5.Vector.sub(indi.velocity, p5.Vector.mult(tv, tv.dot(indi.velocity)));

      if (this.aktiv) {
        this.velocity = p5.Vector.add(za1, ta1);
        if (!indi.aktiv) {
          this.velocity = tv.setMag(this.speed).rotate(180);
          indi.pos.sub(zv);
        }
          
//          this.velocity.setMag(this.speed);
      }
      if (indi.aktiv) {
        indi.velocity = p5.Vector.add(za2, ta2);
        if (!this.aktiv) {
          indi.velocity = tv.setMag(indi.speed);
          this.pos.add(zv);
        }
//          indi.velocity.setMag(indi.speed);
      }

      //this.velocity = za1.add(ta1).copy();
      //indi.velocity = za2.add(ta2).copy();

      indi.treffe(this, false);
    }

    if (!this.infiziert && !this.immun && indi.infiziert) {
      this.infiziert = true;
      this.startpunkt = millis();
    }
  }
}