import {CanvasLayer} from './vector/CanvasLayer'

export var CanvasPolylineLayer = CanvasLayer.extend({
    options: {
    },


    // polylines is an Array of polyline, which is an Array of L.latlng.
    initialize: function(options) {
        L.Util.setOptions(this, options);
    },

    /**
     * 
     * @param {Array} data 
     * @param {function} fn 
     * 
     * var l = new CanvasPolylineLayer(options);
     * var arr = [[[1, 2], [11, 12], [21, 22]], [another polyline]];
     * l.data(arr, function(d) {
     *      return {
     *          coordinates: d.map(x => L.latLng(x)), 
     *          options: { color: d.length > 2 ? 'gray' : 'black' }
     *      }
     *  });
     * 
     * 
     */
    
    data: function(data, fn) {
        this._polylines = data.map(fn);

        this._polylines.forEach(function(d) {
            d.coordinates = d.coordinates.map(x => L.latLng(x));
            d.options = Object.assign({
                color: '#000000',
                width: 1,
                zoomLevel: 1
            }, d.options)
        });
        this.needRedraw();
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

    // getBounds: function() {
    //     if (this._bounds === undefined) {
    //         let bounds = undefined;
    //         for (let i = 0; i < this._polylines.length; ++i) {
    //             for (let j = 0; j < this._polylines[i].coordinates.length; ++j) {
    //                 bounds = bounds ? bounds : L.bounds(this._polylines[i].coordinates[j]);
    //                 console.log(bounds.max, bounds.min)
    //                 bounds.extend(this._polylines[i].coordinates[j]);
    //             }
    //         }
    //         this._bounds = bounds;
    //     }
    //     return this._bounds;
    // },
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
        
        for (let i = 0; i < this._polylines.length; ++i) {
            if (this._map.getZoom() < this._polylines[i].options.zoomLevel) continue;

            let latlngs = this._polylines[i].coordinates.map(x=>L.latLng(x));
            this._prepareOptions(this._polylines[i], ctx);
            ctx.beginPath();
            
            if (latlngs.length) ctx.moveTo(
                this._map.latLngToContainerPoint(latlngs[0]).x,
                this._map.latLngToContainerPoint(latlngs[0]).y
            )
            for (let j = 1; j < latlngs.length; ++j){
                ctx.lineTo(
                    this._map.latLngToContainerPoint(latlngs[j]).x,
                    this._map.latLngToContainerPoint(latlngs[j]).y
                )
            }
            ctx.stroke();
            ctx.closePath();
        }
    },
    
    _getDrawingContext: function() {
        let g = this._canvas.getContext('2d');
        g.clearRect(0, 0, this._canvas.width, this._canvas.height);
        return g;
    },

    _prepareOptions: function(polyline, ctx) {
        ctx.lineWidth = polyline.options.width;
        ctx.strokeStyle = polyline.options.color;
    }
})