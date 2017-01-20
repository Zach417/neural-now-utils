var ngrams = require('./ngrams');
var utils = require('./utils');

var textUtils = {
  ngrams: ngrams,
  toUnigramVector: function (corpus, callback) {
    ngrams.unigrams(function (bigrams) {
      var vector = [];
      for (var i = 0; i < bigrams.length; i++) {
        var count = utils.countChar(bigrams[i], corpus);
        vector.push(count);
      }
      callback(vector);
    });
  },
  toBigramVector: function (corpus, callback) {
    ngrams.bigrams(function (bigrams) {
      var vector = [];
      for (var i = 0; i < bigrams.length; i++) {
        var count = utils.countChar(bigrams[i], corpus);
        vector.push(count);
      }
      callback(vector);
    });
  },
}

module.exports = textUtils;
