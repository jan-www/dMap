// PointLayer.js
// Define PointLayer class.

import { GroupLayer } from "./GroupLayer.js";

/**
var coords = [
    {name:'GanSu', geoCoord:[36.03, 103.73 ]},
    {name:'QingHai', geoCoord:[36.56, 101.74 ]},
    ...
] // full `coords` is after definition of PointLayer 

let pLayer = new dmap.PointLayer();
pLayer.data(coords, function(data) {
    return {
        name: data.name, 
        coordinate: data.geoCoord,
        options: {radius: 1, color: '#7C1200'}
    }
}).enter().on('click', function(data) {
    console.log(data.name)
}).addTo(map)
 */

export var PointLayer = GroupLayer.extend({
    generate: function() {
        return this._data.map(
            (data)=>{return L.circleMarker(
                data.coordinate, data.options
            )}
        );
    }
})

/**
 var coords = [
    {name:'甘肃', geoCoord:[36.03, 103.73 ]},
    {name:'青海', geoCoord:[36.56, 101.74 ]},
    {name:'四川', geoCoord:[30.67, 104.06 ]},
    {name:'河北', geoCoord:[38.03, 114.48 ]},
    {name:'云南', geoCoord:[25.04, 102.73 ]},
    {name:'贵州', geoCoord:[26.57, 106.71 ]},
    {name:'湖北', geoCoord:[30.52, 114.31 ]},
    {name:'河南', geoCoord:[34.76, 113.65 ]},
    {name:'山东', geoCoord:[36.65, 117 ]},
    {name:'江苏', geoCoord:[32.04, 118.78 ]},
    {name:'安徽', geoCoord:[31.86, 117.27 ]},
    {name:'浙江', geoCoord:[30.26, 120.19 ]},
    {name:'江西', geoCoord:[28.68, 115.89 ]},
    {name:'福建', geoCoord:[26.08, 119.3 ]},
    {name:'广东', geoCoord:[23.16, 113.23 ]},
    {name:'湖南', geoCoord:[28.21, 113 ]},
    {name:'海南', geoCoord:[20.02, 110.35 ]},
    {name:'辽宁', geoCoord:[ 41.8, 123.3,]},
    {name:'吉林', geoCoord:[43.88, 125.35 ]},
    {name:'黑龙江', geoCoord:[45.75, 126.63 ]},
    {name:'山西', geoCoord:[37.87, 112.53 ]},
    {name:'陕西', geoCoord:[34.27, 108.95 ]},
    {name:'台湾', geoCoord:[25.03, 121.30 ]},
    {name:'北京', geoCoord:[39.92, 116.46 ]},
    {name:'上海', geoCoord:[31.22, 121.48 ]},
    {name:'重庆', geoCoord:[29.59, 106.54 ]},
    {name:'天津', geoCoord:[39.13, 117.2 ]},
    {name:'内蒙古', geoCoord:[40.82, 111.65 ]},
    {name:'广西', geoCoord:[22.84, 108.33 ]},
    {name:'西藏', geoCoord:[29.97, 91.11 ]},
    {name:'宁夏', geoCoord:[38.47, 106.27 ]},
    {name:'新疆', geoCoord:[43.77, 87.68 ]},
    {name:'香港', geoCoord:[22.28, 114.17 ]},
    {name:'澳门', geoCoord:[22.19, 113.54 ]}
]
 */