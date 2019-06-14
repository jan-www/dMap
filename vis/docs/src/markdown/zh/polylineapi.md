# PolylineLayer : GroupLayer



## Point参数说明
以 Leaflet 元素 *L.Polyline* 的形式，对数据集中的路网、轨迹等坐标序列进行渲染。

## 方法说明
### data
*(Array&lt;any&gt;, Function) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinates  | `Array(Array(2))`/`Array<L.Latlng>` | Polyline 的坐标集合 |
| options | `Object` | 样式设置，与 L.Polyline 的设置方式相同

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的`L.Polyline`对象数组

### generate
*() => Array*

将 `this._data` 映射为 `Array<L.Polyline>`。

### addTo
*(Map) => this*

将图层添加到Leaflet地图容器中。

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。


*注意：CircleMap 渲染的点大小不随 map缩放变化，如果希望使用可缩放变换点图，使用 L.Circle 渲染*

## 代码示例
```javascript
var roads = [
    {
        coords: [
            [39.976566, 116.441737], 
            [39.977007, 116.417831],
            ...
        ],
        type: "subway"
    },
    {
        coords: [
            [39.969476, 116.431473],
            [39.969326, 116.417946],
            ...
        ],
        type: "road"
    },
    {
        coords: [
            [39.977586, 116.394475],
            [39.968540, 116.395207],
            ...
        ],
        type: "subway"
    }
]
var pLayer = new dmap.PolylineLayer(options);

pLayer.data(roads, (d) => {
    let color;
    switch (d.type) {
        case "road": color = "#7D7D7D"; break;
        case "subway": color = "#7C1200"; break;
        default: color = "#000"; 
    }
    return {
        coordinates: d.coords,
        options: { color }
    }
})
    .enter()
    .addTo(map)

```