// PointLayer.js
// Define PointLayer class.

import {BaseLayer} from "./BaseLayer.js"

export class PointLayer extends BaseLayer{ 
    constructor(options) {
        super(options);
    }

    // @method generate
    // 
    // Return Array of L.circle.
    generate() {
        return this._data.map(
            (data)=>{return L.circleMarker(
                data.coordination, data.options
            )}
        );
    }
}