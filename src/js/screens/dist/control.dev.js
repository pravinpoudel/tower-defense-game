"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Control =
/*#__PURE__*/
function () {
  function Control(manager) {
    _classCallCheck(this, Control);

    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.readControl = this.readControl.bind(this);
    this.controlForm = this.controlForm.bind(this);
    this.upgrade = null;
    this.sell = null;
    this.start = null;
  }

  _createClass(Control, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      var self = this;
      console.log("control initialized");
      document.getElementById("id-control-back").addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });
      window.addEventListener("keydown", function (event) {
        //check if there is button selected on control selection form
        if (activeButton) {
          activeButton.innerText = event.key;
          var element_key = activeButton.dataset.key;

          if (event.key == "Escape") {
            return;
          }

          console.log(element_key);

          switch (element_key) {
            case "upgrade":
              localStorage["upgrade"] = event.key;
              break;
            //   topCode = event.key;

            case "sell":
              localStorage["sell"] = event.key;
              break;
            // downCode = event.key;

            case "start":
              localStorage["start"] = event.key;
              break;
            //   rightCode = event.key;
          }

          _this.run();
        }
      });
    }
  }, {
    key: "readControl",
    value: function readControl() {
      this.upgrade = localStorage["upgrade"];
      this.sell = localStorage["sell"];
      this.start = localStorage["start"];
    }
  }, {
    key: "controlForm",
    value: function controlForm() {
      document.getElementById("upgrade_button").innerText = this.upgrade;
      document.getElementById("upgrade_button").addEventListener("click", function (event) {
        activeButton = document.getElementById("upgrade_button");
      });
      document.getElementById("sell_button").innerText = this.sell;
      document.getElementById("sell_button").addEventListener("click", function (event) {
        activeButton = document.getElementById("sell_button"); // console.log(activeButton);
      });
      document.getElementById("start_button").innerText = this.start;
      document.getElementById("start_button").addEventListener("click", function (event) {
        activeButton = document.getElementById("start_button");
      });
    }
  }, {
    key: "run",
    value: function run() {
      console.log(localStorage["upgrade"], localStorage["sell"], localStorage["start"]);
      this.readControl();
      this.controlForm();
    }
  }]);

  return Control;
}();
//# sourceMappingURL=control.dev.js.map
