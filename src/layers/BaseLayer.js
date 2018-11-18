// BaseLayer.js
// Define BaseLayer class and basic methods here.

import {BASELAYERCHANGE}  from '../const/const.js';

// @class BaseLayer
export class BaseLayer {
    constructor(mapid, option) {
        if (new.target === BaseLayer) {
            throw new Error('Class BaseLayer cannot be initialized.');
        }
        
        this._obj = L.map(mapid, option);
        this._prev_data = [];
        this._data = [];
    }

    on(event_type, callback) {
        switch (event_type) {
            // other cases.
            default: {
                this._obj.on(event_type, callback);
            }
        }
        return this;
    }

    setOption(option) {
        this._obj.setOption(option);
        return this;
    }

    data(d, func) {
        this._data = d;
    }
}
