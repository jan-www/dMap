import { BaseLayer } from "./BaseLayer.js";

export var GroupLayer = BaseLayer.extend({
    initialize: function(options) {
        this._data = [];  // {}
        this._layer_group = undefined;
    }, 

    on: function(event_type, callback_function) {
        if (this._layer_group == undefined) return this;

        this._layer_group.getLayers().forEach((layer, index) => {
            layer.on(event_type, () => {
                callback_function(this._data[index], index, layer);
            }, this);
        });
        return this;
    },

    // set options for each element in this._data
    // not for Leaflet components.
    setElementOptions: function(data, map_function) {
        let array_options = data.map(map_function, this),
            i = 0;
        for (i = 0; i < Math.min(data.length, this._data.length); ++i) {
            L.Util.setOptions(this._data[i], array_options[i]);
        }
        return this;
    },

    data: function(data, map_function) {
        this._data = data.map(map_function, this);
        return this;
    },

    addTo: function(map) {
        this._layer_group.addTo(map);
        return this;
    },

    enter: function() {
        this._layer_group !== undefined && this.remove();

        this._layer_group = L.featureGroup(this.generate());
        return this;
    },

    exit: function() {
        this.remove();
        return this;
    },

    remove: function() {
        this._layer_group !== undefined && this._layer_group.remove();
        return this;
    },

    getBounds: function() {
        return this._layer_group ? this._layer_group.getBounds() : undefined;
    }

})