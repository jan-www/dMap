import { RGBColor, colorScale } from '../utils/Util'
import { CanvasLayer } from './vector/CanvasLayer'
import { ScalarField } from './vector/ScalarField';

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
        inFilter: null
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._visible = true;
        CanvasLayer.prototype.initialize.call(this, options)
    },

    getEvents: function () {
        var events = CanvasLayer.prototype.getEvents.call(this);
        events.zoomstart = this._hideCanvas.bind(this);
        events.zoomend = this._showCanvas.bind(this);
        return events;
    },

    onLayerDidMount: function () {
        // this._enableIdentify();
        this._ensureCanvasAlignment();
        // this._addControlBar();
    },

    show() {
        this._visible = true;
        this._showCanvas();
        // this._enableIdentify();
    },

    hide() {
        this._visible = false;
        this._hideCanvas();
        // this._disableIdentify();
    },

    isVisible() {
        return this._visible;
    },

    _showCanvas() {
        if (this._canvas && this._visible) {
            this._canvas.style.visibility = 'visible';
        }
    },

    _hideCanvas() {
        if (this._canvas) {
            this._canvas.style.visibility = 'hidden';
        }
    },

    // _enableIdentify() {
    //     this._map.on('click', this._onClick, this);
    //     this._map.on('mousemove', this._onMouseMove, this);

    //     this.options.onClick && this.on('click', this.options.onClick, this);
    //     this.options.onMouseMove &&
    //         this.on('mousemove', this.options.onMouseMove, this);
    // },

    // _disableIdentify() {
    //     this._map.off('click', this._onClick, this);
    //     this._map.off('mousemove', this._onMouseMove, this);

    //     this.options.onClick && this.off('click', this.options.onClick, this);
    //     this.options.onMouseMove &&
    //         this.off('mousemove', this.options.onMouseMove, this);
    // },

    // _addControlBar() {
    //     if (!this.options.controlBar || !this.options.color.getAttr) return;
    //     if (!this._controlBar) {
    //         let control = L.control({position: 'bottomright'}), 
    //             that = this;
    //         control.onAdd = function(map) {
    //             var div = L.DomUtil.create('div', 'controlbar');
    //             let attrs = that.options.color.getAttr();

    //             for (let i in attrs.colors) {
    //                 let color = attrs.colors[i].toHex(),
    //                     value = attrs.values[i],
    //                     innerDiv = L.DomUtil.create('div', 'controlbar-list', div),
    //                     leftColor = L.DomUtil.create('div', 'left', innerDiv),
    //                     rightValue = L.DomUtil.create('span', 'right', innerDiv);

    //                 leftColor.style.backgroundColor = color;
    //                 rightValue.innerHTML = value;
    //             }
    //             return div;

    //         }
    //         control.onRemove = function(){}
    //         this._controlBar = control;
    //     }
    //     this._controlBar.addTo(this._map)
    // },

    _ensureCanvasAlignment() {
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);
    },

    _animateZoom: function () { },

    onLayerWillUnmount: function () {
        // this._disableIdentify();
    },

    needRedraw() {
        if (this._map && this._field) {
            CanvasLayer.prototype.needRedraw.call(this);
        }
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function (viewInfo) {
        throw new TypeError('Must be overriden');
    },
    /* eslint-enable no-unused-vars */

    // `data`: 2d Array
    // `map_function`: value: value
    // `params`: 
    //      params.nCols
    //      params.nRows
    //      params.xllCorner
    //      params.yllCorner
    //      params.cellXSize
    //      params.cellYSize

    data: function (data, map_function, params) {
        var is2d = false,
            i, len;

        this.remove();

        if (Array.isArray(data) && data.length) {
            is2d = true;
            for (i = 0, len = data.length; i < len; ++i) {
                if (!Array.isArray(data[i])) {
                    is2d = false;
                    break;
                }
            }
        }

        this._params = params || {};
        if (is2d) this._data = data.map((row, i) =>
            row.map((value, j) => map_function(value, [i, j]))
        )
        else {
            this._data = [];
            for (i = 0, len = data.length; i < len; ++i) {
                this._data.push(map_function(data[i], [i / params.nCols, i % params.nRows]));
            }
        }

        // this.needRedraw();
        return this;
    },

    setFilter: function (f) {
        this.options.inFilter = f;
        this._field && this._field.setFilter(f);
        this.needRedraw();
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;

        if (this._canvas) {
            this._updateOpacity();
        }
        return this;
    },

    getBounds: function () {
        if (!this._field) return undefined;
        let bb = this._field.extent();

        let southWest = L.latLng(bb[1], bb[0]),
            northEast = L.latLng(bb[3], bb[2]);
        let bounds = L.latLngBounds(southWest, northEast);
        return bounds;
    },

    // _onClick: function (e) {
    //     let v = this._queryValue(e);
    //     this.fire('click', v);
    // },

    // _onMouseMove: function (e) {
    //     let v = this._queryValue(e);
    //     this._changeCursorOn(v);
    //     this.fire('mousemove', v);
    // },

    _changeCursorOn: function (v) {
        if (!this.options.mouseMoveCursor) return;

        let { value, noValue } = this.options.mouseMoveCursor;
        let style = this._map.getContainer().style;
        style.cursor = v.value !== null ? value : noValue;
    },

    _updateOpacity: function () {
        L.DomUtil.setOpacity(this._canvas, this.options.opacity);
    },

    _queryValue: function (e) {
        if (!e) return e;
        
        let latlng = e.latlng,
            lat = latlng.lat,
            lng = latlng.lng,
            v = this._field
                ? this._field.valueAt(lng, lat)
                : null,
            originData = null,
            ii = null,
            jj = null;

        if (this._field && this._field.contains(lng, lat)) {
            [jj, ii] = this._field._getDecimalIndexes(lng, lat);
            jj = this._field._clampColumnIndex(Math.floor(jj));
            ii = this._field._clampRowIndex(Math.floor(ii));
            originData = this._data[ii][jj];
        }
        

        let result = {
            ...e,
            index: [ii, jj],
            value: v,
            originData: e
        };
        return result;
    },

    _getDrawingContext: function () {
        let g = this._canvas.getContext('2d');
        g.clearRect(0, 0, this._canvas.width, this._canvas.height);
        return g;
    },

    enter: function () {
        this._field = new ScalarField(this._params, this._data);
        this.needRedraw();
        return this;
    }
});


