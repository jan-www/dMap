// BaseLayer.js
// Define BaseLayer class and basic methods here.


// @class BaseLayer
// Base class of all dmap.layer.

export var BaseLayer = L.Layer.extend({
    initialize: function(options) {
        L.Util.setOptions(this, options);
        console.log('Layer init with options: ', options)
    },

    data: function(data, fn) {
        throw new Error('this method must be override.')
    },

    enter: function() {
        throw new Error('this method must be override.')
    },

    exit: function() {
        throw new Error('this method must be override.')
    }
});
