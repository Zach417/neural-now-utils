var fs = require('fs');
var path = require('path');
var readline = require('readline');

module.exports = function (callback) {
  var unigramsPath = path.join(__dirname, '/../', '/dict/unigrams.txt');
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(unigramsPath)
  });

  var unigrams = [];
  lineReader.on('line', function (line) {
    unigrams.push(line);
  });

  lineReader.on('close', function () {
    callback(unigrams);
  });
}
