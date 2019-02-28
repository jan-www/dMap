import {CanvasLayer} from './vector/CanvasLayer'

export var CanvasPolylineLayer = CanvasLayer.extend({
    options: {
        color: '#000000',
        opacity: 1.0,
        lineWidth: 1
    },

    initialize: function(polylines, options) {
        L.Util.setOptions(this, options);
        this._polylines = this._updatePolylines(polylines)
        console.log('CanvasPolylineLayer init')
        console.log(this._polylines)
    },

    _updatePolylines: function(polylines) {
        let ret = [];
        for (let i = 0; i < polylines.length; ++i) {
            ret.push(polylines[i].map(x => L.latLng(x)));
        }
        return ret;
    },

    _updateOpacity: function() {
        L.DomUtil.setOpacity(this._canvas, this.options.opacity);
    },

    setOpacity: function(opacity) {
        this.options.opacity = opacity;

        if (this._canvas) {
            this._updateOpacity();
        }
        return this;
    },

    getBounds: function() {
        let bounds = L.latLngBounds(this._polylines);
        return bounds;
    },
    onDrawLayer: function(viewInfo) {
        // if (!this.isVisible()) return;
        this._updateOpacity();

        this._drawPolylines();
    },

    needRedraw() {
        if (this._map) {
            CanvasLayer.prototype.needRedraw.call(this);
        }
    },

    _drawPolylines: function() {
        const ctx = this._getDrawingContext();
        ctx.strokeStyle = this.options.color;
        ctx.lineWidth = this.options.lineWidth;

        for (let i = 0; i < this._polylines.length; ++i) {
            let latlngs = this._polylines[i];
            ctx.beginPath();

            if (latlngs.length) ctx.moveTo(
                this._map.latLngToContainerPoint(latlngs[0]).x,
                this._map.latLngToContainerPoint(latlngs[0]).y
            )
            // console.log('ctx.moveTo(', this._map.latLngToContainerPoint(latlngs[0]).x, ',', this._map.latLngToContainerPoint(latlngs[0]).y, ')')
            for (let j = 1; j < latlngs.length; ++j){
                ctx.lineTo(
                    this._map.latLngToContainerPoint(latlngs[j]).x,
                    this._map.latLngToContainerPoint(latlngs[j]).y
                )
                // console.log('ctx.lineTo(', this._map.latLngToContainerPoint(latlngs[j]).x, ',', this._map.latLngToContainerPoint(latlngs[j]).y, ')')
            }
            ctx.stroke();
            ctx.closePath();
        }
    },
    
    _getDrawingContext: function() {
        let g = this._canvas.getContext('2d');
        g.clearRect(0, 0, this._canvas.width, this._canvas.height);
        return g;
    }
})