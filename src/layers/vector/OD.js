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
        // @option color: String = '#4682B4'
        // Specify the color of the trail. You can also use description like 
        // 'color: "red"'.
        color: '#4682B4',

        // @option opacity: Number = 0.5
        // Specify the opacity of the trail.
        opacity: 0.5,

        // @option weight: Number = 3
        // Specify the width of the trail.
        weight: 3,

        // @option icon: Object = icon
        // Give an icon to show animation on the trail. Default is a plane.
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

        // @option points: Boolean = false.
        // Whether to add origin and destination points on the map.
        points: false,

        // @option points: Boolean = false.
        // Whether to add origin and destination points on the map.
        pointsSize: 3.0,
        
        // @option pointsColor: String = '#00C5CD'
        // Specify the color of the origin and destination points.
        pointsColor: '#00C5CD', //Turquoise3

        // @option pointsRadius: Number = 2
        // Specify the size of the origin and destination points.
        pointsRadius: 2,

        // @option pointsOpacity: Number = 2
        // Specify the opacity of the origin and destination points.
        pointsOpacity: 0.5,

        // @option preferCenter: Object = L.latLng(destination)
        // When the difference between org.lng and dst.lng is lager than 180,
        // we choose the point nearer to preferCenter as the base point and
        // move another one to make the trail sense. Default is destinaton.
        preferCenter: undefined,

        // @option popup: Boolean = false.
        // Whether to bind popup of latlng to the origin and destination points.
        popup: false,

        // @option popupContent: Object = undefined
        // Specify the popup content when popup is true.
        // Note that it is supposed to be like 
        // `{org: "your content a", dst: "your content b"} `
        // Default is {org: org.latLng, dst: dst.latLng}.
        popuopContent: undefined,

        // @optoin trailHighlight: Boolean = false.
        // Whether to highlight the trail.
        trailHighlight: false,
        
        // @option trailAnimate: Boolean = false.
        // Whether to setup animation of trial by using the icon in options.
        trailAnimate: false
    },

    initialize: function (origin, destination, options) {
        L.setOptions(this, options);
        if(this.options.preferCenter === undefined){ //set the default preferCenter
            this.options.preferCenter = destination;
        }
        this._initialUpdate = true;

        
        let points = this._normalizePoints(
            L.latLng(origin), L.latLng(destination));
        this.setPath(points.origin, points.destination);
        // this.setPath(L.latLng(origin), L.latLng(destination));
    },

    // Normalize the points to get a trail with shortest distance
    // parameters org and dst must be L.latLng
    _normalizePoints: function (org, dst){
        let o = org,
            d = dst,
            c = this.options.preferCenter;
        
        if(Math.abs(o.lng - d.lng) < 180){
            return {
                origin: o,
                destination: d
            };
        }
        
        // redundancy o
        if(o.distanceTo(L.latLng(c)) < d.distanceTo(L.latLng(c))){
            return {
                origin: o,
                destination: L.latLng(
                    d.lat,
                    d.lng > 0? d.lng - 360: d.lng + 360
                )
            }
        }
        // redundancy d
        else{
            return {
                origin: L.latLng(
                    o.lat, 
                    o.lng > 0? o.lng - 360: o.lng + 360
                ),
                destination: d
            }
        }
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
    
    addPoints: function(){
        this._orgMarker.addTo(this._map);
        this._dstMarker.addTo(this._map);
    },

    setPointsPopup: function(){
        let content = this.options.popuopContent;
        // TODO: Check whether content has fields `org` and `dst`
        let orgMarker = this._orgMarker;
        orgMarker.bindPopup(content.org);
        orgMarker.on('mouseover', function (e){
            orgMarker.openPopup();
        });
        orgMarker.on('mouseout', function (e){
            setTimeout(function(){
                orgMarker.closePopup();
            }, 300);
        });

        let dstMarker = this._dstMarker;
        dstMarker.bindPopup(content.dst);
        dstMarker.on('mouseover', function (e){
            dstMarker.openPopup();
        });
        dstMarker.on('mouseout', function (e){
            setTimeout(function(){
                dstMarker.closePopup();
            }, 300);
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
        // set points
        this._setPoints();
        this._bounds = this._computeBounds();
    },

    _setPoints: function(){
        let markerOptins = {
            color: this.options.pointsColor, 
            radius: this.options.pointsRadius,
            opacity: this.options.pointsOpacity
        };
        this._orgMarker = L.circleMarker(
            this._latlngs.org, 
            markerOptins);
        this._dstMarker = L.circleMarker(
            this._latlngs.dst, 
            markerOptins);
        // set default popup content
        if( this.options.popuopContent === undefined){
            this.options.popuopContent = {
                org: this._orgMarker.getLatLng().toString(),
                dst: this._dstMarker.getLatLng().toString()
            }
        }
    },

    // return items which can be listen
    getItem: function(item_type){
        if(item_type === 'org'){
            return this._orgMarker;
        }else if(item_type === 'dst'){
            return this._dstMarker;
        } else if(item_type === 'trail'){
            return this; 
        }else {
            return null;
        }
    },

    getOrigin: function(){
        return this._orgMarker;
    },

    getDestination: function(){
        return this._dstMarker;
    },

    getTrail: function(){
        return this._path;
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
    
    trailHighlight: function(){
        // highlight trail
        var trial = this.getTrail();   //get svgpath
        var _options = this.options;
        this.on('mouseover', function(e){
            trial.setAttribute('stroke-dasharray', 1);
            trial.setAttribute('stroke-width', _options.weight*1.25);
            trial.setAttribute('stroke-opacity', 1.0);
        });
        this.on('mouseout', function(e){
            setTimeout(function(){
                trial.setAttribute('stroke-dasharray', _options.dashArray);
                trial.setAttribute('stroke-width', _options.weight);
                trial.setAttribute('stroke-opacity', _options.opacity);
            }, 300);
        })
    },

    _updatePath: function () {
        let latlngs = this._renderer._updateTrail(this);
        // Add points to map.
        if(this.options.points){
            this.addPoints();
            //Bind popup of latlng to the points.
            if(this.options.popup){
                this.setPointsPopup();   
            }
        }
        if(this.options.trailHighlight){
            this.trailHighlight(); // highlight the trail
        }
        // Animate plane after trail updated
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
