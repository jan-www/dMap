var map = L.map('mapid')
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map);


pLayer = new dmap.PolygonLayer();

pLayer.data(mauritius, function (data) {
    data.forEach(lnglat => lnglat.reverse())
    return {
        coordinates: data,
        options: {
            color: "#16a951"
        }
    }
})

pLayer.enter().addTo(map)

map.fitBounds(pLayer.getBounds())