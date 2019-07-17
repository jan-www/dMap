var map = L.map('mapid').setView([6.9270786, 79.861243], 3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    id: 'mapbox.streets'
}).addTo(map);

map.doubleClickZoom.disable();

// console.log(nyc.length, 'streets in New York City have loaded.')

arr = [[ [1,3], [2,3], [3,5]]]

var emphasisList = [];

function emphasisPolyline(polyline) {
    if (polyline.emphasis) return;

    polyline.options.formerColor = polyline.options.color;
    polyline.options.formerWidth = polyline.options.width;

    polyline.options.color = 'red';
    polyline.options.width = 2;

    polyline.emphasis = true;
    emphasisList.push(polyline)
}

function resetEmphasis() {
    emphasisList.forEach(function(polyline) {
        polyline.options.color = polyline.options.formerColor;
        polyline.options.width = polyline.options.formerWidth;
        polyline.emphasis = false;
    });
    emphasisList = [];
}

function onClickCallBack(polyline, index, originData) {
    console.log(originData);
    if (polyline) emphasisPolyline(polyline);
    c.needRedraw();
}

var c = new dmap.CanvasPolylineLayer({
    // onClick: onClickCallBack,
    cursor: 'pointer',
    divideParts: 4
})

// c.addTo(map)
 
$.getJSON('nyc.json', function(json) {
    c.data(json.data, function(d) {
        let color = undefined,
            rw_type = parseInt(d.t)
        switch (rw_type) {
            case 2: color = '#f2be45'; break;
            case 3: color = '#ff7500'; break;
            default: color = '#2e4e7e';
        }
        return {
            coordinates: d.c,
            options: { 
                zoomLevel: rw_type == 2 ? 1 : 11,
                color: color,
                width: 0.5
            },
            data: d
        }
    }).enter().addTo(map);
    map.fitBounds(c.getBounds());
    c.on('dblclick', function() {
        resetEmphasis();
        // no need for c.needRedraw()
    })
    c.on('click', onClickCallBack, c);

})

