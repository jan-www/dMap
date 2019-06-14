# PolygonLayer : GroupLayer


以 Leaflet 元素 *L.Polygon* 的形式，将数据在地图上渲染为多边形样式。

# 参数说明
+ options: 
    均继承自 BaseLayer

## 方法说明
## `generate`
*() => Array*

将 `this._data` 映射为 `Array<L.Polygon>`。
### `_data` 参数要求:
+ coordinates: Polygon 的坐标集合
+ options: Polygon 的样式设置，与 L.Polygon options 相同。

