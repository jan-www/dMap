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

  //      xxx: 123
  // }
  // 
  // var d = [[1,2], [3,4], [5,6]]
  // pl.data(d, function(d, i) {
  //      return {
  //          "coordination": [d[0], d[1]],
  //          "option": {
  //              "radius": 10,
  //              "color": "red"
  //           }
  //      }
  //  })
  // );
  // 
  // pl.enter()

  var PointLayer =
  /*#__PURE__*/
  function () {
    function PointLayer(leaflet_map, option) {
      _classCallCheck(this, PointLayer);

      this._data = [];
      this._points = [];
      this._leaflet_map = map; // this.setOption(option)
    }

    _createClass(PointLayer, [{
      key: "on",
      value: function on(event_type, fn) {// TODO
      }
    }, {
      key: "data",
      value: function data(_data, fn) {
        // this._data = data;      // or append otherwise?
        this._data = _data.map(fn);
        return this;
      } // render all points of this PointLayer to this.map

    }, {
      key: "enter",
      value: function enter() {
        // in enter() method contruct _points
        this._points = this._data.map(function (data) {
          return L.circle(data.coordination, data.option);
        }); // maybe assert?
        // this._points.forEach(function(circle, i, a, this) {circle.addTo(this._leaflet_map);});

        for (var i = 0; i < this._points.length; ++i) {
          this._points[i].addTo(this._leaflet_map);
        }

        return this;
      }
    }]);

    return PointLayer;
  }();

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.BaseLayer = BaseLayer;

  return exports;

}({}));
