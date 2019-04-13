import { GroupLayer } from "./GroupLayer.js";

/**
 * let capitals = [ 
 *     [39.83912266447, 116.3671875], [35.56462917627, 139.7460937], [37.55247109621, 126.9799804], [39.01838346715, 125.7275390], [47.92830585913, 107.0068359] 
 * ] 
 * let mLayer = new dmap.MarkerLayer(); 
 * 
 * mLayer.data(capitals, (d)=>{return {coordinate: d}})
 *  .enter()
 *  .addTo(map);
 * 
 */

export var MarkerLayer = GroupLayer.extend({
    /**
     * Generate method for BaseLayer.enter.
     * Return an Array of L.Marker.
     * 
     * Make sure _data is an Array of Object like {coordinate: ..., options: ...}
     */
    generate() {
        return this._data.map(
            (data) => {
                return L.marker(data.coordinate, data.options);
            }
        )
    }
})
