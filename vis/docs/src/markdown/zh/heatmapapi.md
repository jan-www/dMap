# Heatmap

## 元素说明

首先，我们的heatmap实现是根据[`leaflet-heatmap`](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html)实现的，用户需要提前下载好leaflet-heatmap.js和heatmap.js，接在[`这里`](https://github.com/pa7/heatmap.js/tree/develop)看到其官方提供的文档

## 参数说明

+ options: 
    与[`leaflet-heatmap`](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html)中的文档保持一致，具体形式的举例请参考[额外说明](#extra)

## 方法说明

### AddTo

*(Map) => this*

将HeatmapOverlay类的实例化对象加入地图中。

### setData

*(data) => this*

将数据加载到HeatmapOverlay类的实例化对象中，并在地图上渲染出来。

data的格式如下：

~~~javascript
var testData = {
        max: 8,
        data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1},...,{lat: 35.8278, lng:-78.6421, count: 1}]
    };
~~~

其中max一般表示count的最大值。

<h2 id="extra">额外说明</h2>

options是一个对象，其常用参数列表的说明如下表：
| 参数         |   类型   | 说明 |
| :------------- | :------: | :----------------------------------------------------------- |
| radius          |  Number  | 表示热力图圈大小的半径 |
| maxOpacity        |  Number  | 指定热力图的透明度 |
| gradient         |  Object  | 指定热力图的颜色梯度 |
| scaleRadius           |  Boolean  | 表示根据地图缩放对热力图半径是否缩放 |
| useLocalExtrema      |  Boolean  | True表示在当前图层边界使用数据最大值 |
| latField       | String | 指定轨迹与起止点连线的相对位置，默认为左侧，即轨迹在起始点连线的左侧 |
| lngField         | String | 默认为'lng'，在赋值时表示经度 |
| valueField         | String | 指定反应该位置的大小的变量，默认为value |

举个例子如下：

~~~javascript
var cfg = {
    "radius": 2,
    "maxOpacity": .8, 
    "gradient": { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
    "scaleRadius": true, 
    "useLocalExtrema": true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
};
~~~