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
  // Base class of all dmap.layer.
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
    } // @method on
    // @parameter event_type: event
    // @parameter callback: function
    // 
    // Bind callback function to every element.


    _createClass(BaseLayer, [{
      key: "on",
      value: function on(event_type, callback) {
        // TODO
        return this;
      } // @method setOption
      // @parameter option: object
      // 
      // Set layer option.

    }, {
      key: "setOption",
      value: function setOption(option) {
        // TODO
        return this;
      } // @method data
      // @parameter data: Array
      // @parameter fn: function(d, i, a)
      // 
      // Set this._data by data and mapping-function fn.

    }, {
      key: "data",
      value: function data(_data, fn) {
        this._data = _data.map(fn);
        return this;
      } // @method addTo
      // @parameter leaflet_map: L.map
      // 
      // Add all elements in this layer to L.map.

    }, {
      key: "addTo",
      value: function addTo(leaflet_map) {
        this._layer_group.addTo(leaflet_map);

        return this;
      } // @method enter
      // 
      // Update this._layer_group.

    }, {
      key: "enter",
      value: function enter() {
        if (this._layer_group !== undefined) {
          this.remove();
        } // maybe delete this._layer_group ? 


        this._layer_group = L.layerGroup(this.generate() // rename would fit well
        );
        return this;
      } // @method exit
      // 
      // Quit binding this layer on the L.map.

    }, {
      key: "exit",
      value: function exit() {
        this.remove();
        return this;
      } // @method generate
      // 注意 BaseLayer 的 generate() 方法不应调用，enter() 中应该调用对应子类的方法。

    }, {
      key: "generate",
      value: function generate() {
        return [];
      } // @method remove
      // 
      // Remove all elements from L.map.

    }, {
      key: "remove",
      value: function remove() {
        if (this._layer_group !== undefined) {
          this._layer_group.remove();
        }

        return this; // return what??
      }
    }]);

    return BaseLayer;
  }();

  var PointLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PointLayer, _BaseLayer);

    function PointLayer(option) {
      _classCallCheck(this, PointLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PointLayer).call(this, option));
    } // @method generate
    // 
    // Return Array of L.circle.


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
