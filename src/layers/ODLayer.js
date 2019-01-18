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
    // Return Array of L.od.
    generate(){
        return this._data.map(
            (data)=>{return od(
                data.origin, data.destination, data.options
            )}
        );
    }

    // use prefix before event type: 'org_click'
    // or several space-separated types: 'org_click mouseover'
    on(event_type, callback) {
        let types = event_type.split('_');
        let item_type = types[0];   //specify the type of item
        let real_event_type = types[1]; //specify the type of event
        if (this._layer_group !== undefined) {
            this._layer_group.eachLayer(function(layer) {
                layer.getItem(item_type).on(real_event_type, callback);
            });
        }
        return this;
    }

}