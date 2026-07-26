(function () {
  var canvas = document.getElementById("dayNightCanvas");
  if (!canvas) {
    return;
  }

  var ctx = canvas.getContext("2d");

  var sky_Color = -16, nord = 0;
  var switchyeah = 27, switchoh = 35, temp = 0;

  var grassstroke = [56, 115, 31];
  var grasscolor = [20, 143, 8];
  var chimneystroke = [227, 158, 54];
  var chimneyfill = [230, 197, 97];
  var chimneytop = [94, 42, 20];
  var housecolor = [230, 197, 97];
  var roofcolor = [120, 80, 24];
  var windowfill = [0, 150, 213];
  var doorcolor = [84, 51, 14];
  var staircolor = [122, 122, 122];
  var pathwaycolor = [232, 195, 135];
  var treecolor = [24, 94, 24];
  var treebranchcolor = [115, 62, 9];
  var clouds = [51, 51, 51];
  var bush = [23, 87, 7];

  var sunPosy = 400;
  var moonPosy = 400;
  var leftX = 312, rightX = 144;

  function clamp(v) {
    if (v < 0) {
      return 0;
    }
    if (v > 255) {
      return 255;
    }
    return v;
  }

  function fillRGB(c) {
    ctx.fillStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
  }

  function strokeRGB(c) {
    ctx.strokeStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
  }

  function drawEllipse(x, y, w, h, doFill, doStroke) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
    if (doFill !== false) {
      ctx.fill();
    }
    if (doStroke === true) {
      ctx.stroke();
    }
  }

  function stars() {
    strokeRGB([161, 161, 161]);
    ctx.lineWidth = 3;
    var pts = [
      [213, 237], [88, 262], [64, 291], [92, 30], [378, 19], [48, 27], [28, 219],
      [57, 117], [362, 22], [362, 169], [197, 24], [376, 295], [252, 50], [329, 134],
      [301, 76], [278, 151], [324, 39], [174, 50], [100, 100], [129, 70], [61, 53],
      [35, 116], [66, 160], [165, 200], [157, 128], [147, 170], [285, 187], [172, 272],
      [348, 279], [121, 100], [278, 248], [302, 314], [138, 22], [293, 125], [223, 51],
      [291, 23], [127, 124], [194, 96]
    ];

    for (var i = 0; i < pts.length; i += 1) {
      ctx.beginPath();
      ctx.arc(pts[i][0], pts[i][1], 1.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function windowglass(posx, posy) {
    fillRGB(windowfill);
    strokeRGB([212, 182, 212]);
    ctx.lineWidth = 1;

    ctx.fillRect(posx, posy, 32, 18);
    ctx.strokeRect(posx, posy, 32, 18);
    ctx.fillRect(posx, posy + 18, 16, 18);
    ctx.strokeRect(posx, posy + 18, 16, 18);
    ctx.fillRect(posx + 16, posy + 18, 16, 18);
    ctx.strokeRect(posx + 16, posy + 18, 16, 18);

    fillRGB([31, 66, 171]);
    ctx.fillRect(posx - 16, posy, 16, 36);
    ctx.fillRect(posx + 32, posy, 16, 36);

    fillRGB([29, 51, 130]);
    ctx.fillRect(posx - 13, posy + 3, 10, 13);
    ctx.fillRect(posx + 35, posy + 3, 10, 13);
    ctx.fillRect(posx - 13, posy + 19, 10, 13);
    ctx.fillRect(posx + 35, posy + 19, 10, 13);
  }

  function drawPolygon(points) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawScene() {
    if (nord === 1) {
      temp = 0;
      sky_Color = 162;
      grassstroke = [68, 140, 39];
      grasscolor = [20, 143, 8];
      chimneystroke = [227, 158, 54];
      chimneyfill = [230, 197, 97];
      chimneytop = [94, 42, 20];
      housecolor = [230, 197, 97];
      roofcolor = [120, 80, 24];
      windowfill = [77, 103, 112];
      doorcolor = [84, 51, 14];
      staircolor = [122, 122, 122];
      pathwaycolor = [232, 195, 135];
      treecolor = [24, 94, 24];
      treebranchcolor = [115, 62, 9];
      clouds = [219, 219, 219];
      bush = [39, 212, 0];
    } else if (nord === 0) {
      sky_Color = -16;
      grassstroke = [16, 28, 11];
      grasscolor = [6, 48, 1];
      chimneystroke = [46, 33, 13];
      chimneyfill = [110, 94, 44];
      chimneytop = [69, 28, 12];
      housecolor = [110, 94, 44];
      roofcolor = [69, 45, 15];
      windowfill = [255, 238, 0];
      doorcolor = [54, 32, 9];
      staircolor = [64, 64, 64];
      pathwaycolor = [69, 57, 39];
      treecolor = [11, 38, 11];
      treebranchcolor = [46, 25, 4];
      clouds = [51, 51, 51];
      bush = [23, 87, 7];
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0," + clamp(sky_Color) + "," + clamp(sky_Color + 63) + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (nord === 0) {
      stars();
    }

    fillRGB([255, 230, 0]);
    drawEllipse(345, sunPosy, 80, 80);

    fillRGB([224, 224, 224]);
    drawEllipse(345, moonPosy, 80, 80);
    fillRGB([99, 99, 99]);
    fillRGB([204, 204, 204]);
    drawEllipse(575, moonPosy, 26, 21);
    drawEllipse(365, moonPosy, 26, 18);
    drawEllipse(330, moonPosy + 24, 20, 13);
    drawEllipse(356, moonPosy - 22, 12, 8);
    drawEllipse(322, moonPosy - 6, 13, 9);

    if (leftX > -99) {
      leftX -= 0.6;
    } else {
      leftX = 500;
    }

    if (rightX < 500) {
      rightX += 0.5;
    } else {
      rightX = -100;
    }

    fillRGB(clouds);
    drawEllipse(leftX, 33, 127, 23);
    drawEllipse(leftX + 62, 35, 76, -15);
    drawEllipse(leftX - 62, 33, 70, 14);
    drawEllipse(rightX, 100, 126, 33);
    drawEllipse(rightX + 62, 100, 70, 20);
    drawEllipse(rightX - 62, 100, 70, 23);

    ctx.lineWidth = 2;
    fillRGB(grassstroke);
    fillRGB(grasscolor);
    ctx.fillRect(-4, 327, 405, 75);

    var y = 74, house_height = 210, house_top = 95;

    strokeRGB(chimneystroke);
    ctx.lineWidth = 2;
    fillRGB(chimneyfill);
    ctx.fillRect(241, 87, 26, 68);
    ctx.strokeRect(241, 87, 26, 68);
    fillRGB(chimneytop);
    ctx.fillRect(239, 79, 30, 8);

    fillRGB(housecolor);
    drawPolygon([[y, house_height], [200, house_top], [400 - y, house_height], [400 - y, 327], [y, 327]]);

    fillRGB(roofcolor);
    drawPolygon([[y - 18, house_height], [200, house_top - 18], [418 - y, house_height], [400 - y, house_height], [200, house_top], [y, house_height]]);

    strokeRGB([255, 255, 255]);
    ctx.lineWidth = 1;
    fillRGB(windowfill);
    drawEllipse(200, 142, 20, 20);
    windowglass(185, 170);
    fillRGB([0, 150, 213]);
    windowglass(200 - 96, 251);
    fillRGB([0, 150, 213]);
    windowglass(200 + 60, 251);

    fillRGB(doorcolor);
    ctx.fillRect(186, 272, 32, 55);
    fillRGB([0, 0, 0]);
    drawEllipse(211, 300, 6, 6);

    strokeRGB([79, 79, 79]);
    fillRGB(staircolor);
    ctx.fillRect(178, 330, 47, 8);
    ctx.fillRect(183, 322, 39, 8);

    ctx.lineWidth = 2;
    strokeRGB([0, 0, 0]);
    fillRGB([209, 201, 201]);
    ctx.beginPath();
    ctx.moveTo(switchyeah, 0);
    ctx.lineTo(switchyeah, switchoh + 113);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(switchyeah, switchoh + 146, 31 / 2, 68 / 2, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    fillRGB([143, 143, 143]);
    drawEllipse(switchyeah, switchoh + 147, 29, 11);

    fillRGB([0, 0, 0]);
    var chainY = [108, 100, 92, 84, 76, 68, 60, 52, 44, 36, 28, 20, 12, 4, -4, -12, -20, -28, -36];
    for (var i = 0; i < chainY.length; i += 1) {
      drawEllipse(switchyeah, switchoh + chainY[i], 4, 4);
    }

    fillRGB(pathwaycolor);
    drawPolygon([[177, 334], [225, 334], [271, 501], [154, 402]]);

    fillRGB(treecolor);
    drawEllipse(348, 253, 32, 60);
    drawEllipse(372, 234, 55, 68);
    drawEllipse(372, 266, 55, 34);
    fillRGB(treebranchcolor);

    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.beginPath();
    ctx.moveTo(346, 381);
    ctx.bezierCurveTo(361, 333, 360, 152, 364, 380);
    ctx.stroke();

    ctx.lineWidth = 0.5;
    strokeRGB([0, 0, 0]);
    fillRGB(bush);
    drawEllipse(143, 342, 31, 25);
    drawEllipse(133, 383, 40, 32);
    drawEllipse(249, 345, 31, 25);
    drawEllipse(263, 384, 40, 32);

    if (moonPosy > 75 || sunPosy > 75) {
      moonPosy -= 1.5;
      sunPosy -= 1.5;
    }
  }

  canvas.addEventListener("click", function (event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
    var mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

    if (mouseX < 60 && mouseY < 181) {
      if (nord === 1) {
        nord = 0;
        switchoh = 35;
        moonPosy = 400;
        sunPosy = -50;
      } else if (nord === 0) {
        nord = 1;
        switchoh = 0;
        sunPosy = 400;
        moonPosy = -50;
      }
    }
  });

  function animate() {
    drawScene();
    requestAnimationFrame(animate);
  }

  animate();
}());
