var fs = require('fs');
var path = require('path');
var cnn = require('neural-now-cnn');
var png = require('png-js');
var jpg = require('jpeg-js');
var resize = require('./resizeArray');

function getVol (width, height, depth, x, normalize) {
  var vol = new cnn.vol(width, height, depth, 0);
  for (var dc = 0; dc < depth; dc++) {
    var i = 0;
    for(var xc = 0; xc < width; xc++) {
      for(var yc = 0; yc < height; yc++) {
        var ix = i * 4 + dc;
        if (normalize === true) {
          vol.set(yc, xc, dc, ((x[ix] / 255.0) - 0.5));
        } else {
          vol.set(yc, xc, dc, x[ix]);
        }
        i++;
      }
    }
  }

  return vol;
}

function resizeToVector (options) {
  var width = options.size[0];
  var height = options.size[1];
  var depth = options.size[2];

  if (options.data) {
    var fromWidth = options.fromSize[0];
    var fromHeight = options.fromSize[1];

    var inputPixels = options.data;
    var outputPixels = resize({
      src: inputPixels,
      width: fromWidth,
      height: fromHeight,
      toWidth: width,
      toHeight: height,
      alpha: true,
    });

    var vol = getVol(width, height, depth, outputPixels, options.normalize);
    options.callback(Array.prototype.slice.call(vol.w));
  } else if (options.path) {
    // must require here for front-end/browser support
    var sizeOf = require('image-size');
    var imageData = fs.readFileSync(options.path);
    var fromSize = sizeOf(options.path);

    if (options.path.endsWith(".jpg")) {
      var inputPixels = jpg.decode(imageData, true).data;
      var outputPixels = resize({
        src: inputPixels,
        width: fromSize.width,
        height: fromSize.height,
        toWidth: width,
        toHeight: height,
        alpha: true,
      });

      var vol = getVol(width, height, depth, outputPixels, options.normalize);
      options.callback(Array.prototype.slice.call(vol.w));
    } else if (options.path.endsWith(".png")) {
      var imageBuffer = new png(imageData);
      imageBuffer.decode(function (inputPixels) {
        var outputPixels = resize({
          src: inputPixels,
          width: fromSize.width,
          height: fromSize.height,
          toWidth: width,
          toHeight: height,
          alpha: true,
        });

        var vol = getVol(width, height, depth, outputPixels, options.normalize);
        options.callback(Array.prototype.slice.call(vol.w));
      });
    }
  }
}

module.exports = resizeToVector;
