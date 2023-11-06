let r;
let g;
let b;

let nn;
let better = "black";

const pickColour = () => {
  r = random(255);
  g = random(255);
  b = random(255);
};

const normalizeColour = (r, g, b) => {
  return [r / 255, g / 255, b / 255];
};

const createTrainingData = () => {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let answer = r + g + b > 300 ? [1, 0] : [0, 1];
  let inputs = normalizeColour(r, g, b);

  nn.train(inputs, answer);
};

function mousePressed() {
  pickColour();
  redraw();
}

const colourPredictor = (r, g, b) => {
  let inputs = normalizeColour(r, g, b);
  let outputs = nn.predict(inputs);

  console.log(outputs);

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white";
  }
};

function setup() {
  nn = new NeuralNetwork(3, 3, 2);
  createCanvas(600, 300);
  pickColour();
  noLoop();

  for (let i = 0; i < 10000; i++) {
    createTrainingData();
  }
}

function draw() {
  background(r, g, b);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 0, width / 2, height);
  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 150, 150);
  fill(255);
  text("white", 450, 150);
  better = colourPredictor(r, g, b);
  if (better === "black") {
    fill(0);
    ellipse(150, 200, 30);
  } else {
    fill(255);
    ellipse(450, 200, 30);
  }
}
