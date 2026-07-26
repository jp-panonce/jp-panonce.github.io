(function () {
  var canvas = document.getElementById("dayNightCanvas");
  if (!canvas) {
    return;
  }

  var ctx = canvas.getContext("2d");

  var skyColor = -16;
  var nord = 1;
  var switchyeah = 27;
  var switchoh = 35;

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
  var leftX = 312;
  var rightX = 144;

  function rgb(c) {
    return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
  }

  function clampColor(v) {
    if (v < 0) {
      return 0;
    }
    if (v > 255) {
      return 255;
    }
    return v;
  }

  function setFill(c) {
    ctx.fillStyle = rgb(c);
  }

  function setStroke(c) {
    ctx.strokeStyle = rgb(c);
  }

  function ellipse(x, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function stars() {
    setStroke([161, 161, 161]);
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
      var p = pts[i];
      ctx.beginPath();
      ctx.arc(p[0], p[1], 1.4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function windowglass(posx, posy) {
    setFill(windowfill);
    setStroke([212, 182, 212]);
    ctx.lineWidth = 1;
    ctx.fillRect(posx, posy, 32, 18); ctx.strokeRect(posx, posy, 32, 18);
    ctx.fillRect(posx, posy + 18, 16, 18); ctx.strokeRect(posx, posy + 18, 16, 18);
    ctx.fillRect(posx + 16, posy + 18, 16, 18); ctx.strokeRect(posx + 16, posy + 18, 16, 18);

    setFill([31, 66, 171]);
    ctx.fillRect(posx - 16, posy, 16, 36);
    ctx.fillRect(posx + 32, posy, 16, 36);

    setFill([29, 51, 130]);
    ctx.fillRect(posx - 13, posy + 3, 10, 13);
    ctx.fillRect(posx + 35, posy + 3, 10, 13);
    ctx.fillRect(posx - 13, posy + 19, 10, 13);
    ctx.fillRect(posx + 35, posy + 19, 10, 13);
  }

  function drawPolygon(points, fillColor) {
    setFill(fillColor);
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
  }

  function updatePalette() {
    if (nord === 1) {
      skyColor = 162;
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
    } else {
      skyColor = -16;
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
  }

  function drawScene() {
    updatePalette();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0," + clampColor(skyColor) + "," + clampColor(skyColor + 63) + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (nord === 0) {
      stars();
    }

    setFill([255, 230, 0]);
    ellipse(345, sunPosy, 80, 80);

    setFill([224, 224, 224]);
    ellipse(345, moonPosy, 80, 80);
    setFill([204, 204, 204]);
    ellipse(575, moonPosy, 26, 21);
    ellipse(365, moonPosy, 26, 18);
    ellipse(330, moonPosy + 24, 20, 13);
    ellipse(356, moonPosy - 22, 12, 8);
    ellipse(322, moonPosy - 6, 13, 9);

    if (leftX > -99) { leftX -= 0.6; } else { leftX = 500; }
    if (rightX < 500) { rightX += 0.5; } else { rightX = -100; }

    setFill(clouds);
    ellipse(leftX, 33, 127, 23);
    ellipse(leftX + 62, 35, 76, 15);
    ellipse(leftX - 62, 33, 70, 14);
    ellipse(rightX, 100, 126, 33);
    ellipse(rightX + 62, 100, 70, 20);
    ellipse(rightX - 62, 100, 70, 23);

    setFill(grassstroke);
    setFill(grasscolor);
    ctx.fillRect(-4, 327, 405, 75);

    setStroke(chimneystroke);
    ctx.lineWidth = 2;
    setFill(chimneyfill);
    ctx.fillRect(241, 87, 26, 68); ctx.strokeRect(241, 87, 26, 68);
    setFill(chimneytop);
    ctx.fillRect(239, 79, 30, 8);

    drawPolygon([[74, 210], [200, 95], [326, 210], [326, 327], [74, 327]], housecolor);
    drawPolygon([[56, 210], [200, 77], [344, 210], [326, 210], [200, 95], [74, 210]], roofcolor);

    setFill(windowfill);
    setStroke([255, 255, 255]);
    ctx.lineWidth = 1;
    ellipse(200, 142, 20, 20);
    windowglass(185, 170);
    windowglass(104, 251);
    windowglass(260, 251);

    setFill(doorcolor);
    ctx.fillRect(186, 272, 32, 55);
    setFill([0, 0, 0]);
    ellipse(211, 300, 6, 6);

    setFill(staircolor);
    setStroke([79, 79, 79]);
    ctx.fillRect(178, 330, 47, 8); ctx.strokeRect(178, 330, 47, 8);
    ctx.fillRect(183, 322, 39, 8); ctx.strokeRect(183, 322, 39, 8);

    setStroke([0, 0, 0]);
    ctx.lineWidth = 2;
    setFill([209, 201, 201]);
    ctx.beginPath();
    ctx.moveTo(switchyeah, 0);
    ctx.lineTo(switchyeah, switchoh + 113);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(switchyeah, switchoh + 146, 31 / 2, 68 / 2, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    setFill([143, 143, 143]);
    ellipse(switchyeah, switchoh + 147, 29, 11);

    setFill([0, 0, 0]);
    for (var beadY = switchoh + 108; beadY >= switchoh - 36; beadY -= 8) {
      ellipse(switchyeah, beadY, 4, 4);
    }

    setFill(pathwaycolor);
    drawPolygon([[177, 334], [225, 334], [271, 501], [154, 402]], pathwaycolor);

    setFill(treecolor);
    ellipse(348, 253, 32, 60);
    ellipse(372, 234, 55, 68);
    ellipse(372, 266, 55, 34);

    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(346, 381);
    ctx.bezierCurveTo(361, 333, 360, 152, 364, 380);
    ctx.stroke();

    setStroke([0, 0, 0]);
    ctx.lineWidth = 0.5;
    setFill(bush);
    ellipse(143, 342, 31, 25);
    ellipse(133, 383, 40, 32);
    ellipse(249, 345, 31, 25);
    ellipse(263, 384, 40, 32);

    if (moonPosy > 75 || sunPosy > 75) {
      moonPosy -= 1.5;
      sunPosy -= 1.5;
    }
  }

  function loop() {
    drawScene();
    requestAnimationFrame(loop);
  }

  canvas.addEventListener("click", function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left) * (canvas.width / rect.width);
    var y = (event.clientY - rect.top) * (canvas.height / rect.height);

    if (x < 60 && y < 181) {
      if (nord === 1) {
        nord = 0;
        switchoh = 35;
        moonPosy = 400;
        sunPosy = -50;
      } else {
        nord = 1;
        switchoh = 0;
        sunPosy = 400;
        moonPosy = -50;
      }
    }
  });

  loop();
}());
