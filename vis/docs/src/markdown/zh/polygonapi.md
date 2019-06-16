# PolygonLayer : GroupLayer

## Polygon说明
`L.Polygon` 是Leaflet的多边形类，根据坐标序列 `coordinates` 和属性 `options` 渲染多边形元素。参见 [L.Polygon](https://leafletjs.com/reference-1.4.0.html#polygon)。

## PolygonLayer图层参数说明
以 Leaflet 元素 `L.Polygon` 的形式，将数据集中的多边形数据渲染到地图上。

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | 图层在z轴的层级高度 |

## Polygon options 说明
包含`L.Polygon`的全部参数`options`。

## 方法说明
### data
*(Array&lt;any&gt;, Function) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinates  | `Array(2)`/`L.Latlng` | 指定多边形区域边界在地图上的坐标经纬度 |
| options | `Object` | 样式设置，与 L.Polygon 的设置方式相同

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的`L.Polygon`对象数组

### generate
*() => Array*

将 `this._data` 映射为 `Array<L.Polygon>`。

### addTo
*(Map) => this*

将图层添加到Leaflet地图容器中。

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。
