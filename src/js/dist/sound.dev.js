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
    this.stopAllSound = this.stopAllSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  _createClass(Sound, [{
    key: "loadSound",
    value: function loadSound(source) {
      var sound = new Audio();
      sound.addEventListener("canplay", function () {// console.log(`${source} is ready to play`);
      });
      sound.addEventListener("play", function () {// console.log(`${source} started playing`);
      });
      sound.addEventListener("pause", function () {// console.log(`${source} paused`);
      });
      sound.addEventListener("canplaythrough", function () {// console.log(`${source} can play through`);
      });
      sound.addEventListener("progress", function () {// console.log(`${source} progress in loading`);
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
      this.sounds["shoot"] = this.loadSound(dir + "assets/sounds/shoot.wav");
      this.sounds["add"] = this.loadSound(dir + "assets/sounds/add.wav");
      this.sounds["die"] = this.loadSound(dir + "assets/sounds/collision.flac");
      this.sounds["explosion"] = this.loadSound(dir + "assets/sounds/explosion.wav");
    }
  }, {
    key: "stopAllSound",
    value: function stopAllSound() {
      for (var sound in this.sounds) {
        this.sounds[sound].volume = 0;
      }
    }
  }, {
    key: "unMuteSound",
    value: function unMuteSound() {
      for (var sound in this.sounds) {
        this.sounds[sound].volume = 0.5;
      }
    }
  }, {
    key: "pauseSound",
    value: function pauseSound(whichSound) {
      this.sounds[whichSound].pause();
    }
  }, {
    key: "playSound",
    value: function playSound(whichSound) {
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
