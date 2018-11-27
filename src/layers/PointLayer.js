// 
// 

import {BaseLayer} from "./BaseLayer.js"

// var map = L.map('mapid').setView([51.505, -0.09], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// l = new dmap.PointLayer(map);
// d = [[51, 0], [51, 10]]
// l.data(d, function(d){return {coordination: d, option: {radius: 200, color: 'red'}}}).enter();


export class PointLayer {
    constructor(leaflet_map, option) {
        this._data = [];
        this._points = [];
        this._leaflet_map = map;
        // this.setOption(option)
    }

    on(event_type, fn) {
        // TODO
    }
    
    data(data, fn) {
        // this._data = data;      // or append otherwise?
        this._data = data.map(fn);
        return this;
    }

    // render all points of this PointLayer to this.map
    enter() {
        // in enter() method contruct _points
        this._points = this._data.map((data)=>{return L.circle(data.coordination, data.option)});

        // maybe assert?

        for (var i = 0; i < this._points.length; ++i) {
            this._points[i].addTo(this._leaflet_map);
        }
        return this;
    }
}