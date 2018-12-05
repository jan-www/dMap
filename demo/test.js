var map = L.map('mapid').setView([51.505, -0.09], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

l = new dmap.MarkerLayer();
d = [[51, 0], [51, 10]]
l.data(d, function(d){
    return {coordination: d, option: {radius: 200, color: 'red'}}
}).enter();
l.addTo(map)

pl = new dmap.PolygonLayer();
d = [[[[30, 114], [50, 114], [40, 120]], 'red'], [[[-30, 114], [-50, 114], [-40, 120]], 'green']]
pl.data(d, function(d){return{coordinations: d[0], option: {color: d[1]}}}).enter();
pl.addTo(map);

var dash_straight = {
    color: 'red',
    //fillColor: 'rgb(145, 146, 150)',
    dashArray: 8,
    curvature: 6,
    opacity: 0.8,
    weight: '1.5'
};

// test for od trail
ods = new dmap.ODLayer();
d = [
    [
        {lat: 7.8731, lng: 80.7718},
        {lat: -25.2744, lng: 133.7751},
        {
            color: 'blue',
            //fillColor: 'rgb(145, 146, 150)',
            dashArray: 8,
            curvature: 4,
            opacity: 0.8,
            weight: '1.5'
        }
    ],
    [
        {lat: 7.8731, lng: 80.7718},
        {lat: 41.8719, lng: 12.5674},
        {
            color: 'red',
            //fillColor: 'rgb(145, 146, 150)',
            dashArray: 8,
            curvature: 6,
            opacity: 0.8,
            weight: '1.5'
        }
    ]
];
ods.data(d, function(d){
    return{
        origin: d[0], destination: d[1], options: d[2]
    }
}).enter();
ods.addTo(map);