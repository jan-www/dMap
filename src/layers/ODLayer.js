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

    // trailAnimate() {
    //     var animateLayer = this._layer_group;
    //     var trails = animateLayer.getLayers();
    //     // 点哪个删除哪个，其余的都不变的
    //     //animateLayer.clearLayers();
    //     for(let k = 0, kLen = trails.length; k < kLen; k++){
    //         // show OD coordinations

    //         // show the plane
    //         var path = trails[k].getPath();
    //         var opts = trails[k].getOptions();
    //         var trail = trails[k].on("click", function(e){
    //             opts.icon = {
    //                 iconUrl: "plane.png"
    //             };
    //             animateLayer.removeLayer(trails[k]);
    //             var newTrail = od(path.org, path.dst, opts);
    //             newTrail.addTo(animateLayer);
    //         })
    //     }

    // }
}