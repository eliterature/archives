let cvs;

let c = [];

let buff;

// rate of rotation
let rate = 0;

// 2021 volvelle chart variables
let pal = [];
let mesg = [];
let plain = [];
let signNames = [];
let calNames = [];
let rulerNames = [];
let dodecaNames = [];
let gems = [];
let texts = [];
let cx, cy;
let astro;
let dodecaI = 0;

function preload() {
  astro = loadFont("Astro.ttf");
}

function setup() {
  cvs = createCanvas(420, 680);
  cvs.parent("sketch-container");
  buff = createGraphics(420, 680);

/*

// http://www.vendian.org/mncharity/dir3/starcolor/

  O     155 176 255  "#9bb0ff"
  B     170 191 255  "#aabfff"
  A     202 215 255  "#cad7ff"
  F     248 247 255  "#f8f7ff"
  G     255 244 234  "#fff4ea"
  K     255 210 161  "#ffd2a1"
  M     255 204 111  "#ffcc6f"
*/

  c[0] = color("#9bb0ff");
  c[1] = color("#aabfff");
  c[2] = color("#cad7ff");
  c[3] = color("#f8f7ff");
  c[4] = color("#fff4ea");
  c[5] = color("#ffd2a1");
  c[6] = color("#ffcc6f");

  buff.background(0, 0.01);

  for (let i = 0; i < 10000; i++) {
    buff.fill(random(c));
    buff.noStroke();
    buff.circle(random(width), random(height), random(0.1, 0.4));
  }

  for (let i = 0; i < 5000; i++) {
    buff.fill(random(c));
    buff.noStroke();
    buff.circle(random(width), random(height), random(0.6, 1));
  }

  for (let i = 0; i < 1000; i++) {
    buff.fill(random(c));
    buff.noStroke();
    buff.circle(random(width), random(height), random(1, 3));
  }

  for (let i = 0; i < 3; i++) {
    buff.fill(random(c));
    buff.noStroke();
    buff.circle(random(width), random(height), random(4, 5));
  }

  // palette colors and corresponding signs
  pal[8] = color(136, 0, 0); // red / aries
  pal[9] = color(0, 204, 85); // green / taurus
  pal[10] = color(170, 255, 102); // lt. green / gemini
  pal[11] = color(255, 255, 255); // white / cancer
  pal[0] = color(238, 238, 119); // yellow / leo
  pal[1] = color(170, 255, 238); // cyan / virgo
  pal[2] = color(255, 119, 119); // lt. red / libra
  pal[3] = color(0, 0, 0); // black / scorpio
  pal[4] = color(0, 0, 170); // blue / sagitt
  pal[5] = color(221, 136, 85); // orange / capricorn
  pal[6] = color(0, 136, 255); // lt. blue / aquarius
  pal[7] = color(204, 68, 204); // violet / pisces

  pal.reverse();

  mesg[0] = "a";
  mesg[1] = "b";
  mesg[2] = "c";
  mesg[3] = "d";
  mesg[4] = "e";
  mesg[5] = "f";
  mesg[6] = "g";
  mesg[7] = "h";
  mesg[8] = "i";
  mesg[9] = "k";
  mesg[10] = "l";
  mesg[11] = "m";
  mesg[12] = "n";
  mesg[13] = "o";
  mesg[14] = "p";
  mesg[15] = "q";
  mesg[16] = "r";
  mesg[17] = "s";
  mesg[18] = "t";
  mesg[19] = "v";
  mesg[20] = "w";
  mesg[21] = "x";
  mesg[22] = "y";
  mesg[23] = "z";

  plain = [
    "QA",
    "RA",
    "QB",
    "RB",
    "QC",
    "RC",
    "QD",
    "RD",
    "QE",
    "RE",
    "QF",
    "RF",
    "QG",
    "RG",
    "QH",
    "RH",
    "QI",
    "RI",
    "QJ",
    "RJ",
    "QK",
    "RK",
    "QL",
    "RL",
  ];

  signNames[0] = "A";
  signNames[1] = "B";
  signNames[2] = "C";
  signNames[3] = "D";
  signNames[4] = "E";
  signNames[5] = "F";
  signNames[6] = "G";
  signNames[7] = "H";
  signNames[8] = "I";
  signNames[9] = "J";
  signNames[10] = "K";
  signNames[11] = "L";

  signNames.reverse();

  dodecaNames = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "H",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "I",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "K",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "L",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
  ];

  dodecaNames.reverse();

  calNames[0] = "Jan.";
  calNames[1] = "Febr.";
  calNames[2] = "March.";
  calNames[3] = "April.";
  calNames[4] = "May.";
  calNames[5] = "June.";
  calNames[6] = "July.";
  calNames[7] = "August.";
  calNames[8] = "Sept.";
  calNames[9] = "Oct.";
  calNames[10] = "Nov.";
  calNames[11] = "Dec.";

  calNames.reverse();

  rulerNames[0] = "Mars.";
  rulerNames[1] = "Venus.";
  rulerNames[2] = "Mercury.";
  rulerNames[3] = "Moon.";
  rulerNames[4] = "Sun.";
  rulerNames[5] = "Mercury.";
  rulerNames[6] = "Venus.";
  rulerNames[7] = "Mars.";
  rulerNames[8] = "Jupiter.";
  rulerNames[9] = "Saturn.";
  rulerNames[10] = "Saturn.";
  rulerNames[11] = "Jupiter.";

  rulerNames.reverse();

  gems[0] = "Jasper.";
  gems[1] = "Sapphire.";
  gems[2] = "Chalcedony.";
  gems[3] = "Emerald.";
  gems[4] = "Sardonyx.";
  gems[5] = "Ruby.";
  gems[6] = "Chrysolite.";
  gems[7] = "Beryl.";
  gems[8] = "Topaz.";
  gems[9] = "Chrysoprase.";
  gems[10] = "Jacinth.";
  gems[11] = "Amethyst.";

  gems.reverse();

  texts[0] = "Pearl.";
  texts[1] = "Cons.\nof Phil.";
  texts[2] = "De Re\nMetallica.";
  texts[3] = "Mirror of\nHum. Salv.";
  texts[4] = "New Dark\nAge.";
  texts[5] = "Panopticon.";
  texts[6] = "Brazen Head.";
  texts[7] = "Divine\nComedy.";
  texts[8] = "Loossbuch.";
  texts[9] = "Tres Riches\nHeures.";
  texts[10] = "Oneirocritica.";
  texts[11] = "Butterfly\nDream.";

  texts.reverse();

  cx = width / 2;
  cy = 0; // height / 2 + (240);

  // noSmooth();
}

