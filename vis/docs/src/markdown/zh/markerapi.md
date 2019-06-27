# MarkerLayer : GroupLayer

## 元素说明

我们以 Leaflet 的元素 [L.Marker](https://leafletjs.com/reference-1.4.0.html#marker) 作为`MarkerLayer` 图层的显示元素，从而以 `L.Marker` 的方式在地图上标记坐标。

`L.Marker` 的坐标位置由参数 `coordinate` 确定。

## 参数说明

+ options: 均继承自 BaseLayer

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | 图层在z轴的层级高度 

## 方法说明

### data
*(Array&lt;any&gt;, Function) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。

`data` 方法的调用方式可参见[教程](#/zh/guide/quickstart)。

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinate  | `Array(2)`/`L.Latlng` | 指定对应标记在地图上的坐标经纬度 |
| options | `Object` | 样式设置，与 L.Marker 的设置方式相同

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的`L.Marker`对象数组

### generate
*() => Array*

将 `this._data` 映射为 `Array<L.Marker>`。

### addTo
*(L.Map) => this*

将图层添加到Leaflet地图容器中。

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。


## 代码示例

通过 `MarkerLayer` 展示若干亚洲城市位置。

```javascript
let capitals = [ 
      [39.83912266447, 116.3671875], 
      [35.56462917627, 139.7460937], 
      [37.55247109621, 126.9799804], 
      [39.01838346715, 125.7275390], 
      [47.92830585913, 107.0068359] 
    ],
    mLayer = new dmap.MarkerLayer(options);

mLayer.data(capitals, (d)=>{return {coordinate: d}})
    .enter()
    .addTo(map);

```