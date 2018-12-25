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
      } // @method setOption
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
        //this._map = leaflet_map; // for ODLayer update
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
      color: '#4682B4',
      opacity: 0.5,
      weight: '3',
      icon: {
        iconUrl: "plane.png"
      },
      // @option curvature: Number = 4.0
      // How much to simplify the trial on map. More means less curved the 
      // trial is, and less means more curved the trial is.
      // Note that curvature have to be greater than 4.0.
      curvature: 4.0,
      // @option leftSide: Boolean = false.
      // Make the trial on the right side of line from origin to destination. 
      leftSide: false,
      // @option points: Boolean = false.
      // Whether to add origin and destination points on the map.
      points: false,
      // @option popup: Boolean = false.
      // Whether to bind popup of latlng to the origin and destination points.
      popup: false,
      // @optoin trailHighlight: Boolean = false.
      // Whether to highlight the trail.
      trailHighlight: false,
      // @option trailAnimate: Boolean = false.
      // Whether to setup animation of trial by using the icon in options.
      trailAnimate: false
    },
    initialize: function initialize(origin, destination, options) {
      L.setOptions(this, options);
      this._initialUpdate = true;
      this.setPath(L.latLng(origin), L.latLng(destination));
    },
    onAdd: function onAdd(map) {
      this._renderer._initPath(this);

      this._reset(); // _project() + _update()


      this._renderer._addPath(this); // add path on map
      // map.on('click', function(){
      //     this._latlngs.org
      // });

    },
    animateIcon: function animateIcon(path) {
      // make icon move along the trail
      if (this.spaceship_img) this.spaceship_img.remove();
      var SnapSvg = Snap('.leaflet-overlay-pane>svg');
      var spaceship_img = this.spaceship_img = SnapSvg.image(this.options.icon.iconUrl).attr({
        visibility: "hidden"
      });
      var spaceship = SnapSvg.group(spaceship_img);
      var flight_path = SnapSvg.path(path).attr({
        'fill': 'none',
        'stroke': 'none'
      });
      var full_path_length = Snap.path.getTotalLength(flight_path);
      var half_path_length = full_path_length / 2;
      var forth_path_length = full_path_length / 4;

      var width = forth_path_length / this._map.getZoom();

      var height = forth_path_length / this._map.getZoom();

      width = Math.min(Math.max(width, 30), 64);
      height = Math.min(Math.max(height, 30), 64);
      this.on('click', function (e) {
        Snap.animate(0, forth_path_length, function (step) {
          //show image when plane start to animate
          spaceship_img.attr({
            visibility: "visible"
          });
          spaceship_img.attr({
            width: width,
            height: height
          }); //last_step = step;

          var moveToPoint = Snap.path.getPointAtLength(flight_path, step);
          var x = moveToPoint.x - width / 2;
          var y = moveToPoint.y - height / 2;
          spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
        }, 2500, mina.easeout, function () {
          Snap.animate(forth_path_length, half_path_length, function (step) {
            //last_step = step;
            var moveToPoint = Snap.path.getPointAtLength(flight_path, step);
            var x = moveToPoint.x - width / 2;
            var y = moveToPoint.y - height / 2;
            spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
          }, 7000, mina.easein, function () {
            //done
            spaceship_img.attr({
              visibility: "hidden"
            });
          });
        });
      });
    },
    addPoints: function addPoints() {
      this._orgMarker.addTo(this._map);

      this._dstMarker.addTo(this._map);
    },
    setPointsPopup: function setPointsPopup() {
      // let markerOptins = {
      //     color: '#00C5CD', //Turquoise3
      //     radius: 2,
      //     opacity: 0.5
      // };
      // var orgMarker = L.circleMarker(
      //     this._latlngs.org, 
      //     markerOptins).addTo(this._map)
      var orgMarker = this._orgMarker;
      orgMarker.bindPopup(orgMarker.getLatLng().toString());
      orgMarker.on('mouseover', function (e) {
        orgMarker.openPopup();
      });
      orgMarker.on('mouseout', function (e) {
        orgMarker.closePopup();
      }); // var dstMarker = L.circleMarker(
      //     this._latlngs.dst, 
      //     markerOptins).addTo(this._map)

      var dstMarker = this._dstMarker;
      dstMarker.bindPopup(dstMarker.getLatLng().toString());
      dstMarker.on('mouseover', function (e) {
        dstMarker.openPopup();
      });
      dstMarker.on('mouseout', function (e) {
        dstMarker.closePopup();
      });
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

      if (deep < 3.0) {
        // straighten the trail if deep is less than 3
        deep = 1.0;
      }

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
      }; // set points

      this._setPoints();

      this._bounds = this._computeBounds();
    },
    _setPoints: function _setPoints() {
      var markerOptins = {
        color: '#00C5CD',
        //Turquoise3
        radius: 2,
        opacity: 0.5
      };
      this._orgMarker = L.circleMarker(this._latlngs.org, markerOptins);
      this._dstMarker = L.circleMarker(this._latlngs.dst, markerOptins);
    },
    // return items which can be listen
    getItem: function getItem(item_type) {
      if (item_type === 'org') {
        return this._orgMarker;
      } else if (item_type === 'dst') {
        return this._dstMarker;
      } else if (item_type === 'trail') {
        return this;
      } else {
        return null;
      }
    },
    getOrigin: function getOrigin() {
      return this._orgMarker;
    },
    getDestination: function getDestination() {
      return this._dstMarker;
    },
    getTrail: function getTrail() {
      return this._path;
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
    trailHighlight: function trailHighlight() {
      // highlight trail
      var trial = this.getTrail(); //get svgpath

      this.on('mouseover', function (e) {
        trial.setAttribute('stroke-dasharray', 1);
        trial.setAttribute('stroke-width', this.options.weight * 1.25);
        trial.setAttribute('stroke-opacity', 1.0);
      });
      this.on('mouseout', function (e) {
        trial.setAttribute('stroke-dasharray', this.options.dashArray);
        trial.setAttribute('stroke-width', this.options.weight);
        trial.setAttribute('stroke-opacity', this.options.opacity);
      });
    },
    _updatePath: function _updatePath() {
      var latlngs = this._renderer._updateTrail(this); // Add points to map.


      if (this.options.points) {
        this.addPoints(); //Bind popup of latlng to the points.

        if (this.options.popup) {
          this.setPointsPopup();
        }
      }

      if (this.options.trailHighlight) {
        this.trailHighlight(); // highlight the trail
      } // Animate plane after trail updated


      if (this.options.trailAnimate) {
        this.animateIcon(latlngs);
      }
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

      if (layer.options.dashHandle) {
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
          }], layer.options.dashHandle);
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
      } // use prefix before event type: 'org_click'
      // or several space-separated types: 'org_click mouseover'

    }, {
      key: "on",
      value: function on(event_type, callback) {
        var types = event_type.split('_');
        var item_type = types[0]; //specify the type of item

        var real_event_type = types[1]; //specify the type of event

        if (this._layer_group !== undefined) {
          this._layer_group.eachLayer(function (layer) {
            layer.getItem(item_type).on(real_event_type, callback);
          });
        }

        return this;
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

  // var afun = function (name, context, factory) {
  //   // Supports UMD. AMD, CommonJS/Node.js and browser context
  //   if (typeof module !== "undefined" && module.exports) {
  //     module.exports = factory(
  //       require('heatmap.js'),
  //       require('leaflet')
  //     );
  //   } else if (typeof define === "function" && define.amd) {
  //     define(['heatmap.js', 'leaflet'], factory);
  //   } else {
  //     // browser globals
  //     if (typeof window.h337 === 'undefined') {
  //       throw new Error('heatmap.js must be loaded before the leaflet heatmap plugin');
  //     }
  //     if (typeof window.L === 'undefined') {
  //       throw new Error('Leaflet must be loaded before the leaflet heatmap plugin');
  //     }
  //     context[name] = factory(window.h337, window.L);
  //   }
  // }
  if (typeof window.h337 === 'undefined') {
    throw new Error('heatmap.js must be loaded before the leaflet heatmap plugin');
  }

  if (typeof window.L === 'undefined') {
    throw new Error('Leaflet must be loaded before the leaflet heatmap plugin');
  } // afun("HeatmapOverlay", this, function (h337, L) {


  if (typeof L.Layer === 'undefined') {
    L.Layer = L.Class;
  }

  var HeatmapOverlay = L.Layer.extend({
    initialize: function initialize(config) {
      this.cfg = config;
      this._el = L.DomUtil.create('div', 'leaflet-zoom-hide');
      this._data = [];
      this._max = 1;
      this._min = 0;
      this.cfg.container = this._el;
    },
    onAdd: function onAdd(map) {
      var size = map.getSize();
      this._map = map;
      this._width = size.x;
      this._height = size.y;
      this._el.style.width = size.x + 'px';
      this._el.style.height = size.y + 'px';
      this._el.style.position = 'absolute';
      this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));
      map.getPanes().overlayPane.appendChild(this._el);

      if (!this._heatmap) {
        this._heatmap = h337.create(this.cfg);
      } // this resets the origin and redraws whenever
      // the zoom changed or the map has been moved


      map.on('moveend', this._reset, this);

      this._draw();
    },
    addTo: function addTo(map) {
      map.addLayer(this);
      return this;
    },
    onRemove: function onRemove(map) {
      // remove layer's DOM elements and listeners
      map.getPanes().overlayPane.removeChild(this._el);
      map.off('moveend', this._reset, this);
    },
    _draw: function _draw() {
      if (!this._map) {
        return;
      }

      var mapPane = this._map.getPanes().mapPane;

      var point = mapPane._leaflet_pos; // reposition the layer

      this._el.style[HeatmapOverlay.CSS_TRANSFORM] = 'translate(' + -Math.round(point.x) + 'px,' + -Math.round(point.y) + 'px)';

      this._update();
    },
    _update: function _update() {
      var bounds, zoom, scale;
      var generatedData = {
        max: this._max,
        min: this._min,
        data: []
      };
      bounds = this._map.getBounds();
      zoom = this._map.getZoom();
      scale = Math.pow(2, zoom);

      if (this._data.length == 0) {
        if (this._heatmap) {
          this._heatmap.setData(generatedData);
        }

        return;
      }

      var latLngPoints = [];
      var radiusMultiplier = this.cfg.scaleRadius ? scale : 1;
      var localMax = 0;
      var localMin = 0;
      var valueField = this.cfg.valueField;
      var len = this._data.length;

      while (len--) {
        var entry = this._data[len];
        var value = entry[valueField];
        var latlng = entry.latlng; // we don't wanna render points that are not even on the map ;-)

        if (!bounds.contains(latlng)) {
          continue;
        } // local max is the maximum within current bounds


        localMax = Math.max(value, localMax);
        localMin = Math.min(value, localMin);

        var point = this._map.latLngToContainerPoint(latlng);

        var latlngPoint = {
          x: Math.round(point.x),
          y: Math.round(point.y)
        };
        latlngPoint[valueField] = value;
        var radius;

        if (entry.radius) {
          radius = entry.radius * radiusMultiplier;
        } else {
          radius = (this.cfg.radius || 2) * radiusMultiplier;
        }

        latlngPoint.radius = radius;
        latLngPoints.push(latlngPoint);
      }

      if (this.cfg.useLocalExtrema) {
        generatedData.max = localMax;
        generatedData.min = localMin;
      }

      generatedData.data = latLngPoints;

      this._heatmap.setData(generatedData);
    },
    setData: function setData(data) {
      this._max = data.max || this._max;
      this._min = data.min || this._min;
      var latField = this.cfg.latField || 'lat';
      var lngField = this.cfg.lngField || 'lng';
      var valueField = this.cfg.valueField || 'value'; // transform data to latlngs

      var data = data.data;
      var len = data.length;
      var d = [];

      while (len--) {
        var entry = data[len];
        var latlng = new L.LatLng(entry[latField], entry[lngField]);
        var dataObj = {
          latlng: latlng
        };
        dataObj[valueField] = entry[valueField];

        if (entry.radius) {
          dataObj.radius = entry.radius;
        }

        d.push(dataObj);
      }

      this._data = d;

      this._draw();
    },
    // experimential... not ready.
    addData: function addData(pointOrArray) {
      if (pointOrArray.length > 0) {
        var len = pointOrArray.length;

        while (len--) {
          this.addData(pointOrArray[len]);
        }
      } else {
        var latField = this.cfg.latField || 'lat';
        var lngField = this.cfg.lngField || 'lng';
        var valueField = this.cfg.valueField || 'value';
        var entry = pointOrArray;
        var latlng = new L.LatLng(entry[latField], entry[lngField]);
        var dataObj = {
          latlng: latlng
        };
        dataObj[valueField] = entry[valueField];
        this._max = Math.max(this._max, dataObj[valueField]);
        this._min = Math.min(this._min, dataObj[valueField]);

        if (entry.radius) {
          dataObj.radius = entry.radius;
        }

        this._data.push(dataObj);

        this._draw();
      }
    },
    _reset: function _reset() {
      this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));

      var size = this._map.getSize();

      if (this._width !== size.x || this._height !== size.y) {
        this._width = size.x;
        this._height = size.y;
        this._el.style.width = this._width + 'px';
        this._el.style.height = this._height + 'px';

        this._heatmap._renderer.setDimensions(this._width, this._height);
      }

      this._draw();
    }
  });

  HeatmapOverlay.CSS_TRANSFORM = function () {
    var div = document.createElement('div');
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];

      if (div.style[prop] !== undefined) {
        return prop;
      }
    }

    return props[0];
  }(); //   return HeatmapOverlay;
  // });


  function heatmapOverlay(config) {
    return new HeatmapOverlay(config);
  }

  // import * as BaseLayer from "./layers/index.js";

  exports.PointLayer = PointLayer;
  exports.PolygonLayer = PolygonLayer;
  exports.MarkerLayer = MarkerLayer;
  exports.ODLayer = ODLayer;
  exports.PolylineLayer = PolylineLayer;
  exports.heatmapOverlay = heatmapOverlay;
  exports.BaseLayer = BaseLayer;
  exports.OD = OD;
  exports.od = od;

  return exports;

}({}));
