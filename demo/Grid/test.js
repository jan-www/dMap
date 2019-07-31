var map = L.map('mapid').setView([6.9270786, 79.861243], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var l = undefined;

d3.text('data/out.asc', function (asc) {
    let s = dmap.ScalarField.fromASCIIGrid(asc);
    
    let identify = function (v, index, e) {
        if (v !== null) {
            let html = `<span class="popupText">value: ${v}</span>`;
            L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
        }
    };

    let gridLayer = new dmap.CanvasGridLayer({
        opacity: 0.78,
        border: true,
        color: dmap.Util.colorScale(['#FFFFB2', '#E31A1C']).domain([0, 27]),
        borderColor: '#111111',
        borderWidth: 0.71,
        borderOpacity: 0.7,
        controlBar: true,
        zIndex: 200
    });
    gridLayer
    .data(s.grid, (d)=>d ,s.params)
    .enter()
    .addTo(map)
    .on('click', identify);
    map.fitBounds(gridLayer.getBounds());

    l = gridLayer;
});
