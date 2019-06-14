# 简单图层的创建和数据驱动

本教程通过在地图上，以PointLayer的形式渲染多个中国城市坐标，来展示 dMap 的基本使用过程。

## 创建地图渲染 DOM 节点
在 HTML 代码中创建特定 `id` 的 `<div>` 节点。
```html
<div id="mapid" style="height: 100%;"></div>
```

## 以 Leaflet 的形式进行容器初始化
通过上文的 `id`，在JavaScript代码中创建 `L.map` 容器
```js
var map = L.map('mapid')
```
加载地图栅格图层
```js
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map);
```

## 创建 dMap 图层组件
```js
pLayer = new dmap.PointLayer();
```

## 为图层加载数据
使用数据驱动图层在地图上的渲染效果，本例使用的数据 `coords` 为我国34省会、直辖市、特别行政区的地理坐标。（详细数据附于页后）
```js
var coords = [
    { name: '甘肃', geoCoord: [36.03, 103.73] },
    { name: '青海', geoCoord: [36.56, 101.74] },
    { name: '四川', geoCoord: [30.67, 104.06] },
    ...
]
```
使用 `data` 方法为 `pLayer` 图层加载驱动数据。其中参数分别为数据源变量，以及符合 `dmap.PointLayer` 要求的映射函数。
```js
pLayer.data(coords, function (data) {
    return {
        coordinate: data.geoCoord,
        options: {
            radius: 0.2,
            color: '#7C1200'
        }
    }
})
```
本例中，我们将 `coords` 数组映射为了由结构为 `coordinate, options` 的对象构成的数组。此时，`pLayer._data` 应已完成更新。

# 用数据渲染图层
更新数据后，我们采用 `enter` 方法使用新数据构建对应的图层元素。此处的图层元素为点。之后 `addTo` 方法将 `pLayer` 图层加载到上文的 `map` 容器中
```js
pLayer.enter().addTo(map)
```

# 切换地图视角
```js
map.fitBounds(pLayer.getBounds())
```

# （xx）原始数据
```js
var coords = [
    { name: '甘肃', geoCoord: [36.03, 103.73] },
    { name: '青海', geoCoord: [36.56, 101.74] },
    { name: '四川', geoCoord: [30.67, 104.06] },
    { name: '河北', geoCoord: [38.03, 114.48] },
    { name: '云南', geoCoord: [25.04, 102.73] },
    { name: '贵州', geoCoord: [26.57, 106.71] },
    { name: '湖北', geoCoord: [30.52, 114.31] },
    { name: '河南', geoCoord: [34.76, 113.65] },
    { name: '山东', geoCoord: [36.65, 117] },
    { name: '江苏', geoCoord: [32.04, 118.78] },
    { name: '安徽', geoCoord: [31.86, 117.27] },
    { name: '浙江', geoCoord: [30.26, 120.19] },
    { name: '江西', geoCoord: [28.68, 115.89] },
    { name: '福建', geoCoord: [26.08, 119.3] },
    { name: '广东', geoCoord: [23.16, 113.23] },
    { name: '湖南', geoCoord: [28.21, 113] },
    { name: '海南', geoCoord: [20.02, 110.35] },
    { name: '辽宁', geoCoord: [41.8, 123.3,] },
    { name: '吉林', geoCoord: [43.88, 125.35] },
    { name: '黑龙江', geoCoord: [45.75, 126.63] },
    { name: '山西', geoCoord: [37.87, 112.53] },
    { name: '陕西', geoCoord: [34.27, 108.95] },
    { name: '台湾', geoCoord: [25.03, 121.30] },
    { name: '北京', geoCoord: [39.92, 116.46] },
    { name: '上海', geoCoord: [31.22, 121.48] },
    { name: '重庆', geoCoord: [29.59, 106.54] },
    { name: '天津', geoCoord: [39.13, 117.2] },
    { name: '内蒙古', geoCoord: [40.82, 111.65] },
    { name: '广西', geoCoord: [22.84, 108.33] },
    { name: '西藏', geoCoord: [29.97, 91.11] },
    { name: '宁夏', geoCoord: [38.47, 106.27] },
    { name: '新疆', geoCoord: [43.77, 87.68] },
    { name: '香港', geoCoord: [22.28, 114.17] },
    { name: '澳门', geoCoord: [22.19, 113.54] }
]
```