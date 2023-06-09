require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const LinearRegression = require("./linear-regression");
const plot = require("node-remote-plot");

const loadCSV = require("../load-csv");

let { features, labels, testFeatures, testLabels } = loadCSV(
  "../data/cars.csv",
  {
    shuffle: true,
    splitTest: 50,
    dataColumns: ["horsepower", "weight", "displacement"],
    labelColumns: ["mpg"],
  }
);

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 3,
  batchSize: 10,
});

regression.train();

const r2 = regression.test(testFeatures, testLabels);

plot({
  x: regression.mseHistory.reverse(),
  xLabel: "Iteration number",
  yLabel: "Mean Squared Error",
});

console.log("R2 is ", r2);

regression
  .predict([
    [120, 2, 380],
    [135, 2.1, 420],
  ])
  .print();
