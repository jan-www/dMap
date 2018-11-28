// BaseLayer.js
// Define BaseLayer class and basic methods here.


// @class BaseLayer
// Base class of all dmap.layer.
export class BaseLayer {
    constructor(option) {
        if (new.target === BaseLayer) {
            throw new Error('Class BaseLayer cannot be initialized.');
        }

        this._data = [];
        this._layer_group = undefined;
        this.setOption()
    }

    // @method on
    // @parameter event_type: event
    // @parameter callback: function
    // 
    // Bind callback function to every element.
    on(event_type, callback) {
        // TODO
        return this;
    }

    // @method setOption
    // @parameter option: object
    // 
    // Set layer option.
    setOption(option) {
        // TODO
        return this;
    }

    // @method data
    // @parameter data: Array
    // @parameter fn: function(d, i, a)
    // 
    // Set this._data by data and mapping-function fn.
    data(data, fn) {
        this._data = data.map(fn);
        return this;
    }

    // @method addTo
    // @parameter leaflet_map: L.map
    // 
    // Add all elements in this layer to L.map.
    addTo(leaflet_map) {
        this._layer_group.addTo(leaflet_map)
        return this;
    }

    // @method enter
    // 
    // Update this._layer_group.
    enter() {
        if (this._layer_group !== undefined) {
            this.remove();
        }   // maybe delete this._layer_group ? 

        this._layer_group = L.layerGroup(
            this.generate() // rename would fit well
        );

        return this;
    }

    // @method exit
    // 
    // Quit binding this layer on the L.map.
    exit() {
        this.remove();
        return this;
    }

    // @method generate
    // 注意 BaseLayer 的 generate() 方法不应调用，enter() 中应该调用对应子类的方法。
    generate() {
        return [];
    }

    // @method remove
    // 
    // Remove all elements from L.map.
    remove() {
        if (this._layer_group !== undefined) {
            this._layer_group.remove();
        }
        return this;
        // return what??
    }
}
