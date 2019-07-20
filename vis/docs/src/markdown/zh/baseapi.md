# BaseLayer

## 元素说明
`BaseLayer` 是 dmap 全部图层的基类，继承自 `L.Layer`。`BaseLayer` 无法直接渲染数据，为 dmap 风格的图层提供了各种方法的接口。

## 参数说明

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | 图层在z轴的层级高度 |


## 方法说明

### data
*(Array&lt;any&gt;, Function) => this*

将原始数据映射为具有指定字段的对象数组。具体格式见各图层需求。

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的元素数组。

### generate
*() => Array*

将 `this._data` 映射为指定元素的数组。

### addTo
*(L.Map) => this*

将图层添加到Leaflet地图容器中。

### `on`

*(String:event_type, Function:callback) => this*

将一个事件一次性绑定在所有层内所有的元素上

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。
