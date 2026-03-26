const tf = require("@tensorflow/tfjs");
const dataset = require("./dataset");
const vectorize = require("./vectorizer");

let model;

async function loadModel() {
  model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [50], units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  // Prepare training data
  const xs = dataset.map(d => vectorize(d.text));
  const ys = dataset.map(d => tf.oneHot(d.label, 3).arraySync());

  const xTensor = tf.tensor(xs);
  const yTensor = tf.tensor(ys);

  await model.fit(xTensor, yTensor, {
    epochs: 200,
    verbose: 0
  });

  console.log("✅ AI model trained");
}

async function predict(vector) {
  const pred = model.predict(tf.tensor([vector]));
  const index = pred.argMax(1).dataSync()[0];

  const labels = ["low", "medium", "high"];
  return labels[index];
}

module.exports = { loadModel, predict };
