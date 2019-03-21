import {CanvasLayer} from './vector/CanvasLayer'

export var CanvasPolylineLayer = CanvasLayer.extend({
    options: {
        onClick: null
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
        this._bounds = undefined;
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

    getBounds: function() {
        if (this._map === undefined) return undefined;

        if (this._bounds === undefined) {
            let bounds = L.latLngBounds();
            this._polylines.forEach(function(pl) {
                pl.coordinates.forEach(function(coordinate) {
                    bounds.extend(coordinate)
                })
            })
            this._bounds = bounds;
        }
        return this._bounds;
    },

    onDrawLayer: function(viewInfo) {
        // if (!this.isVisible()) return;
        if (!this._map) return;
        this._updateOpacity();

        this._drawPolylines();
    },

    onLayerDidMount: function() {
        this._enableIdentify();
    },

    onLayerWillUnmount: function() {
        this._disableIdentify();
    },

    _enableIdentify: function() {
       this._map.on('click', this._onClick, this);
       this.options.onClick && this.on('click', this.options.onClick, this);
    },

    _disableIdentify: function() {
        this._map.off('click', this._onClick, this);
        this.options.onClick && this.off('click', this.options.onClick, this);
    },

    _onClick: function(e) {
        let v = this._queryPolyline(e);
        this.fire('click', v);
    },
    
    needRedraw() {
        if (this._map) {
            CanvasLayer.prototype.needRedraw.call(this);
        }
    },

    _displayPolyline(polyline) {
        return this._map.getZoom() >= polyline.options.zoomLevel;
    },

    _drawPolylines: function() {
        if (!this._polylines) return;
        
        const ctx = this._getDrawingContext();
        
        for (let i = 0; i < this._polylines.length; ++i) {
            if (!this._displayPolyline(this._polylines[i])) continue;

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
    },

    _queryPolyline: function(e) {
        let polyline = this._polylineAt(e.containerPoint);
        return {
            polyline: polyline,
            latlng: e.latlng
        }
    },

    _polylineAt: function(point) {
        let min_precision = undefined,
            ret_polyline = undefined;
            
        for (let i = 0; i < this._polylines.length; ++i) {
            let polyline = this._polylines[i];
            if (!this._displayPolyline(polyline)) continue;

            let precision = this._pointIsOnPolyline(point, polyline);
            if (precision === false) continue;  // point is not on this polyline

            min_precision = Math.min(min_precision || precision, precision);
            if (precision == min_precision) ret_polyline = polyline;
        }
        return ret_polyline;
    },

    _pointIsOnPolyline: function(pt, polyline) {
        let latlngs = polyline.coordinates,
            lineWidth = polyline.options.width,
            containerPoints = latlngs.map(latlng => c._map.latLngToContainerPoint(latlng));
        let ret = false;

        for (let i = 0; i < containerPoints.length-1; ++i) {
            let curPt = containerPoints[i], nextPt = containerPoints[i + 1];
            if (pt.x >= Math.min(curPt.x, nextPt.x) - 10
            && pt.x <= Math.max(curPt.x, nextPt.x) + 10
            && pt.y >= Math.min(curPt.y, nextPt.y) - 10
            && pt.y <= Math.max(curPt.y, nextPt.y) + 10) {
                let precision = Math.abs((curPt.x - pt.x) / (curPt.y - pt.y) - (nextPt.x - pt.x)/(nextPt.y - pt.y));
                if (precision <= 0.05 + Math.log10(c._map.getZoom())/10) {
                    ret = Math.min(ret || precision, precision);
                }
            }
        } 
        return ret;
    }
})