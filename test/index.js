var Utils = require('../index');

Utils.Text.toBigramVector("test", function (vector) {
  for (var i = 0; i < vector.length; i ++) {
    if (vector[i] > 0) {
      console.log(i, vector[i]);
    }
  }
  console.log(vector.length);
});

Utils.Image.resizeToVector({
  width: 32,
  height: 32,
  path: __dirname + "/test.jpg",
  callback: function (vector) {
    console.log(vector.length);
    console.log(vector[0], vector[1], vector[2],  vector[3]);
  },
});
