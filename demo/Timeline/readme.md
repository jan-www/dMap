# TimelineLayer文档说明

## API接口说明

### `构造函数`

( map: *L.map*, options: *Object*)

图层构造函数。根据*options*参数进行构造。

~~~javascript
//用法
var timelineLayer = new dmap.TimelineLayer(mymap,options);
~~~

其中mymap为leaflet中的L.map对象，options为可选的配置项，具体可选配置如下：

~~~javascript
options = {
    enableControl: true, //是否显示时间控制条，默认显示
    autoPlay: false, //是否自动播放
    tickTime: 500	,//时间过渡，毫秒
    layerType: 'PointMap',//图层的类型
    layerOption: option
};
~~~

其中*layerType*为当前时间轴图的图层类型，内置包括Pointmap，heatmap等。*layerOption*表示时间轴图将要渲染的的图层的option属性。例如，对于Pointmap，可有如下配置：

~~~javascript
option = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 20
};
~~~

### `setOption()方法`

(option : Object) => this

设置时间轴图的配置。

例子:

~~~javascript
timelineLayer.setOption(options)
~~~

### `data()方法`

( time: *Array*, raw_data: *Array*, map_function: *Function* ) => this

通过 *map_function* 将原始数据数组*raw_data* 映射为所需要的数组，保存在 *this._data*。数组*time*，直接保存到*this._times*

#### params

- *time*: Array : 数组，由各个时刻的组成数组。
- *raw_data: Array* : 数组，包含处理前的全部原始数据。
- *map_function: Function( Any ) => Object* : 以 `data.map( map_function )` 的形式生成映射后的数组，用来构造对应的元素。函数返回的对象包含的具体字段请参见各图层说明。

例子：

~~~javascript
let time = ["2015/1/1","2015/1/2","2015/1/3","2015/1/4","2015/1/5"];
let data = [  [[51.505, 0.1]], [[51.508, 0.1],[51.508, 0.2]], [[51.508, 0.1],[51.508, 0.2],[51.508, 0.3]], 
[[51.508, 0.1],[51.508, 0.2],[51.508, 0.3],[51.508, 0.4]], 
[[51.508, 0.1],[51.508, 0.2],[51.508, 0.3],[51.508, 0.4],[51.508, 0.5]]  ];

timelineLayer.data(time, data, function(d){
        return {coordinate: d, options: option};
    }
)
~~~

### `on()方法`

( event_type: *String*, callback_function: *Function* ) => this

对图层绑定事件响应函数。

#### params

- *event_type: String* : 事件类别，如 `"timechange"`,在时间轴的时间变换的时刻，回调函数将会执行。

例子：

```javascript
timelineLayer.on("timechange",function(d,i,t,layer){
	console.log(i);
	console.log(d);
	console.log(t);
	console.log(layer);
});
```

### `renderAtTime()方法`

(index : String)

渲染对应时刻的图层。

#### params

- *index: String* : 输入相应时间的字符串，将会渲染对应时刻的图层。

例子：

~~~javascript
timelineLayer.renderAtTime("2015/1/2");
~~~

### `play()方法`

(index : String)

渲染对应时刻的图层，并开始按照之前的时间间隔进行播放。

#### params

- *index: String* : 输入相应时间的字符串，将会渲染对应时刻的图层。然后按照之前的时间间隔进行播放。

例子：

~~~javascript
timelineLayer.play("2015/1/1");
~~~

