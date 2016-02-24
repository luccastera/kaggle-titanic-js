// The train function callback should be called with two arguments:
//     - an error object as the first argument if any error occurs
//     - a prediction function that can be used to make prediction
//       on data with a similar row format.
//
//   Examples:
//      if there is an error: 
//              return callback(new Error('boom!'));
//
//      if there are no errors:
//              return callback(null, myPredictionFunction);
//
//   The prediction function should take one argument and return one value.
//   The value should be 1 if the passenger survived, zero otherwise.
//
//   As an example, the train function below always predicts that a passenger
//   always dies. It does not even use the training data.


var brain = require('brain'),
    net = new brain.NeuralNetwork({
      hiddenLayers: [4],
      learningRate: 0.6
    });


module.exports.train = function(trainData, callback) {

  var cleanedData = [];

  trainData.forEach(function(row, index) {
    if (index !== 0) {
      cleanedData.push(
        {
          input: [
            (row[2] / 3), // class
            row[4] == 'male' ? 0 : 1, // Sex
            (row[5] == '' ? 40 : row[5]) / 80 // Age
          ],
          output: [trainData[index][1]]
        }
      );
    }
  });

  //console.log('brain input = ', cleanedData);

  var trainingInfo = net.train(cleanedData, {
    iterations: 50000
  });

  var predict = function(row) {
    var input = [
      (row[1] / 3),
      row[3] == 'male' ? 0 : 1,
      (row[4] == '' ? 40 : row[4]) / 80
    ];
    var output = net.run(input);
    console.log(input, ' => ', output);
    return (output > 0.95) ? 1 : 0;
  };

  console.log('trainingInfo', trainingInfo);

  return callback(null, predict);
};
