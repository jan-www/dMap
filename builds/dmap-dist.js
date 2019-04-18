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
  var BaseLayer = L.Class.extend({
    initialize: function initialize(options) {
      if ((this instanceof initialize ? this.constructor : void 0) === BaseLayer) {
        throw new Error('Class BaseLayer cannot be initialized.');
      }

      L.Util.setOptions(this, options);
      this._data = []; // {}

      this._layer_group = undefined;
      console.log('Layer init');
    },
    on: function on(event_type, callback) {
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
    },
    setElementOptions: function setElementOptions(data, fn) {
      var array_options = data.map(fn),
          i = 0;

      for (i = 0; i < this._data.length; ++i) {
        this._data[i].options = this._data[i].options || {};

        if (i < data.length) {
          Object.assign(this._data[i].options, array_options[i]);
        }
      }

      return this;
    },
    data: function data(_data, fn) {
      this._data = _data.map(fn);
      return this;
    },
    addTo: function addTo(leaflet_map) {
      //this._map = leaflet_map; // for ODLayer update
      this._layer_group.addTo(leaflet_map);

      return this;
    },
    enter: function enter() {
      if (this._layer_group !== undefined) {
        this.remove();
      } // maybe delete this._layer_group ? 


      this._layer_group = L.featureGroup(this.generate() // rename would fit well
      );
      return this;
    },
    exit: function exit() {
      this.remove();
      return this;
    },
    generate: function generate() {
      return [];
    },
    remove: function remove() {
      if (this._layer_group !== undefined) {
        this._layer_group.remove();
      }

      return this; // return what??
    },
    getBounds: function getBounds() {
      return this._layer_group.getBounds();
    }
  });
  var _BaseLayer =
  /*#__PURE__*/
  function () {
    function _BaseLayer(options) {
      _classCallCheck(this, _BaseLayer);

      if ((this instanceof _BaseLayer ? this.constructor : void 0) === BaseLayer) {
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


    _createClass(_BaseLayer, [{
      key: "on",
      value: function on(event_type, callback) {
        var _this2 = this;

        if (this._layer_group !== undefined) {
          (function () {
            var layers = _this2._layer_group.getLayers();

            var _loop2 = function _loop2(i) {
              layers[i].on(event_type, function () {
                callback(this._data[i], i, layers[i]);
              }, _this2); //bind
            };

            for (var i = 0; i < layers.length; ++i) {
              _loop2(i);
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
      value: function data(_data2, fn) {
        this._data = _data2.map(fn);
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

    return _BaseLayer;
  }();

  var PointLayer = BaseLayer.extend({
    generate: function generate() {
      return this._data.map(function (data) {
        return L.circleMarker(data.coordinate, data.options);
      });
    }
  });
  var _PointLayer =
  /*#__PURE__*/
  function (_BaseLayer$$1) {
    _inherits(_PointLayer, _BaseLayer$$1);

    function _PointLayer(options) {
      _classCallCheck(this, _PointLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(_PointLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.circle.


    _createClass(_PointLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.circleMarker(data.coordinate, data.options);
        });
      }
    }]);

    return _PointLayer;
  }(BaseLayer);

  var PolygonLayer = BaseLayer.extend({
    generate: function generate() {
      return this._data.map(function (data) {
        return L.polygon(data.coordinates, data.options);
      });
    }
  });
  var _PolygonLayer =
  /*#__PURE__*/
  function (_BaseLayer$$1) {
    _inherits(_PolygonLayer, _BaseLayer$$1);

    function _PolygonLayer(options) {
      _classCallCheck(this, _PolygonLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(_PolygonLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.polygon


    _createClass(_PolygonLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polygon(data.coordinates, data.options);
        });
      }
    }]);

    return _PolygonLayer;
  }(BaseLayer);

  var MarkerLayer = BaseLayer.extend({
    generate: function generate() {
      return this._data.map(function (data) {
        return L.marker(data.coordinate, data.options);
      });
    }
  });
  var _MarkerLayer =
  /*#__PURE__*/
  function (_BaseLayer$$1) {
    _inherits(_MarkerLayer, _BaseLayer$$1);

    function _MarkerLayer(options) {
      _classCallCheck(this, _MarkerLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(_MarkerLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.Marker.


    _createClass(_MarkerLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.marker(data.coordinate, data.options);
        });
      }
    }]);

    return _MarkerLayer;
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

  var ODLayer = BaseLayer.extend({
    // @method generate
    // 
    // Return Array of L.od.
    generate: function generate() {
      return this._data.map(function (data) {
        return od(data.origin, data.destination, data.options);
      });
    },
    // use prefix before event type: 'org_click'
    // or several space-separated types: 'org_click mouseover'
    on: function on(event_type, callback) {
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
  });
  /*
   * @class ODLayer
   * @inherits BaseLayer
   *
   */

  var _ODLayer =
  /*#__PURE__*/
  function (_BaseLayer$$1) {
    _inherits(_ODLayer, _BaseLayer$$1);

    function _ODLayer(options) {
      _classCallCheck(this, _ODLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(_ODLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.od.


    _createClass(_ODLayer, [{
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

    return _ODLayer;
  }(BaseLayer);

  var PolylineLayer = BaseLayer.extend({
    generate: function generate() {
      return this._data.map(function (data) {
        return L.polyline(data.coordinates, data.options);
      });
    }
  });
  var _PolylineLayer =
  /*#__PURE__*/
  function (_BaseLayer$$1) {
    _inherits(_PolylineLayer, _BaseLayer$$1);

    function _PolylineLayer(options) {
      _classCallCheck(this, _PolylineLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(_PolylineLayer).call(this, options));
    } // @method generate
    // 
    // Return Array of L.Polyline.


    _createClass(_PolylineLayer, [{
      key: "generate",
      value: function generate() {
        return this._data.map(function (data) {
          return L.polyline(data.coordinates, data.options);
        });
      }
    }]);

    return _PolylineLayer;
  }(BaseLayer);

  function HeatmapLayer(options) {
    var that = this;

    (function (name, context, factory) {
      // Supports UMD. AMD, CommonJS/Node.js and browser context
      if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        context[name] = factory();
      }
    })("h337", this, function () {
      // Heatmap Config stores default values and will be merged with instance config
      var HeatmapConfig = {
        defaultRadius: 40,
        defaultRenderer: 'canvas2d',
        defaultGradient: {
          0.25: "rgb(0,0,255)",
          0.55: "rgb(0,255,0)",
          0.85: "yellow",
          1.0: "rgb(255,0,0)"
        },
        defaultMaxOpacity: 1,
        defaultMinOpacity: 0,
        defaultBlur: .85,
        defaultXField: 'x',
        defaultYField: 'y',
        defaultValueField: 'value',
        plugins: {}
      };

      var Store = function StoreClosure() {
        var Store = function Store(config) {
          this._coordinator = {};
          this._data = [];
          this._radi = [];
          this._min = 10;
          this._max = 1;
          this._xField = config['xField'] || config.defaultXField;
          this._yField = config['yField'] || config.defaultYField;
          this._valueField = config['valueField'] || config.defaultValueField;

          if (config["radius"]) {
            this._cfgRadius = config["radius"];
          }
        };

        var defaultRadius = HeatmapConfig.defaultRadius;
        Store.prototype = {
          // when forceRender = false -> called from setData, omits renderall event
          _organiseData: function _organiseData(dataPoint, forceRender) {
            var x = dataPoint[this._xField];
            var y = dataPoint[this._yField];
            var radi = this._radi;
            var store = this._data;
            var max = this._max;
            var min = this._min;
            var value = dataPoint[this._valueField] || 1;
            var radius = dataPoint.radius || this._cfgRadius || defaultRadius;

            if (!store[x]) {
              store[x] = [];
              radi[x] = [];
            }

            if (!store[x][y]) {
              store[x][y] = value;
              radi[x][y] = radius;
            } else {
              store[x][y] += value;
            }

            var storedVal = store[x][y];

            if (storedVal > max) {
              if (!forceRender) {
                this._max = storedVal;
              } else {
                this.setDataMax(storedVal);
              }

              return false;
            } else if (storedVal < min) {
              if (!forceRender) {
                this._min = storedVal;
              } else {
                this.setDataMin(storedVal);
              }

              return false;
            } else {
              return {
                x: x,
                y: y,
                value: value,
                radius: radius,
                min: min,
                max: max
              };
            }
          },
          _unOrganizeData: function _unOrganizeData() {
            var unorganizedData = [];
            var data = this._data;
            var radi = this._radi;

            for (var x in data) {
              for (var y in data[x]) {
                unorganizedData.push({
                  x: x,
                  y: y,
                  radius: radi[x][y],
                  value: data[x][y]
                });
              }
            }

            return {
              min: this._min,
              max: this._max,
              data: unorganizedData
            };
          },
          _onExtremaChange: function _onExtremaChange() {
            this._coordinator.emit('extremachange', {
              min: this._min,
              max: this._max
            });
          },
          addData: function addData() {
            if (arguments[0].length > 0) {
              var dataArr = arguments[0];
              var dataLen = dataArr.length;

              while (dataLen--) {
                this.addData.call(this, dataArr[dataLen]);
              }
            } else {
              // add to store  
              var organisedEntry = this._organiseData(arguments[0], true);

              if (organisedEntry) {
                // if it's the first datapoint initialize the extremas with it
                if (this._data.length === 0) {
                  this._min = this._max = organisedEntry.value;
                }

                this._coordinator.emit('renderpartial', {
                  min: this._min,
                  max: this._max,
                  data: [organisedEntry]
                });
              }
            }

            return this;
          },
          setData: function setData(data) {
            var dataPoints = data.data;
            var pointsLen = dataPoints.length; // reset data arrays

            this._data = [];
            this._radi = [];

            for (var i = 0; i < pointsLen; i++) {
              this._organiseData(dataPoints[i], false);
            }

            this._max = data.max;
            this._min = data.min || 0;

            this._onExtremaChange();

            this._coordinator.emit('renderall', this._getInternalData());

            return this;
          },
          removeData: function removeData() {// TODO: implement
          },
          setDataMax: function setDataMax(max) {
            this._max = max;

            this._onExtremaChange();

            this._coordinator.emit('renderall', this._getInternalData());

            return this;
          },
          setDataMin: function setDataMin(min) {
            this._min = min;

            this._onExtremaChange();

            this._coordinator.emit('renderall', this._getInternalData());

            return this;
          },
          setCoordinator: function setCoordinator(coordinator) {
            this._coordinator = coordinator;
          },
          _getInternalData: function _getInternalData() {
            return {
              max: this._max,
              min: this._min,
              data: this._data,
              radi: this._radi
            };
          },
          getData: function getData() {
            return this._unOrganizeData();
          }
          /*,
             TODO: rethink.
          getValueAt: function(point) {
             var value;
             var radius = 100;
             var x = point.x;
             var y = point.y;
             var data = this._data;
             if (data[x] && data[x][y]) {
             return data[x][y];
             } else {
             var values = [];
             // radial search for datapoints based on default radius
             for(var distance = 1; distance < radius; distance++) {
                 var neighbors = distance * 2 +1;
                 var startX = x - distance;
                 var startY = y - distance;
                 for(var i = 0; i < neighbors; i++) {
                 for (var o = 0; o < neighbors; o++) {
                     if ((i == 0 || i == neighbors-1) || (o == 0 || o == neighbors-1)) {
                     if (data[startY+i] && data[startY+i][startX+o]) {
                         values.push(data[startY+i][startX+o]);
                     }
                     } else {
                     continue;
                     } 
                 }
                 }
             }
             if (values.length > 0) {
                 return Math.max.apply(Math, values);
             }
             }
             return false;
          }*/

        };
        return Store;
      }();

      var Canvas2dRenderer = function Canvas2dRendererClosure() {
        var _getColorPalette = function _getColorPalette(config) {
          var gradientConfig = config.gradient || config.defaultGradient;
          var paletteCanvas = document.createElement('canvas');
          var paletteCtx = paletteCanvas.getContext('2d');
          paletteCanvas.width = 256;
          paletteCanvas.height = 1;
          var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);

          for (var key in gradientConfig) {
            gradient.addColorStop(key, gradientConfig[key]);
          }

          paletteCtx.fillStyle = gradient;
          paletteCtx.fillRect(0, 0, 256, 1);
          return paletteCtx.getImageData(0, 0, 256, 1).data;
        };

        var _getPointTemplate = function _getPointTemplate(radius, blurFactor) {
          var tplCanvas = document.createElement('canvas');
          var tplCtx = tplCanvas.getContext('2d');
          var x = radius;
          var y = radius;
          tplCanvas.width = tplCanvas.height = radius * 2;

          if (blurFactor == 1) {
            tplCtx.beginPath();
            tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
            tplCtx.fillStyle = 'rgba(0,0,0,1)';
            tplCtx.fill();
          } else {
            var gradient = tplCtx.createRadialGradient(x, y, radius * blurFactor, x, y, radius);
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            tplCtx.fillStyle = gradient;
            tplCtx.fillRect(0, 0, 2 * radius, 2 * radius);
          }

          return tplCanvas;
        };

        var _prepareData = function _prepareData(data) {
          var renderData = [];
          var min = data.min;
          var max = data.max;
          var radi = data.radi;
          var data = data.data;
          var xValues = Object.keys(data);
          var xValuesLen = xValues.length;

          while (xValuesLen--) {
            var xValue = xValues[xValuesLen];
            var yValues = Object.keys(data[xValue]);
            var yValuesLen = yValues.length;

            while (yValuesLen--) {
              var yValue = yValues[yValuesLen];
              var value = data[xValue][yValue];
              var radius = radi[xValue][yValue];
              renderData.push({
                x: xValue,
                y: yValue,
                value: value,
                radius: radius
              });
            }
          }

          return {
            min: min,
            max: max,
            data: renderData
          };
        };

        function Canvas2dRenderer(config) {
          var container = config.container;
          var shadowCanvas = this.shadowCanvas = document.createElement('canvas');
          var canvas = this.canvas = config.canvas || document.createElement('canvas');
          var renderBoundaries = this._renderBoundaries = [10000, 10000, 0, 0];
          var computed = getComputedStyle(config.container) || {};
          canvas.className = 'heatmap-canvas';
          this._width = canvas.width = shadowCanvas.width = config.width || +computed.width.replace(/px/, '');
          this._height = canvas.height = shadowCanvas.height = config.height || +computed.height.replace(/px/, '');
          this.shadowCtx = shadowCanvas.getContext('2d');
          this.ctx = canvas.getContext('2d'); // @TODO:
          // conditional wrapper

          canvas.style.cssText = shadowCanvas.style.cssText = 'position:absolute;left:0;top:0;';
          container.style.position = 'relative';
          container.appendChild(canvas);
          this._palette = _getColorPalette(config);
          this._templates = {};

          this._setStyles(config);
        }
        Canvas2dRenderer.prototype = {
          renderPartial: function renderPartial(data) {
            if (data.data.length > 0) {
              this._drawAlpha(data);

              this._colorize();
            }
          },
          renderAll: function renderAll(data) {
            // reset render boundaries
            this._clear();

            if (data.data.length > 0) {
              this._drawAlpha(_prepareData(data));

              this._colorize();
            }
          },
          _updateGradient: function _updateGradient(config) {
            this._palette = _getColorPalette(config);
          },
          updateConfig: function updateConfig(config) {
            if (config['gradient']) {
              this._updateGradient(config);
            }

            this._setStyles(config);
          },
          setDimensions: function setDimensions(width, height) {
            this._width = width;
            this._height = height;
            this.canvas.width = this.shadowCanvas.width = width;
            this.canvas.height = this.shadowCanvas.height = height;
          },
          _clear: function _clear() {
            this.shadowCtx.clearRect(0, 0, this._width, this._height);
            this.ctx.clearRect(0, 0, this._width, this._height);
          },
          _setStyles: function _setStyles(config) {
            this._blur = config.blur == 0 ? 0 : config.blur || config.defaultBlur;

            if (config.backgroundColor) {
              this.canvas.style.backgroundColor = config.backgroundColor;
            }

            this._width = this.canvas.width = this.shadowCanvas.width = config.width || this._width;
            this._height = this.canvas.height = this.shadowCanvas.height = config.height || this._height;
            this._opacity = (config.opacity || 0) * 255;
            this._maxOpacity = (config.maxOpacity || config.defaultMaxOpacity) * 255;
            this._minOpacity = (config.minOpacity || config.defaultMinOpacity) * 255;
            this._useGradientOpacity = !!config.useGradientOpacity;
          },
          _drawAlpha: function _drawAlpha(data) {
            var min = this._min = data.min;
            var max = this._max = data.max;
            var data = data.data || [];
            var dataLen = data.length; // on a point basis?

            var blur = 1 - this._blur;

            while (dataLen--) {
              var point = data[dataLen];
              var x = point.x;
              var y = point.y;
              var radius = point.radius; // if value is bigger than max
              // use max as value

              var value = Math.min(point.value, max);
              var rectX = x - radius;
              var rectY = y - radius;
              var shadowCtx = this.shadowCtx;
              var tpl;

              if (!this._templates[radius]) {
                this._templates[radius] = tpl = _getPointTemplate(radius, blur);
              } else {
                tpl = this._templates[radius];
              } // value from minimum / value range
              // => [0, 1]


              var templateAlpha = (value - min) / (max - min); // this fixes #176: small values are not visible because globalAlpha < .01 cannot be read from imageData

              shadowCtx.globalAlpha = templateAlpha < .01 ? .01 : templateAlpha;
              shadowCtx.drawImage(tpl, rectX, rectY); // update renderBoundaries

              if (rectX < this._renderBoundaries[0]) {
                this._renderBoundaries[0] = rectX;
              }

              if (rectY < this._renderBoundaries[1]) {
                this._renderBoundaries[1] = rectY;
              }

              if (rectX + 2 * radius > this._renderBoundaries[2]) {
                this._renderBoundaries[2] = rectX + 2 * radius;
              }

              if (rectY + 2 * radius > this._renderBoundaries[3]) {
                this._renderBoundaries[3] = rectY + 2 * radius;
              }
            }
          },
          _colorize: function _colorize() {
            var x = this._renderBoundaries[0];
            var y = this._renderBoundaries[1];
            var width = this._renderBoundaries[2] - x;
            var height = this._renderBoundaries[3] - y;
            var maxWidth = this._width;
            var maxHeight = this._height;
            var opacity = this._opacity;
            var maxOpacity = this._maxOpacity;
            var minOpacity = this._minOpacity;
            var useGradientOpacity = this._useGradientOpacity;

            if (x < 0) {
              x = 0;
            }

            if (y < 0) {
              y = 0;
            }

            if (x + width > maxWidth) {
              width = maxWidth - x;
            }

            if (y + height > maxHeight) {
              height = maxHeight - y;
            }

            var img = this.shadowCtx.getImageData(x, y, width, height);
            var imgData = img.data;
            var len = imgData.length;
            var palette = this._palette;

            for (var i = 3; i < len; i += 4) {
              var alpha = imgData[i];
              var offset = alpha * 4;

              if (!offset) {
                continue;
              }

              var finalAlpha;

              if (opacity > 0) {
                finalAlpha = opacity;
              } else {
                if (alpha < maxOpacity) {
                  if (alpha < minOpacity) {
                    finalAlpha = minOpacity;
                  } else {
                    finalAlpha = alpha;
                  }
                } else {
                  finalAlpha = maxOpacity;
                }
              }

              imgData[i - 3] = palette[offset];
              imgData[i - 2] = palette[offset + 1];
              imgData[i - 1] = palette[offset + 2];
              imgData[i] = useGradientOpacity ? palette[offset + 3] : finalAlpha;
            }

            img.data = imgData;
            this.ctx.putImageData(img, x, y);
            this._renderBoundaries = [1000, 1000, 0, 0];
          },
          getValueAt: function getValueAt(point) {
            var value;
            var shadowCtx = this.shadowCtx;
            var img = shadowCtx.getImageData(point.x, point.y, 1, 1);
            var data = img.data[3];
            var max = this._max;
            var min = this._min;
            value = Math.abs(max - min) * (data / 255) >> 0;
            return value;
          },
          getDataURL: function getDataURL() {
            return this.canvas.toDataURL();
          }
        };
        return Canvas2dRenderer;
      }();

      var Renderer = function RendererClosure() {
        var rendererFn = false;

        if (HeatmapConfig['defaultRenderer'] === 'canvas2d') {
          rendererFn = Canvas2dRenderer;
        }

        return rendererFn;
      }();

      var Util = {
        merge: function merge() {
          var merged = {};
          var argsLen = arguments.length;

          for (var i = 0; i < argsLen; i++) {
            var obj = arguments[i];

            for (var key in obj) {
              merged[key] = obj[key];
            }
          }

          return merged;
        }
      }; // Heatmap Constructor

      var Heatmap = function HeatmapClosure() {
        var Coordinator = function CoordinatorClosure() {
          function Coordinator() {
            this.cStore = {};
          }
          Coordinator.prototype = {
            on: function on(evtName, callback, scope) {
              var cStore = this.cStore;

              if (!cStore[evtName]) {
                cStore[evtName] = [];
              }

              cStore[evtName].push(function (data) {
                return callback.call(scope, data);
              });
            },
            emit: function emit(evtName, data) {
              var cStore = this.cStore;

              if (cStore[evtName]) {
                var len = cStore[evtName].length;

                for (var i = 0; i < len; i++) {
                  var callback = cStore[evtName][i];
                  callback(data);
                }
              }
            }
          };
          return Coordinator;
        }();

        var _connect = function _connect(scope) {
          var renderer = scope._renderer;
          var coordinator = scope._coordinator;
          var store = scope._store;
          coordinator.on('renderpartial', renderer.renderPartial, renderer);
          coordinator.on('renderall', renderer.renderAll, renderer);
          coordinator.on('extremachange', function (data) {
            scope._config.onExtremaChange && scope._config.onExtremaChange({
              min: data.min,
              max: data.max,
              gradient: scope._config['gradient'] || scope._config['defaultGradient']
            });
          });
          store.setCoordinator(coordinator);
        };

        function Heatmap() {
          var config = this._config = Util.merge(HeatmapConfig, arguments[0] || {});
          this._coordinator = new Coordinator();

          if (config['plugin']) {
            var pluginToLoad = config['plugin'];

            if (!HeatmapConfig.plugins[pluginToLoad]) {
              throw new Error('Plugin \'' + pluginToLoad + '\' not found. Maybe it was not registered.');
            } else {
              var plugin = HeatmapConfig.plugins[pluginToLoad]; // set plugin renderer and store

              this._renderer = new plugin.renderer(config);
              this._store = new plugin.store(config);
            }
          } else {
            this._renderer = new Renderer(config);
            this._store = new Store(config);
          }

          _connect(this);
        }
        // add API documentation

        Heatmap.prototype = {
          addData: function addData() {
            this._store.addData.apply(this._store, arguments);

            return this;
          },
          removeData: function removeData() {
            this._store.removeData && this._store.removeData.apply(this._store, arguments);
            return this;
          },
          setData: function setData() {
            this._store.setData.apply(this._store, arguments);

            return this;
          },
          setDataMax: function setDataMax() {
            this._store.setDataMax.apply(this._store, arguments);

            return this;
          },
          setDataMin: function setDataMin() {
            this._store.setDataMin.apply(this._store, arguments);

            return this;
          },
          configure: function configure(config) {
            this._config = Util.merge(this._config, config);

            this._renderer.updateConfig(this._config);

            this._coordinator.emit('renderall', this._store._getInternalData());

            return this;
          },
          repaint: function repaint() {
            this._coordinator.emit('renderall', this._store._getInternalData());

            return this;
          },
          getData: function getData() {
            return this._store.getData();
          },
          getDataURL: function getDataURL() {
            return this._renderer.getDataURL();
          },
          getValueAt: function getValueAt(point) {
            if (this._store.getValueAt) {
              return this._store.getValueAt(point);
            } else if (this._renderer.getValueAt) {
              return this._renderer.getValueAt(point);
            } else {
              return null;
            }
          }
        };
        return Heatmap;
      }(); // core


      var heatmapFactory = {
        create: function create(config) {
          return new Heatmap(config);
        },
        register: function register(pluginKey, plugin) {
          HeatmapConfig.plugins[pluginKey] = plugin;
        }
      };
      return heatmapFactory;
    });

    (function (name, context, factory) {
      // Supports UMD. AMD, CommonJS/Node.js and browser context
      if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        context[name] = factory();
      }
    })("HeatmapOverlay", this, function () {
      // Leaflet < 0.8 compatibility
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
          var h337 = typeof require !== 'undefined' ? require('heatmap.js') : that.h337;
          this._map = map;
          this._width = size.x;
          this._height = size.y;
          this._el.style.width = size.x + 'px';
          this._el.style.height = size.y + 'px';
          this._el.style.position = 'absolute';

          this._resetOrigin();

          map.getPanes().overlayPane.appendChild(this._el);

          if (!this._heatmap) {
            this._heatmap = h337.create(this.cfg);
          } // this resets the origin and redraws whenever
          // the zoom changed or the map has been moved


          map.on('moveend', this._resetOrigin, this);

          this._draw();
        },
        addTo: function addTo(map) {
          map.addLayer(this);
          return this;
        },
        onRemove: function onRemove(map) {
          // remove layer's DOM elements and listeners
          map.getPanes().overlayPane.removeChild(this._el);
          map.off('moveend', this._resetOrigin, this);
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
        _resetOrigin: function _resetOrigin() {
          this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));

          var size = this._map.getSize();

          if (this._width !== size.x || this._height !== size.y) {
            this._width = size.x;
            this._height = size.y;
            this._el.style.width = this._width + 'px';
            this._el.style.height = this._height + 'px';
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
      }();

      return HeatmapOverlay;
    });

    var heatmapLayer = new that.HeatmapOverlay(options);
    return heatmapLayer;
  }

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

  var CanvasGridLayer = FieldMap.extend({
    options: {
      type: 'colormap',
      // [colormap|vector]
      color: null,
      // function colorFor(value) [e.g. chromajs.scale],
      controlBar: false
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
  var canvasGridLayer = function canvasGridLayer(scalarField, options) {
    return new CanvasGridLayer(scalarField, options);
  };

  var SVGGridLayer =
  /*#__PURE__*/
  function (_BaseLayer$$1) {
    _inherits(SVGGridLayer, _BaseLayer$$1);

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
      onClick: null,
      cursor: 'grab',
      divideParts: 2
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
      this.getBounds();
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
      if (this._bounds === undefined) {
        var bounds = L.latLngBounds();

        this._polylines.forEach(function (pl) {
          bounds.extend(pl.latLngBounds);
        });

        this._bounds = bounds;

        this._divideParts();
      }

      return this._bounds;
    },
    _divideParts: function _divideParts() {
      var _this = this;

      var n = this.options.divideParts,
          west = this.getBounds().getWest(),
          east = this.getBounds().getEast(),
          north = this.getBounds().getNorth(),
          south = this.getBounds().getSouth();
      this._divideBoundsParts = [];
      this._dividePolylinesParts = [];

      for (var i = 0; i < n; ++i) {
        var lat_rate_1 = i / n,
            lat_rate_2 = (i + 1) / n;

        for (var j = 0; j < n; ++j) {
          var lng_rate_1 = j / n,
              lng_rate_2 = (j + 1) / n,
              _southWest = L.latLng(south + lat_rate_1 * (north - south), west + lng_rate_1 * (east - west)),
              _northEast = L.latLng(south + lat_rate_2 * (north - south), west + lng_rate_2 * (east - west)),
              divideBoundsPart = L.latLngBounds(_southWest, _northEast);

          this._divideBoundsParts.push(divideBoundsPart);
        }
      }

      var _loop = function _loop(_i) {
        var divideBoundsPart = _this._divideBoundsParts[_i],
            dividePolylinesPart = [];

        _this._polylines.forEach(function (polyline) {
          if (polyline.latLngBounds.intersects(divideBoundsPart)) dividePolylinesPart.push(polyline);
        });

        _this._dividePolylinesParts.push(dividePolylinesPart);
      };

      for (var _i in this._divideBoundsParts) {
        _loop(_i);
      }
    },
    onDrawLayer: function onDrawLayer(viewInfo) {
      // if (!this.isVisible()) return;
      if (!this._map) return;

      this._updateOpacity();

      this._drawPolylines();
    },
    onLayerDidMount: function onLayerDidMount() {
      this._enableIdentify();

      this._map.getContainer().style.cursor = this.options.cursor;
    },
    onLayerWillUnmount: function onLayerWillUnmount() {
      this._disableIdentify();

      this._map.getContainer().style.cursor = '';
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
    _isDisplayPolyline: function _isDisplayPolyline(polyline) {
      return this._map.getZoom() >= polyline.options.zoomLevel;
    },
    _drawPolylines: function _drawPolylines() {
      if (!this._polylines) return;

      var ctx = this._getDrawingContext();

      for (var i = 0; i < this._polylines.length; ++i) {
        if (!this._isDisplayPolyline(this._polylines[i])) continue;

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
          ret_polyline = undefined,
          dividePolylinesPart = undefined,
          latlng = this._map.containerPointToLatLng(point);

      for (var i = 0; i < this._divideBoundsParts.length; ++i) {
        if (this._divideBoundsParts[i].contains(latlng)) {
          dividePolylinesPart = this._dividePolylinesParts[i];
          break;
        }
      }

      if (dividePolylinesPart === undefined) return undefined;

      for (var _i2 = 0; _i2 < dividePolylinesPart.length; ++_i2) {
        var polyline = dividePolylinesPart[_i2];
        if (!this._isDisplayPolyline(polyline)) continue;

        var precision = this._pointIsOnPolyline(point, polyline);

        if (precision === false) continue; // point is not on this polyline

        min_precision = Math.min(min_precision || precision, precision);
        if (precision == min_precision) ret_polyline = polyline;
      }

      return ret_polyline;
    },
    _pointIsOnPolyline: function _pointIsOnPolyline(pt, polyline) {
      var _this2 = this;

      var latlngs = polyline.coordinates,
          lineWidth = polyline.options.width,
          containerPoints = latlngs.map(function (latlng) {
        return _this2._map.latLngToContainerPoint(latlng);
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

  var TimelineLayer =
  /*#__PURE__*/
  function () {
    function TimelineLayer(mymap, options) {
      _classCallCheck(this, TimelineLayer);

      this._times = [];
      this._data = [];
      this.times2index = {};
      this._layers = [];
      this._curlayer = null;
      this._map = mymap;
      this._isrunning = false;

      this.timechangefun = function (d, i, t, layer) {};

      this.timeline = document.createElement("div");
      this.timeline.id = "timeline";
      this.timeline.style.visibility = "visible";
      document.body.appendChild(this.timeline);
      this.slider = document.createElement("input");
      this.slider.type = "range";
      this.slider.min = 0;
      this.slider.max = 4;
      this.slider.value = 0;
      this.slider.id = "myRange";
      this.bt_play = document.createElement("button");
      this.bt_play.type = "button";
      this.bt_play.id = "bt_play";
      this.bt_play.textContent = "play";
      this.par = document.createElement("p");
      this.par.textContent = "Vaule: ";
      this.output = document.createElement("span");
      this.output.id = "demo";
      this.par.appendChild(this.output);
      this.timeline.appendChild(this.slider);
      this.timeline.appendChild(this.bt_play);
      this.timeline.appendChild(this.par);
      this.setOption(options);
      var tmp = this;

      this.slider.onclick = function () {
        tmp.renderAtTime(tmp.output.innerHTML, tmp._map);
      };
    }

    _createClass(TimelineLayer, [{
      key: "setOption",
      value: function setOption(options) {
        this.options = options;
      }
    }, {
      key: "data",
      value: function data(time, _data, fn) {
        this._times = time;
        this._data = _data;
        this.slider.max = time.length - 1;

        for (var i = 0; i < time.length; i++) {
          this.times2index[this._times[i]] = i;
        }

        for (var _i = 0; _i < time.length; _i++) {
          var l = new PointLayer();
          this._layers[_i] = l.data(_data[_i], fn).enter();
        }

        this.listen();
        return this;
      }
    }, {
      key: "listen",
      value: function listen() {
        //添加slider监听事件
        var tmp = this;

        this.slider.oninput = function () {
          tmp.output.innerHTML = tmp._times[tmp.slider.value];
          return tmp.output.innerHTML;
        };

        this.output.innerHTML = this._times[this.slider.value]; // Display the default slider value
        //the timeline is(not) visible

        if (this.options.enableControl == false) {
          timeline.style.visibility = "hidden";
        } else {
          timeline.style.visibility = "visible";
        } //是否自动播放


        if (this.options.autoPlay == true) {
          this.play(this._times[0], this._map);
        } else {
          this.renderAtTime(this._times[0], this._map);
        } //添加播放按钮监听事件


        var tmp = this;

        this.bt_play.onclick = function () {
          // tmp.running = 1;
          tmp.play(tmp._times[0], tmp._map);
        }; // this.bt_stop.onclick = function(){
        //     tmp.running = 2;
        // }
        // this.bt_pause.onclick = function(){
        //     tmp.running = 3;
        // }

      }
    }, {
      key: "renderAtTime",
      value: function renderAtTime(time_index) {
        if (this._curlayer != null) {
          this._curlayer.remove();
        }

        switch (this.options.layerType) {
          case "PointMap":
            this._layers[this.times2index[time_index]].addTo(this._map);

            this._curlayer = this._layers[this.times2index[time_index]];
            break;

          case "heatmap":
            this._curlayer = new HeatmapOverlay(this.options.layerOption).addTo(this._map);

            this._curlayer.setData(this._data[this.times2index[time_index]]);

            break;

          default:
            throw new Error(this.options.layerType + 'is not exist in the timelinelayer');
        }

        this.slider.value = this.times2index[time_index];
        this.output.innerHTML = time_index;
        var index = Number(this.slider.value);
        this.timechangefun(this._data[index], index, this._times[index], this._curlayer);
      }
    }, {
      key: "on",
      value: function on(event, f) {
        if (event === "timechange") {
          this.timechangefun = f;
        }
      }
    }, {
      key: "play",
      value: function play(time) {
        var _this = this;

        var index = this.times2index[time];

        if (this._isrunning == false) {
          this._isrunning = true; //es6 promise

          var _loop = function _loop(i) {
            tmp = _this;

            (function () {
              setTimeout(function () {
                tmp.renderAtTime(tmp._times[i], tmp._map);

                if (i == tmp._times.length - 1) {
                  tmp._isrunning = false;
                }
              }, tmp.options.tickTime * i);
            })();
          };

          for (var i = index; i < this._times.length; i++) {
            var tmp;

            _loop(i);
          }
        }
      }
    }]);

    return TimelineLayer;
  }();

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
       * Nearest value at lon-lat coordinates
       * @param   {Number} longitude
       * @param   {Number} latitude
       * @returns {Vector|Number}
       */

    }, {
      key: "valueAt",
      value: function valueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        var _this$_getDecimalInde = this._getDecimalIndexes(lon, lat),
            _this$_getDecimalInde2 = _slicedToArray(_this$_getDecimalInde, 2),
            i = _this$_getDecimalInde2[0],
            j = _this$_getDecimalInde2[1];

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

  /**
   * A class to define animation queue
   * @author Stoyan Stefanov <sstoo@gmail.com>
   * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
   * @license MIT license
   */

  /*
  Usage: var timer = new dTimer() //similiar to setInterval
  timer(function(elapsed){
      //TO DO : elapsed = Animation trigger time - Animation start time
      return True; //If you want timer stop, please return True value
  }, delay, then)
  */
  function dTimer() {
    var dMap_timer_queueHead,
        dMap_timer_queueTail,
        dMap_timer_interval,
        dMap_timer_timeout,
        dMap_timer_frame = window.requestAnimationFrame || function (callback) {
      setTimeout(callback, 17);
    };

    function dMap_timer(callback, delay, then) {
      var n = arguments.length;
      if (n < 2) delay = 0;
      if (n < 3) then = Date.now();
      var time = then + delay,
          timer = {
        c: callback,
        t: time,
        n: null
      };
      if (dMap_timer_queueTail) dMap_timer_queueTail.n = timer;else dMap_timer_queueHead = timer;
      dMap_timer_queueTail = timer;

      if (!dMap_timer_interval) {
        dMap_timer_timeout = clearTimeout(dMap_timer_timeout);
        dMap_timer_interval = 1;
        dMap_timer_frame(dMap_timer_step);
      }

      return timer;
    }

    function dMap_timer_step() {
      var now = dMap_timer_mark(),
          delay = dMap_timer_sweep() - now;

      if (delay > 24) {
        if (isFinite(delay)) {
          clearTimeout(dMap_timer_timeout);
          dMap_timer_timeout = setTimeout(dMap_timer_step, delay);
        }

        dMap_timer_interval = 0;
      } else {
        dMap_timer_interval = 1;
        dMap_timer_frame(dMap_timer_step);
      }
    }

    dMap_timer.flush = function () {
      dMap_timer_mark();
      dMap_timer_sweep();
    };

    function dMap_timer_mark() {
      var now = Date.now(),
          timer = dMap_timer_queueHead;

      while (timer) {
        if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
        timer = timer.n;
      }

      return now;
    }

    function dMap_timer_sweep() {
      var t0,
          t1 = dMap_timer_queueHead,
          time = Infinity;

      while (t1) {
        if (t1.c) {
          if (t1.t < time) time = t1.t;
          t1 = (t0 = t1).n;
        } else {
          t1 = t0 ? t0.n = t1.n : dMap_timer_queueHead = t1.n;
        }
      }

      dMap_timer_queueTail = t0;
      return time;
    }

    return function () {
      dMap_timer.apply(this, arguments);
    };
  }
  /*
  d3 transition source code

    function d3_transition(groups, ns, id) {
      d3_subclass(groups, d3_transitionPrototype);
      groups.namespace = ns;
      groups.id = id;
      return groups;
    }
    var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
    d3_transitionPrototype.call = d3_selectionPrototype.call;
    d3_transitionPrototype.empty = d3_selectionPrototype.empty;
    d3_transitionPrototype.node = d3_selectionPrototype.node;
    d3_transitionPrototype.size = d3_selectionPrototype.size;
    d3.transition = function(selection, name) {
      return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
    };
    d3.transition.prototype = d3_transitionPrototype;
    d3_transitionPrototype.select = function(selector) {
      var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
      selector = d3_selection_selector(selector);
      for (var j = -1, m = this.length; ++j < m; ) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
          if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            d3_transitionNode(subnode, i, ns, id, node[ns][id]);
            subgroup.push(subnode);
          } else {
            subgroup.push(null);
          }
        }
      }
      return d3_transition(subgroups, ns, id);
    };
    d3_transitionPrototype.selectAll = function(selector) {
      var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
      selector = d3_selection_selectorAll(selector);
      for (var j = -1, m = this.length; ++j < m; ) {
        for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
          if (node = group[i]) {
            transition = node[ns][id];
            subnodes = selector.call(node, node.__data__, i, j);
            subgroups.push(subgroup = []);
            for (var k = -1, o = subnodes.length; ++k < o; ) {
              if (subnode = subnodes[k]) d3_transitionNode(subnode, k, ns, id, transition);
              subgroup.push(subnode);
            }
          }
        }
      }
      return d3_transition(subgroups, ns, id);
    };
    d3_transitionPrototype.filter = function(filter) {
      var subgroups = [], subgroup, group, node;
      if (typeof filter !== "function") filter = d3_selection_filter(filter);
      for (var j = 0, m = this.length; j < m; j++) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = 0, n = group.length; i < n; i++) {
          if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
            subgroup.push(node);
          }
        }
      }
      return d3_transition(subgroups, this.namespace, this.id);
    };
    d3_transitionPrototype.tween = function(name, tween) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
      return d3_selection_each(this, tween == null ? function(node) {
        node[ns][id].tween.remove(name);
      } : function(node) {
        node[ns][id].tween.set(name, tween);
      });
    };
    function d3_transition_tween(groups, name, value, tween) {
      var id = groups.id, ns = groups.namespace;
      return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
        node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
      } : (value = tween(value), function(node) {
        node[ns][id].tween.set(name, value);
      }));
    }
    d3_transitionPrototype.attr = function(nameNS, value) {
      if (arguments.length < 2) {
        for (value in nameNS) this.attr(value, nameNS[value]);
        return this;
      }
      var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
      function attrNull() {
        this.removeAttribute(name);
      }
      function attrNullNS() {
        this.removeAttributeNS(name.space, name.local);
      }
      function attrTween(b) {
        return b == null ? attrNull : (b += "", function() {
          var a = this.getAttribute(name), i;
          return a !== b && (i = interpolate(a, b), function(t) {
            this.setAttribute(name, i(t));
          });
        });
      }
      function attrTweenNS(b) {
        return b == null ? attrNullNS : (b += "", function() {
          var a = this.getAttributeNS(name.space, name.local), i;
          return a !== b && (i = interpolate(a, b), function(t) {
            this.setAttributeNS(name.space, name.local, i(t));
          });
        });
      }
      return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
    };
    d3_transitionPrototype.attrTween = function(nameNS, tween) {
      var name = d3.ns.qualify(nameNS);
      function attrTween(d, i) {
        var f = tween.call(this, d, i, this.getAttribute(name));
        return f && function(t) {
          this.setAttribute(name, f(t));
        };
      }
      function attrTweenNS(d, i) {
        var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
        return f && function(t) {
          this.setAttributeNS(name.space, name.local, f(t));
        };
      }
      return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
    };
    d3_transitionPrototype.style = function(name, value, priority) {
      var n = arguments.length;
      if (n < 3) {
        if (typeof name !== "string") {
          if (n < 2) value = "";
          for (priority in name) this.style(priority, name[priority], value);
          return this;
        }
        priority = "";
      }
      function styleNull() {
        this.style.removeProperty(name);
      }
      function styleString(b) {
        return b == null ? styleNull : (b += "", function() {
          var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
          return a !== b && (i = d3_interpolate(a, b), function(t) {
            this.style.setProperty(name, i(t), priority);
          });
        });
      }
      return d3_transition_tween(this, "style." + name, value, styleString);
    };
    d3_transitionPrototype.styleTween = function(name, tween, priority) {
      if (arguments.length < 3) priority = "";
      function styleTween(d, i) {
        var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
        return f && function(t) {
          this.style.setProperty(name, f(t), priority);
        };
      }
      return this.tween("style." + name, styleTween);
    };
    d3_transitionPrototype.text = function(value) {
      return d3_transition_tween(this, "text", value, d3_transition_text);
    };
    function d3_transition_text(b) {
      if (b == null) b = "";
      return function() {
        this.textContent = b;
      };
    }
    d3_transitionPrototype.remove = function() {
      var ns = this.namespace;
      return this.each("end.transition", function() {
        var p;
        if (this[ns].count < 2 && (p = this.parentNode)) p.removeChild(this);
      });
    };
    d3_transitionPrototype.ease = function(value) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 1) return this.node()[ns][id].ease;
      if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
      return d3_selection_each(this, function(node) {
        node[ns][id].ease = value;
      });
    };
    d3_transitionPrototype.delay = function(value) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 1) return this.node()[ns][id].delay;
      return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
        node[ns][id].delay = +value.call(node, node.__data__, i, j);
      } : (value = +value, function(node) {
        node[ns][id].delay = value;
      }));
    };
    d3_transitionPrototype.duration = function(value) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 1) return this.node()[ns][id].duration;
      return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
        node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
      } : (value = Math.max(1, value), function(node) {
        node[ns][id].duration = value;
      }));
    };
    d3_transitionPrototype.each = function(type, listener) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 2) {
        var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
        try {
          d3_transitionInheritId = id;
          d3_selection_each(this, function(node, i, j) {
            d3_transitionInherit = node[ns][id];
            type.call(node, node.__data__, i, j);
          });
        } finally {
          d3_transitionInherit = inherit;
          d3_transitionInheritId = inheritId;
        }
      } else {
        d3_selection_each(this, function(node) {
          var transition = node[ns][id];
          (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
        });
      }
      return this;
    };
    d3_transitionPrototype.transition = function() {
      var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
      for (var j = 0, m = this.length; j < m; j++) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = 0, n = group.length; i < n; i++) {
          if (node = group[i]) {
            transition = node[ns][id0];
            d3_transitionNode(node, i, ns, id1, {
              time: transition.time,
              ease: transition.ease,
              delay: transition.delay + transition.duration,
              duration: transition.duration
            });
          }
          subgroup.push(node);
        }
      }
      return d3_transition(subgroups, ns, id1);
    };
    function d3_transitionNamespace(name) {
      return name == null ? "__transition__" : "__transition_" + name + "__";
    }
    function d3_transitionNode(node, i, ns, id, inherit) {
      var lock = node[ns] || (node[ns] = {
        active: 0,
        count: 0
      }), transition = lock[id], time, timer, duration, ease, tweens;
      function schedule(elapsed) {
        var delay = transition.delay;
        timer.t = delay + time;
        if (delay <= elapsed) return start(elapsed - delay);
        timer.c = start;
      }
      function start(elapsed) {
        var activeId = lock.active, active = lock[activeId];
        if (active) {
          active.timer.c = null;
          active.timer.t = NaN;
          --lock.count;
          delete lock[activeId];
          active.event && active.event.interrupt.call(node, node.__data__, active.index);
        }
        for (var cancelId in lock) {
          if (+cancelId < id) {
            var cancel = lock[cancelId];
            cancel.timer.c = null;
            cancel.timer.t = NaN;
            --lock.count;
            delete lock[cancelId];
          }
        }
        timer.c = tick;
        d3_timer(function() {
          if (timer.c && tick(elapsed || 1)) {
            timer.c = null;
            timer.t = NaN;
          }
          return 1;
        }, 0, time);
        lock.active = id;
        transition.event && transition.event.start.call(node, node.__data__, i);
        tweens = [];
        transition.tween.forEach(function(key, value) {
          if (value = value.call(node, node.__data__, i)) {
            tweens.push(value);
          }
        });
        ease = transition.ease;
        duration = transition.duration;
      }
      function tick(elapsed) {
        var t = elapsed / duration, e = ease(t), n = tweens.length;
        while (n > 0) {
          tweens[--n].call(node, e);
        }
        if (t >= 1) {
          transition.event && transition.event.end.call(node, node.__data__, i);
          if (--lock.count) delete lock[id]; else delete node[ns];
          return 1;
        }
      }
      if (!transition) {
        time = inherit.time;
        timer = d3_timer(schedule, 0, time);
        transition = lock[id] = {
          tween: new d3_Map(),
          time: time,
          timer: timer,
          delay: inherit.delay,
          duration: inherit.duration,
          ease: inherit.ease,
          index: i
        };
        inherit = null;
        ++lock.count;
      }
    }
  */

  exports.PointLayer = PointLayer;
  exports.PolygonLayer = PolygonLayer;
  exports.MarkerLayer = MarkerLayer;
  exports.ODLayer = ODLayer;
  exports.PolylineLayer = PolylineLayer;
  exports.HeatmapLayer = HeatmapLayer;
  exports.CanvasGridLayer = CanvasGridLayer;
  exports.canvasGridLayer = canvasGridLayer;
  exports.SVGGridLayer = SVGGridLayer;
  exports.CanvasPolylineLayer = CanvasPolylineLayer;
  exports.TimelineLayer = TimelineLayer;
  exports.BaseLayer = BaseLayer;
  exports._BaseLayer = _BaseLayer;
  exports.OD = OD;
  exports.od = od;
  exports.ScalarField = ScalarField;
  exports.RGBColor = RGBColor;
  exports.rgbColor = rgbColor;
  exports.ColorScale = ColorScale;
  exports.colorScale = colorScale;
  exports.dTimer = dTimer;

  return exports;

}({}));
