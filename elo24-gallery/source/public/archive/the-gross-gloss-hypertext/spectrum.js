let cvs;

let c = [];

let buff;

let xspacing = 2;
let w;
let theta = 0.0;
let speed = 0.05;
let amplitude = 100.0;
let period = 600.0;
let dx;
let y;
let iter = 0;

function setup() {
  cvs = createCanvas(420, 680);
  cvs.parent("sketch-container");
  buff = createGraphics(420, 680);


  w = width + xspacing;
  y = new Array(floor(w / xspacing));
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
}

function draw() {
  image(buff, 0, 0);
  renderWave();
}

function calcWave(p) {
  dx = (TWO_PI / p) * xspacing;


  theta += speed;
  let x = theta;
  for (let i = 0; i < y.length; i++) {
    y[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  colorMode(HSB);
  let c = iter;
  stroke(c, 100, 100);
  noFill();

  let mappedP;
  
  if (iter > 180) {
    mappedP = map(iter, 0, 180, 700, 400);
  } else {
    mappedP = map(iter, 181, 360, 400, 700);
  }

  calcWave(mappedP);

  beginShape();
  for (let x = 0; x < y.length; x++) {
    vertex(x * xspacing, ((height * 3) / 4) + y[x] - (amplitude * 1.2));
  }
  endShape();

  iter++;
  if (iter > 360) {
    iter = 0;
  }
}
