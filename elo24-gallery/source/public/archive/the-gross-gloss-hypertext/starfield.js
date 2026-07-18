let cvs;

let c = [];

function setup() {
  cvs = createCanvas(windowWidth/2, windowHeight/2);
  cvs.parent("sketch-container");

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



  for (let i = 0; i < 10000; i++) {
    fill(random(c));
    noStroke();
    circle(random(width), random(height), random(0.1, 0.4));
  }

  for (let i = 0; i < 5000; i++) {
    fill(random(c));
    noStroke();
    circle(random(width), random(height), random(0.6, 1));
  }

  for (let i = 0; i < 1000; i++) {
    fill(random(c));
    noStroke();
    circle(random(width), random(height), random(1, 3));
  }

  for (let i = 0; i < 3; i++) {
    fill(random(c));
    noStroke();
    circle(random(width), random(height), random(4, 5));
  }
}

function draw() {

}
