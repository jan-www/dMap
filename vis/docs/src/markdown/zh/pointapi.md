# PointLayer : GroupLayer



## Point参数说明
以 Leaflet 元素 *L.CircleMarker* 的形式，对数据集中的每个坐标在地图上定位。
包含`L.CircleMarker`的全部参数`options`

## 方法说明
### data
*(Array&lt;any&gt;, Function) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinate  | `Array(2)`/`L.Latlng` | 指定对应点在地图上的坐标经纬度 |
| options | `Object` | 样式设置，与 L.CircleMarker 的设置方式相同

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的`L.CircleMarker`对象数组

### generate
*() => Array*

将 `this._data` 映射为 `Array<L.CircleMarker>`。

### addTo
*(Map) => this*

将图层添加到Leaflet地图容器中。

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。


*注意：CircleMap 渲染的点大小不随 map缩放变化，如果希望使用可缩放变换点图，使用 L.Circle 渲染*

## 代码示例
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