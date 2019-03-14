import Cell from './Cell'
import {RGBColor} from '../../utils/Util'
import {CanvasLayer} from './CanvasLayer'

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

    initialize: function(field, options) {
        L.Util.setOptions(this, options);
        this._visible = true;
        if (field) {
            this.setData(field);
        }
    },

    getEvents: function() {
        var events = CanvasLayer.prototype.getEvents.call(this);
        events.zoomstart = this._hideCanvas.bind(this);
        events.zoomend = this._showCanvas.bind(this);
        return events;
    },

    onLayerDidMount: function() {
        this._enableIdentify();
        this._ensureCanvasAlignment();
    },

    show() {
        this._visible = true;
        this._showCanvas();
        this._enableIdentify();
    },

    hide() {
        this._visible = false;
        this._hideCanvas();
        this._disableIdentify();
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

    _enableIdentify() {
        this._map.on('click', this._onClick, this);
        this._map.on('mousemove', this._onMouseMove, this);

        this.options.onClick && this.on('click', this.options.onClick, this);
        this.options.onMouseMove &&
            this.on('mousemove', this.options.onMouseMove, this);
    },

    _disableIdentify() {
        this._map.off('click', this._onClick, this);
        this._map.off('mousemove', this._onMouseMove, this);

        this.options.onClick && this.off('click', this.options.onClick, this);
        this.options.onMouseMove &&
            this.off('mousemove', this.options.onMouseMove, this);
    },

    _ensureCanvasAlignment() {
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);
    },

    _animateZoom: function () {},

    onLayerWillUnmount: function() {
        this._disableIdentify();
    },

    needRedraw() {
        if (this._map && this._field) {
            CanvasLayer.prototype.needRedraw.call(this);
        }
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function(viewInfo) {
        throw new TypeError('Must be overriden');
    },
    /* eslint-enable no-unused-vars */

    setData: function(field) {
        this.options.inFilter && field.setFilter(this.options.inFilter);
        this._field = field;
        this.needRedraw();
        this.fire('load');
    },

    setFilter: function(f) {
        this.options.inFilter = f;
        this._field && this._field.setFilter(f);
        this.needRedraw();
    },

    setOpacity: function(opacity) {
        this.options.opacity = opacity;

        if (this._canvas) {
            this._updateOpacity();
        }
        return this;
    },

    getBounds: function() {
        let bb = this._field.extent();

        let southWest = L.latLng(bb[1], bb[0]),
            northEast = L.latLng(bb[3], bb[2]);
        let bounds = L.latLngBounds(southWest, northEast);
        return bounds;
    },

    _onClick: function(e) {
        let v = this._queryValue(e);
        this.fire('click', v);
    },

    _onMouseMove: function(e) {
        let v = this._queryValue(e);
        this._changeCursorOn(v);
        this.fire('mousemove', v);
    },

    _changeCursorOn: function(v) {
        if (!this.options.mouseMoveCursor) return;

        let { value, noValue } = this.options.mouseMoveCursor;
        let style = this._map.getContainer().style;
        style.cursor = v.value !== null ? value : noValue;
    },

    _updateOpacity: function() {
        L.DomUtil.setOpacity(this._canvas, this.options.opacity);
    },

    _queryValue: function(e) {
        let v = this._field
            ? this._field.valueAt(e.latlng.lng, e.latlng.lat)
            : null;
        let result = {
            latlng: e.latlng,
            value: v
        };
        return result;
    },

    _getDrawingContext: function() {
        let g = this._canvas.getContext('2d');
        g.clearRect(0, 0, this._canvas.width, this._canvas.height);
        return g;
    }
});


/**
 * ScalarField on canvas (a 'Raster')
 */
