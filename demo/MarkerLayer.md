# MarkerLayer : GroupLayer


以 Leaflet 元素 *L.Marker* 的形式，对数据集中的每个坐标在地图上定位。

# 参数说明
+ options: 
    均继承自 BaseLayer

## 方法说明
## `generate`
*() => Array*

将 `this._data` 映射为具体的 Leaflet 元素 L.Marker Array。
### `_data` 参数要求:
+ coordinate: Marker 的经纬度坐标
+ options: Marker 的样式设置，与 L.Marker options 相同。


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