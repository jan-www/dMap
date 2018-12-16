<<<<<<< HEAD
var dmap=function(t){"use strict";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function o(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}function r(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&s(t,n)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,n){return(s=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}var h=function(){function n(t){if(i(this,n),(this instanceof n?this.constructor:void 0)===n)throw new Error("Class BaseLayer cannot be initialized.");this._data=[],this._layer_group=void 0,this.setOption(t)}return o(n,[{key:"on",value:function(n,i){return void 0!==this._layer_group&&this._layer_group.eachLayer(function(t){t.on(n,i)}),this}},{key:"setOption",value:function(t){return this}},{key:"setElementOption",value:function(t,n){var i=t.map(n),e=0;for(e=0;e<this._data.length;++e)this._data[e].options=this._data[e].options||{},e<t.length&&Object.assign(this._data[e].options,i[e]);return this}},{key:"data",value:function(t,n){return this._data=t.map(n),this}},{key:"addTo",value:function(t){return this._layer_group.addTo(t),this}},{key:"enter",value:function(){return void 0!==this._layer_group&&this.remove(),this._layer_group=L.layerGroup(this.generate()),this}},{key:"exit",value:function(){return this.remove(),this}},{key:"generate",value:function(){return[]}},{key:"remove",value:function(){return void 0!==this._layer_group&&this._layer_group.remove(),this}}]),n}(),n=function(t){function n(t){return i(this,n),u(this,a(n).call(this,t))}return r(n,h),o(n,[{key:"generate",value:function(){return this._data.map(function(t){return L.circle(t.coordination,t.options)})}}]),n}(),p=function(t){function n(t){return i(this,n),u(this,a(n).call(this,t))}return r(n,h),o(n,[{key:"generate",value:function(){return this._data.map(function(t){return L.polygon(t.coordinations,t.options)})}}]),n}(),l=function(t){function n(t){return i(this,n),u(this,a(n).call(this,t))}return r(n,h),o(n,[{key:"generate",value:function(){return this._data.map(function(t){return L.marker(t.coordination,t.options)})}}]),n}(),c=L.Path.extend({options:{color:"#4682B4",opacity:.5,weight:"3",icon:{iconUrl:"plane.png"},curvature:4,leftSide:!1,points:!1,popup:!1,trailHighlight:!1,trailAnimate:!1},initialize:function(t,n,i){L.setOptions(this,i),this._initialUpdate=!0,this.setPath(L.latLng(t),L.latLng(n))},onAdd:function(t){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},animateIcon:function(t){this.spaceship_img&&this.spaceship_img.remove();var n=Snap(".leaflet-overlay-pane>svg"),o=this.spaceship_img=n.image(this.options.icon.iconUrl).attr({visibility:"hidden"}),r=n.group(o),a=n.path(t).attr({fill:"none",stroke:"none"}),i=Snap.path.getTotalLength(a),e=i/2,s=i/4,u=s/this._map.getZoom(),h=s/this._map.getZoom();u=Math.min(Math.max(u,30),64),h=Math.min(Math.max(h,30),64),this.on("click",function(t){Snap.animate(0,s,function(t){o.attr({visibility:"visible"}),o.attr({width:u,height:h});var n=Snap.path.getPointAtLength(a,t),i=n.x-u/2,e=n.y-h/2;r.transform("translate("+i+","+e+") rotate("+(n.alpha-90)+", "+u/2+", "+h/2+")")},2500,mina.easeout,function(){Snap.animate(s,e,function(t){var n=Snap.path.getPointAtLength(a,t),i=n.x-u/2,e=n.y-h/2;r.transform("translate("+i+","+e+") rotate("+(n.alpha-90)+", "+u/2+", "+h/2+")")},7e3,mina.easein,function(){o.attr({visibility:"hidden"})})})})},addPoints:function(){this._orgMarker.addTo(this._map),this._dstMarker.addTo(this._map)},setPointsPopup:function(){var n=this._orgMarker;n.bindPopup(n.getLatLng().toString()),n.on("mouseover",function(t){n.openPopup()}),n.on("mouseout",function(t){n.closePopup()});var i=this._dstMarker;i.bindPopup(i.getLatLng().toString()),i.on("mouseover",function(t){i.openPopup()}),i.on("mouseout",function(t){i.closePopup()})},getPath:function(){return this._latlngs},setPath:function(t,n){var i=this.getMidPoint(t,n,this.options.curvature,this.options.leftSide);return this._setPath(t,n,i),this.redraw()},getBounds:function(){return this._bounds},getMidPoint:function(t,n,i){var e=3.14;i<3&&(i=1),"RIGHT_ROUND"===(3<arguments.length&&void 0!==arguments[3]?arguments[3]:"LEFT_ROUND")&&(e*=-1);var o=t,r=n,a=r.lng-o.lng,s=r.lat-o.lat,u=Math.sqrt(Math.pow(a,2)+Math.pow(s,2)),h=Math.atan2(s,a),p=e/(i||4),l=u/2/Math.cos(p),c=h+p,f=l*Math.cos(c)+o.lng;return[l*Math.sin(c)+o.lat,f]},_setPath:function(t,n,i){this._latlngs={org:t,dst:n,mid:i},this._setPoints(),this._bounds=this._computeBounds()},_setPoints:function(){var t={color:"#00C5CD",radius:2,opacity:.5};this._orgMarker=L.circleMarker(this._latlngs.org,t),this._dstMarker=L.circleMarker(this._latlngs.dst,t)},getItem:function(t){return"org"===t?this._orgMarker:"dst"===t?this._dstMarker:"trail"===t?this:null},getOrigin:function(){return this._orgMarker},getDestination:function(){return this._dstMarker},getTrail:function(){return this._path},_computeBounds:function(){var t=new L.LatLngBounds;return t.extend(this._latlngs.org),t.extend(this._latlngs.dst),t.extend(this._latlngs.mid),t},getCenter:function(){return this._bounds.getCenter()},_update:function(){this._map&&this._updatePath()},trailHighlight:function(){var n=this.getTrail();this.on("mouseover",function(t){n.setAttribute("stroke-dasharray",1),n.setAttribute("stroke-width",1.25*this.options.weight),n.setAttribute("stroke-opacity",1)}),this.on("mouseout",function(t){n.setAttribute("stroke-dasharray",this.options.dashArray),n.setAttribute("stroke-width",this.options.weight),n.setAttribute("stroke-opacity",this.options.opacity)})},_updatePath:function(){var t=this._renderer._updateTrail(this);this.options.points&&(this.addPoints(),this.options.popup&&this.setPointsPopup()),this.options.trailHighlight&&this.trailHighlight(),this.options.trailAnimate&&this.animateIcon(t)},_project:function(){this._points=[],this._points.push("M");var t=this._map.latLngToLayerPoint(this._latlngs.org);this._points.push(t),this._latlngs.mid&&(this._points.push("Q"),t=this._map.latLngToLayerPoint(this._latlngs.mid),this._points.push(t)),t=this._map.latLngToLayerPoint(this._latlngs.dst),this._points.push(t)}});function f(t,n,i){return new c(t,n,i)}L.SVG.include({_updateTrail:function(t){var n=this._trailPointsToPath(t._points);if(this._setPath(t,n),t.options.dashHandle){var i=t._path,e=i.getTotalLength();t.options.dashArray||(i.style.strokeDasharray=e+" "+e),t._initialUpdate&&(i.animate([{strokeDashoffset:e},{strokeDashoffset:0}],t.options.dashHandle),t._initialUpdate=!1)}return n},_trailPointsToPath:function(t){for(var n,i="",e=0,o=t.length;e<o;e++)"string"==typeof(n=t[e])||n instanceof String?i+=n:i+=n.x+","+n.y+" ";return i||"M0 0"}});var g=function(t){function n(t){return i(this,n),u(this,a(n).call(this,t))}return r(n,h),o(n,[{key:"generate",value:function(){return this._data.map(function(t){return f(t.origin,t.destination,t.options)})}},{key:"on",value:function(t,n){var i=t.split("_"),e=i[0],o=i[1];return void 0!==this._layer_group&&this._layer_group.eachLayer(function(t){t.getItem(e).on(o,n)}),this}}]),n}();return t.PointLayer=n,t.PolygonLayer=p,t.MarkerLayer=l,t.ODLayer=g,t.BaseLayer=h,t.OD=c,t.od=f,t}({});
=======
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
    function BaseLayer(options) {
      _classCallCheck(this, BaseLayer);

      if ((this instanceof BaseLayer ? this.constructor : void 0) === BaseLayer) {
        throw new Error('Class BaseLayer cannot be initialized.');
      }

      this._data = []; // {}

      this._layer_group = undefined;
      this.setOption(options);
    } // @method on
    // @parameter event_type: event
    // @parameter callback: function
    // 
    // Bind callback function to every element.


    _createClass(BaseLayer, [{
      key: "on",
      value: function on(event_type, callback) {
        var _this = this;

        if (this._layer_group !== undefined) {
          var layers = this._layer_group.getLayers();

          var _loop = function _loop(i) {
            layers[i].on(event_type, function () {
              callback(this._data[i], i);
            }, _this); //bind
          };

          for (var i = 0; i < layers.length; ++i) {
            _loop(i);
          }
        }

        return this;
      } // @method onElement
      // @parameter
      // 
      // xx
      // onElement() 我不会写哇
      // @method setOption
      // @parameter options: object
      // 
      // Set layer option.

    }, {
      key: "setOption",
      value: function setOption(options) {
        // TODO
        return this;
      } // @method setElementOption
      // @parameter data: Array
      // @parameter fn: function(d, i, a)
      // 
      // Set options of each element by data and mapping-function fn.
      // 
      // e.g:
      // '''
      // var pl = new dmap.PolygonLayer();
      // ...
      // pl.setElementOption(['black', 'aqua'], function(d, i){return {color: d};}).enter();
      // pl.addTo(map);
      // '''
      // 

    }, {
      key: "setElementOption",
      value: function setElementOption(data, fn) {
        var array_options = data.map(fn),
            i = 0;

        for (i = 0; i < this._data.length; ++i) {
          this._data[i].options = this._data[i].options || {};

          if (i < data.length) {
            Object.assign(this._data[i].options, array_options[i]);
          }
        }

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

    function PointLayer(options) {
      _classCallCheck(this, PointLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PointLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.circle.


    _createClass(PointLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.circleMarker(data.coordination, data.options);
        });
      }
    }]);

    return PointLayer;
  }(BaseLayer);

  var PolygonLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PolygonLayer, _BaseLayer);

    function PolygonLayer(options) {
      _classCallCheck(this, PolygonLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PolygonLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.polygon


    _createClass(PolygonLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polygon(data.coordinations, data.options);
        });
      }
    }]);

    return PolygonLayer;
  }(BaseLayer);

  var MarkerLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(MarkerLayer, _BaseLayer);

    function MarkerLayer(options) {
      _classCallCheck(this, MarkerLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(MarkerLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.Marker.


    _createClass(MarkerLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.marker(data.coordination, data.options);
        });
      }
    }]);

    return MarkerLayer;
  }(BaseLayer);

  /*
   * @class OD
   * @inherits L.Path
   *
   * A class for drawing OD-trail overlays on a map. Extends `L.Path`.
   *
   * @example
   *
   * ```js
   * // create a red OD-trail(Bezier curve) from an array of LatLng points
   * var trial = dmap.OD([45.51, -122.68], 
   *              [37.77, -122.43], {color: 'red'}).addTo(map);
   * ```
   */
  var OD = L.Path.extend({
    // @section
    // @aka OD options
    options: {
      // @option curvature: Number = 4.0
      // How much to simplify the trial on map. More means less curved the 
      // trial is, and less means more curved the trial is.
      // Note that curvature have to be greater than 4.0.
      curvature: 4.0,
      // @option leftSide: Boolean = false.
      // Make the trial on the right side of line from origin to destination. 
      leftSide: false
    },
    initialize: function initialize(origin, destination, options) {
      L.setOptions(this, options);
      this._initialUpdate = true;
      this.setPath(origin, destination);
    },
    onAdd: function onAdd(map) {
      this._renderer._initPath(this);

      this._reset();

      this._renderer._addPath(this);
    },
    getPath: function getPath() {
      return this._latlngs;
    },
    setPath: function setPath(org, dst) {
      var middlePoint = this.getMidPoint(org, dst, this.options.curvature, this.options.leftSide);

      this._setPath(org, dst, middlePoint);

      return this.redraw();
    },
    getBounds: function getBounds() {
      return this._bounds;
    },
    getMidPoint: function getMidPoint(org, dst, deep) {
      var round_side = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'LEFT_ROUND';
      var offset = 3.14;
      if (round_side === 'RIGHT_ROUND') offset = offset * -1;
      var latlng1 = org,
          latlng2 = dst;
      var offsetX = latlng2.lng - latlng1.lng,
          offsetY = latlng2.lat - latlng1.lat;
      var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
          theta = Math.atan2(offsetY, offsetX);
      var thetaOffset = offset / (deep ? deep : 4);
      var r2 = r / 2 / Math.cos(thetaOffset),
          theta2 = theta + thetaOffset;
      var midpointX = r2 * Math.cos(theta2) + latlng1.lng,
          midpointY = r2 * Math.sin(theta2) + latlng1.lat;
      var midpointLatLng = [midpointY, midpointX];
      return midpointLatLng;
    },
    _setPath: function _setPath(org, dst, mid) {
      this._latlngs = {
        org: org,
        dst: dst,
        mid: mid
      };
      this._bounds = this._computeBounds();
    },
    _computeBounds: function _computeBounds() {
      var bound = new L.LatLngBounds();
      bound.extend(this._latlngs.org);
      bound.extend(this._latlngs.dst);
      bound.extend(this._latlngs.mid);
      return bound;
    },
    getCenter: function getCenter() {
      return this._bounds.getCenter();
    },
    _update: function _update() {
      if (!this._map) {
        return;
      }

      this._updatePath();
    },
    _updatePath: function _updatePath() {
      //animated plane
      var latlngs = this._renderer._updateTrail(this); //this.setAnimatePlane(latlngs);

    },
    _project: function _project() {
      this._points = [];

      this._points.push('M');

      var curPoint = this._map.latLngToLayerPoint(this._latlngs.org);

      this._points.push(curPoint);

      if (this._latlngs.mid) {
        this._points.push('Q');

        curPoint = this._map.latLngToLayerPoint(this._latlngs.mid);

        this._points.push(curPoint);
      }

      curPoint = this._map.latLngToLayerPoint(this._latlngs.dst);

      this._points.push(curPoint);
    }
  }); // @factory L.od(latlng: origin, latlng: destination, options?: OD options)
  // Instantiates an OD object given two geographical points (i.e. origin point 
  // and destination point) and optionally an options object.

  function od(origin, destination, options) {
    return new OD(origin, destination, options);
  }
  /* @namespace L.SVG
   * @section Layer events
   *
   * @event _updateOD: LayerEvent
   * Fired when there is a need to update the layer on the map.
   *
   *
   * @section Methods for Layers and Controls
   */

  L.SVG.include({
    _updateTrail: function _updateTrail(layer) {
      var svgPath = this._trailPointsToPath(layer._points);

      this._setPath(layer, svgPath);

      if (layer.options.animate) {
        var path = layer._path;
        var length = path.getTotalLength();

        if (!layer.options.dashArray) {
          path.style.strokeDasharray = length + ' ' + length;
        }

        if (layer._initialUpdate) {
          path.animate([{
            strokeDashoffset: length
          }, {
            strokeDashoffset: 0
          }], layer.options.animate);
          layer._initialUpdate = false;
        }
      }

      return svgPath;
    },
    _trailPointsToPath: function _trailPointsToPath(points) {
      var point,
          curCommand,
          str = '';

      for (var i = 0, len = points.length; i < len; i++) {
        point = points[i];

        if (typeof point === 'string' || point instanceof String) {
          curCommand = point;
          str += curCommand;
        } else str += point.x + ',' + point.y + ' ';
      }

      return str || 'M0 0';
    }
  });

  /*
   * @class ODLayer
   * @inherits BaseLayer
   *
   */

  var ODLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(ODLayer, _BaseLayer);

    function ODLayer(options) {
      _classCallCheck(this, ODLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(ODLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.circle.


    _createClass(ODLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return od(data.origin, data.destination, data.options);
        });
      }
    }]);

    return ODLayer;
  }(BaseLayer);

  var PolylineLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(PolylineLayer, _BaseLayer);

    function PolylineLayer(options) {
      _classCallCheck(this, PolylineLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PolylineLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.Marker.


    _createClass(PolylineLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polyline(data.coordinations, data.options);
        });
      }
    }]);

    return PolylineLayer;
  }(BaseLayer);

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.PolygonLayer = PolygonLayer;
  exports.MarkerLayer = MarkerLayer;
  exports.ODLayer = ODLayer;
  exports.PolylineLayer = PolylineLayer;
  exports.BaseLayer = BaseLayer;
  exports.OD = OD;
  exports.od = od;

  return exports;

}({}));

>>>>>>> a8f33b4521f96821e392f5b2312b5d5ecb7334a2
