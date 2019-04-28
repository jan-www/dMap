import {CanvasLayer} from './vector/CanvasLayer'

export var CanvasPolylineLayer = CanvasLayer.extend({
    options: {
        divideParts: 2
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
    
    data: function(data, map_function) {
        this._data = data.map(map_function, this);
        return this;
    }, 

    enter: function() {
        this._polylines = this._data.map((d, i) => {
            let polyline = {
                coordinates: d.coordinates.map(x => L.latLng(x)),
                latLngBounds: L.latLngBounds(),
                options: {
                    color: '#000000',
                    width: 1,
                    zoomLevel: 1
                },
                index: i
            }
            polyline.coordinates.forEach(x => {polyline.latLngBounds.extend(x)});
            L.setOptions(polyline, d.options);

            return polyline;
        });

        // calculate new bounds
        this._bounds = undefined;
        this.getBounds();

        return this;
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
        if (this._bounds === undefined) {
            let bounds = L.latLngBounds();
            this._polylines.forEach(function(pl) {
                bounds.extend(pl.latLngBounds);
            })
            this._bounds = bounds;
            this._divideParts();
        }
        return this._bounds;
    },

    _divideParts() {
        let n = this.options.divideParts,
            west = this.getBounds().getWest(),
            east = this.getBounds().getEast(),
            north = this.getBounds().getNorth(),
            south = this.getBounds().getSouth();

        this._divideBoundsParts = [];
        this._dividePolylinesParts = [];

        for (let i = 0; i < n; ++i) {
            let lat_rate_1 = i / n, lat_rate_2 = (i + 1) / n;
            for (let j = 0; j < n; ++j) {
                let lng_rate_1 = j / n, lng_rate_2 = (j + 1) / n,
                    _southWest = L.latLng(
                        south + lat_rate_1 * (north - south),
                        west + lng_rate_1 * (east - west)
                    ),
                    _northEast = L.latLng(
                        south + lat_rate_2 * (north - south),
                        west + lng_rate_2 * (east - west)
                    ),
                    divideBoundsPart = L.latLngBounds(_southWest, _northEast);

                    this._divideBoundsParts.push(divideBoundsPart);
                }
        }
        for (let i in this._divideBoundsParts) {
            let divideBoundsPart = this._divideBoundsParts[i],
                dividePolylinesPart = [];

            this._polylines.forEach(function(polyline) {
                if (polyline.latLngBounds.intersects(divideBoundsPart)) dividePolylinesPart.push(polyline);
            });
            this._dividePolylinesParts.push(dividePolylinesPart);
        }
    },

    onDrawLayer: function(viewInfo) {
        // if (!this.isVisible()) return;
        if (!this._map) return;
        this._updateOpacity();

        this._drawPolylines();
    },

    onLayerDidMount: function() {
        // this._enableIdentify();
        this._map.getContainer().style.cursor = this.options.cursor;
        this.needRedraw();
    },

    onLayerWillUnmount: function() {
        // this._disableIdentify();
        this._map.getContainer().style.cursor = '';
    },

    // _enableIdentify: function() {
    //     // Everytime when CLICK on `this._map`, `this` will 
    //     // react on a CLICK event.
    //    this._map.on('click', this._onClick, this);

    //    // If there exists an `onClick` parameter, then bind this 
    //    // function to CLICK event.
    //    this.options.onClick && this.on('click', this.options.onClick, this);
    // },

    // _disableIdentify: function() {
    //     this._map.off('click', this._onClick, this);
    //     this.options.onClick && this.off('click', this.options.onClick, this);
    // },

    // _onClick: function(e) {
    //     let v = this._queryValue(e);
    //     this.fire('click', v);
    // },
    
    needRedraw() {
        if (this._map) {
            CanvasLayer.prototype.needRedraw.call(this);
        }
    },

    _isDisplayPolyline(polyline) {
        return this._map.getZoom() >= polyline.options.zoomLevel;
    },

    _drawPolylines: function() {
        if (!this._polylines) return;
        
        const ctx = this._getDrawingContext();
        
        for (let i = 0; i < this._polylines.length; ++i) {
            if (!this._isDisplayPolyline(this._polylines[i])) continue;

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

    _queryValue: function(e) {
        if (!e) return e;
        
        let polyline = this._polylines && this.getBounds().contains(e.latlng)
            ? this._polylineAt(e.containerPoint) 
            : null,
            index = polyline ? polyline.index : null;
            
        return {
            ...e,
            value: polyline,
            // latlng: e.latlng,
            index: index,
            originData: this._polylines[index]
        }
    },

    _polylineAt: function(point) {
        let min_precision = undefined,
            ret_polyline = null,
            dividePolylinesPart = undefined,
            latlng = this._map.containerPointToLatLng(point);
        
        if (!this._map) return null;

        for (let i = 0; i < this._divideBoundsParts.length; ++i) {
            if (this._divideBoundsParts[i].contains(latlng)) {
                dividePolylinesPart = this._dividePolylinesParts[i];
                break;
            }
        }
        if (dividePolylinesPart === undefined) return null;

        for (let i = 0; i < dividePolylinesPart.length; ++i) {
            let polyline = dividePolylinesPart[i];
            if (!this._isDisplayPolyline(polyline)) continue;

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
            containerPoints = latlngs.map(latlng => this._map.latLngToContainerPoint(latlng));
        let ret = false;

        if (polyline.latLngBounds && !polyline.latLngBounds.contains(
            this._map.containerPointToLatLng(pt)
        )) return ret;

        for (let i = 0; i < containerPoints.length-1; ++i) {
            let curPt = containerPoints[i], nextPt = containerPoints[i + 1];
            if(pt.x >= Math.min(curPt.x, nextPt.x) - 10
            && pt.x <= Math.max(curPt.x, nextPt.x) + 10
            && pt.y >= Math.min(curPt.y, nextPt.y) - 10
            && pt.y <= Math.max(curPt.y, nextPt.y) + 10) {
                let precision = Math.abs((curPt.x - pt.x) / (curPt.y - pt.y) - (nextPt.x - pt.x)/(nextPt.y - pt.y));
                if (precision <= 1.618 + Math.log10(c._map.getZoom())/10 + lineWidth) {
                    ret = Math.min(ret || precision, precision);
                }
            }
        } 
        return ret;
    }
})