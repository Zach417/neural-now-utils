var fs = require('fs');
var path = require('path');
var cnn = require('neural-now-cnn');
var png = require('png-js');
var lwip = require('lwip');

function getVol (width, height, depth, x) {
  var vol = new cnn.vol(width, height, depth, 0);

  var j = 0;
  for(var dc = 0; dc < depth; dc++) {
    var i = 0;
    for(var xc = 0; xc < width; xc++) {
      for(var yc = 0; yc < height; yc++) {
        var ix = i * 4 + dc;
        vol.set(yc, xc, dc, (x[ix] / 255.0 - 0.5));
        i++;
      }
    }
  }

  return vol;
}

function pathToVector (options) {
  var width = options.size[0];
  var height = options.size[1];
  var depth = options.size[2];

  lwip.open(options.path, function (err, image) {
    if (err) { throw err; }
    image.batch()
      .resize(width, height)
      .toBuffer("png", function (err, buffer) {
        if (err) { throw err; }
        var img = new png(buffer);
        img.decode(function (pixels) {
          var vol = getVol(width, height, depth, pixels);
          options.callback(vol);
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
