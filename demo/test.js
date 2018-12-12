//var map = L.map('mapid').setView([51.505, -0.09], 13);
var map = L.map('mapid').setView([6.9270786, 79.861243], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

l = new dmap.MarkerLayer();
d = [[51, 0], [51, 10]]
l.data(d, function(d){
    return {coordination: d, options: {radius: 200, color: 'red'}}
}).enter();
l.addTo(map)

pl = new dmap.PolygonLayer();
d = [[[[30, 114], [50, 114], [40, 120]], 'red'], [[[-30, 114], [-50, 114], [-40, 120]], 'green']]
pl.data(d, function(d){return{coordinations: d[0], options: {color: d[1]}}}).enter();
pl.addTo(map);

var dash_straight = {
    color: 'red',
    //fillColor: 'rgb(145, 146, 150)',
    dashArray: 8,
    curvature: 6,
    opacity: 0.8,
    weight: '3',
    animate: true
};

// test for od trail
ods = new dmap.ODLayer();
d = [
    [
        {lat: 7.8731, lng: 80.7718},
        {lat: -25.2744, lng: 133.7751},
        {
            color: '#4682B4',
            fillColor: 'red',
            curvature: 4,
            opacity: 0.5,
            weight: '3',
            dashHandle: true,
            popup: false,
            trailAnimate: true,
            icon: {
                iconUrl: "mario.png"
            }
        }
    ],
    [
        {lat: 7.8731, lng: 80.7718},
        {lat: 41.8719, lng: 12.5674},
        {
            color: '#5F9EA0',
            //fillColor: 'rgb(145, 146, 150)',
            dashArray: 6,
            curvature: 6,
            //opacity: 0.5,
            weight: '3',
            // icon: {
            //     iconUrl: "mario.png"
            // },
            popup: true,
            trailAnimate: true
        }
    ]
];
ods.data(d, function(d){
    return{
        origin: d[0], destination: d[1], options: d[2]
    }
}).enter();
ods.addTo(map);
//ods.trailAnimate();