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

    constructor(params, grid) {
        super(params);
        this.zs = params['zs'];

        this.grid = grid || this._buildGrid();
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
        var data = this.grid;
        if (this._inFilter) {
            data = data.filter(this._inFilter);
        }
        let min_value = undefined, max_value = undefined;
        for (let i = 0, nRows = this.nRows; i < nRows; ++i) {
            for (let j = 0, nCols = this.nCols; j < nCols; ++j) {
                let v = data[i][j];
                if (v === null) continue;

                min_value = min_value === undefined ? 
                    v : min_value > v ? v : min_value;
                max_value = max_value === undefined ? 
                    v : max_value < v ? v : max_value;
            }
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
