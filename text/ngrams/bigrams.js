var fs = require('fs');
var path = require('path');
var readline = require('readline');

module.exports = function (callback) {
  var bigramsPath = path.join(__dirname, '/../', '/dict/bigrams.txt');
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(bigramsPath)
  });

  var bigrams = [];
  lineReader.on('line', function (line) {
    bigrams.push(line);
  });

  lineReader.on('close', function () {
    callback(bigrams);
  });
}
