# GroupLayer

## 元素说明
`GroupLayer` 是 dmap 中 `PointLayer` 等基于SVG元素的图层的基类，继承自 `BaseLayer`。

## 参数说明

+ options: 继承自 `BaseLayer`
  
| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | 图层在z轴的层级高度 |


## 方法说明

### data
*(Array&lt;any&gt;, Function) => this*

将原始数据映射为具有指定字段的对象数组。具体格式见各图层需求。

### enter
*() => this*

调用`generate`方法，将`this._data`映射为对应的元素数组。并创建 `L.FeatureGroup` 对象来组织图层元素。

### generate
*() => Array*

将 `this._data` 中的每一项映射为指定SVG元素对象。

### `on`
*(String:event_type, Function:callback) => this*

`GroupLayer` 通过维护一个 `L.FeatureGroup` 来组织全部同类元素。`on` 方法对 `L.FeatureGroup` 中的每个元素执行事件绑定。

### setElementOptions
*(Array: data, Function: map_function)*

将数组 `data` 通过 `map_function` 映射为 `options` 数组，依次为 `GroupLayer` 的每一项元素设定样式。