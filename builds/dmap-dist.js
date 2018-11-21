'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// Define constants.
 // Fired on every frame of a zoom animation

var BaseLayer$1 =
/*#__PURE__*/
function () {
  function BaseLayer(mapid, option) {
    _classCallCheck(this, BaseLayer);

    if ((this instanceof BaseLayer ? this.constructor : void 0) === BaseLayer) {
      throw new Error('Class BaseLayer cannot be initialized.');
    }

    this._obj = L.map(mapid, option);
    this._prev_data = [];
    this._data = [];
  }

  _createClass(BaseLayer, [{
    key: "on",
    value: function on(event_type, callback) {
      switch (event_type) {
        // other cases.
        default:
          {
            this._obj.on(event_type, callback);
          }
      }

      return this;
    }
  }, {
    key: "setOption",
    value: function setOption(option) {
      this._obj.setOption(option);

      return this;
    }
  }, {
    key: "data",
    value: function data(d, func) {
      this._data = d;
    }
  }]);

  return BaseLayer;
}();

// import * as BaseLayer from "./layers/index.js";
console.log('If there exists an error below, then complie goes successfully.');
var a = new BaseLayer('');

exports.BaseLayer = BaseLayer$1;
