# PolygonLayer : GroupLayer

## 元素说明
我们以 Leaflet 的元素 [`L.Polygon`](https://leafletjs.com/reference-1.5.0.html#polygon) 作为 `PolygonLayer` 图层的显示元素，从而将坐标序列数据在地图上渲染为多边形样式。

`L.Polygon` 类由坐标序列 `coordinates` 构造，以此序列依次在地图上成多边形图形。

## 参数说明

+ options: 均继承自 BaseLayer

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | 图层在z轴的层级高度 |


## 方法说明

### data
*(Array&lt;any&gt;, Function) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。

`data` 方法的调用方式可参见[教程](#/zh/guide/quickstart)。

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinates  | `Array(2)`/`L.Latlng` | 指定多边形区域边界在地图上的坐标经纬度 |
| options | `Object` | 样式设置，与 L.Polygon 的设置方式相同

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的`L.Polygon`对象数组。

### generate
*() => Array*

将 `this._data` 映射为 `Array<L.Polygon>`，形成 `PolygonLayer` 的一个实例。

### addTo
*(L.Map) => this*

将图层添加到Leaflet地图容器中。

### `on`

*(String:event_type, Function:callback) => this*

将一个事件一次性绑定在所有层内所有的元素上。

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。

## 代码示例

以 `dmap.PolygonLayer` 展示澳大利亚的行政划分。

```javascript
pLayer = new dmap.PolygonLayer();

pLayer.data(coordsAustralia, coords => {
    coords.forEach(coord=>coord.reverse())
    return { coordinates: coords }
})

pLayer.enter().addTo(map)

map.fitBounds(pLayer.getBounds())
```