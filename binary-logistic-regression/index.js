require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("../load-csv");
const LogisticRegression = require("./logistic-regression");

const plot = require("node-remote-plot");

const { features, labels, testFeatures, testLabels } = loadCSV(
  "../data/cars.csv",
  {
    dataColumns: ["horsepower", "displacement", "weight"],
    labelColumns: ["passedemissions"],
    shuffle: true,
    splitTest: 50,
    converters: {
      passedemissions: (value) => (value === "TRUE" ? 1 : 0),
    },
  }
);

const regression = new LogisticRegression(features, labels, {
  learningRate: 0.5,
  iterations: 40,
  batchSize: 10,
  decisionBoundary: 0.5,
});

regression.train();
console.log(regression.test(testFeatures, testLabels));

plot({
  x: regression.costHistory.reverse(),
});
// regression.predict([[130, 307, 1.75]]).print(); // false < 0.5
// regression.predict([[88, 97, 1.065]]).print(); // true > 0.5
