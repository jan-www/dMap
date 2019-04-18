// var map = L.map('mapid').setView([51.505, -0.09], 8);
var bounds = L.latLngBounds([90, -360], [-90, 360]); // set bounds for the map
var map = L.map('mapid', {
    maxZoom: 17, 
    minZoom: 2, 
    maxBounds: bounds
}).setView([0, 0], 2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(map);

function toList(dict) {
  return Object.keys(dict).map(function (key) {
      return [key, dict[key]];
  });
}
let airports = odData.Airport_LOC;
markerdata = toList(airports)

marker = new dmap.MarkerLayer();
marker.data(markerdata, function(d){
    return {coordination: d[1], options: {opacity: 0.9}}
}).enter();
marker.addTo(map)