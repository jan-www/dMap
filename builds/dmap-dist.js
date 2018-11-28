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

  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(map);
  // l = new dmap.PointLayer(map);
  // d = [[51, 0], [51, 10]]
  // l.data(d, function(d){return {coordination: d, option: {radius: 200, color: 'red'}}}).enter();

  var PointLayer =
  /*#__PURE__*/
  function () {
    function PointLayer(leaflet_map, option) {
      _classCallCheck(this, PointLayer);

      this._data = [];
      this._layer_group = undefined;
      this._leaflet_map = map; // this.setOption(option)
    }

    _createClass(PointLayer, [{
      key: "on",
      value: function on(event_type, fn) {// TODO
      }
    }, {
      key: "data",
      value: function data(_data, fn) {
        this._data = _data.map(fn);
        return this;
      } // render all points of this PointLayer to this.map

    }, {
      key: "enter",
      value: function enter() {
        // in enter() method contruct _points
        if (this._layer_group !== undefined) this._layer_group.remove(); // maybe assert?

        this._layer_group = L.layerGroup(this._data.map(function (data) {
          return L.circle(data.coordination, data.option);
        }));

        this._layer_group.addTo(this._leaflet_map);

        return this;
      }
    }, {
      key: "exit",
      value: function exit() {
        if (this._layer_group !== undefined) this._layer_group.remove();
      }
    }]);

    return PointLayer;
  }();

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.BaseLayer = BaseLayer;

  return exports;

}({}));
