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
        color: '#4682B4',
        opacity: 0.5,
        weight: '3',
        icon: {
            iconUrl: "plane.png"
        },
        // @option curvature: Number = 4.0
        // How much to simplify the trial on map. More means less curved the 
        // trial is, and less means more curved the trial is.
        // Note that curvature have to be greater than 4.0.
        curvature: 4.0,

        // @option leftSide: Boolean = false.
        // Make the trial on the right side of line from origin to destination. 
        leftSide: false,
        
        // @option popup: Boolean = false.
        // Bind popup of latlng to the origin and destination points.
        popup: false,
        
        // @option trailAnimate: Boolean = false.
        // Setup animation of trial by using the icon in options.
        trailAnimate: false
    },

    initialize: function (origin, destination, options) {
        L.setOptions(this, options);
        this._initialUpdate = true;
        
        this.setPath(L.latLng(origin), L.latLng(destination));
    },

    onAdd: function (map) {
        this._renderer._initPath(this);
        this._reset(); // _project() + _update()
        this._renderer._addPath(this); // add path on map
        // map.on('click', function(){
        //     this._latlngs.org
        // });
    },
    
    animateIcon: function(path) {
        // highlight trail
        var trial = this._path;   //get svgpath
        // var optionsBak = this.options;
        // var newOptions = this.options;
        // newOptions.weight = newOptions.weight * 2;
        // newOptions.opacity = 1.0;

        this.on('mouseover', function(e){
            trial.setAttribute('stroke-dasharray', 1);
            trial.setAttribute('stroke-width', this.options.weight*1.25);
            trial.setAttribute('stroke-opacity', 1.0);
        });
        this.on('mouseout', function(e){
            trial.setAttribute('stroke-dasharray', this.options.dashArray);
            trial.setAttribute('stroke-width', this.options.weight);
            trial.setAttribute('stroke-opacity', this.options.opacity);
        })

        // make icon move along the trail
        if (this.spaceship_img)
            this.spaceship_img.remove();

        let SnapSvg = Snap('.leaflet-overlay-pane>svg');
        
        let spaceship_img = this.spaceship_img = SnapSvg.image(this.options.icon.iconUrl).attr({
            visibility: "hidden"
        });


        let spaceship = SnapSvg.group(spaceship_img);
        let flight_path = SnapSvg.path(path).attr({
            'fill': 'none',
            'stroke': 'none'
        });

        let full_path_length = Snap.path.getTotalLength(flight_path);
        let half_path_length = full_path_length / 2;
        let third_path_length = full_path_length / 3;
        let forth_path_length = full_path_length / 4;


        let width = forth_path_length / this._map.getZoom();
        let height = forth_path_length / this._map.getZoom();

        width = Math.min(Math.max(width, 30), 64);
        height = Math.min(Math.max(height, 30), 64);

        this.on('click', function(e){
            Snap.animate(0, forth_path_length, function (step) {

                //show image when plane start to animate
                spaceship_img.attr({
                    visibility: "visible"
                });
    
                spaceship_img.attr({width: width, height: height});
    
                //last_step = step;
    
                let moveToPoint = Snap.path.getPointAtLength(flight_path, step);
    
                let x = moveToPoint.x - (width / 2);
                let y = moveToPoint.y - (height / 2);
    
    
                spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
    
            }, 2500, mina.easeout, function () {
    
                Snap.animate(forth_path_length, half_path_length, function (step) {
    
                    //last_step = step;
                    let moveToPoint = Snap.path.getPointAtLength(flight_path, step);
    
                    let x = moveToPoint.x - width / 2;
                    let y = moveToPoint.y - height / 2;
                    spaceship.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + width / 2 + ', ' + height / 2 + ')');
                }, 7000, mina.easein, function () {
                    //done
                    spaceship_img.attr({
                        visibility: "hidden"
                    });
                });
    
            });
        });
    },
    
    setPointPopup: function(){
        let markerOptins = {
            color: '#00C5CD', //Turquoise3
            radius: 2,
            opacity: 0.5
        };
        var orgMarker = L.circleMarker(
            this._latlngs.org, 
            markerOptins).addTo(this._map)
            .bindPopup(this._latlngs.org.toString());
        orgMarker.on('mouseover', function (e){
            orgMarker.openPopup();
        });
        orgMarker.on('mouseout', function (e){
            orgMarker.closePopup();
        });

        var dstMarker = L.circleMarker(
            this._latlngs.dst, 
            markerOptins).addTo(this._map)
            .bindPopup(this._latlngs.dst.toString());
        dstMarker.on('mouseover', function (e){
            dstMarker.openPopup();
        });
        dstMarker.on('mouseout', function (e){
            dstMarker.closePopup();
        });
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

        if(deep < 3.0){  // straighten the trail if deep is less than 3
            deep = 1.0;
        }

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
        let latlngs = this._renderer._updateTrail(this);
        //Bind popup of latlng to the points.
        if(this.options.popup){
            this.setPointPopup();   
        }
        //animated plane after update trail
        if(this.options.trailAnimate){
            this.animateIcon(latlngs); 
        }
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
        
        if (layer.options.dashHandle) {
            let path = layer._path;
            let length = path.getTotalLength();

            if (!layer.options.dashArray) {
                path.style.strokeDasharray = length + ' ' + length;
            }

            if (layer._initialUpdate) {
                path.animate([
                    {strokeDashoffset: length},
                    {strokeDashoffset: 0}
                ], layer.options.dashHandle);
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
