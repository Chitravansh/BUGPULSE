const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

function vectorize(text) {
  const words = tokenizer.tokenize(text.toLowerCase());
  const vector = new Array(50).fill(0);

  words.forEach((w, i) => {
    if (i < 50) vector[i] = w.length;
  });

  return vector;
}

module.exports = vectorize;
