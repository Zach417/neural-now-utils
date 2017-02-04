var fs = require('fs');
var path = require('path');
var png = require('png-js');
var lwip = require('lwip');

function pathToVector (options) {
  lwip.open(options.path, function (err, image) {
    if (err) { throw err; }
    image.batch()
      .resize(options.width, options.height)
      .toBuffer("png", function (err, buffer) {
        if (err) { throw err; }
        var img = new png(buffer);
        img.decode(function (pixels) {
          options.callback(pixels);
        });
      });
  });
}

// Image data from HTML canvas
function imgDataToVector (options) {
  throw "Canvas data imput not implemented";
}

module.exports = function (options) {
  if (options.path) {
    pathToVector(options);
  } else if (options.data) {
    imgDataToVector(options);
  } else {
    throw "Parameter type not implemented";
  }
}
