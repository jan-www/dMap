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
      // @option color: String = '#4682B4'
      // Specify the color of the trail. You can also use description like 
      // 'color: "red"'.
      color: '#4682B4',
      // @option opacity: Number = 0.5
      // Specify the opacity of the trail.
      opacity: 0.5,
      // @option weight: Number = 3
      // Specify the width of the trail.
      weight: 3,
      // @option icon: Object = icon
      // Give an icon to show animation on the trail. Default is a plane.
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
      // @option points: Boolean = false.
      // Whether to add origin and destination points on the map.
      pointsSize: 3.0,
      // @option pointsColor: String = '#00C5CD'
      // Specify the color of the origin and destination points.
      pointsColor: '#00C5CD',
      //Turquoise3
      // @option pointsRadius: Number = 2
      // Specify the size of the origin and destination points.
      pointsRadius: 2,
      // @option pointsOpacity: Number = 2
      // Specify the opacity of the origin and destination points.
      pointsOpacity: 0.5,
      // @option preferCenter: Object = L.latLng(destination)
      // When the difference between org.lng and dst.lng is lager than 180,
      // we choose the point nearer to preferCenter as the base point and
      // move another one to make the trail sense. Default is destinaton.
      preferCenter: undefined,
      // @option popup: Boolean = false.
      // Whether to bind popup of latlng to the origin and destination points.
      popup: false,
      // @option popupContent: Object = undefined
      // Specify the popup content when popup is true.
      // Note that it is supposed to be like 
      // `{org: "your content a", dst: "your content b"} `
      // Default is {org: org.latLng, dst: dst.latLng}.
      popuopContent: undefined,
      // @optoin trailHighlight: Boolean = false.
      // Whether to highlight the trail.
      trailHighlight: false,
      // @option trailAnimate: Boolean = false.
      // Whether to setup animation of trial by using the icon in options.
      trailAnimate: false
    },
    initialize: function initialize(origin, destination, options) {
      L.setOptions(this, options);

      if (this.options.preferCenter === undefined) {
        //set the default preferCenter
        this.options.preferCenter = destination;
      }

      this._initialUpdate = true;

      var points = this._normalizePoints(L.latLng(origin), L.latLng(destination));

      this.setPath(points.origin, points.destination); // this.setPath(L.latLng(origin), L.latLng(destination));
    },
    // Normalize the points to get a trail with shortest distance
    // parameters org and dst must be L.latLng
    _normalizePoints: function _normalizePoints(org, dst) {
      var o = org,
          d = dst,
          c = this.options.preferCenter;

      if (Math.abs(o.lng - d.lng) < 180) {
        return {
          origin: o,
          destination: d
        };
      } // redundancy o


      if (o.distanceTo(L.latLng(c)) < d.distanceTo(L.latLng(c))) {
        return {
          origin: o,
          destination: L.latLng(d.lat, d.lng > 0 ? d.lng - 360 : d.lng + 360)
        };
      } // redundancy d
      else {
          return {
            origin: L.latLng(o.lat, o.lng > 0 ? o.lng - 360 : o.lng + 360),
            destination: d
          };
        }
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
      var content = this.options.popuopContent; // TODO: Check whether content has fields `org` and `dst`

      var orgMarker = this._orgMarker;
      orgMarker.bindPopup(content.org);
      orgMarker.on('mouseover', function (e) {
        orgMarker.openPopup();
      });
      orgMarker.on('mouseout', function (e) {
        setTimeout(function () {
          orgMarker.closePopup();
        }, 300);
      });
      var dstMarker = this._dstMarker;
      dstMarker.bindPopup(content.dst);
      dstMarker.on('mouseover', function (e) {
        dstMarker.openPopup();
      });
      dstMarker.on('mouseout', function (e) {
        setTimeout(function () {
          dstMarker.closePopup();
        }, 300);
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
        color: this.options.pointsColor,
        radius: this.options.pointsRadius,
        opacity: this.options.pointsOpacity
      };
      this._orgMarker = L.circleMarker(this._latlngs.org, markerOptins);
      this._dstMarker = L.circleMarker(this._latlngs.dst, markerOptins); // set default popup content

      if (this.options.popuopContent === undefined) {
        this.options.popuopContent = {
          org: this._orgMarker.getLatLng().toString(),
          dst: this._dstMarker.getLatLng().toString()
        };
      }
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

      var _options = this.options;
      this.on('mouseover', function (e) {
        trial.setAttribute('stroke-dasharray', 1);
        trial.setAttribute('stroke-width', _options.weight * 1.25);
        trial.setAttribute('stroke-opacity', 1.0);
      });
      this.on('mouseout', function (e) {
        setTimeout(function () {
          trial.setAttribute('stroke-dasharray', _options.dashArray);
          trial.setAttribute('stroke-width', _options.weight);
          trial.setAttribute('stroke-opacity', _options.opacity);
        }, 300);
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
