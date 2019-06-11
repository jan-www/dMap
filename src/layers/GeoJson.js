export class GeoJson{
    constructor(data,options) {
        this.geojson = L.geoJSON(data,options)
    }

    bindPopup(func){
        this.geojson.bindPoup(func)
        return this
    }

    addTo(map){
        this.geojson.addTo(map)
        return this
    }

    addData(data){
        this.geojson.addTo(data)
        return this
    }

    setStyle(style){
        this.geojson.setStyle(style)
        return this
    }

    // @method on
    //  
    // overwrite the method on
    on(event_type, callback) {
        this.geojson.eachLayer(function (layer) {
            if(layer && layer.feature){
                callback(layer,layer.feature)
            }
        }, this);
        return this
    }
}