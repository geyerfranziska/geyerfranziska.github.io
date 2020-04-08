class Dreieck {
  constructor(pA, pB, pC, radius = 30,
    sWght = 1,
    fClr = [255, 255, 255],
    sClr = [0, 0, 0],
    afClr = fClr) {
    this.radius = radius;
    this.fill = fClr;
    this.ecken = {
      A: {
        x: pA.x,
        y: pA.y,
        label: 'A',
        angLbl: 'α'
      },
      B: {
        x: pB.x,
        y: pB.y,
        label: 'B',
        angLbl: 'β'
      },
      C: {
        x: pC.x,
        y: pC.y,
        label: 'C',
        angLbl: 'γ'
      }
    };
    Object.values(this.ecken).forEach((ecke) => {
      ecke.lClr = sClr;
      ecke.aClr = sClr;
      ecke.arcSwght = sWght;
      ecke.arcSclr = sClr;
      ecke.arcFclr = afClr;
    });

    this.seiten = {
      a: {
        label: 'a',
      },
      b: {
        label: 'b'
      },
      c: {
        label: 'c'
      }
    };
    Object.values(this.seiten).forEach((seite) => {
      seite.lClr = sClr;
      seite.sWght = sWght;
      seite.sClr = sClr;
    });

    this.ecken.A.seiten = {
      links: this.seiten.b,
      rechts: this.seiten.c
    };
    this.ecken.B.seiten = {
      links: this.seiten.c,
      rechts: this.seiten.a
    };
    this.ecken.C.seiten = {
      links: this.seiten.a,
      rechts: this.seiten.b
    };
    this.seiten.a.ecken = {
      links: this.ecken.B,
      rechts: this.ecken.C
    };
    this.seiten.b.ecken = {
      links: this.ecken.C,
      rechts: this.ecken.A
    };
    this.seiten.c.ecken = {
      links: this.ecken.A,
      rechts: this.ecken.B
    };
    this.get_laengen();
    this.get_area();
    this.get_angles();
    this.get_label_pos();
  }

  get_laengen() {
    Object.values(this.seiten).forEach((seite) => {
      seite.length = dist(seite.ecken.links.x, seite.ecken.links.y,
        seite.ecken.rechts.x, seite.ecken.rechts.y);
    });
  }

  get_area() {
    const al = this.seiten.a.length;
    const bl = this.seiten.b.length;
    const cl = this.seiten.c.length;
    const s = (al + bl +cl)/2;
    this.area = sqrt(s*(s-al)*(s-bl)*(s-cl));
//    print(this.area);
//    print(Math.abs((this.ecken.B.x - this.ecken.A.x) *
//      (this.ecken.C.y - this.ecken.A.y) -
//    (this.ecken.C.x - this.ecken.A.x) *
//      (this.ecken.B.y - this.ecken.A.y)) / 2);
  }
  
  //  get_angles0() {
  //    const a2 = this.laengen.a * this.laengen.a;
  //const b2 = this.laengen.b * this.laengen.b;
  //    const c2 = this.laengen.c * this.laengen.c;
  //    const rechneWinkel = (a2, b2, c2, b, c) => {
  //      return Math.acos((b2 + c2 - a2) / (2 * b * c));
  //    };
  //    this.winkel.a = rechneWinkel(a2, b2, c2, this.laengen.b, this.laengen.c);
  //    this.winkel.b = rechneWinkel(b2, a2, c2, this.laengen.a, this.laengen.c);
  //    this.winkel.c = rechneWinkel(c2, a2, b2, this.laengen.a, this.laengen.b);
  //  }

  get_angles() {
    Object.values(this.seiten).forEach((seite) => {
      seite.winkel = -Math.atan2(
        seite.ecken.rechts.y - seite.ecken.links.y,
        seite.ecken.rechts.x - seite.ecken.links.x);
      seite.sinWinkel = Math.sin(seite.winkel);
      seite.cosWinkel = Math.cos(seite.winkel);
    });
    Object.values(this.ecken).forEach((ecke) => {
      ecke.winkel = (PI - (ecke.seiten.rechts.winkel - ecke.seiten.links.winkel)) % (2 * PI);

      ecke.biSectorAng = -ecke.seiten.rechts.winkel - ecke.winkel / 2;
      ecke.biSectorAngSin = Math.sin(ecke.biSectorAng);
      ecke.biSectorAngCos = Math.cos(ecke.biSectorAng);
    });
  }

  get_label_pos() {
    const offs = this.radius * 2 / 3;
    const loffs = this.radius * 1 / 3;

    Object.values(this.ecken).forEach((ecke) => {
      ecke.anglLblPos = {
        x: ecke.biSectorAngCos * offs + ecke.x,
        y: ecke.biSectorAngSin * offs + ecke.y
      };
      ecke.labelPos = {
        x: -ecke.biSectorAngCos * loffs + ecke.x,
        y: -ecke.biSectorAngSin * loffs + ecke.y
      };
    });

    Object.values(this.seiten).forEach((seite) => {
      seite.centerPos = {
        x: (seite.ecken.links.x + seite.ecken.rechts.x) / 2,
        y: (seite.ecken.links.y + seite.ecken.rechts.y) / 2
      };
      seite.labelPos = {
        x: seite.sinWinkel * loffs + seite.centerPos.x,
        y: seite.cosWinkel * loffs + seite.centerPos.y
      };
    });
  }

  hover_ecke(x, y, radius = 10) {
    for (let e in this.ecken) {
      const ecke = this.ecken[e];
      if (dist(x, y, ecke.x, ecke.y) <= radius)
        return e;
    }
    return null;
  }

  move_ecke(e, x, y) {
    let ecke = this.ecken[e];
    const ox = ecke.x;
    const oy = ecke.y;
    ecke.x = x;
    ecke.y = y;
    this.get_angles();
    if (ecke.winkel < 0 || ecke.winkel > PI) {
      ecke.x = ox;
      ecke.y = oy;
      this.get_angles();
    }
    this.get_laengen();
    this.get_area();
    this.get_label_pos();
  }

  draw_sqAngle(e) {
    noFill();
//    stroke(0);
    const ecke = this.ecken[e];
    stroke(...ecke.arcSclr);
    const dx1 = -ecke.seiten.links.cosWinkel * this.radius;
    const x1 = ecke.x + dx1;
    const dy1 = ecke.seiten.links.sinWinkel * this.radius;
    const y1 = ecke.y + dy1;
    const x2 = ecke.seiten.rechts.cosWinkel * this.radius + ecke.x;
    const y2 = -ecke.seiten.rechts.sinWinkel * this.radius + ecke.y;
    const x3 = x2 + dx1;
    const y3 = y2 + dy1;
    line(x1, y1, x3, y3);
    line(x2, y2, x3, y3);
    point((ecke.x + x3) / 2, (ecke.y + y3) / 2);
  }

  draw_arcs(ecken = ['A', 'B', 'C']) {
    stroke(0);
    for (let e of ecken) {
      const ecke = this.ecken[e];
      strokeWeight(ecke.arcSwght);
      stroke(...ecke.arcSclr);
      fill(...ecke.arcFclr);
      arc(ecke.x, ecke.y, 2 * this.radius, 2 * this.radius,
        -ecke.seiten.links.winkel + PI, -ecke.seiten.rechts.winkel);
    }
  }

  draw_winkel_label(ecken = ['A', 'B', 'C']) {
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    for (let e of ecken) {
      const ecke = this.ecken[e];
      text(ecke.angLbl, ecke.anglLblPos.x, ecke.anglLblPos.y);
    }
  }

  draw_ecken_label(ecken = ['A', 'B', 'C']) {
    textAlign(CENTER, CENTER);
    for (let e of ecken) {
      const ecke = this.ecken[e];
      text(ecke.label, ecke.labelPos.x, ecke.labelPos.y);
    }
  }

  draw_seiten(seiten = ['a', 'b', 'c']) {
    for (let s of seiten) {
      const seite = this.seiten[s];
      stroke(...seite.sClr);
      strokeWeight(seite.sWght);
      line(seite.ecken.links.x, seite.ecken.links.y,
        seite.ecken.rechts.x, seite.ecken.rechts.y);
    }
  }

  draw_seiten_label(seiten = ['a', 'b', 'c']) {
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);

    for (let s of seiten) {
      const seite = this.seiten[s];
      text(seite.label, seite.labelPos.x, seite.labelPos.y);
    }
  }

  draw() {
    noStroke();
    fill(...this.fill);
    triangle(this.ecken.A.x, this.ecken.A.y,
      this.ecken.B.x, this.ecken.B.y,
      this.ecken.C.x, this.ecken.C.y);
  }
}
