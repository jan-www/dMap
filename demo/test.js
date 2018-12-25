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

// org = L.circleMarker({lat: 5.8731, lng: 80.7718}).addTo(map).addTo(map);
// org.bindPopup(org.getLatLng().toString());
// org.on('click', function(e){org.openPopup()});
//test for od trail
ods = new dmap.ODLayer();
d = [
    [
        {lat: 41.8719, lng: 12.5674},
        {lat: 5.8731, lng: 80.7718},
        
        {
            color: '#5F9EA0',
            //fillColor: 'rgb(145, 146, 150)',
            dashArray: 6,
            curvature: 6,
            //opacity: 0.5,
            weight: '5',
            // icon: {
            //     iconUrl: "mario.png"
            // },
            points: true,
            //popup: true,
            trailAnimate: true
        }
    ],[
        {lat: 7.8731, lng: 80.7718},
        {lat: -25.2744, lng: 133.7751},
        {
            color: '#4682B4',
            fillColor: 'red',
            curvature: 4,
            opacity: 0.5,
            weight: '5',
            dashHandle: true,
            points: true,
            popup: true,
            trailHighlight: true,
            trailAnimate: true,
            icon: {
                iconUrl: "mario.png"
            }
        }
    ]
];
ods.data(d, function(d){
    return{
        origin: d[0], destination: d[1], options: d[2]
    }
}).enter();
ods.addTo(map);
var orgpopup = L.popup();
ods.on('org_mouseover', function(e){
    orgpopup
        .setLatLng(e.latlng)
        .setContent('org: '+ e.latlng.toString())
        .openOn(map);
});
ods.on('org_mouseout', function(e){
    orgpopup.remove();
})

ods.on('trail_click', function(e){
    orgpopup
        .setLatLng(e.latlng)
        .setContent('I am a trail')
        .openOn(map);
    setTimeout(function(){
        orgpopup.remove();
    }, 1000);
});
// ods.on('trail_mouseout', function(e){
//     orgpopup.remove();
// })
// var myRenderer = L.svg({ padding: 4 , tolerance: 1});
// myRenderer.on('click', function(){
//     alert('Oooops');
// });
// // var line = L.polyline( {lat: 7.8731, lng: 80.7718},
// //     {lat: 41.8719, lng: 12.5674}, { renderer: myRenderer } ).addTo(map);
// var circle = L.circle( {lat: 12.8731, lng: 80.7718}, {radius:500,  renderer: myRenderer } );
// circle.addTo(map);