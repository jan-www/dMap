// PolygonLayer.js

import {BaseLayer} from "./BaseLayer.js"

export class PolygonLayer extends BaseLayer {
    constructor(option) {
        super(option)
    }

    // @method generate
    // 
    // Return Array of L.polygon
    generate() {
        return this._data.map(
            (data)=>{return L.polygon(
                data.coordinations, data.option
            )}
        );
    }
}