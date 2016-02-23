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

module.exports.train = function(trainData, callback) {
  var predict = function(row) {
    return 0;
  };

  return callback(null, predict);
};