function draw() {
  rate = frameCount / 10;

  image(buff, 0, 0);

  textFont(astro);
  // dodecatemoria
  drawDodecaMeter(680);
  fill(255);
  circle(cx, cy, 670);
  drawDodecaNames(670);
  fill(255);
  circle(cx, cy, 630);

  // signs
  drawSignMeter(630);
  circle(cx, cy, 620);
  drawSignNames(620);
  fill(255);
  circle(cx, cy, 580);

  textFont("Georgia");
  // calendar
  drawCalendarMeter(580);
  fill(255);
  circle(cx, cy, 570);
  drawCalendarNames(570);
  fill(255);
  circle(cx, cy, 526);

  // color
  drawColorCorrespondence(520);
  fill(255);
  circle(cx, cy, 460);

  // planetary ruler
  drawDetails(460, rulerNames, 8, 0);
  fill(255);
  circle(cx, cy, 420);

  // gemstone
  drawDetails(420, gems, 8, 0);
  fill(255);
  circle(cx, cy, 380);

  // text/citation
  drawDetails(380, texts, 11, 90);
  fill(255);
  circle(cx, cy, 220);

  drawCypher(220, 84);
  circle(cx, cy, 140);
  /*
  drawMovableCypher(140, 45);
  circle(cx, cy, 80);
  */
}

function drawSignMeter(volR) {
  for (let i = 0; i < 360; i++) {
    if (i % 2 == 0) {
      fill(0);
    } else {
      fill(255);
    }
    arc(cx, cy, volR, volR, radians(i + rate), radians(i + 1 + rate), PIE);
  }
}

