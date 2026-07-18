let cvs;

let c = [];

let buff;

let o;

function preload() {
  o = loadModel('head.obj');
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
    buff.circle(random(width), random(height), random(1, 3));
  }

  for (let i = 0; i < 3; i++) {
    buff.fill(random(c));
    buff.noStroke();
    buff.circle(random(width), random(height), random(4, 5));
  }
}

function draw() {
  background(0);
  texture(buff);
  plane(width, height);

  push();
  translate(0, 0, 100);

  directionalLight(255, 255, 255, -0.25, 1, 0);
  ambientLight(20, 20, 20);

  rotateY(frameCount * 0.01);
  rotateZ(radians(180));

  noStroke();
  specularMaterial(72, 45, 20);
  shininess(10);
  scale(5);
  model(o);
  pop();
}
