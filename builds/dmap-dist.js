var dmap = (function (exports) {
  'use strict';

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  // Define constants.
   // Fired on every frame of a zoom animation

  var BaseLayer =
  /*#__PURE__*/
  function () {
    function BaseLayer(mapid, option) {
      _classCallCheck(this, BaseLayer);

      if ((this instanceof BaseLayer ? this.constructor : void 0) === BaseLayer) {
        throw new Error('Class BaseLayer cannot be initialized.');
      }

      this._obj = L.layer(mapid, option);
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
    }, {
      key: "addTo",
      value: function addTo(map) {
        this._obj.addTo(map);
      }
    }]);

    return BaseLayer;
  }();

  var PointLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PointLayer, _BaseLayer);

    function PointLayer(mapid, option) {
      var _this;

      _classCallCheck(this, PointLayer);

      return _possibleConstructorReturn(_this);
    }

    return PointLayer;
  }(BaseLayer);

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.BaseLayer = BaseLayer;

  return exports;

}({}));
