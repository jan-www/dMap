function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

var map = L.map('mapid')
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map);

pLayer = new dmap.PolylineLayer();

pLayer.data(metros, function (data, index) {
    data.forEach(x => x.reverse())
    const color = index === 0 
        ? "rgb(161,40,48)"
        : index === 1
        ? "rgb(0,82,155)"
        : "rgb(0,146,199)"
    return {
        coordinates: data,
        options: {
            color
        }
    }
})

pLayer.enter().addTo(map)

map.fitBounds(pLayer.getBounds())