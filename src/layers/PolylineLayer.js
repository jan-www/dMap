import {BaseLayer} from "./BaseLayer.js"

export var PolylineLayer = BaseLayer.extend({
    generate: function() {
        return this._data.map(
            (data)=>{
                return L.polyline(
                    data.coordinates, data.options
                )
            }
        );
    }
})

export class _PolylineLayer extends BaseLayer {
    constructor(options) {
        super(options)
    }

    // @method generate
    // 
    // Return Array of L.Polyline.
    generate() {
        return this._data.map(
            (data)=>{
                return L.polyline(
                    data.coordinates, data.options
                )
            }
        );
    }
}