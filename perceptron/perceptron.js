class Perceptron {
  weights = [0, 0, 0];
  p = null;
  lr = 0.05;

  constructor() {
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  guess(inputs) {
    let sum = 0;
    this.weights.forEach((weight, idx) => {
      sum += inputs[idx] * weight;
    });

    return this.activate(sum);
  }

  guessY(x) {
    const w0 = this.weights[0];
    const w1 = this.weights[1];
    const w2 = this.weights[2];

    return -(w2 / w1) - (w0 / w1) * x;
  }

  activate(number) {
    return number >= 0 ? 1 : -1;
  }

  train(inputs, target) {
    let guess = this.guess(inputs);
    let error = target - guess;

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.lr;
    }
  }
}

class Point {
  x = random(-1, 1);
  y = random(-1, 1);
  label = null;
  bias = 1;

  constructor() {
    const lineY = f(this.x);
    this.label = this.y > lineY ? 1 : -1;
  }

  create(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  pixelX() {
    return map(this.x, -1, 1, 0, width - 20);
  }

  pixelY() {
    return map(this.y, -1, 1, height - 20, 0);
  }

  show() {
    const px = this.pixelX();
    const py = this.pixelY();
    stroke(0);
    this.label === 1 ? fill(255) : fill(0);
    ellipse(px, py, 32, 32);
  }
}
