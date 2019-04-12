import { GroupLayer } from "./GroupLayer.js";

export var PolylineLayer = GroupLayer.extend({
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
