// Setup map
var bounds = L.latLngBounds([90, -360], [-90, 360]); // set bounds for the map
var map = L.map('mapid', {
    maxZoom: 17, 
    minZoom: 2, 
    maxBounds: bounds
}).setView([25, -50], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Prepare the data of airports and airlines
let  airports = odData.Airport_LOC,
    trails = odData.flights.slice(0, 100);

var ods = new dmap.ODLayer();
// Feed data to OD layer and use `enter()` to render it 
ods.data(trails, function(t){
    return {
        origin: airports[t[0]], 
        destination: airports[t[1]], 
        options: {
            // @trail relevant
            color: '#4682B4',
            dashArray: 0,
            curvature: 5,
            opacity: 0.3,
            weight: 2,
            // @points relevant
            points: true,
            pointsColor: '#00C5CD',
            pointsOpacity: 0.3,
            pointsRadius: 1,
            preferCenter: [30, -90],
            // @interaction relevant
            popup: true,
            popuopContent: {
                org: t[0],
                dst: t[1]
            }, 
            trailHighlight: true,
            trailAnimate: true,
            twoWay: t[5]==1?true: false
        }
    }
}).enter();
ods.addTo(map);

// You can also add popup for airports by method `on()`
// Note that you are supposed to set `points: true` in 
// `odOptions` if you want to add popup for points.
// var orgpopup = L.popup();
// ods.on('org_mouseover', function(e){
//     orgpopup
//         .setLatLng(e.latlng)
//         .setContent('org: '+ e.latlng.toString())
//         .openOn(map);
// });
// ods.on('org_mouseout', function(e){
//     orgpopup.remove();
// })

// ods.on('dst_mouseover', function(e){
//     orgpopup
//         .setLatLng(e.latlng)
//         .setContent('dst: '+ e.latlng.toString())
//         .openOn(map);
// });
// ods.on('dst_mouseout', function(e){
//     orgpopup.remove();
// })
