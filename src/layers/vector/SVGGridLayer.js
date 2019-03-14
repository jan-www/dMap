import {BaseLayer} from '../BaseLayer'
import {RGBColor} from '../../utils/Util'

// write generate()

export class SVGGridLayer extends BaseLayer{
    constructor(field, options) {
        super(options);
        this._field = field;
        console.log(field)
        this.makeData();
    }

    setField(field) {
        this._field = field;
    }

    _ensureColor() {
        if (this.options.color === undefined) {
            this.options.color = this._defaultColorScale();
        }
    }

    _defaultColorScale() {
        function ColorRangeFunction(range) {
            var _range = range;
            this.fn = function(v) {
                var data = Math.floor(255*(_range[1]-v)/(_range[1]-_range[0]))
                .toString(16);
                return '#'+ data + data + data;
            }
        }
        return new ColorRangeFunction(this._field.range).fn;
    }

    _getColorFor(v) {
        let c = this.options.color; // e.g. for a constant 'red'
        if (typeof c === 'function') {
            c = String(this.options.color(v));
        }
        let color = new RGBColor(c); // to be more flexible, a chroma color object is always created || TODO improve efficiency
        return color;
    }

    makeData() {
        this._ensureColor();

        this._data = [];
        for (let i = 0; i < this._field.nRows; ++i) {
            for (let j = 0; j < this._field.nCols; ++j) {
                let value = this._field.grid[i][j];
                if (value === null) continue;
                console.log(value)
                let color = this._getColorFor(value);
                let point = {
                    coordinations: [
                        [this._field.yurCorner - i * this._field.cellYSize, this._field.xllCorner + j * this._field.cellXSize],
                        [this._field.yurCorner - i * this._field.cellYSize, this._field.xllCorner + (j + 1) * this._field.cellXSize],
                        [this._field.yurCorner - (i + 1) * this._field.cellYSize, this._field.xllCorner + (j + 1) * this._field.cellXSize],
                        [this._field.yurCorner - (i + 1) * this._field.cellYSize, this._field.xllCorner + j * this._field.cellXSize]
                    ], 
                    options: {
                        fillOpacity: 0.9,
                        fillColor: color
                    }
                }
                this._data.push(point);
            }
        }
    }

    generate() {
        return this._data.map(
            (data)=>{return L.polygon(
                data.coordinations, data.options
            )}
        );
    }

    
    
}
