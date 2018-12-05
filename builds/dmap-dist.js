var dmap=function(t){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}function o(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&s(t,n)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,n){return(s=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}var h=function(){function n(t){if(e(this,n),(this instanceof n?this.constructor:void 0)===n)throw new Error("Class BaseLayer cannot be initialized.");this._data=[],this._layer_group=void 0,this.setOption()}return r(n,[{key:"on",value:function(t,n){return this}},{key:"setOption",value:function(t){return this}},{key:"data",value:function(t,n){return this._data=t.map(n),this}},{key:"addTo",value:function(t){return this._layer_group.addTo(t),this}},{key:"enter",value:function(){return void 0!==this._layer_group&&this.remove(),this._layer_group=L.layerGroup(this.generate()),this}},{key:"exit",value:function(){return this.remove(),this}},{key:"generate",value:function(){return[]}},{key:"remove",value:function(){return void 0!==this._layer_group&&this._layer_group.remove(),this}}]),n}(),n=function(t){function n(t){return e(this,n),u(this,a(n).call(this,t))}return o(n,h),r(n,[{key:"generate",value:function(){return this._data.map(function(t){return L.circle(t.coordination,t.option)})}}]),n}(),c=function(t){function n(t){return e(this,n),u(this,a(n).call(this,t))}return o(n,h),r(n,[{key:"generate",value:function(){return this._data.map(function(t){return L.polygon(t.coordinations,t.option)})}}]),n}(),l=function(t){function n(t){return e(this,n),u(this,a(n).call(this,t))}return o(n,h),r(n,[{key:"generate",value:function(){return this._data.map(function(t){return L.marker(t.coordination,t.option)})}}]),n}(),f=L.Path.extend({options:{curvature:4,leftSide:!1},initialize:function(t,n,e){L.setOptions(this,e),this._initialUpdate=!0,this.setPath(t,n)},onAdd:function(t){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},getPath:function(){return this._latlngs},setPath:function(t,n){var e=this.getMidPoint(t,n,this.options.curvature,this.options.leftSide);return this._setPath(t,n,e),this.redraw()},getBounds:function(){return this._bounds},getMidPoint:function(t,n,e){var i=3.14;"RIGHT_ROUND"===(3<arguments.length&&void 0!==arguments[3]?arguments[3]:"LEFT_ROUND")&&(i*=-1);var r=t,o=n,a=o.lng-r.lng,s=o.lat-r.lat,u=Math.sqrt(Math.pow(a,2)+Math.pow(s,2)),h=Math.atan2(s,a),c=i/(e||4),l=u/2/Math.cos(c),f=h+c,p=l*Math.cos(f)+r.lng;return[l*Math.sin(f)+r.lat,p]},_setPath:function(t,n,e){this._latlngs={org:t,dst:n,mid:e},this._bounds=this._computeBounds()},_computeBounds:function(){var t=new L.LatLngBounds;return t.extend(this._latlngs.org),t.extend(this._latlngs.dst),t.extend(this._latlngs.mid),t},getCenter:function(){return this._bounds.getCenter()},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateTrail(this)},_project:function(){this._points=[],this._points.push("M");var t=this._map.latLngToLayerPoint(this._latlngs.org);this._points.push(t),this._latlngs.mid&&(this._points.push("Q"),t=this._map.latLngToLayerPoint(this._latlngs.mid),this._points.push(t)),t=this._map.latLngToLayerPoint(this._latlngs.dst),this._points.push(t)}});function p(t,n,e){return new f(t,n,e)}L.SVG.include({_updateTrail:function(t){var n=this._trailPointsToPath(t._points);if(this._setPath(t,n),t.options.animate){var e=t._path,i=e.getTotalLength();t.options.dashArray||(e.style.strokeDasharray=i+" "+i),t._initialUpdate&&(e.animate([{strokeDashoffset:i},{strokeDashoffset:0}],t.options.animate),t._initialUpdate=!1)}return n},_trailPointsToPath:function(t){for(var n,e="",i=0,r=t.length;i<r;i++)"string"==typeof(n=t[i])||n instanceof String?e+=n:e+=n.x+","+n.y+" ";return e||"M0 0"}});var _=function(t){function n(t){return e(this,n),u(this,a(n).call(this,t))}return o(n,h),r(n,[{key:"generate",value:function(){return this._data.map(function(t){return p(t.origin,t.destination,t.options)})}}]),n}();return t.PointLayer=n,t.PolygonLayer=c,t.MarkerLayer=l,t.ODLayer=_,t.BaseLayer=h,t.OD=f,t.od=p,t}({});
