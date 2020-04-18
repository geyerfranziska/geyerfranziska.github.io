let circleAreaPiePlot = function (p) {
  let r;
let anzahlSlice;
let cx;
let cy;
let sliceSlider;

let clr1 = [49, 54, 149];
let clr2 = [215, 48, 39];

let clrH1, clrH2;

p.setup = function () {
  let myCanvas = p.createCanvas(740, 300);
  //myCanvas.parent("p5Container2");
  r = p.height * 40 / 100;
  cx = 10 + r;
  cy = p.height / 2;
  sliceSlider = p.createSlider(6, 96, 12, 2);
  const c1 = p.color(...clr1);
  clrH1 = [p.hue(c1), p.saturation(c1), p.brightness(c1)];
  const c2 = p.color(...clr2);
  clrH2 = [p.hue(c2), p.saturation(c2), p.brightness(c2)];
  p.colorMode(HSB);
}

p.draw = function () {
  p.background(220);
  anzahlSlice = sliceSlider.value();

  p.fill(255);
  p.stroke(0);
  p.circle(cx, cy, 2 * r);

  let sliceAngle = p.TWO_PI / anzahlSlice;

  let slcClrs1 = [];
  for (let i = anzahlSlice / 2; i < anzahlSlice; i++) {
    const brghtn = p.map(i, anzahlSlice / 2, anzahlSlice - 1, clrH1[2], 100);
    const sat = p.map(i, anzahlSlice / 2, anzahlSlice - 1, clrH1[1], 10);
    slcClrs1.push([clrH1[0], sat, brghtn]);
  }

  let slcClrs2 = [];
  for (let i = 0; i < anzahlSlice / 2; i++) {
    const brghtn = p.map(i, 0, anzahlSlice / 2 - 1, clrH2[2], 100);
    const sat = p.map(i, 0, anzahlSlice / 2 - 1, clrH2[1], 10);
    slcClrs2.push([clrH2[0], sat, brghtn]);
  }

  //  print(clrH2[2]);
  for (let i = 0; i < anzahlSlice / 2; i++) {
    p.fill(...slcClrs2[i]);
    p.arc(cx, cy, 2 * r, 2 * r, i * sliceAngle, i * sliceAngle + sliceAngle, p.PIE);
  }
  for (let i = anzahlSlice / 2; i < anzahlSlice; i++) {
    p.fill(...slcClrs1[i - anzahlSlice / 2]);
    p.arc(cx, cy, 2 * r, 2 * r, i * sliceAngle, i * sliceAngle + sliceAngle, p.PIE);
  }

  let sliceWidth = 2 * Math.sin(sliceAngle / 2) * r;
  let sliceHeight = Math.cos(sliceAngle / 2) * r;

  for (let i = 0; i < anzahlSlice / 2; i++) {
    let x = 10 + 2 * r + 100 + i * sliceWidth;
    let y = p.height / 3 * 2;
    p.fill(...slcClrs1[i]);
    p.arc(x, y, 2 * r, 2 * r, p.PI + p.HALF_PI - sliceAngle / 2, p.PI + p.HALF_PI + sliceAngle / 2, p.PIE);
  }
  for (let i = 0; i < anzahlSlice / 2; i++) {
    let x = 10 + 2 * r + 100 + i * sliceWidth + sliceWidth / 2;
    let y = p.height / 3 * 2 - sliceHeight;
    p.fill(...slcClrs2[i]);
    p.arc(x, y, 2 * r, 2 * r, p.HALF_PI - sliceAngle / 2, p.HALF_PI + sliceAngle / 2, p.PIE);
  }
  const x = 10 + 2 * r + 100 - sliceWidth/2;
  const y = p.height / 3 * 2 - r;
  p.line(x, y-10, x + p.PI * r, y-10);

  let yv = y + r - sliceHeight;
  p.line(x-10, yv, x -10, yv + r);
  
  p.noStroke();
  p.fill(0);
  p.textSize(16);
  p.textAlign(p.CENTER,p.BOTTOM);
  p.text("halber Umfang = r·π", x + p.PI*r/2,y-12);
  p.textAlign(p.RIGHT,p.CENTER);
  p.text("r", x-16,y+r/2);
  p.textAlign(p.CENTER,p.CENTER);
  p.textSize(18);
  p.text("A = r·π·r = r²·π", x + p.PI*r/2,p.height*4/5);
}
}
let caP5 = new p5(circleAreaPiePlot, "p5Container2");
