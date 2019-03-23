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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
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
          (function () {
            var layers = _this._layer_group.getLayers();

            var _loop = function _loop(i) {
              layers[i].on(event_type, function () {
                callback(this._data[i], i, layers[i]);
              }, _this); //bind
            };

            for (var i = 0; i < layers.length; ++i) {
              _loop(i);
            }
          })();
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
        this.options = options;
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
      key: "setElementOptions",
      value: function setElementOptions(data, fn) {
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


        this._layer_group = L.featureGroup(this.generate() // rename would fit well
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
    }, {
      key: "getBounds",
      value: function getBounds() {
        return this._layer_group.getBounds();
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
          return L.circleMarker(data.coordinate, data.options);
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
          return L.polygon(data.coordinates, data.options);
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
          return L.marker(data.coordinate, data.options);
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
      // Note that curvature have to be greater than 3.0.
      curvature: 4.0,
      // @option leftSide: Boolean = false.
      // Make the trial on the right side of line from origin to destination. 
      leftSide: false,
      // @option points: Boolean = false.
      // Whether to add origin and destination points on the map.
      points: false,
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
      trailAnimate: false,
      // @option twoWay: Boolean = false.
      // Whether the trail is two-way.
      twoWay: false
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
      var forth_path_length = full_path_length / 4;

      var width = forth_path_length / this._map.getZoom();

      var height = forth_path_length / this._map.getZoom();

      width = Math.min(Math.max(width, 30), 64);
      height = Math.min(Math.max(height, 30), 64);
      this.on('click', function (e) {
        Snap.animate(0, full_path_length, function (step) {
          //console.log(full_path_length);
          spaceship_img.attr({
            visibility: "visible"
          });
          spaceship_img.attr({
            width: width,
            height: height
          });
          var point = Snap.path.getPointAtLength(flight_path, step); // 根据path长度变化获取坐标

          var m = new Snap.Matrix();
          m.translate(point.x - width / 2, point.y - height / 2);
          m.rotate(point.alpha - 90, width / 2, height / 2); // 使飞机总是朝着曲线方向。point.alpha：点的切线和水平线形成的夹角

          spaceship_img.transform(m);
        }, 7000, mina.easeinout, function () {
          spaceship_img.attr({
            visibility: "hidden"
          });
        });
      }); // this.on('click', function(e){
      //     Snap.animate(0, forth_path_length, function (step) {
      //         //show image when plane start to animate
      //         spaceship_img.attr({
      //             visibility: "visible"
      //         });
      //         spaceship_img.attr({width: width, height: height});
      //         //last_step = step;
      //         let moveToPoint = Snap.path.getPointAtLength(flight_path, step);
      //         let x = moveToPoint.x - (width / 2);
      //         let y = moveToPoint.y - (height / 2);
      //         spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
      //     }, 2500,  function () {
      //         Snap.animate(forth_path_length, half_path_length, function (step) {
      //             //last_step = step;
      //             let moveToPoint = Snap.path.getPointAtLength(flight_path, step);
      //             let x = moveToPoint.x - width / 2;
      //             let y = moveToPoint.y - height / 2;
      //             spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
      //         }, 2500, function () {
      //             // Snap.animate(half_path_length, half_path_length + forth_path_length, function(step){
      //             //     let moveToPoint = Snap.path.getPointAtLength(flight_path, step);
      //             // }, 2500, function(){
      //             // })
      //             //done
      //             spaceship_img.attr({
      //                 visibility: "hidden"
      //             });
      //         });
      //     });
      // });
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
      var tpopup = L.popup();
      this.on('mouseover', function (e) {
        trial.setAttribute('stroke-dasharray', 1);
        trial.setAttribute('stroke-width', _options.weight * 1.25);
        trial.setAttribute('stroke-opacity', 1.0);

        if (_options.twoWay) {
          // render two-way trail
          tpopup.setLatLng(e.latlng).setContent('I am a two-way trail.').openOn(this._map);
        }
      });
      this.on('mouseout', function (e) {
        setTimeout(function () {
          trial.setAttribute('stroke-dasharray', _options.dashArray);
          trial.setAttribute('stroke-width', _options.weight);
          trial.setAttribute('stroke-opacity', _options.opacity);

          if (_options.twoWay) {
            tpopup.remove();
          }
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
    // Return Array of L.od.


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
          return L.polyline(data.coordinates, data.options);
        });
      }
    }]);

    return PolylineLayer;
  }(BaseLayer);

  /**
   *  Simple regular cell in a raster
   */
  var Cell =
  /*#__PURE__*/
  function () {
    /**
     * A simple cell with a numerical value
     * @param {L.LatLng} center
     * @param {Number|Vector} value
     * @param {Number} xSize
     * @param {Number} ySize
     */
    function Cell(center, value, xSize) {
      var ySize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : xSize;

      _classCallCheck(this, Cell);

      this.center = center;
      this.value = value;
      this.xSize = xSize;
      this.ySize = ySize;
    }

    _createClass(Cell, [{
      key: "equals",
      value: function equals(anotherCell) {
        return this.center.equals(anotherCell.center) && this._equalValues(this.value, anotherCell.value) && this.xSize === anotherCell.xSize && this.ySize === anotherCell.ySize;
      }
    }, {
      key: "_equalValues",
      value: function _equalValues(value, anotherValue) {
        var type = value.constructor.name;
        var answerFor = {
          Number: value === anotherValue,
          Vector: value.u === anotherValue.u && value.v === anotherValue.v
        };
        return answerFor[type];
      }
      /**
       * Bounds for the cell
       * @returns {LatLngBounds}
       */

    }, {
      key: "getBounds",
      value: function getBounds() {
        var halfX = this.xSize / 2.0;
        var halfY = this.ySize / 2.0;
        var cLat = this.center.lat;
        var cLng = this.center.lng;
        var ul = L.latLng([cLat + halfY, cLng - halfX]);
        var lr = L.latLng([cLat - halfY, cLng + halfX]);
        return L.latLngBounds(L.latLng(lr.lat, ul.lng), L.latLng(ul.lat, lr.lng));
      }
    }]);

    return Cell;
  }();

  /**
   * A class to parse color values
   * @author Stoyan Stefanov <sstoo@gmail.com>
   * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
   * @license MIT license
   */
  function RGBColor(color_string) {
    this.ok = false;

    if (color_string instanceof Array) {
      this.r = color_string[0];
      this.g = color_string[1];
      this.b = color_string[2];
      this.a = color_string.length > 3 ? color_string[3] : 1;
      this.ok = true;
    } else if (color_string instanceof RGBColor) {
      this.r = color_string.r;
      this.g = color_string.g;
      this.b = color_string.b;
      this.a = color_string.a;
      this.ok = color_string.ok;
    } else {
      // strip any leading #
      if (color_string.charAt(0) == '#') {
        // remove # if any
        color_string = color_string.substr(1, 6);
      }

      color_string = color_string.replace(/ /g, '');
      color_string = color_string.toLowerCase(); // before getting into regexps, try simple matches
      // and overwrite the input

      var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
      };

      for (var key in simple_colors) {
        if (color_string == key) {
          color_string = simple_colors[key];
        }
      } // emd of simple type-in colors
      // array of color definition objects


      var color_defs = [{
        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
        process: function process(bits) {
          return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), 1];
        }
      }, {
        re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([01]\.?\d*?)\)$/,
        example: ['rgb(123, 234, 45, 0.5)', 'rgb(255,234,245, 0)'],
        process: function process(bits) {
          return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
        }
      }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ['#00ff00', '336699'],
        process: function process(bits) {
          return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16), 1];
        }
      }, {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: ['#fb0', 'f0f'],
        process: function process(bits) {
          return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16), 1];
        }
      }]; // search through the definitions to find a match

      for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);

        if (bits) {
          var channels = processor(bits);
          this.r = channels[0];
          this.g = channels[1];
          this.b = channels[2];
          this.a = channels[3];
          this.ok = true;
        }
      }

      if (!this.ok) {
        throw new Error('invalid color format!');
      }
    } // validate/cleanup values


    this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
    this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
    this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
    this.a = this.a < 0 || isNaN(this.a) ? 1 : this.a > 1 ? 1 : this.a; // some getters

    this.toRGB = function () {
      return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };

    this.toHex = function () {
      var r = this.r.toString(16);
      var g = this.g.toString(16);
      var b = this.b.toString(16);
      if (r.length == 1) r = '0' + r;
      if (g.length == 1) g = '0' + g;
      if (b.length == 1) b = '0' + b;
      return '#' + r + g + b;
    };

    this.toRGBA = function () {
      return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    };

    this.toString = function () {
      return this.a == 1 ? this.toHex() : this.toRGBA();
    };

    this.rgba = function () {
      return [this.r, this.g, this.b, this.a];
    };
  }
  var rgbColor = function rgbColor(color_string) {
    return new RGBColor(color_string);
  }; // TODO: colorScale - D3

  var ColorScale =
  /*#__PURE__*/
  function () {
    function ColorScale(rgbColors) {
      _classCallCheck(this, ColorScale);

      this._colors = rgbColors.map(function (color) {
        return new RGBColor(color);
      });
      this._values = undefined;
    }

    _createClass(ColorScale, [{
      key: "getColors",
      value: function getColors() {
        return this._colors;
      }
    }, {
      key: "domain",
      value: function domain(values) {
        if (values.length != this._colors.length) {
          throw new Error('Data length not match!');
        }

        var that = this;

        var ret = function ret(value) {
          var colors = that.getColors(),
              index = 0;
          if (colors.length == 1) return colors[0];

          for (index = 0; index < colors.length && value > values[index]; ++index) {
          }

          if (index == 0) index = 1;
          if (index == colors.length) index -= 1;
          var v0 = values[index - 1],
              v1 = values[index],
              c0 = colors[index - 1],
              c1 = colors[index],
              dr = c1.r - c0.r,
              dg = c1.g - c0.g,
              db = c1.b - c0.b,
              rate = (value - v0) / (v1 - v0);
          var r = c0.r + Math.floor(dr * rate),
              g = c0.g + Math.floor(dg * rate),
              b = c0.b + Math.floor(db * rate);
          return new RGBColor([r, g, b]);
        };

        ret.getAttr = function () {
          return {
            values: values,
            colors: that.getColors(),
            colorScale: that
          };
        };

        return ret;
      }
    }]);

    return ColorScale;
  }();
  var colorScale = function colorScale(rgbColors) {
    return new ColorScale(rgbColors);
  };

  /*
    1.0.1 (downloaded from https://github.com/Sumbera/gLayers.Leaflet/releases/tag/v1.0.1)

    Generic  Canvas Layer for leaflet 0.7 and 1.0-rc,
    copyright Stanislav Sumbera,  2016 , sumbera.com , license MIT
    originally created and motivated by L.CanvasOverlay  available here: https://gist.github.com/Sumbera/11114288
  */
  var CanvasLayer = L.Layer.extend({
    // -- initialized is called on prototype
    initialize: function initialize(options) {
      this._map = null;
      this._canvas = null;
      this._frame = null;
      this._delegate = null;
      L.setOptions(this, options);
    },
    delegate: function delegate(del) {
      this._delegate = del;
      return this;
    },
    needRedraw: function needRedraw() {
      if (!this._frame) {
        this._frame = L.Util.requestAnimFrame(this.drawLayer, this);
      }

      return this;
    },
    //-------------------------------------------------------------
    _onLayerDidResize: function _onLayerDidResize(resizeEvent) {
      this._canvas.width = resizeEvent.newSize.x;
      this._canvas.height = resizeEvent.newSize.y;
    },
    //-------------------------------------------------------------
    _onLayerDidMove: function _onLayerDidMove() {
      var topLeft = this._map.containerPointToLayerPoint([0, 0]);

      L.DomUtil.setPosition(this._canvas, topLeft);
      this.drawLayer();
    },
    //-------------------------------------------------------------
    getEvents: function getEvents() {
      var events = {
        resize: this._onLayerDidResize,
        moveend: this._onLayerDidMove
      };

      if (this._map.options.zoomAnimation && L.Browser.any3d) {
        events.zoomanim = this._animateZoom;
      }

      return events;
    },
    //-------------------------------------------------------------
    onAdd: function onAdd(map) {
      this._map = map;
      this._canvas = L.DomUtil.create('canvas', 'leaflet-layer');
      this.tiles = {};

      var size = this._map.getSize();

      this._canvas.width = size.x;
      this._canvas.height = size.y;
      var animated = this._map.options.zoomAnimation && L.Browser.any3d;
      L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

      map._panes.overlayPane.appendChild(this._canvas);

      map.on(this.getEvents(), this);
      var del = this._delegate || this;
      del.onLayerDidMount && del.onLayerDidMount(); // -- callback

      this.needRedraw();
    },
    //-------------------------------------------------------------
    onRemove: function onRemove(map) {
      var del = this._delegate || this;
      del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback

      map.getPanes().overlayPane.removeChild(this._canvas);
      map.off(this.getEvents(), this);
      this._canvas = null;
    },
    //------------------------------------------------------------
    addTo: function addTo(map) {
      map.addLayer(this);
      return this;
    },
    // --------------------------------------------------------------------------------
    LatLonToMercator: function LatLonToMercator(latlon) {
      return {
        x: latlon.lng * 6378137 * Math.PI / 180,
        y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
      };
    },
    //------------------------------------------------------------------------------
    drawLayer: function drawLayer() {
      // -- todo make the viewInfo properties  flat objects.
      var size = this._map.getSize();

      var bounds = this._map.getBounds();

      var zoom = this._map.getZoom();

      var center = this.LatLonToMercator(this._map.getCenter());
      var corner = this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize()));
      var del = this._delegate || this;
      del.onDrawLayer && del.onDrawLayer({
        layer: this,
        canvas: this._canvas,
        bounds: bounds,
        size: size,
        zoom: zoom,
        center: center,
        corner: corner
      });
      this._frame = null;
    },
    //------------------------------------------------------------------------------
    _animateZoom: function _animateZoom(e) {
      var scale = this._map.getZoomScale(e.zoom);

      var offset = this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center);

      L.DomUtil.setTransform(this._canvas, offset, scale);
    }
  });

  /**
   * Abstract class for a Field layer on canvas, aka 'a Raster layer'
   * (ScalarField or a VectorField)
   */

  var FieldMap = CanvasLayer.extend({
    options: {
      mouseMoveCursor: {
        value: 'pointer',
        noValue: 'default'
      },
      opacity: 1,
      onClick: null,
      onMouseMove: null,
      inFilter: null,
      border: false,
      borderWidth: 0.5,
      borderColor: '#000000',
      borderOpacity: 0.99
    },
    initialize: function initialize(field, options) {
      L.Util.setOptions(this, options);
      this._visible = true;

      if (field) {
        this.setData(field);
      }
    },
    getEvents: function getEvents() {
      var events = CanvasLayer.prototype.getEvents.call(this);
      events.zoomstart = this._hideCanvas.bind(this);
      events.zoomend = this._showCanvas.bind(this);
      return events;
    },
    onLayerDidMount: function onLayerDidMount() {
      this._enableIdentify();

      this._ensureCanvasAlignment();

      this._addControlBar();
    },
    show: function show() {
      this._visible = true;

      this._showCanvas();

      this._enableIdentify();
    },
    hide: function hide() {
      this._visible = false;

      this._hideCanvas();

      this._disableIdentify();
    },
    isVisible: function isVisible() {
      return this._visible;
    },
    _showCanvas: function _showCanvas() {
      if (this._canvas && this._visible) {
        this._canvas.style.visibility = 'visible';
      }
    },
    _hideCanvas: function _hideCanvas() {
      if (this._canvas) {
        this._canvas.style.visibility = 'hidden';
      }
    },
    _enableIdentify: function _enableIdentify() {
      this._map.on('click', this._onClick, this);

      this._map.on('mousemove', this._onMouseMove, this);

      this.options.onClick && this.on('click', this.options.onClick, this);
      this.options.onMouseMove && this.on('mousemove', this.options.onMouseMove, this);
    },
    _disableIdentify: function _disableIdentify() {
      this._map.off('click', this._onClick, this);

      this._map.off('mousemove', this._onMouseMove, this);

      this.options.onClick && this.off('click', this.options.onClick, this);
      this.options.onMouseMove && this.off('mousemove', this.options.onMouseMove, this);
    },
    _addControlBar: function _addControlBar() {
      if (!this.options.controlBar || !this.options.color.getAttr) return;

      if (!this._controlBar) {
        var control = L.control({
          position: 'bottomright'
        }),
            that = this;

        control.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'controlbar');
          var attrs = that.options.color.getAttr();

          for (var i in attrs.colors) {
            var color = attrs.colors[i].toHex(),
                value = attrs.values[i],
                innerDiv = L.DomUtil.create('div', 'controlbar-list', div),
                leftColor = L.DomUtil.create('div', 'left', innerDiv),
                rightValue = L.DomUtil.create('span', 'right', innerDiv);
            leftColor.style.backgroundColor = color;
            rightValue.innerHTML = value;
          }

          return div;
        };

        control.onRemove = function () {};

        this._controlBar = control;
      }

      this._controlBar.addTo(this._map);
    },
    _ensureCanvasAlignment: function _ensureCanvasAlignment() {
      var topLeft = this._map.containerPointToLayerPoint([0, 0]);

      L.DomUtil.setPosition(this._canvas, topLeft);
    },
    _animateZoom: function _animateZoom() {},
    onLayerWillUnmount: function onLayerWillUnmount() {
      this._disableIdentify();
    },
    needRedraw: function needRedraw() {
      if (this._map && this._field) {
        CanvasLayer.prototype.needRedraw.call(this);
      }
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function onDrawLayer(viewInfo) {
      throw new TypeError('Must be overriden');
    },

    /* eslint-enable no-unused-vars */
    setData: function setData(field) {
      this.options.inFilter && field.setFilter(this.options.inFilter);
      this._field = field;
      this.needRedraw();
      this.fire('load');
    },
    setFilter: function setFilter(f) {
      this.options.inFilter = f;
      this._field && this._field.setFilter(f);
      this.needRedraw();
    },
    setOpacity: function setOpacity(opacity) {
      this.options.opacity = opacity;

      if (this._canvas) {
        this._updateOpacity();
      }

      return this;
    },
    getBounds: function getBounds() {
      var bb = this._field.extent();

      var southWest = L.latLng(bb[1], bb[0]),
          northEast = L.latLng(bb[3], bb[2]);
      var bounds = L.latLngBounds(southWest, northEast);
      return bounds;
    },
    _onClick: function _onClick(e) {
      var v = this._queryValue(e);

      this.fire('click', v);
    },
    _onMouseMove: function _onMouseMove(e) {
      var v = this._queryValue(e);

      this._changeCursorOn(v);

      this.fire('mousemove', v);
    },
    _changeCursorOn: function _changeCursorOn(v) {
      if (!this.options.mouseMoveCursor) return;
      var _this$options$mouseMo = this.options.mouseMoveCursor,
          value = _this$options$mouseMo.value,
          noValue = _this$options$mouseMo.noValue;

      var style = this._map.getContainer().style;

      style.cursor = v.value !== null ? value : noValue;
    },
    _updateOpacity: function _updateOpacity() {
      L.DomUtil.setOpacity(this._canvas, this.options.opacity);
    },
    _queryValue: function _queryValue(e) {
      var v = this._field ? this._field.valueAt(e.latlng.lng, e.latlng.lat) : null;
      var result = {
        latlng: e.latlng,
        value: v
      };
      return result;
    },
    _getDrawingContext: function _getDrawingContext() {
      var g = this._canvas.getContext('2d');

      g.clearRect(0, 0, this._canvas.width, this._canvas.height);
      return g;
    }
  });
  /**
   * ScalarField on canvas (a 'Raster')
   */

  var ScalarFieldMap = FieldMap.extend({
    options: {
      type: 'colormap',
      // [colormap|vector]
      color: null,
      // function colorFor(value) [e.g. chromajs.scale],
      interpolate: false,
      // Change to use interpolation
      vectorSize: 20,
      // only used if 'vector'
      arrowDirection: 'from' // [from|towards]

    },
    initialize: function initialize(scalarField, options) {
      FieldMap.prototype.initialize.call(this, scalarField, options);
      L.Util.setOptions(this, options);
    },
    _defaultColorScale: function _defaultColorScale() {


      return colorScale(['white', 'black']).domain(this._field.range); // return chroma.scale(['white', 'black']).domain(this._field.range);
    },
    setColor: function setColor(f) {
      this.options.color = f;
      this.needRedraw();
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function onDrawLayer(viewInfo) {
      if (!this.isVisible()) return;

      this._updateOpacity();

      this._drawImage();
    },

    /* eslint-enable no-unused-vars */
    _ensureColor: function _ensureColor() {
      if (this.options.color === null) {
        this.setColor(this._defaultColorScale());
      }
    },
    _showCanvas: function _showCanvas() {
      FieldMap.prototype._showCanvas.call(this);

      this.needRedraw(); // TODO check spurious redraw (e.g. hide/show without moving map)
    },
    _drawImage: function _drawImage() {
      this._ensureColor();

      var borderColor = this.getBorderColor().toRGBA(),
          ctx = this._getDrawingContext(),
          bounds = this._pixelBounds(),
          pixelXSize = (bounds.max.x - bounds.min.x) / this._field.nCols,
          pixelYSize = (bounds.max.y - bounds.min.y) / this._field.nRows;

      ctx.lineWidth = this.options.borderWidth / 2;
      ctx.strokeStyle = borderColor;

      for (var j = 0; j < this._field.nRows; ++j) {
        for (var i = 0; i < this._field.nCols; ++i) {
          var value = this._field._valueAtIndexes(i, j);

          if (value === null) continue;

          var _xll = this._field.xllCorner + i * this._field.cellXSize,
              _yur = this._field.yurCorner - j * this._field.cellYSize;

          var _xllPixel = this._map.latLngToContainerPoint([_yur, _xll]).x,
              _yurPixel = this._map.latLngToContainerPoint([_yur, _xll]).y;

          var color = this._getColorFor(value);

          ctx.fillStyle = color.toRGBA();
          ctx.fillRect(_xllPixel, _yurPixel, pixelXSize, pixelYSize);

          if (this.options.border && 3 * this.options.borderWidth < Math.min(pixelXSize, pixelYSize)) {
            ctx.strokeRect(_xllPixel, _yurPixel, pixelXSize, pixelYSize);
          }
        }
      }
    },
    getBorderColor: function getBorderColor() {
      var color = new RGBColor(this.options.borderColor);

      if (color.a === null) {
        color.a = this.options.borderOpacity;
      }

      return color;
    },
    _isOnBorder: function _isOnBorder(x, y, epsilon) {
      var bounds = this._pixelBounds();

      var pixelXSize = (bounds.max.x - bounds.min.x) / this._field.nCols,
          pixelYSize = (bounds.max.y - bounds.min.y) / this._field.nRows;
      if ((x - bounds.min.x) % pixelXSize <= epsilon || (x - bounds.min.x) % pixelXSize >= pixelXSize - epsilon) return true;
      if ((y - bounds.min.y) % pixelYSize <= epsilon || (y - bounds.min.y) % pixelYSize >= pixelYSize - epsilon) return true;
      return false;
    },
    _pixelBounds: function _pixelBounds() {
      var bounds = this.getBounds();

      var northWest = this._map.latLngToContainerPoint(bounds.getNorthWest());

      var southEast = this._map.latLngToContainerPoint(bounds.getSouthEast());

      var pixelBounds = L.bounds(northWest, southEast);
      return pixelBounds;
    },

    /**
     * Gets a chroma color for a pixel value, according to 'options.color'
     */
    _getColorFor: function _getColorFor(v) {
      var c = this.options.color; // e.g. for a constant 'red'

      if (typeof c === 'function') {
        c = String(this.options.color(v));
      }

      var color = new RGBColor(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency

      return color;
    }
  });
  var scalarFieldMap = function scalarFieldMap(scalarField, options) {
    return new ScalarFieldMap(scalarField, options);
  };
  /**
   *  Abstract class for a set of values (Vector | Scalar)
   *  assigned to a regular 2D-grid (lon-lat), aka 'a Raster source'
   */

  var Field =
  /*#__PURE__*/
  function () {
    function Field(params) {
      _classCallCheck(this, Field);

      this.params = params;
      this.nCols = params['nCols'];
      this.nRows = params['nRows']; // alias

      this.width = params['nCols'];
      this.height = params['nRows']; // ll = lower-left

      this.xllCorner = params['xllCorner'];
      this.yllCorner = params['yllCorner']; // ur = upper-right

      this.xurCorner = params['xllCorner'] + params['nCols'] * params['cellXSize'];
      this.yurCorner = params['yllCorner'] + params['nRows'] * params['cellYSize'];
      this.cellXSize = params['cellXSize'];
      this.cellYSize = params['cellYSize'];
      this.grid = null; // to be defined by subclasses

      this.isContinuous = this.xurCorner - this.xllCorner >= 360;
      this.longitudeNeedsToBeWrapped = this.xurCorner > 180; // [0, 360] --> [-180, 180]

      this._inFilter = null;
      this._spatialMask = null;
    }
    /**
     * Builds a grid with a value at each point (either Vector or Number)
     * Original params must include the required input values, following
     * x-ascending & y-descending order (same as in ASCIIGrid)
     * @abstract
     * @private
     * @returns {Array.<Array.<Vector|Number>>} - grid[row][column]--> Vector|Number
     */


    _createClass(Field, [{
      key: "_buildGrid",
      value: function _buildGrid() {
        throw new TypeError('Must be overriden');
      }
    }, {
      key: "_updateRange",
      value: function _updateRange() {
        this.range = this._calculateRange();
      }
      /**
       * Number of cells in the grid (rows * cols)
       * @returns {Number}
       */

    }, {
      key: "numCells",
      value: function numCells() {
        return this.nRows * this.nCols;
      }
      /**
       * A list with every cell
       * @returns {Array<Cell>} - cells (x-ascending & y-descending order)
       */

    }, {
      key: "getCells",
      value: function getCells() {
        var stride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var cells = [];

        for (var j = 0; j < this.nRows; j = j + stride) {
          for (var i = 0; i < this.nCols; i = i + stride) {
            var _this$_lonLatAtIndexe = this._lonLatAtIndexes(i, j),
                _this$_lonLatAtIndexe2 = _slicedToArray(_this$_lonLatAtIndexe, 2),
                lon = _this$_lonLatAtIndexe2[0],
                lat = _this$_lonLatAtIndexe2[1];

            var center = L.latLng(lat, lon);

            var value = this._valueAtIndexes(i, j);

            var c = new Cell(center, value, this.cellXSize, this.cellYSize);
            cells.push(c); // <<
          }
        }

        return cells;
      }
      /**
       * Apply a filter function to field values
       * @param   {Function} f - boolean function
       */

    }, {
      key: "setFilter",
      value: function setFilter(f) {
        this._inFilter = f;

        this._updateRange();
      }
      /**
       * Apply a spatial mask to field values
       * @param {L.Polygon} m 
       * 
       * var poly = L.polygon([...]);
       * var s = ScalarField.fromASCIIGrid(...);
       * s.setSpatialMask(poly);
       */

    }, {
      key: "setSpatialMask",
      value: function setSpatialMask(m) {
        this._spatialMask = m;
      }
      /**
       * Grid extent
       * @returns {Number[]} [xmin, ymin, xmax, ymax]
       */

    }, {
      key: "extent",
      value: function extent() {
        var _this$_getWrappedLong = this._getWrappedLongitudes(),
            _this$_getWrappedLong2 = _slicedToArray(_this$_getWrappedLong, 2),
            xmin = _this$_getWrappedLong2[0],
            xmax = _this$_getWrappedLong2[1];

        return [xmin, this.yllCorner, xmax, this.yurCorner];
      }
      /**
       * [xmin, xmax] in [-180, 180] range
       */

    }, {
      key: "_getWrappedLongitudes",
      value: function _getWrappedLongitudes() {
        var xmin = this.xllCorner;
        var xmax = this.xurCorner;

        if (this.longitudeNeedsToBeWrapped) {
          if (this.isContinuous) {
            xmin = -180;
            xmax = 180;
          } else {
            // not sure about this (just one particular case, but others...?)
            xmax = this.xurCorner - 360;
            xmin = this.xllCorner - 360;
            /* eslint-disable no-console */
            // console.warn(`are these xmin: ${xmin} & xmax: ${xmax} OK?`);
            // TODO: Better throw an exception on no-controlled situations.

            /* eslint-enable no-console */
          }
        }

        return [xmin, xmax];
      }
      /**
       * Returns whether or not the grid contains the point, considering
       * the spatialMask if it has been previously set
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */

    }, {
      key: "contains",
      value: function contains(lon, lat) {
        if (this._spatialMask) {
          return this._pointInMask(lon, lat);
        }

        return this._pointInExtent(lon, lat);
      }
      /**
       * Checks if coordinates are inside the Extent (considering wrapped longitudes if needed)
       * @param {Number} lon 
       * @param {Number} lat 
       */

    }, {
      key: "_pointInExtent",
      value: function _pointInExtent(lon, lat) {
        var _this$_getWrappedLong3 = this._getWrappedLongitudes(),
            _this$_getWrappedLong4 = _slicedToArray(_this$_getWrappedLong3, 2),
            xmin = _this$_getWrappedLong4[0],
            xmax = _this$_getWrappedLong4[1];

        var longitudeIn = lon >= xmin && lon <= xmax;
        var latitudeIn = lat >= this.yllCorner && lat <= this.yurCorner;
        return longitudeIn && latitudeIn;
      }
      /**
       * Check if coordinates are inside the spatialMask (Point in Polygon analysis)
       * @param {Number} lon 
       * @param {Number} lat 
       */

    }, {
      key: "_pointInMask",
      value: function _pointInMask(lon, lat) {
        var pt = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lon, lat] // geojson, lon-lat order !

          },
          properties: {}
        };
        var poly = this._spatialMask;
        return this._inside(pt, poly);
      }
      /**
       * Check if point is inside the polygon.
       * @param {Object} pt 
       * @param {L.Polygon} poly 
       */

    }, {
      key: "_inside",
      value: function _inside(pt, poly) {
        var inside = false;
        var x = pt.geometry.coordinates[1],
            y = pt.geometry.coordinates[0];

        for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
          var polyPoints = poly.getLatLngs()[ii];

          for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat,
                yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat,
                yj = polyPoints[j].lng;
            var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect) inside = !inside;
          }
        }

        return inside;
      }
    }, {
      key: "notContains",

      /**
       * Returns if the grid doesn't contain the point
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */
      value: function notContains(lon, lat) {
        return !this.contains(lon, lat);
      }
      /**
       * Interpolated value at lon-lat coordinates (bilinear method)
       * @param   {Number} longitude
       * @param   {Number} latitude
       * @returns {Vector|Number} [u, v, magnitude]
       *                          
       * Source: https://github.com/cambecc/earth > product.js
       */

    }, {
      key: "interpolatedValueAt",
      value: function interpolatedValueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        var _this$_getDecimalInde = this._getDecimalIndexes(lon, lat),
            _this$_getDecimalInde2 = _slicedToArray(_this$_getDecimalInde, 2),
            i = _this$_getDecimalInde2[0],
            j = _this$_getDecimalInde2[1];

        return this.interpolatedValueAtIndexes(i, j);
      }
      /**
       * Interpolated value at i-j indexes (bilinear method)
       * @param   {Number} i
       * @param   {Number} j
       * @returns {Vector|Number} [u, v, magnitude]
       *
       * Source: https://github.com/cambecc/earth > product.js
       */

    }, {
      key: "interpolatedValueAtIndexes",
      value: function interpolatedValueAtIndexes(i, j) {
        //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
        //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
        //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
        //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
        //    j ___|_ .   |           (1, 9) and (2, 9).
        //  =8.3   |      |
        //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
        //         |      |           column, so the index ci can be used without taking a modulo.
        var indexes = this._getFourSurroundingIndexes(i, j);

        var _indexes = _slicedToArray(indexes, 4),
            fi = _indexes[0],
            ci = _indexes[1],
            fj = _indexes[2],
            cj = _indexes[3];

        var values = this._getFourSurroundingValues(fi, ci, fj, cj);

        if (values) {
          var _values = _slicedToArray(values, 4),
              g00 = _values[0],
              g10 = _values[1],
              g01 = _values[2],
              g11 = _values[3];

          return this._doInterpolation(i - fi, j - fj, g00, g10, g01, g11);
        }

        return null;
      }
      /**
       * Get decimal indexes
       * @private
       * @param {Number} lon
       * @param {Number} lat
       * @returns {Array}    [[Description]]
       */

    }, {
      key: "_getDecimalIndexes",
      value: function _getDecimalIndexes(lon, lat) {
        if (this.longitudeNeedsToBeWrapped && lon < this.xllCorner) {
          lon = lon + 360;
        }

        var i = (lon - this.xllCorner) / this.cellXSize;
        var j = (this.yurCorner - lat) / this.cellYSize;
        return [i, j];
      }
      /**
       * Get surrounding indexes (integer), clampling on borders
       * @private
       * @param   {Number} i - decimal index
       * @param   {Number} j - decimal index
       * @returns {Array} [fi, ci, fj, cj]
       */

    }, {
      key: "_getFourSurroundingIndexes",
      value: function _getFourSurroundingIndexes(i, j) {
        var fi = Math.floor(i);
        var ci = fi + 1; // duplicate colum to simplify interpolation logic (wrapped value)

        if (this.isContinuous && ci >= this.nCols) {
          ci = 0;
        }

        ci = this._clampColumnIndex(ci);

        var fj = this._clampRowIndex(Math.floor(j));

        var cj = this._clampRowIndex(fj + 1);

        return [fi, ci, fj, cj];
      }
      /**
       * Get four surrounding values or null if not available,
       * from 4 integer indexes
       * @private
       * @param   {Number} fi
       * @param   {Number} ci
       * @param   {Number} fj
       * @param   {Number} cj
       * @returns {Array} 
       */

    }, {
      key: "_getFourSurroundingValues",
      value: function _getFourSurroundingValues(fi, ci, fj, cj) {
        var row;

        if (row = this.grid[fj]) {
          // upper row ^^
          var g00 = row[fi]; // << left

          var g10 = row[ci]; // right >>

          if (this._isValid(g00) && this._isValid(g10) && (row = this.grid[cj])) {
            // lower row vv
            var g01 = row[fi]; // << left

            var g11 = row[ci]; // right >>

            if (this._isValid(g01) && this._isValid(g11)) {
              return [g00, g10, g01, g11]; // 4 values found!
            }
          }
        }

        return null;
      }
      /**
       * Nearest value at lon-lat coordinates
       * @param   {Number} longitude
       * @param   {Number} latitude
       * @returns {Vector|Number}
       */

    }, {
      key: "valueAt",
      value: function valueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        var _this$_getDecimalInde3 = this._getDecimalIndexes(lon, lat),
            _this$_getDecimalInde4 = _slicedToArray(_this$_getDecimalInde3, 2),
            i = _this$_getDecimalInde4[0],
            j = _this$_getDecimalInde4[1];

        var ii = Math.floor(i);
        var jj = Math.floor(j);

        var ci = this._clampColumnIndex(ii);

        var cj = this._clampRowIndex(jj);

        var value = this._valueAtIndexes(ci, cj);

        if (this._inFilter) {
          if (!this._inFilter(value)) return null;
        }

        return value;
      }
      /**
       * Returns whether or not the field has a value at the point
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */

    }, {
      key: "hasValueAt",
      value: function hasValueAt(lon, lat) {
        var value = this.valueAt(lon, lat);
        var hasValue = value !== null;
        var included = true;

        if (this._inFilter) {
          included = this._inFilter(value);
        }

        return hasValue && included;
      }
      /**
       * Returns if the grid has no value at the point
       * @param   {Number} lon - longitude
       * @param   {Number} lat - latitude
       * @returns {Boolean}
       */

    }, {
      key: "notHasValueAt",
      value: function notHasValueAt(lon, lat) {
        return !this.hasValueAt(lon, lat);
      }
      /**
       * Gives a random position to 'o' inside the grid
       * @param {Object} [o] - an object (eg. a particle)
       * @returns {{x: Number, y: Number}} - object with x, y (lon, lat)
       */

    }, {
      key: "randomPosition",
      value: function randomPosition() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var i = Math.random() * this.nCols | 0;
        var j = Math.random() * this.nRows | 0;
        o.x = this._longitudeAtX(i);
        o.y = this._latitudeAtY(j);
        return o;
      }
      /**
       * Value for grid indexes
       * @param   {Number} i - column index (integer)
       * @param   {Number} j - row index (integer)
       * @returns {Vector|Number}
       */

    }, {
      key: "_valueAtIndexes",
      value: function _valueAtIndexes(i, j) {
        return this.grid[j][i]; // <-- j,i !!
      }
      /**
       * Lon-Lat for grid indexes
       * @param   {Number} i - column index (integer)
       * @param   {Number} j - row index (integer)
       * @returns {Number[]} [lon, lat]
       */

    }, {
      key: "_lonLatAtIndexes",
      value: function _lonLatAtIndexes(i, j) {
        var lon = this._longitudeAtX(i);

        var lat = this._latitudeAtY(j);

        return [lon, lat];
      }
      /**
       * Longitude for grid-index
       * @param   {Number} i - column index (integer)
       * @returns {Number} longitude at the center of the cell
       */

    }, {
      key: "_longitudeAtX",
      value: function _longitudeAtX(i) {
        var halfXPixel = this.cellXSize / 2.0;
        var lon = this.xllCorner + halfXPixel + i * this.cellXSize;

        if (this.longitudeNeedsToBeWrapped) {
          lon = lon > 180 ? lon - 360 : lon;
        }

        return lon;
      }
      /**
       * Latitude for grid-index
       * @param   {Number} j - row index (integer)
       * @returns {Number} latitude at the center of the cell
       */

    }, {
      key: "_latitudeAtY",
      value: function _latitudeAtY(j) {
        var halfYPixel = this.cellYSize / 2.0;
        return this.yurCorner - halfYPixel - j * this.cellYSize;
      }
      /**
       * Apply the interpolation
       * @abstract
       * @private
       */

      /* eslint-disable no-unused-vars */

    }, {
      key: "_doInterpolation",
      value: function _doInterpolation(x, y, g00, g10, g01, g11) {
        throw new TypeError('Must be overriden');
      }
      /* eslint-disable no-unused-vars */

      /**
       * Check the column index is inside the field,
       * adjusting to min or max when needed
       * @private
       * @param   {Number} ii - index
       * @returns {Number} i - inside the allowed indexes
       */

    }, {
      key: "_clampColumnIndex",
      value: function _clampColumnIndex(ii) {
        var i = ii;

        if (ii < 0) {
          i = 0;
        }

        var maxCol = this.nCols - 1;

        if (ii > maxCol) {
          i = maxCol;
        }

        return i;
      }
      /**
       * Check the row index is inside the field,
       * adjusting to min or max when needed
       * @private
       * @param   {Number} jj index
       * @returns {Number} j - inside the allowed indexes
       */

    }, {
      key: "_clampRowIndex",
      value: function _clampRowIndex(jj) {
        var j = jj;

        if (jj < 0) {
          j = 0;
        }

        var maxRow = this.nRows - 1;

        if (jj > maxRow) {
          j = maxRow;
        }

        return j;
      }
      /**
       * Is valid (not 'null' nor 'undefined')
       * @private
       * @param   {Object} x object
       * @returns {Boolean}
       */

    }, {
      key: "_isValid",
      value: function _isValid(x) {
        return x !== null && x !== undefined;
      }
    }]);

    return Field;
  }();
  /**
   * Scalar Field
   */


  var ScalarField =
  /*#__PURE__*/
  function (_Field) {
    _inherits(ScalarField, _Field);

    _createClass(ScalarField, null, [{
      key: "fromASCIIGrid",

      /**
       * Creates a ScalarField from the content of an ASCIIGrid file
       * @param   {String}   asc
       * @returns {ScalarField}
       */
      value: function fromASCIIGrid(asc) {
        var scaleFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        //console.time('ScalarField from ASC');
        var lines = asc.split('\n'); // Header

        var header = ScalarField._parseASCIIGridHeader(lines.slice(0, 6)); // Data (left-right and top-down)


        var zs = [];

        for (var i = 6; i < lines.length; i++) {
          var line = lines[i].trim();
          if (line === '') break;
          var items = line.split(' ');
          items.forEach(function (it) {
            var floatItem = parseFloat(it);
            var v = floatItem !== header.noDataValue ? floatItem * scaleFactor : null;
            zs.push(v);
          });
        }

        var p = header;
        p.zs = zs; // p.range = [min_value, max]
        //console.timeEnd('ScalarField from ASC');

        return new ScalarField(p);
      }
      /**
       * Parse an ASCII Grid header, made with 6 lines
       * It allows the use of XLLCORNER/YLLCORNER or XLLCENTER/YLLCENTER conventions
       * @param {Array.String} headerLines
       */

    }, {
      key: "_parseASCIIGridHeader",
      value: function _parseASCIIGridHeader(headerLines) {
        try {
          var headerItems = headerLines.map(function (line) {
            var items = line.split(' ').filter(function (i) {
              return i != '';
            });
            var param = items[0].trim().toUpperCase();
            var value = param === 'CELLSIZE' ? items.slice(1, 3) : parseFloat(items[1].trim());
            return _defineProperty({}, param, value);
          }); // headerItems: [{ncols: xxx}, {nrows: xxx}, ...]

          var usesCorner = 'XLLCORNER' in headerItems[2];
          var cellXSize, cellYSize;

          if (headerItems[4]['CELLSIZE'].length == 2) {
            cellXSize = parseFloat(headerItems[4]['CELLSIZE'][0].trim());
            cellYSize = parseFloat(headerItems[4]['CELLSIZE'][1].trim());
          } else {
            cellXSize = cellYSize = parseFloat(headerItems[4]['CELLSIZE'][0].trim());
          } // const cellSize = headerItems[4]['CELLSIZE'];


          var header = {
            nCols: parseInt(headerItems[0]['NCOLS']),
            nRows: parseInt(headerItems[1]['NROWS']),
            xllCorner: usesCorner ? headerItems[2]['XLLCORNER'] : headerItems[2]['XLLCENTER'] - cellXSize,
            yllCorner: usesCorner ? headerItems[3]['YLLCORNER'] : headerItems[3]['YLLCENTER'] - cellYSize,
            cellXSize: cellXSize,
            cellYSize: cellYSize,
            noDataValue: headerItems[5]['NODATA_VALUE']
          };
          return header;
        } catch (err) {
          throw new Error("Not a valid ASCIIGrid Header: ".concat(err));
        }
      }
      /**
       * Creates a ScalarField from the content of a GeoTIFF file
       * @param   {ArrayBuffer}   data
       * @param   {Number}   bandIndex
       * @returns {ScalarField}
       */

    }, {
      key: "fromGeoTIFF",
      value: function fromGeoTIFF(data) {
        var bandIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return ScalarField.multipleFromGeoTIFF(data, [bandIndex])[0];
      }
      /**
       * Creates a ScalarField array (one per band) from the content of a GeoTIFF file
       * @param   {ArrayBuffer}   data
       * @param   {Array}   bandIndexes - if not provided all bands are returned
       * @returns {Array.<ScalarField>}
       */

    }, {
      key: "multipleFromGeoTIFF",
      value: function multipleFromGeoTIFF(data, bandIndexes) {
        //console.time('ScalarField from GeoTIFF');
        var tiff = GeoTIFF.parse(data); // geotiff.js

        var image = tiff.getImage();
        var rasters = image.readRasters();
        var tiepoint = image.getTiePoints()[0];
        var fileDirectory = image.getFileDirectory();

        var _fileDirectory$ModelP = _slicedToArray(fileDirectory.ModelPixelScale, 2),
            xScale = _fileDirectory$ModelP[0],
            yScale = _fileDirectory$ModelP[1];

        if (typeof bandIndexes === 'undefined' || bandIndexes.length === 0) {
          bandIndexes = _toConsumableArray(Array(rasters.length).keys());
        }

        var scalarFields = [];
        scalarFields = bandIndexes.map(function (bandIndex) {
          var zs = rasters[bandIndex]; // left-right and top-down order

          if (fileDirectory.GDAL_NODATA) {
            var noData = parseFloat(fileDirectory.GDAL_NODATA);
            var simpleZS = Array.from(zs); // to simple array, so null is allowed | TODO efficiency??

            zs = simpleZS.map(function (z) {
              return z === noData ? null : z;
            });
          }

          var p = {
            nCols: image.getWidth(),
            nRows: image.getHeight(),
            xllCorner: tiepoint.x,
            yllCorner: tiepoint.y - image.getHeight() * yScale,
            cellXSize: xScale,
            cellYSize: yScale,
            zs: zs
          };
          return new ScalarField(p);
        }); //console.timeEnd('ScalarField from GeoTIFF');

        return scalarFields;
      }
    }]);

    function ScalarField(params) {
      var _this;

      _classCallCheck(this, ScalarField);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ScalarField).call(this, params));
      _this.zs = params['zs'];
      _this.grid = _this._buildGrid();

      _this._updateRange();

      return _this;
    }
    /**
     * Builds a grid with a Number at each point, from an array
     * 'zs' following x-ascending & y-descending order
     * (same as in ASCIIGrid)
     * @private
     * @returns {Array.<Array.<Number>>} - grid[row][column]--> Number
     */


    _createClass(ScalarField, [{
      key: "_buildGrid",
      value: function _buildGrid() {
        var grid = this._arrayTo2d(this.zs, this.nRows, this.nCols);

        return grid;
      }
    }, {
      key: "_arrayTo2d",
      value: function _arrayTo2d(array, nRows, nCols) {
        var grid = [];
        var p = 0;

        for (var j = 0; j < nRows; j++) {
          var row = [];

          for (var i = 0; i < nCols; i++, p++) {
            var z = array[p];
            row[i] = this._isValid(z) ? z : null; // <<<
          }

          grid[j] = row;
        }

        return grid;
      }
    }, {
      key: "_newDataArrays",
      value: function _newDataArrays(params) {
        params['zs'] = [];
      }
    }, {
      key: "_pushValueToArrays",
      value: function _pushValueToArrays(params, value) {
        params['zs'].push(value);
      }
    }, {
      key: "_makeNewFrom",
      value: function _makeNewFrom(params) {
        return new ScalarField(params);
      }
      /**
       * Calculate min & max values
       * @private
       * @returns {Array} - [min, max]
       */

    }, {
      key: "_calculateRange",
      value: function _calculateRange() {
        var data = this.zs;

        if (this._inFilter) {
          data = data.filter(this._inFilter);
        }

        var min_value = undefined,
            max_value = undefined;

        for (var i = 0; i < data.length; ++i) {
          var v = data[i];
          if (v === null) continue;
          min_value = min_value === undefined ? v : min_value > v ? v : min_value;
          max_value = max_value === undefined ? v : max_value < v ? v : max_value;
        }

        return [min_value, max_value];
      }
      /**
       * Bilinear interpolation for Number
       * https://en.wikipedia.org/wiki/Bilinear_interpolation
       * @param   {Number} x
       * @param   {Number} y
       * @param   {Number} g00
       * @param   {Number} g10
       * @param   {Number} g01
       * @param   {Number} g11
       * @returns {Number}
       */

    }, {
      key: "_doInterpolation",
      value: function _doInterpolation(x, y, g00, g10, g01, g11) {
        var rx = 1 - x;
        var ry = 1 - y;
        return g00 * rx * ry + g10 * x * ry + g01 * rx * y + g11 * x * y;
      }
    }]);

    return ScalarField;
  }(Field);

  var SVGGridLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(SVGGridLayer, _BaseLayer);

    function SVGGridLayer(field, options) {
      var _this;

      _classCallCheck(this, SVGGridLayer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SVGGridLayer).call(this, options));
      _this._field = field;
      console.log(field);

      _this.makeData();

      return _this;
    }

    _createClass(SVGGridLayer, [{
      key: "setField",
      value: function setField(field) {
        this._field = field;
      }
    }, {
      key: "_ensureColor",
      value: function _ensureColor() {
        if (this.options.color === undefined) {
          this.options.color = this._defaultColorScale();
        }
      }
    }, {
      key: "_defaultColorScale",
      value: function _defaultColorScale() {

        return colorScale(['white', 'black']).domain(this._field.range); // return new ColorRangeFunction(this._field.range).fn;
      }
    }, {
      key: "_getColorFor",
      value: function _getColorFor(v) {
        var c = this.options.color; // e.g. for a constant 'red'

        if (typeof c === 'function') {
          c = String(this.options.color(v));
        }

        var color = new RGBColor(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency

        return color;
      }
    }, {
      key: "makeData",
      value: function makeData() {
        this._ensureColor();

        this._data = [];

        for (var i = 0; i < this._field.nRows; ++i) {
          for (var j = 0; j < this._field.nCols; ++j) {
            var value = this._field.grid[i][j];
            if (value === null) continue;
            console.log(value);

            var color = this._getColorFor(value);

            var point = {
              coordinates: [[this._field.yurCorner - i * this._field.cellYSize, this._field.xllCorner + j * this._field.cellXSize], [this._field.yurCorner - i * this._field.cellYSize, this._field.xllCorner + (j + 1) * this._field.cellXSize], [this._field.yurCorner - (i + 1) * this._field.cellYSize, this._field.xllCorner + (j + 1) * this._field.cellXSize], [this._field.yurCorner - (i + 1) * this._field.cellYSize, this._field.xllCorner + j * this._field.cellXSize]],
              options: {
                fillOpacity: 0.9,
                fillColor: color
              }
            };

            this._data.push(point);
          }
        }
      }
    }, {
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polygon(data.coordinates, data.options);
        });
      }
    }]);

    return SVGGridLayer;
  }(BaseLayer);

  var CanvasPolylineLayer = CanvasLayer.extend({
    options: {
      onClick: null
    },
    // polylines is an Array of polyline, which is an Array of L.latlng.
    initialize: function initialize(options) {
      L.Util.setOptions(this, options);
    },

    /**
     * 
     * @param {Array} data 
     * @param {function} fn 
     * 
     * var l = new CanvasPolylineLayer(options);
     * var arr = [[[1, 2], [11, 12], [21, 22]], [another polyline]];
     * l.data(arr, function(d) {
     *      return {
     *          coordinates: d.map(x => L.latLng(x)), 
     *          options: { color: d.length > 2 ? 'gray' : 'black' }
     *      }
     *  });
     * 
     * 
     */
    data: function data(_data, fn) {
      this._polylines = _data.map(fn);

      this._polylines.forEach(function (d) {
        d.coordinates = d.coordinates.map(function (x) {
          return L.latLng(x);
        });
        d.latLngBounds = L.latLngBounds();
        d.coordinates.forEach(function (x) {
          return d.latLngBounds.extend(x);
        });
        d.options = Object.assign({
          color: '#000000',
          width: 1,
          zoomLevel: 1
        }, d.options);
      });

      this._bounds = undefined;
      this.needRedraw();
    },
    _updateOpacity: function _updateOpacity() {
      L.DomUtil.setOpacity(this._canvas, this.options.opacity);
    },
    setOpacity: function setOpacity(opacity) {
      this.options.opacity = opacity;

      if (this._canvas) {
        this._updateOpacity();
      }

      return this;
    },
    getBounds: function getBounds() {
      if (this._map === undefined) return undefined;

      if (this._bounds === undefined) {
        var bounds = L.latLngBounds();

        this._polylines.forEach(function (pl) {
          bounds.extend(pl.latLngBounds);
        });

        this._bounds = bounds;
      }

      return this._bounds;
    },
    onDrawLayer: function onDrawLayer(viewInfo) {
      // if (!this.isVisible()) return;
      if (!this._map) return;

      this._updateOpacity();

      this._drawPolylines();
    },
    onLayerDidMount: function onLayerDidMount() {
      this._enableIdentify();
    },
    onLayerWillUnmount: function onLayerWillUnmount() {
      this._disableIdentify();
    },
    _enableIdentify: function _enableIdentify() {
      // Everytime when CLICK on `this._map`, `this` will 
      // react on a CLICK event.
      this._map.on('click', this._onClick, this); // If there exists an `onClick` parameter, then bind this 
      // function to CLICK event.


      this.options.onClick && this.on('click', this.options.onClick, this);
    },
    _disableIdentify: function _disableIdentify() {
      this._map.off('click', this._onClick, this);

      this.options.onClick && this.off('click', this.options.onClick, this);
    },
    _onClick: function _onClick(e) {
      var v = this._queryPolyline(e);

      this.fire('click', v);
    },
    needRedraw: function needRedraw() {
      if (this._map) {
        CanvasLayer.prototype.needRedraw.call(this);
      }
    },
    _displayPolyline: function _displayPolyline(polyline) {
      return this._map.getZoom() >= polyline.options.zoomLevel;
    },
    _drawPolylines: function _drawPolylines() {
      if (!this._polylines) return;

      var ctx = this._getDrawingContext();

      for (var i = 0; i < this._polylines.length; ++i) {
        if (!this._displayPolyline(this._polylines[i])) continue;

        var latlngs = this._polylines[i].coordinates.map(function (x) {
          return L.latLng(x);
        });

        this._prepareOptions(this._polylines[i], ctx);

        ctx.beginPath();
        if (latlngs.length) ctx.moveTo(this._map.latLngToContainerPoint(latlngs[0]).x, this._map.latLngToContainerPoint(latlngs[0]).y);

        for (var j = 1; j < latlngs.length; ++j) {
          ctx.lineTo(this._map.latLngToContainerPoint(latlngs[j]).x, this._map.latLngToContainerPoint(latlngs[j]).y);
        }

        ctx.stroke();
        ctx.closePath();
      }
    },
    _getDrawingContext: function _getDrawingContext() {
      var g = this._canvas.getContext('2d');

      g.clearRect(0, 0, this._canvas.width, this._canvas.height);
      return g;
    },
    _prepareOptions: function _prepareOptions(polyline, ctx) {
      ctx.lineWidth = polyline.options.width;
      ctx.strokeStyle = polyline.options.color;
    },
    _queryPolyline: function _queryPolyline(e) {
      var polyline = this._polylines && this.getBounds().contains(e.latlng) ? this._polylineAt(e.containerPoint) : undefined;
      return {
        event: e,
        polyline: polyline,
        latlng: e.latlng
      };
    },
    _polylineAt: function _polylineAt(point) {
      var min_precision = undefined,
          ret_polyline = undefined;

      for (var i = 0; i < this._polylines.length; ++i) {
        var polyline = this._polylines[i];
        if (!this._displayPolyline(polyline)) continue;

        var precision = this._pointIsOnPolyline(point, polyline);

        if (precision === false) continue; // point is not on this polyline

        min_precision = Math.min(min_precision || precision, precision);
        if (precision == min_precision) ret_polyline = polyline;
      }

      return ret_polyline;
    },
    _pointIsOnPolyline: function _pointIsOnPolyline(pt, polyline) {
      var _this = this;

      var latlngs = polyline.coordinates,
          lineWidth = polyline.options.width,
          containerPoints = latlngs.map(function (latlng) {
        return _this._map.latLngToContainerPoint(latlng);
      });
      var ret = false;
      if (polyline.latLngBounds && !polyline.latLngBounds.contains(this._map.containerPointToLatLng(pt))) return ret;

      for (var i = 0; i < containerPoints.length - 1; ++i) {
        var curPt = containerPoints[i],
            nextPt = containerPoints[i + 1];

        if (pt.x >= Math.min(curPt.x, nextPt.x) - 10 && pt.x <= Math.max(curPt.x, nextPt.x) + 10 && pt.y >= Math.min(curPt.y, nextPt.y) - 10 && pt.y <= Math.max(curPt.y, nextPt.y) + 10) {
          var precision = Math.abs((curPt.x - pt.x) / (curPt.y - pt.y) - (nextPt.x - pt.x) / (nextPt.y - pt.y));

          if (precision <= 1.618 + Math.log10(c._map.getZoom()) / 10) {
            ret = Math.min(ret || precision, precision);
          }
        }
      }

      return ret;
    }
  });

  exports.PointLayer = PointLayer;
  exports.PolygonLayer = PolygonLayer;
  exports.MarkerLayer = MarkerLayer;
  exports.ODLayer = ODLayer;
  exports.PolylineLayer = PolylineLayer;
  exports.ScalarFieldMap = ScalarFieldMap;
  exports.scalarFieldMap = scalarFieldMap;
  exports.ScalarField = ScalarField;
  exports.SVGGridLayer = SVGGridLayer;
  exports.CanvasPolylineLayer = CanvasPolylineLayer;
  exports.BaseLayer = BaseLayer;
  exports.OD = OD;
  exports.od = od;
  exports.RGBColor = RGBColor;
  exports.rgbColor = rgbColor;
  exports.ColorScale = ColorScale;
  exports.colorScale = colorScale;

  return exports;

}({}));
