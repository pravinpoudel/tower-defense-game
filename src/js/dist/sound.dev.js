"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sound =
/*#__PURE__*/
function () {
  function Sound() {
    _classCallCheck(this, Sound);

    this.sounds = {};
    this.loadAudio = this.loadAudio.bind(this);
    this.loadSound = this.loadSound.bind(this);
    this.playSound = this.playSound.bind(this);
    this.pauseSound = this.pauseSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  _createClass(Sound, [{
    key: "loadSound",
    value: function loadSound(source) {
      var sound = new Audio();
      sound.addEventListener("canplay", function () {
        console.log("".concat(source, " is ready to play"));
      });
      sound.addEventListener("play", function () {
        console.log("".concat(source, " started playing"));
      });
      sound.addEventListener("pause", function () {
        console.log("".concat(source, " paused"));
      });
      sound.addEventListener("canplaythrough", function () {
        console.log("".concat(source, " can play through"));
      });
      sound.addEventListener("progress", function () {
        console.log("".concat(source, " progress in loading"));
      });
      sound.addEventListener("timeupdate", function () {//   console.log(`${source} time update: ${this.currentTime}`);
      });
      sound.src = source;
      return sound;
    }
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      this.sounds["end"] = this.loadSound(dir + "assets/sounds/game_end.mp3");
      this.sounds["shoot"] = this.loadSound(dir + "assets/sounds/gun_shoot.wav");
      this.sounds["collision"] = this.loadSound(dir + "assets/sounds/collision.flac");
    }
  }, {
    key: "pauseSound",
    value: function pauseSound(whichSound) {
      this.sounds[whichSound].pause();
    }
  }, {
    key: "playSound",
    value: function playSound(whichSound) {
      console.log(this.sounds[whichSound]);
      this.sounds[whichSound].play();
    }
  }, {
    key: "changeVolume",
    value: function changeVolume(value) {
      this.sounds["audio/end"].volume = value / 100;
    }
  }]);

  return Sound;
}();
//# sourceMappingURL=sound.dev.js.map
