// PolygonLayer.js

import {BaseLayer} from "./BaseLayer.js"

export class PolygonLayer extends BaseLayer {
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