function drawSignNames(r) {
  r = r / 2;
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let angle = radians(i * 30 + rate); // first number is offset in degrees
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - 20);
    let ty2 = cy + sin(angle) * (r - 20);
    line(tx1, ty1, tx2, ty2);
  }
  for (let i = 0; i < 36; i++) {
    let angle = radians(i * 10 + rate);
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - 10);
    let ty2 = cy + sin(angle) * (r - 10);
    line(tx1, ty1, tx2, ty2);
  }

  strokeWeight(1);
  fill(0);
  push();
  translate(cx, cy);
  rotate(radians(-2 + rate));
  for (let i = 0; i < 12; i++) {
    let newR = r - 11;
    rotate(radians(30));
    push();
    translate(newR * sin(0), newR * cos(0));
    rotate(TWO_PI);
    textSize(20);
    text(signNames[i], 0, 0);
    pop();
  }
  pop();
}

function drawDodecaMeter(volR) {
  for (let i = 0; i < 144; i++) {
    if (i % 2 == 0) {
      fill(0);
    } else {
      fill(255);
    }
    mappedI = map(i, 0, 144, 0, 360);
    arc(cx, cy, volR, volR, radians(mappedI + rate), radians(mappedI + 2.5 + rate), PIE);
  }
}

function drawDodecaNames(r) {
  r = r / 2;
  strokeWeight(2);
  for (let i = 0; i < 72; i++) {
    let angle = radians(i * 10 + rate); // first number is offset in degrees
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - 20);
    let ty2 = cy + sin(angle) * (r - 20);
    line(tx1, ty1, tx2, ty2);
  }
  for (let i = 0; i < 144; i++) {
    let angle = radians(i * 2.5 + rate);
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - 10);
    let ty2 = cy + sin(angle) * (r - 10);
    line(tx1, ty1, tx2, ty2);
  }

  let mappedC = 0;
  let cDelta = 1;

  strokeWeight(1);
  fill(0);
  push();
  translate(cx, cy);
  rotate(radians(-0.3 + rate));
  for (let i = 0; i < 144; i++) {
    let newR = r - 8;
    rotate(radians(2.5));
    push();
    translate(newR * sin(0), newR * cos(0));
    rotate(TWO_PI);
    textSize(12);
    text(dodecaNames[i], 0, 0);
    pop();

    newR = r + 6;
    push();
    translate(newR * (sin(0)), (newR * (cos(0.0))));
    if (mappedC >= (c.length - 1)) {
      cDelta = -1;
    } else if (mappedC <= 0) {
      cDelta = 1;
    }

    mappedC = mappedC + cDelta;

    fill(c[mappedC]);
    stroke(0);
    beginShape();
    let yCtrlA = 10;
    let yCtrlB = 30;
    let yCtrlC = 50;

    vertex(10, 0);

    bezierVertex( 5, yCtrlA,  5, yCtrlA,  5, 20);
      bezierVertex( 5, yCtrlB,  8, yCtrlB,  8, 40);
        bezierVertex( 8, yCtrlC,  0, yCtrlC,  0, 70);
      bezierVertex( -8,  yCtrlC, 0, yCtrlC,  0, 40);
    bezierVertex(  0, yCtrlB, -5, yCtrlB, -5, 20);

    bezierVertex(-5, yCtrlA, -7, yCtrlA, -7,  0);

    // vertex(-10, 0);
    endShape();

    let debug = false;

    if (debug) {
      fill(127, 127);
      quad(-10, 0, 10, 0, 10, 80, -10, 80);

      stroke(0, 255, 0);
      line(-10, 0, 10, 0);
      line(-10, 20, 10, 20);
      line(-10, 40, 10, 40);
      line(-10, 60, 10, 60);


      stroke(255, 0, 0);
      line(0, 0, 0, 80);
    }

    /* old shape
    beginShape();
    curveVertex(-10, 0);
    curveVertex(-10, 0);
    curveVertex(-3, 20);
    curveVertex(-7, 40);
    curveVertex(-1, 55);
    curveVertex(-2, 67);
    curveVertex(1, 80);
    curveVertex(1, 65);
    curveVertex(6, 55);
    curveVertex(2, 40);
    curveVertex(10, 20);
    curveVertex(12, 0);
    curveVertex(12, 0);
    endShape();
    */
    pop();
  }
  pop();
}

