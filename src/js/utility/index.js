(function () {
  const canvas = document.getElementById("game-screen");
  const context = canvas.getContext("2d");

  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas);
  }
  resizeCanvas();
})();
