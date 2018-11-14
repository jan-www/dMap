// Define constants.


// Event Constants 



// Event constants fetched from leafletjs.

// Layer events
export const BASELAYERCHANGE	= 'baselayerchange' // Fired when the base layer is changed through the layer control.
export const OVERLAYADD		    = 'overlayadd' // Fired when an overlay is selected through the layer control.
export const OVERLAYREMOVE		= 'overlayremove' // Fired when an overlay is deselected through the layer control.
export const LAYERADD		    = 'layeradd' // Fired when a new layer is added to the map.
export const LAYERREMOVE		= 'layerremove' // Fired when some layer is removed from the map


// Map state change events
export const ZOOMLEVELSCHANGE	= 'zoomlevelschange' // Fired when the number of zoomlevels on the map is changed due
                                                 // to adding or removing a layer.
export const RESIZE		        = 'resize' // Fired when the map is resized.
export const UNLOAD		        = 'unload' // Fired when the map is destroyed with remove method.
export const VIEWRESET		    = 'viewreset' // Fired when the map needs to redraw its content (this usually happens
                                            // on map zoom or load). Very useful for creating custom overlays.
export const LOAD		        = 'load' // Fired when the map is initialized (when its center and zoom are set
                                            // for the first time).
export const ZOOMSTART		    = 'zoomstart' // Fired when the map zoom is about to change (e.g. before zoom animation).
export const MOVESTART		    = 'movestart' // Fired when the view of the map starts changing (e.g. user starts dragging the map).
export const ZOOM		        = 'zoom' // Fired repeatedly during any change in zoom level, including zoom
                                        // and fly animations.
export const MOVE		        = 'move' // Fired repeatedly during any movement of the map, including pan and fly animations.
export const ZOOMEND		    = 'zoomend' // Fired when the map has changed, after any animations.
export const MOVEEND		    = 'moveend' // Fired when the center of the map stops changing (e.g. user stopped dragging the map).


// Popup events
export const POPUPOPEN		    = 'popupopen' // Fired when a popup is opened in the map
export const POPUPCLOSE		    = 'popupclose' // Fired when a popup in the map is closed
export const AUTOPANSTART		= 'autopanstart' // Fired when the map starts autopanning when opening a popup.


// Tooltip events
export const TOOLTIPOPEN		= 'tooltipopen' // Fired when a tooltip is opened in the map.
export const TOOLTIPCLOSE		= 'tooltipclose' // Fired when a tooltip in the map is closed.


// Location events
export const LOCATIONERROR		= 'locationerror' // Fired when geolocation (using the locate method) failed.
export const LOCATIONFOUND		= 'locationfound' // Fired when geolocation (using the locate method) went successfully.


// Interaction events
export const CLICK		        = 'click' // Fired when the user clicks (or taps) the map.
export const DBLCLICK		    = 'dblclick' // Fired when the user double-clicks (or double-taps) the map.
export const MOUSEDOWN		    = 'mousedown' // Fired when the user pushes the mouse button on the map.
export const MOUSEUP		    = 'mouseup' // Fired when the user releases the mouse button on the map.
export const MOUSEOVER		    = 'mouseover' // Fired when the mouse enters the map.
export const MOUSEOUT		    = 'mouseout' // Fired when the mouse leaves the map.
export const MOUSEMOVE		    = 'mousemove' // Fired while the mouse moves over the map.
export const CONTEXTMENU		= 'contextmenu' // Fired when the user pushes the right mouse button on the map, prevents
                                            // default browser context menu from showing if there are listeners on
                                            // this event. Also fired on mobile when the user holds a single touch
                                            // for a second (also called long press).
export const KEYPRESS		    = 'keypress' // Fired when the user presses a key from the keyboard while the map is focused.
export const PRECLICK		    = 'preclick' // Fired before mouse click on the map (sometimes useful when you
                                            // want something to happen on click before any existing click
                                            // handlers start running).


// Other Methods
export const ZOOMANIM		    = 'zoomanim' // Fired on every frame of a zoom animation
