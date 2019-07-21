# dMap介绍

----

## 设计思想
  dMap借鉴leaflet、d3和echarts这三个主流的涉及地图与数据可视化的js库，取其优点设计开发出一套适用于数据绑定的地图可视化开发套件。基本的借鉴思路如下：
* leaflet：图层化的地图渲染，可以生成高度复杂的地图交互
* d3：灵活的数据绑定机制和范围渲染机制
* echarts：使用灵活的配置项来配置图表

## 三层调用
dMap提供基础的地图渲染和基于地图的图表，api分三层调用：
1. 地图的渲染

在特定div内使用leaflet引擎渲染默认底图（初始时默认北京中心，zoomLevel=7(待定)，使用实验室地图服务器，该层设计基本迁移leaflet的api，返回一个具体的地图对象。

```JavaScript
var map = new dMap.Map('#div', (options))
```
1. 建立地图图层，绑定数据

由地图对象调用具体的展示效果方法，可分为热力图，点图，od图，区块图等，均设置默认调色方案，返回一个图层中所有要素的对象集合，需根据特定的图传入相应的点类/线类/面类要素的geoJSON。使用option来定义图表的一些基本配置的样式，使用data载入数据并根据数据实现自定义，使用enter将data注入到layer里面

**（这里借鉴了d3的语法）**

```JavaScript
var layer = new dMap.PointMap(options)
.data(data,function(d){})
.enter()
```

1. 图层的显示

可以选择将图层添加到map中，
```JavaScript
layer.addTo(map)
```
## options 、Data和Layer
在echart的实现逻辑中，比较侧重于直接进行图表配置后注入数据，这样的好处是一个option决定了数据的显示状态，但坏处是使得配置项过于复杂，当我需要对图表中的每个元素进行自定义的时候也非常不直观，而在d3的实现逻辑中，更倾向于数据绑定操作，对图表的类型和基本配置就会比较困难，在dMap的实现逻辑中，将这两种方式进行了一种平衡，并接入了leaflet的图层逻辑：
* 使用option进行整个图表的配置
* 使用data注入数据，并使用data中的函数来对具体的某个元素进行配置
* 使用layer进行图层叠加操作
## 基本实现思路
### 地图级别层
本层实现主要迁移leaflet的api，保留option设置与我们的接口统一即可
### 图层级别层
基本保留leaflet的实现
本层主要将leaflet的layer control和d3的enter类方法结合，图层实现上，既可以考虑基于leaflet的插件直接实现（如heatmap），也可以考虑基于leaflet的api设置空图层，然后通过d3选择器选中进行d3层面的绘制
### 元素级别层
主要为attr，enter，draw，select等方法的实现，对于基于d3实现的图层（如点图，OD图，区块图）可以直接迁移attr方法和select方法，重写enter方法，通过设置display属性来实现draw方法，对于基于leaflet插件实现的图层（如热力图）均需重写上述方法。
## 图层类型
dMap提供以下几类不同的图层，包括
### 基本图层：
基本图层用于绑定数据显示内容
* 标记图 (dMap.MarkerMap)
* 点图 (dMap.PointMap)
* 多边形图 (dMap.PolyonMap)
* 轨迹OD图 (dMap.ODMap)
* geoJSON图 (dMap.GeoJsonMap)
* 热力图 (dMap.HeatMap)
* 时间轴图 (dMap.TimelineMap)
### 控制图层：
控制图层用于在显示一些地图控制器，基本可以继承leaflet的控制元素
* 地图缩放 (dMap.control.zoom)
* 图层显示或隐藏 (dMap.control.layers)
* 比例尺(dMap.control.scale)
* 时间轴
## 地图
保留leaflet的地图配置即可，包含的所有选项可以参照下面的链接

