"use strict";

var progressSlice;
var loaderWidth = 1;

loader = function () {
  "use strict";

  var scriptOrder = [{
    scripts: ["random"],
    message: "Random number generator loaded",
    onComplete: null
  }, {
    scripts: ["utility/index"],
    message: "utility is loaded",
    onComplete: null
  }, {
    scripts: ["screens/about"],
    message: "about is loaded",
    onComplete: null
  }, {
    scripts: ["screens/game-play"],
    message: " game-play is loaded",
    onComplete: null
  }, {
    scripts: ["screens/help"],
    message: "help is loaded",
    onComplete: null
  }, {
    scripts: ["screens/highscores"],
    message: "highscore is loaded",
    onComplete: null
  }, {
    scripts: ["screens/mainmenu"],
    message: "mainmenu is loaded",
    onComplete: null
  }, {
    scripts: ["screens/menumanager"],
    message: "menumanager is loaded",
    onComplete: null
  }, {
    scripts: ["input/input"],
    message: "input is loaded",
    onComplete: null
  }, {
    scripts: ["modelAnimation"],
    message: "modelAnimation is loaded",
    onComplete: null
  }, {
    scripts: ["player"],
    message: "moving object is loaded",
    onComplete: null
  }, {
    scripts: ["input/input"],
    message: "input is loaded",
    onComplete: null
  }, {
    scripts: ["utility/initialize"],
    message: "game menu intialized",
    onComplete: null
  }, {
    scripts: ["game"],
    message: "game class is loaded",
    onComplete: null
  }];
  var assetOrder = [{
    key: "fire",
    source: "/assets/fire.png"
  }, {
    key: "smoke",
    source: "/assets/smoke.png"
  }];

  function loadScripts(scripts, onComplete) {
    if (scripts.length > 0) {
      var entry = scripts[0];

      require(entry.scripts, function () {
        console.log(entry.message);

        if (entry.onComplete) {
          entry.onComplete();
        }

        scripts.shift(); // Alternatively: scripts.splice(0, 1);

        loaderWidth += progressSlice;
        loadScripts(scripts, onComplete);
      });
    } else {
      onComplete();
    }
  }

  function loadAssets(assets, onSuccess, onError, onComplete) {
    if (assets.length > 0) {
      var entry = assets[0];
      loadAsset(entry.source, function (asset) {
        onSuccess(entry, asset);
        assets.shift(); // Alternatively: assets.splice(0, 1);

        loaderWidth += progressSlice;
        loadAssets(assets, onSuccess, onError, onComplete);
      }, function (error) {
        onError(error);
        assets.shift(); // Alternatively: assets.splice(0, 1);

        loadAssets(assets, onSuccess, onError, onComplete);
      });
    } else {
      onComplete();
    }
  }

  function loadAsset(source, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var fileExtension = source.substr(source.lastIndexOf(".") + 1); // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

    if (fileExtension) {
      xhr.open("GET", source, true);
      xhr.responseType = "blob";

      xhr.onload = function () {
        var asset = null;

        if (xhr.status === 200) {
          if (fileExtension === "png" || fileExtension === "jpg") {
            asset = new Image();
          } else if (fileExtension === "mp3") {
            asset = new Audio();
          } else {
            if (onError) {
              onError("Unknown file extension: " + fileExtension);
            }
          }

          asset.onload = function () {
            window.URL.revokeObjectURL(asset.src);

            if (onSuccess) {
              onSuccess(asset);
            }
          };

          asset.src = window.URL.createObjectURL(xhr.response);
        } else {
          if (onError) {
            onError("Failed to retrieve: " + source);
          }
        }
      };
    } else {
      if (onError) {
        onError("Unknown file extension: " + fileExtension);
      }
    }

    xhr.send();
  }

  function mainComplete() {
    console.log("It is all loaded up");
    GameState.menu.initialize();
  }

  function loaderInitiate() {
    var totalItems = assetOrder.length + scriptOrder.length;
    progressSlice = Math.floor(100 / totalItems);
    var loader = document.getElementById("loader");
    var timerId = setTimeout(loop, 1000);

    function loop() {
      if (loaderWidth >= 100) {
        clearInterval(timerId);
      } else {
        loader.style.width = loaderWidth + "%";
      }

      console.log(loaderWidth);
    }
  }

  function loaderHide() {
    var loaderParent = document.getElementById("loader_wrapper");
    loaderParent.style.display = "none";
  }

  loaderInitiate();
  loadAssets(assetOrder, function (source, asset) {
    // Store it on success
    GameState.assets[source.key] = asset;
  }, function (error) {
    console.log(error);
  }, function () {
    loadScripts(scriptOrder, mainComplete);
  });
  loaderHide();
}();
//# sourceMappingURL=loader.dev.js.map
