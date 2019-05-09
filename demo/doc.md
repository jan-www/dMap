## `constructor`
( options: *Object* )

图层构造函数。根据 `options` 参数

## `data`
( raw_data: *Array*, map_function: *Function* ) => this

通过 *map_function* 将原始数据数组 *raw_data* 映射为所需要的数组，保存在 *this._data*。

### params
- *data: Array* : 数组，包含处理前的全部原始数据。
- *map_function: Function( Any ) => Object* : 以 `data.map( map_function )` 的形式生成映射后的数组，用来构造对应的元素。函数返回的对象包含的具体字段请参见各图层说明。



## `enter` 
() => this

每个图层都有独特的 *enter* 方法实现，该方法将 *this.data* 中的每个每个对象构造为该图层的数据结构，比如 *Polygon*，*Marker* 等。


## `addTo`
( leaflet_map: *L.Map* ) => this

将图层绑定到 leaflet的地图控件 L.Map 上并渲染。

### params
- *leaflet_map: L.Map* : Leaflet 地图控件。


## `on`
( event_type: *String*, callback_function: *Function* ) => this

对图层绑定事件响应函数。

### params
- *event_type: String* : 事件类别，如 `"click"`


## `setZIndex`
( z_index: *int* ) => this

设定图层的覆盖优先级。

### params:
- *z_index: int* : css中的zindex。


## `exit`
*() => this* 

将图层从页面中移除。