[https://leafletjs.com/reference-1.3.4.html#map-factory](https://leafletjs.com/reference-1.3.4.html#map-factory)

### 主题配置
为了方便用户更好地配置地图，在leaflet的接口基础上，可以加入地图主题设置
```JavaScript
map.setOptions({theme:'...'})
```
### 导入新配置
```JavaScript
map.setOptions(options)
```

## 图层配置
### 基础配置
图层基础配置适用于一般图层，可以包括以下配置选项，可以参考leaflet对图层类的设置标准
```JavaScript
options = {
  name: 'layer1', //图层名称
  enable_tooltip: boolean, //是否允许tooltip
  tooltip_element: '#div', //定位tooltip元素
  enable_popup: boolean, // 是否允许popup 
  style: {  //对这个图层的样式配置
    opacity:  number,
  },
  element_style: {  //元素的样式
    fill_color: '',
    ...
  }
}
```

### 标记图(MarkerMap)
```JavaScript
options = {
  icon: 'src'  //标记的图标
  icon_size: 23 //如在元素中有设置，此项被覆盖
}
```
### 点图(PointMap)
```JavaScript
options = {
  radius: 200 //配置点的半径，如在元素中有设置，此项被覆盖
}
```
### OD图(ODMap)
```JavaScript
options = {
  arc: 233, //OD的弧度
  startIcon: 'src', //起始点的图标
  endIcon: 'src', //终点的图标
  startStyle:{ //起始点的样式
    
  },
  endStyle:{//终点的样式
  }
}
```
### 时间轴图(TimeLineMap)
```JavaScript
options = {
  enableControl: boolean, //是否显示时间控制条，默认显示
  autoPlay: boolean, //是否自动播放
  tickTime: 3444,//时间过渡，毫秒
  layerType: 'HeatMap',//图层的类型
}
```
## 元素配置9
### 基础配置
```JavaScript
layer.data(data,function(d){
  return {
    //渲染该元素需要的基本配置，包括地理坐标等
    lat: d[0],
    lon: d[1],
    size: d[3],
    ...,
    //渲染元素hover的tooltip
    tooltip_html: ''
    //渲染元素点击的
    style: { //渲染元素的样式
      
    }
  }
}).enter()
```
### 
### 集合注入操作
数据注入参考d3的实现方式，主要包含以下几种基本操作，通过集合操作来进行计算和渲染
```JavaScript
enter, //数据注入
exit, //输出删除

```
## 图层事件
事件配置用于为图层配置事件，可以参考leaflet的图层事件类型
[https://leafletjs.com/reference-1.3.4.html#map-event](https://leafletjs.com/reference-1.3.4.html#map-event)
但是调用方式略有不同，在dMap中事件配置如下：
```JavaScript
layer.on('eventname',function(){
  ....
})

```
## 元素事件
元素事件指的是具体触发某个特定元素的事件，可以包含比如
```JavaScript
click,
hover,
mousemove,
mouseover,
mouseout,
...
```
在dMap中元素事件配置如下：

```JavaScript
layer.onElement('eventname',function(d){
  ....
})
```
## 数据映射
数据映射可以借鉴d3的思路，用于生成渐变颜色、数值等，如下所示
```JavaScript
//将10-100映射到棕色到蓝色的渐变
var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"]);
//产生一个颜色
color(5)
```
具体可以参看d3的文档
[https://github.com/d3/d3-scale/blob/master/README.md#_continuous](https://github.com/d3/d3-scale/blob/master/README.md#_continuous)

## 文件结构
* builds  打包输出文件夹
* node_modules  nodejs包
* src  源文件
  * utils  关于一些常用方法的存储
    * colors   颜色
    * scale   尺度
    * projection  坐标映射
    * animation  动画
    * style  样式操作
  * events  事件处理
    * consts.js  事件定义
    * eventsHandler  事件处理
  * map  关于map的接口
  * controls 控制组件
    * zoom.js
    * layers.js
    * timeBar.js
  * layers    图层对象
    * baseLayer.js   基本layer类
    * ODLayer.js  
    * MarkersLayer.js
    * PointsLayer.js
    * PolygonLayer.js
    * GeoJsonLayer.js
    * TimeLineLayer.js
    * ...
  * items   元素对象
    * popup.js   弹出框
    * tooltip.js   浮框
    * baseItem.js 
    * marker.js
    * point.js
    * polygon.js
    * ...
  * dmap.js  总的dmap方法
* tasks 单元测试任务
  * builds.js  grunt构建设置
  * 其他测试任务
* build.js      build设置
* package.json   es6配置设置
* API.md  说明文档
## 设计思路
使用 es6 的模块化思想，将基本的功能划分成六种，最后汇总成dmap方法
* utils
* events
* map
* controls
* layers
* items
## 打包机制
使用rollup将打包成es5，机制：在package.json中设置加载库和build脚本，在build.js中设置rollup的参数
```JavaScript
{
    // package.json
    "devDependencies": {
        "babel-core": "^6.13.0",
        "babel-preset-es2015-rollup": "^1.1.1",
        "rollup": "^0.34.3",
        "rollup-plugin-babel": "^2.6.1",
        "rollup-plugin-commonjs": "^3.3.1",
        "rollup-plugin-node-resolve": "^2.0.0",
        "rollup-plugin-uglify": "^1.0.1"
    },
     "scripts": {
        // ...
        "build": "node build.js"
    },

}
```

```JavaScript
// build.js
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');         // babel 插件
var uglify = require('rollup-plugin-uglify');       // js 混淆压缩插件
var npm = require('rollup-plugin-node-resolve');    // 使用第三方包依赖
var commonjs = require('rollup-plugin-commonjs');   // CommonJS模块转换为ES6
rollup.rollup({
    entry: 'src/dmap.js', //入口文件
    plugins: [  // 插件配置
        npm({ jsnext: true, main: true }),
        commonjs(),
        uglify(),
        babel({
            exclude: 'node_modules/**',
            presets: [ "es2015-rollup" ]
        })
    ]
}).then(function(bundle) {
    // 打包之后生成一个 `budble` 把它写入文件即可
    bundle.write({
        // 转化格式 cjs 代表 commonJs, 还支持 iife, amd, umd, es6 ....
        format: 'cjs',
        banner: 'si_log.js v0.1.1',    
        dest: 'dist/si_log_common.js'
    });
});

```