export var ScalarFieldMap = FieldMap.extend({
    options: {
        type: 'colormap', // [colormap|vector]
        color: null, // function colorFor(value) [e.g. chromajs.scale],
        interpolate: false, // Change to use interpolation
        vectorSize: 20, // only used if 'vector'
        arrowDirection: 'from' // [from|towards]
    },

    initialize: function(scalarField, options) {
        FieldMap.prototype.initialize.call(
            this,
            scalarField,
            options
        );
        L.Util.setOptions(this, options);
    },

    _defaultColorScale: function() {

        function ColorRangeFunction(range) {
            var _range = range;
            this.fn = function(v) {
                var data = Math.floor(255*(_range[1]-v)/(_range[1]-_range[0]))
                .toString(16);
                return '#'+data+data+data;
            }
        }
        return new ColorRangeFunction(this._field.range).fn;
        // return chroma.scale(['white', 'black']).domain(this._field.range);
    },

    setColor(f) {
        this.options.color = f;
        this.needRedraw();
    },

    /* eslint-disable no-unused-vars */
    onDrawLayer: function(viewInfo) {
        if (!this.isVisible()) return;
        this._updateOpacity();
        this._drawImage();
    },
    /* eslint-enable no-unused-vars */

    _ensureColor: function() {
        if (this.options.color === null) {
            this.setColor(this._defaultColorScale());
        }
    },

    _showCanvas() {
        FieldMap.prototype._showCanvas.call(this);
        this.needRedraw(); // TODO check spurious redraw (e.g. hide/show without moving map)
    },

    /**
     * Draws the field in an ImageData and applying it with putImageData.
     * Used as a reference: http://geoexamples.com/d3-raster-tools-docs/code_samples/raster-pixels-page.html
     */
    _drawImage: function() {
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

                let _xll = this._field.xllCorner + i*this._field.cellXSize,
                    _yur = this._field.yurCorner - j*this._field.cellYSize;
                let _xllPixel = this._map.latLngToContainerPoint([_yur, _xll]).x,
                    _yurPixel = this._map.latLngToContainerPoint([_yur, _xll]).y;
                
                let color = this._getColorFor(value);
                ctx.fillStyle = color.toRGBA();
                ctx.fillRect(_xllPixel,  _yurPixel, pixelXSize, pixelYSize);

                if (this.options.border && 3*this.options.borderWidth < Math.min(pixelXSize, pixelYSize)) {
                    ctx.strokeRect(_xllPixel, _yurPixel, pixelXSize, pixelYSize)
                }
            }


        }

    },

    getBorderColor: function() {
        let color = new RGBColor(this.options.borderColor);
        if (color.a === null) {
            color.a = this.options.borderOpacity;
        }
        return color;
    },

     _isOnBorder: function(x, y, epsilon) {
        let bounds = this._pixelBounds()
        const pixelXSize = (bounds.max.x - bounds.min.x) / this._field.nCols,
            pixelYSize = (bounds.max.y - bounds.min.y) / this._field.nRows;
        if ((x-bounds.min.x) % pixelXSize <= epsilon || (x-bounds.min.x) % pixelXSize >= pixelXSize-epsilon) return true;
        if ((y-bounds.min.y) % pixelYSize <= epsilon || (y-bounds.min.y) % pixelYSize >= pixelYSize-epsilon) return true;
        return false;
    },

    _pixelBounds: function() {
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

export var scalarFieldMap = function(scalarField, options) {
    return new ScalarFieldMap
    (scalarField, options);
};

/**
 *  Abstract class for a set of values (Vector | Scalar)
 *  assigned to a regular 2D-grid (lon-lat), aka 'a Raster source'
 */
class Field {
    constructor(params) {
        this.params = params;

        this.nCols = params['nCols'];
        this.nRows = params['nRows'];

        // alias
        this.width = params['nCols'];
        this.height = params['nRows'];

        // ll = lower-left
        this.xllCorner = params['xllCorner'];
        this.yllCorner = params['yllCorner'];

        // ur = upper-right
        this.xurCorner =
            params['xllCorner'] + params['nCols'] * params['cellXSize'];
        this.yurCorner =
            params['yllCorner'] + params['nRows'] * params['cellYSize'];

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
    _buildGrid() {
        throw new TypeError('Must be overriden');
    }

    _updateRange() {
        this.range = this._calculateRange();
    }

    /**
     * Number of cells in the grid (rows * cols)
     * @returns {Number}
     */
    numCells() {
        return this.nRows * this.nCols;
    }

    /**
     * A list with every cell
     * @returns {Array<Cell>} - cells (x-ascending & y-descending order)
     */
    getCells(stride = 1) {
        let cells = [];
        for (let j = 0; j < this.nRows; j = j + stride) {
            for (let i = 0; i < this.nCols; i = i + stride) {
                let [lon, lat] = this._lonLatAtIndexes(i, j);
                let center = L.latLng(lat, lon);
                let value = this._valueAtIndexes(i, j);
                let c = new Cell(center, value, this.cellXSize, this.cellYSize);
                cells.push(c); // <<
            }
        }
        return cells;
    }

    /**
     * Apply a filter function to field values
     * @param   {Function} f - boolean function
     */
    setFilter(f) {
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
    setSpatialMask(m) {
        this._spatialMask = m;
    }

    /**
     * Grid extent
     * @returns {Number[]} [xmin, ymin, xmax, ymax]
     */
    extent() {
        let [xmin, xmax] = this._getWrappedLongitudes();
        return [xmin, this.yllCorner, xmax, this.yurCorner];
    }

    /**
     * [xmin, xmax] in [-180, 180] range
     */
    _getWrappedLongitudes() {
        let xmin = this.xllCorner;
        let xmax = this.xurCorner;

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
    contains(lon, lat) {
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
    _pointInExtent(lon, lat) {
        let [xmin, xmax] = this._getWrappedLongitudes();
        let longitudeIn = lon >= xmin && lon <= xmax;
        let latitudeIn = lat >= this.yllCorner && lat <= this.yurCorner;
        return longitudeIn && latitudeIn;
    }

    /**
     * Check if coordinates are inside the spatialMask (Point in Polygon analysis)
     * @param {Number} lon 
     * @param {Number} lat 
     */
    _pointInMask(lon, lat) {
        const pt = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lon, lat] // geojson, lon-lat order !
            },
            properties: {}
        };
        const poly = this._spatialMask;
        return this._inside(pt, poly);
    }

    /**
     * Check if point is inside the polygon.
     * @param {Object} pt 
     * @param {L.Polygon} poly 
     */
    _inside(pt, poly) {
        var inside = false;
        var x = pt.geometry.coordinates[1], 
            y = pt.geometry.coordinates[0];
        
        for (var ii=0;ii<poly.getLatLngs().length;ii++){
            var polyPoints = poly.getLatLngs()[ii];
            for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
                var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
                var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        }

        return inside;
    };

    /**
     * Returns if the grid doesn't contain the point
     * @param   {Number} lon - longitude
     * @param   {Number} lat - latitude
     * @returns {Boolean}
     */
    notContains(lon, lat) {
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
    interpolatedValueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        let [i, j] = this._getDecimalIndexes(lon, lat);
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
    interpolatedValueAtIndexes(i, j) {
        //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
        //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
        //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
        //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
        //    j ___|_ .   |           (1, 9) and (2, 9).
        //  =8.3   |      |
        //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
        //         |      |           column, so the index ci can be used without taking a modulo.

        let indexes = this._getFourSurroundingIndexes(i, j);
        let [fi, ci, fj, cj] = indexes;
        let values = this._getFourSurroundingValues(fi, ci, fj, cj);
        if (values) {
            let [g00, g10, g01, g11] = values;
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
    _getDecimalIndexes(lon, lat) {
        if (this.longitudeNeedsToBeWrapped && lon < this.xllCorner) {
            lon = lon + 360;
        }
        let i = (lon - this.xllCorner) / this.cellXSize;
        let j = (this.yurCorner - lat) / this.cellYSize;
        return [i, j];
    }

    /**
     * Get surrounding indexes (integer), clampling on borders
     * @private
     * @param   {Number} i - decimal index
     * @param   {Number} j - decimal index
     * @returns {Array} [fi, ci, fj, cj]
     */
    _getFourSurroundingIndexes(i, j) {
        let fi = Math.floor(i);
        let ci = fi + 1;
        // duplicate colum to simplify interpolation logic (wrapped value)
        if (this.isContinuous && ci >= this.nCols) {
            ci = 0;
        }
        ci = this._clampColumnIndex(ci);

        let fj = this._clampRowIndex(Math.floor(j));
        let cj = this._clampRowIndex(fj + 1);

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
    _getFourSurroundingValues(fi, ci, fj, cj) {
        var row;
        if ((row = this.grid[fj])) {
            // upper row ^^
            var g00 = row[fi]; // << left
            var g10 = row[ci]; // right >>
            if (
                this._isValid(g00) &&
                this._isValid(g10) &&
                (row = this.grid[cj])
            ) {
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
    valueAt(lon, lat) {
        if (this.notContains(lon, lat)) return null;

        let [i, j] = this._getDecimalIndexes(lon, lat);
        let ii = Math.floor(i);
        let jj = Math.floor(j);

        const ci = this._clampColumnIndex(ii);
        const cj = this._clampRowIndex(jj);

        let value = this._valueAtIndexes(ci, cj);
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
    hasValueAt(lon, lat) {
        let value = this.valueAt(lon, lat);
        let hasValue = value !== null;

        let included = true;
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
    notHasValueAt(lon, lat) {
        return !this.hasValueAt(lon, lat);
    }

    /**
     * Gives a random position to 'o' inside the grid
     * @param {Object} [o] - an object (eg. a particle)
     * @returns {{x: Number, y: Number}} - object with x, y (lon, lat)
     */
    randomPosition(o = {}) {
        let i = (Math.random() * this.nCols) | 0;
        let j = (Math.random() * this.nRows) | 0;

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
    _valueAtIndexes(i, j) {
        return this.grid[j][i]; // <-- j,i !!
    }

    /**
     * Lon-Lat for grid indexes
     * @param   {Number} i - column index (integer)
     * @param   {Number} j - row index (integer)
     * @returns {Number[]} [lon, lat]
     */
    _lonLatAtIndexes(i, j) {
        let lon = this._longitudeAtX(i);
        let lat = this._latitudeAtY(j);

        return [lon, lat];
    }

    /**
     * Longitude for grid-index
     * @param   {Number} i - column index (integer)
     * @returns {Number} longitude at the center of the cell
     */
    _longitudeAtX(i) {
        let halfXPixel = this.cellXSize / 2.0;
        let lon = this.xllCorner + halfXPixel + i * this.cellXSize;
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
    _latitudeAtY(j) {
        let halfYPixel = this.cellYSize / 2.0;
        return this.yurCorner - halfYPixel - j * this.cellYSize;
    }

    /**
     * Apply the interpolation
     * @abstract
     * @private
     */
    /* eslint-disable no-unused-vars */
    _doInterpolation(x, y, g00, g10, g01, g11) {
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
    _clampColumnIndex(ii) {
        let i = ii;
        if (ii < 0) {
            i = 0;
        }
        let maxCol = this.nCols - 1;
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
    _clampRowIndex(jj) {
        let j = jj;
        if (jj < 0) {
            j = 0;
        }
        let maxRow = this.nRows - 1;
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
    _isValid(x) {
        return x !== null && x !== undefined;
    }
}

/**
 * Scalar Field
 */
export class ScalarField extends Field {
    /**
     * Creates a ScalarField from the content of an ASCIIGrid file
     * @param   {String}   asc
     * @returns {ScalarField}
     */

    static fromASCIIGrid(asc, scaleFactor = 1) {
        //console.time('ScalarField from ASC');

        let lines = asc.split('\n');

        // Header
        var header = ScalarField._parseASCIIGridHeader(lines.slice(0, 6));

        // Data (left-right and top-down)
        let zs = [];
        
        for (let i = 6; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line === '') break;

            let items = line.split(' ');
            items.forEach(it => {
                let floatItem = parseFloat(it);
                let v =
                    floatItem !== header.noDataValue
                        ? floatItem * scaleFactor
                        : null;

                zs.push(v);
            });
        }
        let p = header;
        p.zs = zs;
        // p.range = [min_value, max]
        //console.timeEnd('ScalarField from ASC');
        return new ScalarField(p);
    }

    /**
     * Parse an ASCII Grid header, made with 6 lines
     * It allows the use of XLLCORNER/YLLCORNER or XLLCENTER/YLLCENTER conventions
     * @param {Array.String} headerLines
     */
    static _parseASCIIGridHeader(headerLines) {
        try {
            const headerItems = headerLines.map(line => {
                var items = line.split(' ').filter(i => i != '');
                var param = items[0].trim().toUpperCase();
                var value = param === 'CELLSIZE' ? 
                    items.slice(1, 3) : parseFloat(items[1].trim());
                return { [param]: value };
            });
            // headerItems: [{ncols: xxx}, {nrows: xxx}, ...]

            const usesCorner = 'XLLCORNER' in headerItems[2];

            var cellXSize, cellYSize;
            if (headerItems[4]['CELLSIZE'].length == 2) {
                cellXSize = parseFloat(headerItems[4]['CELLSIZE'][0].trim());
                cellYSize = parseFloat(headerItems[4]['CELLSIZE'][1].trim());
            }
            else {
                cellXSize = cellYSize = parseFloat(headerItems[4]['CELLSIZE'][0].trim());
            }

            // const cellSize = headerItems[4]['CELLSIZE'];

            const header = {
                nCols: parseInt(headerItems[0]['NCOLS']),
                nRows: parseInt(headerItems[1]['NROWS']),
                xllCorner: usesCorner
                    ? headerItems[2]['XLLCORNER']
                    : headerItems[2]['XLLCENTER'] - cellXSize,
                yllCorner: usesCorner
                    ? headerItems[3]['YLLCORNER']
                    : headerItems[3]['YLLCENTER'] - cellYSize,
                cellXSize: cellXSize,
                cellYSize: cellYSize,
                noDataValue: headerItems[5]['NODATA_VALUE']
            };
           
            return header;
        } catch (err) {
            throw new Error(`Not a valid ASCIIGrid Header: ${err}`);
        }
    }

    /**
     * Creates a ScalarField from the content of a GeoTIFF file
     * @param   {ArrayBuffer}   data
     * @param   {Number}   bandIndex
     * @returns {ScalarField}
     */
    static fromGeoTIFF(data, bandIndex = 0) {
        return ScalarField.multipleFromGeoTIFF(data, [bandIndex])[0];
    }

    /**
     * Creates a ScalarField array (one per band) from the content of a GeoTIFF file
     * @param   {ArrayBuffer}   data
     * @param   {Array}   bandIndexes - if not provided all bands are returned
     * @returns {Array.<ScalarField>}
     */
    static multipleFromGeoTIFF(data, bandIndexes) {
        //console.time('ScalarField from GeoTIFF');

        let tiff = GeoTIFF.parse(data); // geotiff.js
        let image = tiff.getImage();
        let rasters = image.readRasters();
        let tiepoint = image.getTiePoints()[0];
        let fileDirectory = image.getFileDirectory();
        let [xScale, yScale] = fileDirectory.ModelPixelScale;

        if (typeof bandIndexes === 'undefined' || bandIndexes.length === 0) {
            bandIndexes = [...Array(rasters.length).keys()];
        }

        let scalarFields = [];
        scalarFields = bandIndexes.map(function(bandIndex) {
            let zs = rasters[bandIndex]; // left-right and top-down order

            if (fileDirectory.GDAL_NODATA) {
                let noData = parseFloat(fileDirectory.GDAL_NODATA);
                let simpleZS = Array.from(zs); // to simple array, so null is allowed | TODO efficiency??
                zs = simpleZS.map(function(z) {
                    return z === noData ? null : z;
                });
            }

            let p = {
                nCols: image.getWidth(),
                nRows: image.getHeight(),
                xllCorner: tiepoint.x,
                yllCorner: tiepoint.y - image.getHeight() * yScale,
                cellXSize: xScale,
                cellYSize: yScale,
                zs: zs
            };
            return new ScalarField(p);
        });

        //console.timeEnd('ScalarField from GeoTIFF');
        return scalarFields;
    }

    constructor(params) {
        super(params);
        this.zs = params['zs'];

        this.grid = this._buildGrid();
        this._updateRange();
        
    }

    /**
     * Builds a grid with a Number at each point, from an array
     * 'zs' following x-ascending & y-descending order
     * (same as in ASCIIGrid)
     * @private
     * @returns {Array.<Array.<Number>>} - grid[row][column]--> Number
     */
    _buildGrid() {
        let grid = this._arrayTo2d(this.zs, this.nRows, this.nCols);
        return grid;
    }

    _arrayTo2d(array, nRows, nCols) {
        let grid = [];
        let p = 0;
        for (var j = 0; j < nRows; j++) {
            var row = [];
            for (var i = 0; i < nCols; i++, p++) {
                let z = array[p];
                row[i] = this._isValid(z) ? z : null; // <<<
            }
            grid[j] = row;
        }
        return grid;
    }

    _newDataArrays(params) {
        params['zs'] = [];
    }

    _pushValueToArrays(params, value) {
        params['zs'].push(value);
    }

    _makeNewFrom(params) {
        return new ScalarField(params);
    }

    /**
     * Calculate min & max values
     * @private
     * @returns {Array} - [min, max]
     */
    _calculateRange() {
        var data = this.zs;
        if (this._inFilter) {
            data = data.filter(this._inFilter);
        }
        let min_value = undefined, max_value = undefined;
        for (let i = 0; i < data.length; ++i) {
            let v = data[i]
            if (v === null) continue;

            min_value = min_value === undefined ? 
                v : min_value > v ? v : min_value;
            max_value = max_value === undefined ? 
                v : max_value < v ? v : max_value;
        }
        
        return [min_value, max_value]
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
    _doInterpolation(x, y, g00, g10, g01, g11) {
        var rx = 1 - x;
        var ry = 1 - y;
        return g00 * rx * ry + g10 * x * ry + g01 * rx * y + g11 * x * y;
    }
}
