// PointLayer.js
// Define PointLayer class.

import {BaseLayer} from "./BaseLayer.js"

export class PointLayer extends BaseLayer{ 
    constructor(option) {
        super(option);
    }

    // @method generate
    // 
    // Return Array of L.circle.
    generate() {
        return this._data.map(
            (data)=>{return L.circle(
                data.coordination, data.option
            )}
        );
    }
}