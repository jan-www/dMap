# MarkerLayer : BaseLayer


以 Leaflet 元素 *L.Marker* 的形式，对数据集中的每个坐标在地图上定位。

## 参数说明
+ options: 
    + zIndex    ( :: BaseLayer)
    + theme     ( :: BaseLayer)

## 方法说明
+ ```data(data, map_function) : this```<br>
    *将原始数据映射成 Object 数组( this._data )。*
    + data: 原始数据数组
    + map_function: 将单个数据映射成 ```{coordinate: ..., options: ..., ...}```的Object形式
+ ```enter() : this```<br>
    *将 this._data 中的每个Object构造成 L.Marker。*
+ ```addTo(map) : this```<br>
    *将全部 L.Marker 添加至指定地图上。*
    + map: Leaflet map
+ ```remove() : this```<br>
    *移除图层。*
+ ```on(event_type, callback_function) : this```<br>
    *对图层中的每个 L.Marker 绑定响应函数。*
    + event_type: 事件类型。
    + callback_function: 触发事件时的回调函数。接受三个参数：本元素在 *this._data* 中的对应 *Object*、对应下标以及对应的 *L.Marker* 。
+ ```setElementOptions(options_data, map_function) : this```
    *通过 map_function 将 options_data 映射为若干 options 对象，并赋值为 this._data 中每个对象的 options 字段*
    + options_data: 原始数据数组。
    + map_function: 映射函数，将单个数据映射成 *options* 对象的形式。



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