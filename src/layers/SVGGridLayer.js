import {RGBColor, colorScale} from '../utils/Util'
import { GroupLayer } from './GroupLayer';

// write generate()

export var SVGGridLayer = GroupLayer.extend({

    options: {
        color: null, 
        border: false,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderOpacity: 0.99
    },

    setField: function(field) {
        this._field = field;
    },

    _ensureColor: function() {
        if (this.options.color === undefined) {
            this.options.color = this._defaultColorScale();
        }
    },

    _defaultColorScale: function() {
        return colorScale(['white', 'black']).domain(this._field.range);
    },

    _getColorFor: function(v) {
        let c = this.options.color; // e.g. for a constant 'red'
        if (typeof c === 'function') {
            c = String(this.options.color(v));
        }
        let color = new RGBColor(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency
        return color;
    },

    data: function(field) {
        this.setField(field)
        this._ensureColor();

        this._data = [];
        for (let i = 0; i < this._field.nRows; ++i) {
            for (let j = 0; j < this._field.nCols; ++j) {
                let value = this._field.grid[i][j];
                if (value === null) continue;
                let color = this._getColorFor(value),
                    point = {
                        coordinates: [
                            [this._field.yurCorner - i * this._field.cellYSize, this._field.xllCorner + j * this._field.cellXSize],
                            [this._field.yurCorner - i * this._field.cellYSize, this._field.xllCorner + (j + 1) * this._field.cellXSize],
                            [this._field.yurCorner - (i + 1) * this._field.cellYSize, this._field.xllCorner + (j + 1) * this._field.cellXSize],
                            [this._field.yurCorner - (i + 1) * this._field.cellYSize, this._field.xllCorner + j * this._field.cellXSize]
                        ], 
                        options: {
                            fillOpacity: 0.9,
                            fillColor: color,
                            color: this.options.borderColor,
                            weight: this.options.border ? this.options.borderWidth : 0
                        }
                    }
                this._data.push(point);
            }
        }
        return this;
    },

    generate: function() {
        return this._data.map(
            (data)=>{return L.polygon(
                data.coordinates, data.options
            )}
        );
    }


});
