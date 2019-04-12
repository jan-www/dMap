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
