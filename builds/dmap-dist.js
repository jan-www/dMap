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

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
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

  // BaseLayer.js
  // Define BaseLayer class and basic methods here.
  // @class BaseLayer
  var BaseLayer =
  /*#__PURE__*/
  function () {
    function BaseLayer(option) {
      _classCallCheck(this, BaseLayer);

      if ((this instanceof BaseLayer ? this.constructor : void 0) === BaseLayer) {
        throw new Error('Class BaseLayer cannot be initialized.');
      }

      this._data = [];
      this._layer_group = undefined;
      this.setOption();
    }

    _createClass(BaseLayer, [{
      key: "on",
      value: function on(event_type, callback) {
        // TODO
        return this;
      }
    }, {
      key: "setOption",
      value: function setOption(option) {
        // TODO
        return this;
      }
    }, {
      key: "data",
      value: function data(_data, fn) {
        this._data = _data.map(fn);
        return this;
      }
    }, {
      key: "addTo",
      value: function addTo(map) {
        this._layer_group.addTo(map);

        return this;
      }
    }, {
      key: "enter",
      value: function enter() {
        if (this._layer_group !== undefined) {
          this.remove();
        } // maybe delete this._layer_group ? 


        this._layer_group = L.layerGroup(this.generate() // rename would fit well
        );
        return this;
      }
    }, {
      key: "exit",
      value: function exit() {
        this.remove();
        return this;
      } // render() method should be declared in ChildClass/

    }, {
      key: "generate",
      value: function generate() {
        // console.log('??')
        return [];
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this._layer_group !== undefined) {
          this._layer_group.remove();
        } // return what??

      }
    }]);

    return BaseLayer;
  }();

  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(map);
  // l = new dmap.PointLayer(map);
  // d = [[51, 0], [51, 10]]
  // l.data(d, function(d){return {coordination: d, option: {radius: 200, color: 'red'}}}).enter();

  var PointLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PointLayer, _BaseLayer);

    function PointLayer(option) {
      _classCallCheck(this, PointLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PointLayer).call(this, option));
    } // specified


    _createClass(PointLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.circle(data.coordination, data.option);
        });
      }
    }]);

    return PointLayer;
  }(BaseLayer);

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.BaseLayer = BaseLayer;

  return exports;

}({}));
