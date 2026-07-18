let cvs;

let c = [];

let buff;

let column;

let font;

let x = 80;

function preload() {
  column = loadModel('column.obj');
}

function setup() {
  cvs = createCanvas(420, 680, WEBGL);
  cvs.parent("sketch-container");
  buff = createGraphics(420, 680);


  c[0] = color("#9bb0ff");
  c[1] = color("#aabfff");
  c[2] = color("#cad7ff");
  c[3] = color("#f8f7ff");
  c[4] = color("#fff4ea");
  c[5] = color("#ffd2a1");
  c[6] = color("#ffcc6f");

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
    buff.circle(random(width), random(height), random(1, 2));
  }

  for (let i = 0; i < 3; i++) {
    buff.fill(random(c));
    buff.noStroke();
    buff.circle(random(width), random(height), random(4, 3));
  }
}

function draw() {
  background(0);

  push();
    texture(buff);
    let factor = 6;
    translate(0, 0, -(factor * 90));
    scale(2);
    plane(width, height);
  pop();

  push();
    fill("#BBBBBB");
    translate(0, 120, -200);
    rotateX(radians(90));
    scale(factor);
    plane(40, 200);
  pop();

  x = x + 5;

  if (x >= 360) {
    x = 0;
  }

  let colorIndex = int(map(x, 0, 360, 0, c.length));

  let locX = cos(radians(x)) * 100;
  let locZ = -90 + (sin(radians(x)) * 100);

  ambientLight(30, 30, 30);
  directionalLight(c[5], locX, 0, locZ);
  noStroke();
  drawColumns();
}

function drawColumns() {
  let c64cA = [];
  let c64cB = [];

  c64cA[0] = color("#1A1A1A");
  c64cA[1] = color("#FFFFFF");
  c64cA[2] = color("#880000");
  c64cA[3] = color("#AAFFEE");
  c64cA[4] = color("#CC44CC");
  c64cA[5] = color("#00CC55");
  c64cA[6] = color("#0000AA");
  c64cA[7] = color("#EEEE77");

  c64cB[0] = color("#DD8855");
  c64cB[1] = color("#664400");
  c64cB[2] = color("#FF7777");
  c64cB[3] = color("#333333");
  c64cB[4] = color("#777777");
  c64cB[5] = color("#AAFF66");
  c64cB[6] = color("#0088FF");
  c64cB[7] = color("#BBBBBB");

  for (let i = 0; i < 8; i++) {
    let zoff = 90 - (i * 90);
    let xoff = 160;

    push();
    translate(xoff, -130, zoff);
      scale(19);
      fill(c64cA[i]);
      model(column);
    pop();

    push();
      translate(-xoff, -130, zoff);
      scale(19);
      fill(c64cB[i]);
      model(column);
    pop();
  }
}
