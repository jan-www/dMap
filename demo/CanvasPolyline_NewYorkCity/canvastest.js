var map = L.map('mapid').setView([6.9270786, 79.861243], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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


var c = new dmap.CanvasPolylineLayer({
    // onClick: function(e) {
    //     console.log(e.polyline)
    //     polyline = e.polyline;
    //     if (polyline) emphasisPolyline(polyline);
    //     // c.needRedraw();
    // },
    cursor: 'auto',
    divideParts: 4
})

c.addTo(map)
 
$.getJSON('newyorkcity_streetcenterline.json', function(json) {
    c.data(json.data, function(d) {
        let color = undefined,
            rw_type = parseInt(d.RW_TYPE)
        switch (rw_type) {
            case 1: color = 'grey'; break;
            case 2: color = 'blue'; break;
            case 3: color = 'brown'; break;
            default: color = 'black';
        }
        return {
            coordinates: d.coords,
            options: { // options.style
                zoomLevel: rw_type == 2 ? 1 : 11,
                color: color,
                width: 0.5
            },
            data: d
        }
    });
    map.fitBounds(c.getBounds());
    map.on('dblclick', function() {
        resetEmphasis();
        // no need for c.needRedraw()
    })
    map.on('mousemove', function(e) {
        let polyline = c._polylineAt(e.containerPoint);
        if (polyline) {
            console.log(polyline);
            c._map.getContainer().style.cursor = 'grab';
        }
        else c._map.getContainer().style.cursor = c.options.cursor
    })
})

