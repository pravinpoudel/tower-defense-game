"use strict";

(function () {
  var canvas = document.getElementById("game-screen");
  var context = canvas.getContext("2d");
  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas);
  }

  resizeCanvas();
})();
//# sourceMappingURL=index.dev.js.map
