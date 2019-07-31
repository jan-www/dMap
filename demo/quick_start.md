# 手摸手教你用dMap

本教程通过在地图上，以 PointLayer 的形式渲染多个中国城市坐标，来展示 dMap 的基本使用过程——“三步走”战略。

## -1 准备前准备

如果实在没写过前端页面，对于`html`和`js`一窍不通，那么请仔细阅读第 -1 章，否则可直接跳过去到第 0 章。

大家用 dMap 的场景一般都是自己有一个项目，然后需要 dMap 中的一些功能，假设你的项目是`useDMAP`，然后项目的根目录下，一般都会有一个放自己代码的文件夹比如`/src`，然后我希望你在根目录下创建一个文件夹`/pkg`，这样方便管理第三方未上线库，比如 dMap :)

通常我们会写一个`js`文件控制逻辑，一个`html`控制页面，当然你也可以将`js`文件的内容用`script`标签写进`html`文件中，但为了教学逻辑清晰一些，我们采用`js`和`html`分离的形式来使用 dMap。

接下来我们给一个强假设，帮助你上手 dMap。此处假设你的项目就是为了给 dMap 写 demo，那么请直接在`/src`文件夹下创建一个`demo`文件夹，并且创建`pointDemo.html`来控制也页面与`pointDemo.js`来控制逻辑。那么你的项目结构目前是这样的：
```shell
/useDMAP
|--pkg
| | dmap-dist.js
|--src
| | pointDemo.html
| | pointDemo.js
```

## 0 页面准备

在写逻辑代码之前，我们需要先准备`html`文件，大家都知道html文件分为`head`和`body`两部分，接下来我们在`head`部分准备依赖库。
+ 先引入`leaflet`的样式文件：
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"/>
```
+ 引入`leaflet`的源码：
```html
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
```
+ 引入其他的依赖库：
```html
<script src="https://cdn.bootcss.com/snap.svg/0.5.1/snap.svg-min.js"></script>
<script src="https://d3js.org/d3.v4.js"></script>
```
按理说以上所说的库应该被写到 package.json 中作为内部依赖的，但是由于我们自己的问题目前还没有集成进去，希望大家海涵，我们会尽快集成到 dMap 中。

最后引入我们的主角：
```html
<script src="../pkg/dmap-dist.js"></script>
```
此处`src`给出的相对路径，注意你自己的 demo 文件与 dMap 的相对位置，如果觉得不可靠，可以用绝对地址。但是前提是将`dmap-dist.js`拷贝到自己的项目中，该`dist`文件位于`dMap/builds/dmap-dist.js`中。

接下来我们看`html`的`body`部分，这里需要创建一个`<div>`节点，这个节点代表了你的地图展示在页面的位置，因此需要指定一个`id`，这里就叫`mapid`，当然你可以给一个自己喜欢的名字。
```html
<div id="mapid" style="height: 100%;"></div>
```

## 1 创建地图

写完了`html`文件，不知道大家还记得`js`文件吗？如果不记得的话请回到第 0 部分复习一下，因为接下来我们就需要开始在`js`中写逻辑部分了。

通过上文的`id`，在`js`代码中创建`L.map`容器，我之前指定的`id`叫做`mapid`，在这里传给地图容器。
```js
var map = L.map('mapid').setView([34.27, 108.95], 5);
```

然后加载地图栅格图层，注意这是必不可少的一步，因为接下来所有的东西都是展示在这个图层上的。
```js
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    minZoom: 2,
    id: 'mapbox.streets'
}).addTo(map);
```

## 2 数据绑定与注入

俗话说：巧妇难为无米之炊。数据就好像米一样，没有数据再厉害的前端工程师也画不出图来，我们先展示一下样例数据：
```js
// 我国34省会、直辖市、特别行政区的地理坐标。（详细数据附于页后）
var coords = [
    { name: '甘肃', geoCoord: [36.03, 103.73] },
    { name: '青海', geoCoord: [36.56, 101.74] },
    { name: '四川', geoCoord: [30.67, 104.06] },
    ...
]
```

但其实巧妇也难为无**锅**之炊，这个米要是没有锅也是煮不熟的，因此除了数据本身之外还需要一个好用的容器来盛数据，这就是我们的图层了。首先实例化一个图层组件，并为其绑定数据，然后注入到图层中，这里以点图层`PointLayer`为例：
```js
// 实例化图层
pLayer = new dmap.PointLayer();
// 数据绑定
pLayer.data(coords, function (data) {
    return {
        coordinate: data.geoCoord,
        options: {
            radius: 0.2,
            color: '#7C1200'
        }
    }
});
// 数据注入
pLayer.enter();
```
这里`data`方法是为了给图层绑定数据，由于用户的原始数据集（coords）与图层（pLayer）要求的数据格式不一定对应，所以这里留了一个回调函数供用户将自己的数据规范化为图层要求的数据，至于图层要求的数据格式可以查看官方文档。然后使用`enter`方法将数据注入图层中，注意这一步必不可少，因为`enter`方法才真正地将映射好的数据实例化为图层元素。

## 3 图层渲染

在注入数据后，使用`addTo`方法将图层`pLayer`添加到地图容器中，从而实现前端的渲染。
```js
pLayer.addTo(map)
```

## A 原始数据示例
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