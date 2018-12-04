var map = L.map('mapid').setView([51.505, -0.09], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

l = new dmap.MarkerLayer();
d = [[51, 0], [51, 10]]
l.data(d, function(d){return {coordination: d, option: {radius: 200, color: 'red'}}}).enter();
l.addTo(map)

pl = new dmap.PolygonLayer();
d = [[[[30, 114], [50, 114], [40, 120]], 'red'], [[[-30, 114], [-50, 114], [-40, 120]], 'green']]
pl.data(d, function(d){return{coordinations: d[0], option: {color: d[1]}}}).enter();
pl.addTo(map);