function drawCalendarMeter(volR) {
  for (let i = 0; i < 365; i++) {
    if (i % 2 == 0) {
      fill(0);
    } else {
      fill(255);
    }
    mappedI = map(i, 1, 365, 0, 360);
    arc(cx, cy, volR, volR, radians(mappedI + rate), radians(mappedI + 1 + rate), PIE);
  }
}

function drawCalendarNames(r) {
  r = r / 2;
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let angle = radians(i * 30 - 15 + rate); // first number is offset in degrees
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - 20);
    let ty2 = cy + sin(angle) * (r - 20);
    line(tx1, ty1, tx2, ty2);
  }
  for (let i = 0; i < 36; i++) {
    let angle = radians(i * 10 - 15 + rate);
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - 10);
    let ty2 = cy + sin(angle) * (r - 10);
    line(tx1, ty1, tx2, ty2);
  }

  strokeWeight(1);
  fill(0);
  push();
  translate(cx, cy);
  rotate(radians(74 + rate));
  for (let i = 0; i < 12; i++) {
    let newR = r - 8;
    rotate(radians(30));
    push();
    translate(newR * sin(0), newR * cos(0));
    rotate(TWO_PI - 0.05);
    textSize(10);
    text(calNames[i], 0, 0);
    pop();
  }
  pop();
}

function drawColorCorrespondence(volR) {
  let offset = -30;
  for (let i = 0; i < 12; i++) {
    fill(pal[i]);
    arc(cx, cy, volR, volR, radians(offset + i * 30 + rate), radians(i * 30 + rate), PIE);
  }
}

function drawDetails(r, nameArray, radOff, textRot) {
  r = r / 2;
  let d = 20;
  if (textRot == 90) {
    textAlign(RIGHT, CENTER);
    d = 80;
  } else {
    textAlign(CENTER, CENTER);
  }
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let angle = radians(i * 30 + rate); // first number is offset in degrees
    let tx1 = cx + cos(angle) * r;
    let ty1 = cy + sin(angle) * r;
    let tx2 = cx + cos(angle) * (r - d);
    let ty2 = cy + sin(angle) * (r - d);
    line(tx1, ty1, tx2, ty2);
  }

  strokeWeight(1);
  fill(0);
  push();
  translate(cx, cy);

  rotate(radians(-15 + rate));
  for (let i = 0; i < 12; i++) {
    let newR = r - radOff;
    rotate(radians(30));
    push();
    translate(newR * sin(0), newR * cos(0));
    rotate(radians(textRot));
    textSize(10);
    text(nameArray[i], 0, 0);
    pop();
  }
  pop();
  textAlign(LEFT, CENTER);
}

function drawCypher(r, textR) {
  for (let i = 0; i < 24; i++) {
    fill(255);
    arc(cx, cy, r, r, radians(-15 + i * 15 + rate), radians(i * 15 + rate), PIE);

    push();
    fill(0);
    translate(cx, cy);
    rotate(radians(-7.5 + i * 15 + rate));
    text(mesg[i], textR, 0);
    pop();
  }
}

function drawMovableCypher(r, textR) {
  push();
  translate(cx, cy);
  rotate(radians(mouseY + 2.5));
  translate(70 * sin(0), 70 * cos(0));
  scale(1, 3);
  beginShape();
  curveVertex(-10, 0);
  curveVertex(-10, 0);
  curveVertex(-3, 20);
  curveVertex(-7, 40);
  curveVertex(-1, 55);
  curveVertex(-2, 67);
  curveVertex(0, 80);
  curveVertex(1, 90);
  curveVertex(2, 80);
  curveVertex(1, 65);
  curveVertex(6, 55);
  curveVertex(2, 40);
  curveVertex(10, 20);
  curveVertex(12, 0);
  curveVertex(12, 0);
  endShape();
  pop();

  for (let i = 0; i < 24; i++) {
    fill(255);
    arc(
      cx,
      cy,
      r,
      r,
      radians(-15 + i * 15 + mouseY),
      radians(i * 15 + mouseY),
      PIE
    );

    push();
    fill(0);
    translate(cx, cy);
    rotate(radians(-7.5 + i * 15 + mouseY));
    textFont(astro);
    text(plain[i], textR, 0);
    textFont("Georgia");
    pop();
  }
}
