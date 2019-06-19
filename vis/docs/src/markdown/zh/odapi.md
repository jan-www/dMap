# ODLayer : GroupLayer

## 元素说明

首先，我们以 Leaflet 的元素 [`L.Path`](https://leafletjs.com/reference-1.5.0.html#path) 为基础构造了 `OD` 类，然后以 `OD` 为元素组成了 `ODLayer`，从而将数据集中的每个坐标对（即起点和终点坐标）形成的轨迹展示在地图上。

`OD` 类用于绘制一个可点击可绑定事件的轨迹，该轨迹由三部分组成，分别为：起点、终点和轨迹，这三部分可以作为整体接受事件绑定，也可单独接受事件绑定。`OD` 类的实例接受一个坐标对作为输入，该坐标对必须包含轨迹的起点和终点，才能生成一条轨迹。

## 参数说明

+ options: 
    均继承自 `BaseLayer`

由于`ODLayer`的元素`OD`为自行构造的类，因此会存在一些额外的参数，请参考[额外说明](#extra)。

## 方法说明

### `generate`

*() => Array*

将 `this._data` 映射为具体的元素 `OD` 数组，形成 `ODLayer` 的一个实例。

### `on`

*(event_type, callback) => this*

将一个事件一次性绑定在所有层内所有共同属性的元素上，注意*event_type*在给定的时候需要有特殊的格式：

+ org_*your_event_type*：将事件 *your_event_type* 绑定在所有的起点上
+ dst_*your_event_type*：将事件 *your_event_type* 绑定在所有的终点上
+ trail_*your_event_type*：将事件 *your_event_type* 绑定在所有的轨迹上

举个例子，若要完成一个功能：当用户的鼠标在任何一条轨迹的起点上方时，展示该点的经纬度，我们可以用以下代码简单实现。

```javascript
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

<h2 id="extra">额外说明</h2>

`OD` 可以根据给定的一个包含起点和终点的坐标对画一条可点击可绑定事件的轨迹。该类继承自 Leaflet 的元素 [`L.Path`](https://leafletjs.com/reference-1.5.0.html#path)，除了父类的参数之外，还有如下新增参数。

| 参数         |   类型   |  默认值  | 说明 |
| :------------- | :------: | :-----------: | :----------------------------------------------------------- |
| color          |  String  | '#4682B4' | 指定轨迹的颜色，除了使用十六进制数以外，也可以使用字符串描述，如 color: "red" |
| opacity        |  Number  |    0.5    | 指定轨迹的透明度 |
| weight         |  Number  |     3     | 指定轨迹的宽度，单位为像素 |
| icon           |  [Icon](https://leafletjs.com/reference-1.5.0.html#icon)  |           | 指定一个轨迹动画上的图标，若未指定，则使用库内自带的飞机图标 |
| curvature      |  Number  |    4.0    | 指定轨迹的平直程度，该值越大轨迹越平直，该值越小轨迹越弯曲，注意 curvature 值必须大于3.0, 否则轨迹为直线 |
| leftSide       | Boolean  |   false   | 指定轨迹与起止点连线的相对位置，默认为左侧，即轨迹在起始点连线的左侧 |
| points         | Boolean  |   false   | 指定是否将起始点展示在图层上 |
| pointsColor    |  String  | '#00C5CD' | 指定起点、终点的颜色 |
| pointsRadius   |  Number  |     2     | 指定起点、终点的大小 |
| pointsOpacity  |  Number  |    0.5    | 指定起点、终点的透明度 |
| preferCenter   | [latLng](https://leafletjs.com/reference-1.5.0.html#latlng) |    `L.latLng(destinaton)`   | 当起点和终点的经度之差大于180度时，选择离 preferCenter 更近的点作为基准描绘轨迹 |
| popup          | Boolean  |   false   | 指定是否为起点和终点绑定弹窗 |
| popupContent   | Object |     `{org: org.latLng, dst: dst.latLng}`     | 指定起点和终点的弹窗内容 |
| trailHighlight | Boolean  |   false   | 指定是否在鼠标经过轨迹时高亮轨迹 |
| trailAnimate   | Boolean  |   false   | 指定是否添加轨迹动画，若添加则使用 icon 指定的图标 |
| twoWay         | Boolean  |   false   | 指定该轨迹是否为双向的 |

