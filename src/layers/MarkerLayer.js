import {BaseLayer} from "./BaseLayer.js"

export class MarkerLayer extends BaseLayer {
    constructor(option) {
        super(option)
    }

    // @method generate
    // 
    // Return Array of L.Marker.
    generate() {
        return this._data.map(
            (data)=>{
                return L.marker(
                    data.coordination, data.option
                )
            }
        );
    }
}