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
    scripts: ["particle-system"],
    message: "Random number generator loaded",
    onComplete: null
  }, {
    scripts: ["highscore"],
    message: "highscore intialized",
    onComplete: null
  }, // {
  //   scripts: ["particleSystem"],
  //   message: "particle system is intialized",
  //   onComplete: null,
  // },
  {
    scripts: ["utility/enemyCreator"],
    message: "enemy creator system is intialized",
    onComplete: null
  }, {
    scripts: ["utility/turretCreator"],
    message: "tower creation system is intialized",
    onComplete: null
  }, {
    scripts: ["screens/about"],
    message: "about is loaded",
    onComplete: null
  }, {
    scripts: ["bullet"],
    message: "bullet is loaded",
    onComplete: null
  }, {
    scripts: ["bulletcontroller"],
    message: "bulletcontroller is loaded",
    onComplete: null
  }, {
    scripts: ["level"],
    message: "level is loaded",
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
    scripts: ["screens/control"],
    message: "control is loaded",
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
    scripts: ["utility/text"],
    message: "enemy is loaded",
    onComplete: null
  }, {
    scripts: ["tower"],
    message: "enemy is loaded",
    onComplete: null
  }, {
    scripts: ["sprite"],
    message: "enemy is loaded",
    onComplete: null
  }, {
    scripts: ["enemy"],
    message: "enemy is loaded",
    onComplete: null
  }, {
    scripts: ["enemyController"],
    message: "enemyController is loaded",
    onComplete: null
  }, {
    scripts: ["input/input"],
    message: "input is loaded",
    onComplete: null
  }, {
    scripts: ["input/mouse"],
    message: "Mouse inputHandler is loaded",
    onComplete: null
  }, {
    scripts: ["gamemodel"],
    message: "modelAnimation is loaded",
    onComplete: null
  }, {
    scripts: ["movingevents"],
    message: "moving object is loaded",
    onComplete: null
  }, {
    scripts: ["sound"],
    message: "sound intialized",
    onComplete: null
  }, {
    scripts: ["utility/initialize"],
    message: "game menu intialized",
    onComplete: null
  }];
  var href = window.location.href;
  var dir = href.substring(0, href.lastIndexOf("/")) + "/";
  var assetOrder = [{
    key: "fire",
    source: dir + "assets/fire.png"
  }, {
    key: "smoke",
    source: dir + "assets/smoke.png"
  }, {
    key: "tower1",
    source: dir + "assets/turret/turret-1-1.png"
  }, {
    key: "tower2",
    source: dir + "assets/turret/turret-6-1.png"
  }, {
    key: "tower3",
    source: dir + "assets/turret/turret-4-1.png"
  }, {
    key: "tower4",
    source: dir + "assets/turret/turret-5-1.png"
  }, {
    key: "base",
    source: dir + "assets/turret/turret-base.png"
  }, {
    key: "creep10",
    source: dir + "assets/creeps1/1.png"
  }, {
    key: "creep11",
    source: dir + "assets/creeps1/2.png"
  }, {
    key: "creep12",
    source: dir + "assets/creeps1/3.png"
  }, {
    key: "creep13",
    source: dir + "assets/creeps1/4.png"
  }, {
    key: "creep14",
    source: dir + "assets/creeps1/5.png"
  }, {
    key: "creep15",
    source: dir + "assets/creeps1/6.png"
  }, {
    key: "creep20",
    source: dir + "assets/creeps2/1.png"
  }, {
    key: "creep21",
    source: dir + "assets/creeps2/2.png"
  }, {
    key: "creep22",
    source: dir + "assets/creeps2/3.png"
  }, {
    key: "creep23",
    source: dir + "assets/creeps2/4.png"
  }, {
    key: "creep30",
    source: dir + "assets/creeps3/1.png"
  }, {
    key: "creep31",
    source: dir + "assets/creeps3/2.png"
  }, {
    key: "creep32",
    source: dir + "assets/creeps3/3.png"
  }, {
    key: "creep33",
    source: dir + "assets/creeps3/4.png"
  } // {
  //   key: "end audio",
  //   source: dir + "assets/sounds/success_end.mp3",
  // },
  ];
  console.log(assetOrder.length);

  function loadScripts(scripts, onComplete) {
    if (scripts.length > 0) {
      var entry = scripts[0];

      require(entry.scripts, function () {
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
    //
    // When we run out of things to load, that is when we call onComplete.
    if (assets.length > 0) {
      var entry = assets[0];
      loadAsset(entry.source, function (asset) {
        onSuccess(entry, asset);
        assets.shift(); // Alternatively: assets.splice(0, 1);

        loaderWidth += progressSlice;
        loadAssets(assets, onSuccess, onError, onComplete);
      }, function (error) {
        console.log(error.message);
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
            // if (fileExtension === "mp3") {
            //   console.log(asset.src);
            // }
            window.URL.revokeObjectURL(asset.src);

            if (onSuccess) {
              onSuccess(asset);
            } else {
              console.log("hello error");
            }
          };

          asset.src = window.URL.createObjectURL(xhr.response); // console.log(xhr.response);
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
    canvas = document.getElementById("canvas-main");
    context = canvas.getContext("2d"); // const game1 = new Game();

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
      } // console.log(loaderWidth);

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
