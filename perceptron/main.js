let basicAi = null;
let points = [];

const f = (x) => {
  return 0.5 * x + 0.3;
};

function setup() {
  createCanvas(800, 800);
  frameRate(10);
  basicAi = new Perceptron();

  for (i = 0; i <= 100; i++) {
    points[i] = new Point();
  }
}

function draw() {
  background(255);
  points.forEach((point) => {
    point.show();
  });

  // initial dividing line
  const p1 = new Point();
  const p2 = new Point();
  p1.create(-1, f(-1));
  p2.create(1, f(1));

  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());

  // ai guess line
  const p3 = new Point();
  p3.create(-1, basicAi.guessY(-1));
  const p4 = new Point();
  p4.create(1, basicAi.guessY(1));

  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());

  points.forEach((point) => {
    const inputs = [point.x, point.y, point.bias];
    const target = point.label;
    basicAi.train(inputs, target);

    const guess = basicAi.guess(inputs);

    guess === target ? fill(0, 255, 0) : fill(255, 0, 0);
    noStroke();
    ellipse(point.pixelX(), point.pixelY(), 16, 16);
  });
}
