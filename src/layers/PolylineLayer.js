import {BaseLayer} from "./BaseLayer.js"

export class PolylineLayer extends BaseLayer {
    constructor(options) {
        super(options)
    }

    // @method generate
    // 
    // Return Array of L.Marker.
    generate() {
        return this._data.map(
            (data)=>{
                return L.polyline(
                    data.coordinations, data.options
                )
            }
        );
    }
}