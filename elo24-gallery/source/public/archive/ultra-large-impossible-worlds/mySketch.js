let t = 0;
let s = 256;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create a fullscreen canvas
  noStroke();
  texture(T = createGraphics(s, s));
  rotateX(-PI / 2);
}

function draw() {
  t++;

  // Scroll the texture pixels
  T.copy(0, 1, s, s, 0, 0, s, s);

  // Draw the cylinder
  cylinder(90, windowHeight * 0.8, 7, 1, 0, 0);

  // Draw the bottom line (T.texture)
  for (let x = s; x > 0; x--) {
    let col = abs(x - t ^ x + t) ** 3 % 495 & 5 ? color(139, 0, 0) : color(255); // Dark red and white colors
    T.stroke(col);
    T.point(x, s - 1);
  }

  texture(T);
}




