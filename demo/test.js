// var map = L.map('mapid').setView([51.505, -0.09], 8);
var map = L.map('mapid').setView([39.980, 116.341], 15)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(map);

marker = new dmap.MarkerLayer();
marker_data = [[39.9853, 116.3476], [39.9765, 116.3392]]
marker.data(marker_data, function(d){
    return {coordinate: d, options: {opacity: 0.9}}
}).enter();
marker.addTo(map)
// center = [53, 5];
// org = L.circleMarker([53, 5]).addTo(map);
