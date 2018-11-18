# 1.	Class
    [https://leafletjs.com/reference-1.3.4.html#class]

	L.Class powers the OOP facilities of Leaflet and is used to create almost all of the Leaflet classes documented here. In addition to implementing a simple classical inheritance model, it introduces several special properties for convenient code organization — options, includes and statics.

	*extend*:	var MyClass = L.Class.extend({options: {myOption1: 'xxx', myOption2: 'xxx'}});
	...

# 1.1.	Evented (from @Class)

    [https://leafletjs.com/reference-1.3.4.html#evented]

    Generally, events allow you to execute some function when something happens with an object.

    *on*:   map.on('click', function(){});
    *off*
    *fire*
    *once*
    ...

# 1.1.1.	Layer (from @Evented)

    [https://leafletjs.com/reference-1.3.4.html#layer]

    A set of methods from the Layer base class that all Leaflet layers use.

    *addTo*
    *remove*
    ...

# 1.1.1.1.	LayerGroup (from @Layer)

	[https://leafletjs.com/reference-1.3.4.html#layergroup]
	
	Used to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well. 

	*addLayer*
	*removeLayer*
	*hasLayer*
	*clearLayers*
	...

# 1.1.1.1.1.	FeatureGroup (from @LayerGroup)
	
	[https://leafletjs.com/reference-1.3.4.html#featuregroup]

	Extend LayerGroup that makes it easier to do the same thing to all its member layers:
	+ bindPopup binds a popup to all of the layers at once (likewise with bindTooltip)
	+ Events are propagated to the FeatureGroup, so if the group has an event handler, it will handle events from any of the layers. This includes mouse events and custom events.
	+ Has layeradd and layerremove events

	*setStyle*
	*bringToFront*
	*bringToBack*
	*getBounds*
	...

# 1.1.1.1.1.1.	GeoJSON (from @FeatureGroup)

	[https://leafletjs.com/reference-1.3.4.html#geojson]

	Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map.

	*addData*
	*resetStyle*	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
	*setStyle*
	...

# 1.1.1.2.	DivOverlay (from @Layer)

	[https://leafletjs.com/reference-1.3.4.html#divoverlay]

	Base model for L.Popup and L.Tooltip. Inherit from it for custom popup like plugins.

# 1.1.1.2.1.	Popup (from @DivOverlay)

	[https://leafletjs.com/reference-1.3.4.html#popup]

	Used to open popups in certain places of the map. Use Map.openPopup to open popups while making sure that only one popup is open at one time (recommended for usability), or use Map.addLayer to open as many as you want.

	'''
	var popup = L.popup()
    .setLatLng(latlng)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);
	'''

	*getLatLng*
	*setContent*
	*isOpen*
	*openOn*	// Adds the popup to the map and closes the previous one. The same as map.openPopup(popup).
	...

# 1.1.1.2.2.	Tooltip (from @DivOverlay)

	[https://leafletjs.com/reference-1.3.4.html#tooltip]
	
	Used to display small texts on top of map layers.

	'''
	marker.bindTooltip("my tooltip text").openTooltip();
	'''

# 1.1.2. Map (from @Evented)

	[https://leafletjs.com/reference-1.3.4.html#map]

	The central class of the API — it is used to create a map on a page and manipulate it.

	'''
	var map = L.map('map', {
   		center: [51.505, -0.09],
	    zoom: 13
	});
	'''

	*setView*
	*setZoom*
	*addLayer*
	*removeLayer*
	*addControl*
	*eachLayer*
	*openTooltip*
	...

# 1.1.3.	Control (from @Evented)
	
	[https://leafletjs.com/reference-1.3.4.html#control]

	L.Control is a base class for implementing map controls. Handles positioning. All other controls extend from this class.

	*getPosition*
	*setPosition*
	*addTo*	// Adds the control to the given map
	*remove*
	...

# 1.1.3.1.	Control.Attribution (from @Control)
	
	[https://leafletjs.com/reference-1.3.4.html#control-attribution]

	The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its attributionControl option to false, and it fetches attribution texts from layers with the getAttribution method automatically.

	*setPrefix*
	*addAttribution*
	...

# 1.1.3.2.	Control.Layers (from @Control)

	[https://leafletjs.com/reference-1.3.4.html#control-layers]

	The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the detailed example). 
	
	'''
	var baseLayers = {
		"Mapbox": mapbox,
		"OpenStreetMap": osm
	};
	var overlays = {
		"Marker": marker,
		"Roads": roadsLayer
	};
	L.control.layers(baseLayers, overlays).addTo(map);
	'''
	
	*addBaseLayer*
	*addOverlay*
	...

# 1.1.3.3.	Control.Scale (from @Control)

	[https://leafletjs.com/reference-1.3.4.html#control-scale]

	A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.

	...

# 1.1.3.4.	Control.Zoom (from @Control)

	[https://leafletjs.com/reference-1.3.4.html#control-zoom]

	A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its zoomControl option to false. 

	...

# 1.1.4.	Draggable (from @Evented)

	[https://leafletjs.com/reference-1.3.4.html#draggable]

	A class for making DOM elements draggable (including touch support). Used internally for map and marker dragging. Only works for elements that were positioned with L.DomUtil.setPosition.

	'''
	var draggable = new L.Draggable(elementToDrag);
	draggable.enable();
	'''

	*enable*
	*disable*
	...

# 1.1.5.	PosAnimation (from @Evented)

	[https://leafletjs.com/reference-1.3.4.html#posanimation]

	Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.

	*run*
	*stop*
	...

# 2.	LatLng (not inherited)

	[https://leafletjs.com/reference-1.3.4.html#latlng]

	Represents a geographical point with a certain latitude and longitude.
	Note that LatLng does not inherit from Leaflet's Class object, which means new classes can't inherit from it, and new methods can't be added to it with the include function.

	*equals*
	*toString*
	...

# 3.	LatLngBounds (not inherited)

	[https://leafletjs.com/reference-1.3.4.html#latlngbounds]

	Represents a rectangular geographical area on a map.
	Note that LatLngBounds does not inherit from Leafet's Class object, which means new classes can't inherit from it, and new methods can't be added to it with the include function.

	*extend*	// Extend the bounds to contain the given point
	*extend*	// Extend the bounds to contain the given bounds
	*getCenter*
	*getSouth*
	...	

# 4.	Bounds (not inherited)

	[https://leafletjs.com/reference-1.3.4.html#bounds]
	
	Represents a rectangular area in pixel coordinates.

	'''
	var p1 = L.point(10, 10),
	p2 = L.point(40, 60),
	bounds = L.bounds(p1, p2);

	otherBounds.intersects([[10, 10], [40, 60]]);
	'''

	*extend*
	*getSize*
	...


# 5.	Point (not inherit)

	[https://leafletjs.com/reference-1.3.4.html#point]

	Represents a point with x and y coordinates in pixels.

	*clone*
	*add*
	*multiplyBy*
	...

# 6.	Transformation (not inherit)
	
	[https://leafletjs.com/reference-1.3.4.html#transformation]


	Represents an affine transformation: a set of coefficients a, b, c, d for transforming a point of a form (x, y) into (a*x + b, c*y + d) and doing the reverse. Used by Leaflet in its projections code.

	'''
	var transformation = L.transformation(2, 5, -1, 10),
    p = L.point(1, 2),
    p2 = transformation.transform(p), //  L.point(7, 8)
    p3 = transformation.untransform(p2); //  L.point(1, 2)
	'''

	*transform*
	*untransform*
