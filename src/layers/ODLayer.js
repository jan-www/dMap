import {BaseLayer} from './BaseLayer.js'
import {od} from './vector/OD.js'

/*
 * @class ODLayer
 * @inherits BaseLayer
 *
 */
export class ODLayer extends BaseLayer{
    constructor(options) {
        super(options);
    }

    // @method generate
    // 
    // Return Array of L.circle.
    generate(){
        return this._data.map(
            (data)=>{return od(
                data.origin, data.destination, data.options
            )}
        );
    }
}