# PolylineLayer : GroupLayer


以 Leaflet 元素 *L.Polyline* 的形式，对数据集中的路网、轨迹等坐标序列进行渲染。

# 参数说明
+ options: 
    均继承自 BaseLayer

## 方法说明
## `generate`
*() => Array*

将 `this._data` 映射为 `Array<L.Polyline>`。
### `_data` 参数要求:
+ coordinates: Polyline 的坐标集合
+ options: Polyline 的样式设置，与 L.Polyline options 相同。


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
        type="subway
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