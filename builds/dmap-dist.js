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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var GeoJson =
  /*#__PURE__*/
  function () {
    function GeoJson(data, options) {
      _classCallCheck(this, GeoJson);

      this.geojson = L.geoJSON(data, options);
    }

    _createClass(GeoJson, [{
      key: "bindPopup",
      value: function bindPopup(func) {
        this.geojson.bindPoup(func);
        return this;
      }
    }, {
      key: "addTo",
      value: function addTo(map) {
        this.geojson.addTo(map);
        return this;
      }
    }, {
      key: "addData",
      value: function addData(data) {
        this.geojson.addTo(data);
        return this;
      }
    }, {
      key: "setStyle",
      value: function setStyle(style) {
        this.geojson.setStyle(style);
        return this;
      } // @method on
      //  
      // overwrite the method on

    }, {
      key: "on",
      value: function on(event_type, callback) {
        this.geojson.eachLayer(function (layer) {
          if (layer && layer.feature) {
            callback(layer, layer.feature);
          }
        }, this);
        return this;
      }
    }]);

    return GeoJson;
  }();

  // import {PointLayer} from "./PointLayer.js"
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
          if (this.options.layerType == "PointMap") {
            var l = new PointLayer();
            this._layers[_i] = l.data(_data[_i], fn).enter();
          } else if (this.options.layerType == "heatmap") ;
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

        return this;
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

  // export * from "./BaseLayer.js"
   // export * from './vector/index';

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
  function fire(type, data, propagate) {
    if (this._queryValue) return _fire.call(this, type, this._queryValue(data), propagate);
    return L.Layer.prototype.fire.call(this, type, data, propagate);
  }

  function _fire(type, data, propagate) {
    if (!this.listens(type)) return this;

    var event = _objectSpread({}, data, {
      type: type,
      target: this,
      sourceTarget: data && data.sourceTarget || this
    }),
        value = event.value,
        index = event.index,
        originData = event.originData;

    if (this._events) {
      var listeners = this._events[type];

      if (listeners) {
        this._firingCount = this._firingCount + 1 || 1;

        for (var i = 0, len = listeners.length; i < len; i++) {
          var l = listeners[i];
          l.fn.call(l.ctx || this, value, index, originData);
        }

        this._firingCount--;
      }
    }

    if (propagate) {
      // propagate the event to parents (set with addEventParent)
      this._propagateEvent(event);
    }

    return this;
  }

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



  var util = /*#__PURE__*/Object.freeze({
    dTimer: dTimer,
    RGBColor: RGBColor,
    rgbColor: rgbColor,
    ColorScale: ColorScale,
    colorScale: colorScale,
    fire: fire
  });

  var Util = util;

  exports.Util = Util;
  exports.GeoJson = GeoJson;
  exports.TimelineLayer = TimelineLayer;

  return exports;

}({}));
