# MarkerLayer : GroupLayer


以 Leaflet 元素 *L.CircleMarker* 的形式，对数据集中的每个坐标在地图上定位。

# 参数说明
+ options: 
    均继承自 BaseLayer

## 方法说明
## `generate`
*() => Array*

将 `this._data` 映射为 `Array<L.CircleMarker>`。
### `_data` 参数要求:
+ coordinate: Marker 的经纬度坐标
+ options: Marker 的样式设置，与 L.CircleMarker options 相同。

*注意：CircleMap 渲染的点大小不随 map缩放变化，如果希望使用可缩放变换点图，使用 L.Circle 渲染*


```javascript
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
    ...
]
var pLayer = new dmap.PointLayer(options);

pLayer.data(coords, (d)=>{return {coordinate: d}})
    .enter()
    .addTo(map);

```