/**
 * ScalarField on canvas (a 'Raster')
 */
export var CanvasGridLayer = FieldMap.extend({
    options: {
        color: null, // function colorFor(value) [e.g. chromajs.scale],
        // controlBar: false,
        border: false,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderOpacity: 0.99
    },

    initialize: function (options) {
        FieldMap.prototype.initialize.call(
            this, options
        );
        L.Util.setOptions(this, options);
    },

    _defaultColorScale: function () {
        return colorScale(['white', 'black']).domain(this._field.range);
        // return chroma.scale(['white', 'black']).domain(this._field.range);
    },

    setColor(f) {
        this.options.color = f;
        this.needRedraw();
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function (viewInfo) {
        if (!this.isVisible()) return;
        this._updateOpacity();
        this._drawImage();
    },
    /* eslint-enable no-unused-vars */

    _ensureColor: function () {
        if (this.options.color === null) {
            this.setColor(this._defaultColorScale());
        }
    },

    _showCanvas() {
        FieldMap.prototype._showCanvas.call(this);
        this.needRedraw(); // TODO check spurious redraw (e.g. hide/show without moving map)
    },

    _drawImage: function () {
        this._ensureColor();
        let borderColor = this.getBorderColor().toRGBA(),
            ctx = this._getDrawingContext(),
            bounds = this._pixelBounds(),
            pixelXSize = (bounds.max.x - bounds.min.x) / this._field.nCols,
            pixelYSize = (bounds.max.y - bounds.min.y) / this._field.nRows;

        ctx.lineWidth = this.options.borderWidth / 2;
        ctx.strokeStyle = borderColor;
        for (var j = 0; j < this._field.nRows; ++j) {

            for (var i = 0; i < this._field.nCols; ++i) {
                let value = this._field._valueAtIndexes(i, j);
                if (value === null) continue;

                let _xll = this._field.xllCorner + i * this._field.cellXSize,
                    _yur = this._field.yurCorner - j * this._field.cellYSize;
                let _xllPixel = this._map.latLngToContainerPoint([_yur, _xll]).x,
                    _yurPixel = this._map.latLngToContainerPoint([_yur, _xll]).y;

                let color = this._getColorFor(value);
                ctx.fillStyle = color.toRGBA();
                ctx.fillRect(_xllPixel, _yurPixel, pixelXSize, pixelYSize);

                this.options.border
                    && this.options.borderWidth * 2 < Math.min(pixelXSize, pixelYSize)
                    && ctx.strokeRect(_xllPixel, _yurPixel, pixelXSize, pixelYSize)

            }


        }

    },

    getBorderColor: function () {
        let color = new RGBColor(this.options.borderColor);
        if (color.a === null) {
            color.a = this.options.borderOpacity;
        }
        return color;
    },

    _isOnBorder: function (x, y, epsilon) {
        let bounds = this._pixelBounds()
        const pixelXSize = (bounds.max.x - bounds.min.x) / this._field.nCols,
            pixelYSize = (bounds.max.y - bounds.min.y) / this._field.nRows;
        if ((x - bounds.min.x) % pixelXSize <= epsilon || (x - bounds.min.x) % pixelXSize >= pixelXSize - epsilon) return true;
        if ((y - bounds.min.y) % pixelYSize <= epsilon || (y - bounds.min.y) % pixelYSize >= pixelYSize - epsilon) return true;
        return false;
    },

    _pixelBounds: function () {
        const bounds = this.getBounds();
        const northWest = this._map.latLngToContainerPoint(
            bounds.getNorthWest()
        );
        const southEast = this._map.latLngToContainerPoint(
            bounds.getSouthEast()
        );
        var pixelBounds = L.bounds(northWest, southEast);
        return pixelBounds;
    },

    /**
     * Gets a chroma color for a pixel value, according to 'options.color'
     */
    _getColorFor(v) {
        let c = this.options.color; // e.g. for a constant 'red'
        if (typeof c === 'function') {
            c = String(this.options.color(v));
        }
        let color = new RGBColor(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency
        return color;
    }
});

export var canvasGridLayer = function (scalarField, options) {
    return new CanvasGridLayer
        (scalarField, options);
};

