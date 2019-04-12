// BaseLayer.js
// Define BaseLayer class and basic methods here.


// @class BaseLayer
// Base class of all dmap.layer.

export var BaseLayer = L.Layer.extend({
    initialize: function(options) {
        if (new.target === BaseLayer) {
            throw new Error('Class BaseLayer cannot be initialized.');
        }
        L.Util.setOptions(this, options);
        
        this._data = [];  // {}
        this._layer_group = undefined;
        console.log('Layer init with options: ', options)
    },

    on: function(event_type, callback) {
        if (this._layer_group !== undefined) {
            let layers = this._layer_group.getLayers();
            for (let i = 0; i < layers.length; ++i) {
                layers[i].on(event_type, function() {
                    callback(this._data[i], i, layers[i]);
                }, this);  //bind
            }

        }
        return this;
    },

    setElementOptions: function(data, fn) {
        let array_options = data.map(fn), i = 0;
        for (i = 0; i < this._data.length; ++i) {
            this._data[i].options = this._data[i].options || {};

            if (i < data.length) {
                Object.assign(this._data[i].options, array_options[i])
            }
        }
        return this;
    },

    data: function(data, fn) {
        this._data = data.map(fn);
        return this;
    },

    addTo: function(leaflet_map) {
        //this._map = leaflet_map; // for ODLayer update
        this._layer_group.addTo(leaflet_map)
        return this;
    },

    enter: function() {
        if (this._layer_group !== undefined) {
            this.remove();
        }   // maybe delete this._layer_group ? 

        this._layer_group = L.featureGroup(
            this.generate() // rename would fit well
        );

        return this;
    },

    exit: function() {
        this.remove();
        return this;
    },

    generate: function() {
        return [];
    },

    remove: function() {
        if (this._layer_group !== undefined) {
            this._layer_group.remove();
        }
        return this;
    },

    getBounds: function() {
        return this._layer_group.getBounds();
    }
});
