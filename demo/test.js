// var map = L.map('mapid').setView([51.505, -0.09], 8);
var map = L.map('mapid').setView([39.980, 116.341], 15)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(map);

marker = new dmap.MarkerLayer();
marker_data = [[39.9853, 116.3476], [39.9765, 116.3392]]
marker.data(marker_data, function(d){
    return {coordination: d, options: {opacity: 0.9}}
}).enter();
marker.addTo(map)
// center = [53, 5];
// org = L.circleMarker([53, 5]).addTo(map);

point = new dmap.PointLayer();
point_data = [[39.9812, 116.3348], [39.9843, 116.3440]]
point.data(point_data, function(d){
                            return {coordination: d, options:{color: 'red'}}//Here!!!! a spelling bug!
                        })
point.enter();
point.addTo(map);

polygon = new dmap.PolygonLayer();
polygon_data = [[[[39.979808, 116.346889], [39.979677, 116.344314], [39.978082, 116.344314], [39.978197, 116.347007]], 'red']]
polygon.data(polygon_data, function(d){return{coordinations: d[0], options: {color: d[1]}}}).enter();
polygon.addTo(map);



polyline = new dmap.PolylineLayer();
polyline_data = [[[39.979866, 116.338091], [39.97985, 116.341867], [39.977942, 116.341932]]]
polyline.data(polyline_data, function(d){
                                    return {coordinations: d, options:{color: 'red'}}
                                }).enter();
polyline.addTo(map);

// coordinates = [[51, 0], [51, 10]]
// center = [53, 5];
// coordinatesbak = [[53, 0], [53, 10]]
// //centerbak = [53, 10];
// var myRenderer = L.svg({ padding: 1 , 
//     tolerance: 1
// });
// L.polyline( coordinates, { weight: 10, renderer: myRenderer } ).addTo(map);
// L.polyline( coordinatesbak, { weight: 10} ).addTo(map);

//var circle = L.circle( center, { radius: 500, renderer: myRenderer } ).addTo(map);
// var circlebak = L.circle( centerbak, { radius: 100 } ).addTo(map);

// l = new dmap.MarkerLayer();
// d = [[51, 0], [51, 10]]
// l.data(d, function(d){
//     return {coordinate: d, options: {radius: 200, color: 'red'}}
// }).enter();
// l.addTo(map)

l = new dmap.PointLayer();
d = [[51, 0], [51, 10]]
l.data(d, function(d){
    return {coordinate: d, options: {radius: 5, color: 'red'}}
}).enter();
l.addTo(map)

// pl = new dmap.PolygonLayer();
// d = [[[[30, 114], [50, 114], [40, 120]], 'red'], [[[-30, 114], [-50, 114], [-40, 120]], 'green']]
// pl.data(d, function(d){return{coordinates: d[0], options: {color: d[1]}}}).enter();
// pl.addTo(map);

// var dash_straight = {
//     color: '#4682B4',
//     fillColor: 'red',
//     dashArray: 6,
//     curvature: 4,
//     opacity: 0.5,
//     weight: '5',
//     dashHandle: true,
//     points: true,
//     popup: true,
//     trailHighlight: true,
//     trailAnimate: true,
// };

// // org = L.circleMarker({lat: 5.8731, lng: 80.7718}).addTo(map).addTo(map);
// // org.bindPopup(org.getLatLng().toString());
// // org.on('click', function(e){org.openPopup()});
// //test for od trail
// ods = new dmap.ODLayer();
// d = [
//     [
//         {lat: 41.8719, lng: 12.5674},
//         {lat: 5.8731, lng: 80.7718},
        
//         {
//             color: '#5F9EA0',
//             //fillColor: 'rgb(145, 146, 150)',
//             dashArray: 6,
//             curvature: 6,
//             //opacity: 0.5,
//             weight: '5',
//             // icon: {
//             //     iconUrl: "mario.png"
//             // },
//             points: true,
//             //popup: true,
//             trailAnimate: true
//         }
//     ],[
//         {lat: 7.8731, lng: 80.7718},
//         {lat: -25.2744, lng: 133.7751},
//         {
//             color: '#4682B4',
//             fillColor: 'red',
//             curvature: 4,
//             opacity: 0.5,
//             weight: '5',
//             dashHandle: true,
//             points: true,
//             popup: true,
//             trailHighlight: true,
//             trailAnimate: true,
//             icon: {
//                 iconUrl: "mario.png"
//             }
//         }
//     ]
// ];
// ods.data(d, function(d){
//     return{
//         origin: d[0], destination: d[1], options: d[2]
//     }
// }).enter();
// ods.addTo(map);
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

// ods.on('trail_click', function(e){
//     orgpopup
//         .setLatLng(e.latlng)
//         .setContent('I am a trail')
//         .openOn(map);
//     setTimeout(function(){
//         orgpopup.remove();
//     }, 1000);
// });
// // ods.on('trail_mouseout', function(e){
// //     orgpopup.remove();
// // })
// // var myRenderer = L.svg({ padding: 4 , tolerance: 1});
// // myRenderer.on('click', function(){
// //     alert('Oooops');
// // });
// // // var line = L.polyline( {lat: 7.8731, lng: 80.7718},
// // //     {lat: 41.8719, lng: 12.5674}, { renderer: myRenderer } ).addTo(map);
// // var circle = L.circle( {lat: 12.8731, lng: 80.7718}, {radius:500,  renderer: myRenderer } );
// // circle.addTo(map);