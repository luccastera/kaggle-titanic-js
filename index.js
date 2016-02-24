var csvParse = require('csv-parse'),
    fs = require('fs'),
    async = require('async'),
    ML = require('./ml.js');

var trainData, testData;

async.waterfall([

  // Step 1: read the training data
  function(callback) {
    console.log('Reading training data...');
    fs.readFile('./data/train.csv', 'utf8', function(err, trainDataStr) {
      if (err) {
        return callback(err);
      } else {
        csvParse(trainDataStr, {delimiter: ',', auto_parse: true}, callback);
      }
    });
  },

  // Step 2: read the test data
  function(data, callback) {
    trainData = data;

    console.log('Reading test data...');
    fs.readFile('./data/test.csv', 'utf8', function(err, testDataStr) {
      if (err) {
        return callback(err);
      } else {
        csvParse(testDataStr, {delimiter: ',', auto_parse: true}, callback);
      }
    });
  },

  // Step 3: train your algorithm.
  function (data, callback) {
    testData = data;

    console.log('Training algorithm...');
    ML.train(trainData, callback);
  },

  // Step 4: use your new prediction function on the test data
  function (predict, callback) {

    var results = [['PassengerId', 'Survived']];

    console.log('Making predictions...');
    testData.forEach(function(row, index) {
      if (index !== 0) {
        results.push ( [ testData[index][0], predict(testData[index]) ] );
      }
    });

    return callback(null, results);
  },

  // Step 5: write a new CSV file with your results
  function (results, callback) {
    console.log('Writing results to ./data/results.csv ...');
    var wstream = fs.createWriteStream('./data/results.csv');
    results.forEach(function(row, index) {
      wstream.write(row.join(','));
      wstream.write('\n');
    });
    wstream.end();

    return callback();
  }

], function(err, results) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('==== Done! ====');
    console.log(' => Your file can be find in data/results.csv.');
  }
});
