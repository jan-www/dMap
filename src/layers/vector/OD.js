/*
 * @class OD
 * @inherits L.Path
 *
 * A class for drawing OD-trail overlays on a map. Extends `L.Path`.
 *
 * @example
 *
 * ```js
 * // create a red OD-trail(Bezier curve) from an array of LatLng points
 * var trial = dmap.OD([45.51, -122.68], 
 *              [37.77, -122.43], {color: 'red'}).addTo(map);
 * ```
 */


export var OD = L.Path.extend({
    
    // @section
    // @aka OD options
    options:{
        // @option curvature: Number = 4.0
        // How much to simplify the trial on map. More means less curved the 
        // trial is, and less means more curved the trial is.
        // Note that curvature have to be greater than 4.0.
        curvature: 4.0,

        // @option leftSide: Boolean = false.
        // Make the trial on the right side of line from origin to destination. 
        leftSide: false       
    },

    initialize: function (origin, destination, options) {
        L.setOptions(this, options);
        this._initialUpdate = true;
        
        this.setPath(origin, destination);
    },

    onAdd: function (map) {
        this._renderer._initPath(this);
        this._reset();
        this._renderer._addPath(this);
    },
    
    getPath: function () {
        return this._latlngs;
    },
    
    setPath: function (org, dst) {
        let middlePoint = this.getMidPoint(org, dst, 
            this.options.curvature, this.options.leftSide);
        
        this._setPath(org, dst, middlePoint);
        return this.redraw();
    },

    getBounds: function () {
        return this._bounds;
    },

    getMidPoint: function (org, dst, deep, round_side = 'LEFT_ROUND') {

        let offset = 3.14;

        if (round_side === 'RIGHT_ROUND')
            offset = offset * -1;

        let latlng1 = org,
            latlng2 = dst;

        let offsetX = latlng2.lng - latlng1.lng,
            offsetY = latlng2.lat - latlng1.lat;

        let r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
            theta = Math.atan2(offsetY, offsetX);

        let thetaOffset = (offset / (deep ? deep : 4));

        let r2 = (r / 2) / (Math.cos(thetaOffset)),
            theta2 = theta + thetaOffset;

        let midpointX = (r2 * Math.cos(theta2)) + latlng1.lng,
            midpointY = (r2 * Math.sin(theta2)) + latlng1.lat;

        let midpointLatLng = [midpointY, midpointX];

        return midpointLatLng;
    },

    _setPath: function (org, dst, mid) {
        this._latlngs = {
            org: org,
            dst: dst,
            mid: mid
        };
        this._bounds = this._computeBounds();
    },

    _computeBounds: function () {
        let bound = new L.LatLngBounds();
        bound.extend(this._latlngs.org);
        bound.extend(this._latlngs.dst);
        bound.extend(this._latlngs.mid);

        return bound;
    },
    
    getCenter: function () {
        return this._bounds.getCenter();
    },
    
    _update: function () {
        if (!this._map) {
            return;
        }
        this._updatePath();
    },
    
    _updatePath: function () {
        //animated plane
        let latlngs = this._renderer._updateTrail(this);
        //this.setAnimatePlane(latlngs);
    },
    
    _project: function () {
        this._points = [];
        this._points.push('M');

        let curPoint = this._map.latLngToLayerPoint(this._latlngs.org);
        this._points.push(curPoint);

        if (this._latlngs.mid) {
            this._points.push('Q');
            curPoint = this._map.latLngToLayerPoint(this._latlngs.mid);
            this._points.push(curPoint);
        }

        curPoint = this._map.latLngToLayerPoint(this._latlngs.dst);
        this._points.push(curPoint);
    },
});

// @factory L.od(latlng: origin, latlng: destination, options?: OD options)
// Instantiates an OD object given two geographical points (i.e. origin point 
// and destination point) and optionally an options object.
export function od(origin, destination, options) {
	return new OD(origin, destination, options);
}

/* @namespace L.SVG
 * @section Layer events
 *
 * @event _updateOD: LayerEvent
 * Fired when there is a need to update the layer on the map.
 *
 *
 * @section Methods for Layers and Controls
 */
L.SVG.include({
    _updateTrail: function (layer) {
        let svgPath = this._trailPointsToPath(layer._points);
        this._setPath(layer, svgPath);
        
        if (layer.options.animate) {
            let path = layer._path;
            let length = path.getTotalLength();

            if (!layer.options.dashArray) {
                path.style.strokeDasharray = length + ' ' + length;
            }

            if (layer._initialUpdate) {
                path.animate([
                    {strokeDashoffset: length},
                    {strokeDashoffset: 0}
                ], layer.options.animate);
                layer._initialUpdate = false;
            }
        }
        

        return svgPath;
    },


    _trailPointsToPath: function (points) {
        let point, curCommand, str = '';
        for (let i = 0, len = points.length; i < len; i++) {
            point = points[i];
            if (typeof point === 'string' || point instanceof String) {
                curCommand = point;
                str += curCommand;
            } else
                str += point.x + ',' + point.y + ' ';
        }
        return str || 'M0 0';
    },

});
