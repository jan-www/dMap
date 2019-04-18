// PolygonLayer.js

import {BaseLayer} from "./BaseLayer.js"


/**
var states = [
    ["Alaska", [[70.0187, -141.0205], ...],
    ["...", ...],
    ...
]
var pLayer = new dmap.PolygonLayer();
pLayer.data(states, function (data) {
    return {
        name: data[0],
        coordinates: data[1]
    }
}).enter().addTo(map)
 */

export var PolygonLayer = BaseLayer.extend({
    generate: function() {
        return this._data.map(
            (data)=>{return L.polygon(
                data.coordinates, data.options
            )}
        );
    }
})

export class _PolygonLayer extends BaseLayer {
    constructor(options) {
        super(options)
    }

    // @method generate
    // 
    // Return Array of L.polygon
    generate() {
        return this._data.map(
            (data)=>{return L.polygon(
                data.coordinates, data.options
            )}
        );
    }
}