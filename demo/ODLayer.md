# ODLayer : GroupLayer

以 Leaflet 元素 `L.Path` 为基础构造 `OD` 类，并以 `OD` 为元素组成 `ODLayer`，从而将数据集中的每个坐标对（即起点和终点坐标）形成的轨迹展示在地图上。

## 参数说明

+ options: 
    均继承自 BaseLayer

由于`ODLayer`的元素`OD`为自行构造的类，因此会存在一些额外的参数，请参考[ODOptions](https://github.com/sugarspectre/dMap/blob/master/demo/OD/ODOptions.md)。

## 方法说明

### `generate`

*() => Array*

将 `this._data` 映射为具体的元素 `OD` 数组，形成 `ODLayer` 的一个实例。

### `on`

*(event_type, callback) => this*

将一个事件一次性绑定在所有层内所有共同属性的元素上，注意*event_type*在给定的时候需要有特殊的格式：

+ org_*your_event_type*：将事件*your_event_type*绑定在所有的起点上
+ dst_*your_event_type*：将事件*your_event_type*绑定在所有的终点上
+ trail_*your_event_type*：将事件*your_event_type*绑定在所有的轨迹上

举个例子，若要完成一个功能：当用户的鼠标在任何一条轨迹的起点上方时，展示该点的经纬度，我们可以用以下代码简单实现。
```
// 必须先定义一个popup，用于展示事件效果
var orgpopup = L.popup();

// 注意第一个参数的前缀*org_*代表事件作用在该层的所有起点上
myODLayer.on('org_mouseover', function(e){ 
    orgpopup
        .setLatLng(e.latlng)
        .setContent('org: '+ e.latlng.toString())
        .openOn(map);
});
```
