const sigmoid = (x) => {
  return 1 / (1 + Math.exp(-x));
};

const derivSigmoid = (x) => {
  return sigmoid(x) * (1 - sigmoid(x));
};

const jankSigmoid = (y) => {
  return y * (1 - y);
};

class NeuralNetwork {
  inputNode;
  hiddenNode;
  outputNode;
  weightsInputHidden;
  weightsOutputHidden;
  biasHidden;
  biasOutput;
  learningRate;

  constructor(input, hidden, output) {
    this.inputNode = input;
    this.hiddenNode = hidden;
    this.outputNode = output;
    this.learningRate = 0.15;

    // setup weights
    this.weightsInputHidden = new Matrix(hidden, input);
    this.weightsHiddenOutput = new Matrix(output, hidden);

    // randomize initial weights
    this.weightsInputHidden.randomize();
    this.weightsHiddenOutput.randomize();

    // initialize bias
    this.biasHidden = new Matrix(hidden, 1);
    this.biasOutput = new Matrix(output, 1);
  }

  feedForward(data) {
    // set hidden outputs
    let input = Matrix.fromArray(data);
    let hidden = Matrix.multiply(this.weightsInputHidden, input);

    // apply bias
    hidden.add(this.biasHidden);

    // apply sigmoid
    hidden.map(sigmoid);

    // set output values
    let output = Matrix.multiply(this.weightsHiddenOutput, hidden);
    output.add(this.biasOutput);
    output.map(sigmoid);

    return output.toArray();
  }

  train(inputsArray, targetsArray) {
    // set hidden outputs
    let inputs = Matrix.fromArray(inputsArray);
    let hidden = Matrix.multiply(this.weightsInputHidden, inputs);

    // apply bias
    hidden.add(this.biasHidden);

    // apply sigmoid
    hidden.map(sigmoid);

    // set output values
    let outputs = Matrix.multiply(this.weightsHiddenOutput, hidden);
    outputs.add(this.biasOutput);
    outputs.map(sigmoid);

    // convert array to matrix
    let targets = Matrix.fromArray(targetsArray);

    // calculate the output error
    // Output Error = Targets - Outputs
    let outputError = Matrix.subtract(targets, outputs);

    // calculate gradient decent
    let outputGradients = Matrix.map(outputs, jankSigmoid);
    outputGradients.multiply(outputError);
    outputGradients.multiply(this.learningRate);

    // calculate hidden->output deltas'
    let hiddenTranspose = Matrix.transpose(hidden);
    let weightsHODeltas = Matrix.multiply(outputGradients, hiddenTranspose);

    // adjust hidden-output weights by deltas
    this.weightsHiddenOutput.add(weightsHODeltas);

    // adjust bias weights by deltas
    this.biasOutput.add(outputGradients);

    // calculate hidden layer errors
    let weightsHiddenOutputTranspose = Matrix.transpose(
      this.weightsHiddenOutput
    );
    let hiddenErrors = Matrix.multiply(
      weightsHiddenOutputTranspose,
      outputError
    );

    let hiddentGradient = Matrix.map(hidden, jankSigmoid);
    hiddentGradient.multiply(hiddenErrors);
    hiddentGradient.multiply(this.learningRate);

    // calculate input->hidden deltas
    let inputsTranspose = Matrix.transpose(inputs);
    let weightsInputHiddenDeltas = Matrix.multiply(
      hiddentGradient,
      inputsTranspose
    );

    // adjust input->hidden weights by deltas
    this.weightsInputHidden.add(weightsInputHiddenDeltas);

    // adjust bias weights by deltas
    this.biasHidden.add(hiddentGradient);
  }

  predict(arr) {
    const guess = this.feedForward(arr);

    console.log(this.biasHidden);
    console.log(this.biasOutput);

    return guess;
  }
}
