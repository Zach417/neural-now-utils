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
  size: [32, 32, 3],
  path: __dirname + "/test.jpg",
  callback: function (vol) {
    console.log(vol.w.length);
  },
});
