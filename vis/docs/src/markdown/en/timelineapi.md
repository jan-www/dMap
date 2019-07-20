# TimelineLayer

## Element description

First, TimelineLayer is about layer and time class that shows the dynamics of various layers as a function of time. For example: pointmap, heatmaps, we can play timeline plots by clicking the play button, and You can play by selecting a layer that you click on at a fixed time.

## Parameter Description

+ map:
    The map object that the timelinelayer needs
+ options: 
    Configuration items for some timelinelayer

Since ``linelineLayer`' element `options` is more complicated, we will elaborate on the constructor part of the API interface description.

## API interface description

### Constructor

( map: *L.map*, options: *Object*)

Layer constructor. Constructed according to the *options* parameter.

```javascript
//usage
var timelineLayer = new dmap.TimelineLayer(mymap,options);
```

The mymap is the L.map object in the leaflet, and the options are optional configuration items. The specific configuration is as follows:

```javascript
options = {
    enableControl: true, //Whether to display the time control bar, the default display
    autoPlay: false, //Whether to play automatically
    tickTime: 500	,//Time transition, milliseconds
    layerType: 'PointMap',//Type of layer
    layerOption: option
};
```

Where *layerType* is the layer type of the current timeline graph, including Pointmap, heatmap, etc. *layerOption* represents the option attribute of the layer that the timeline graph will be rendered. For example, for a Pointmap, you can have the following configuration:

```javascript
option = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 20
};
```

### setOption() method

(option : Object) => this

Set the configuration of the timeline diagram.

exmaple:

```javascript
timelineLayer.setOption(options)
```

### data() method

( time: *Array*, raw_data: *Array*, map_function: *Function* ) => this

Map the raw data array *raw_data* to the desired array via `map_function` and save it in `this._data`. Array *time*, saved directly to *this._times*

#### params

- *time*: Array : An array consisting of arrays of various moments.
- *raw_data: Array* : An array containing all the raw data before processing.
- *map_function: Function( Any ) => Object* : use `data.map( map_function )`  Generates a mapped array that is used to construct the corresponding element. See the description of each layer for the specific fields contained in the object returned by the function.

example：

```javascript
let time = ["2015/1/1","2015/1/2","2015/1/3","2015/1/4","2015/1/5"];
let data = [  [[51.505, 0.1]], [[51.508, 0.1],[51.508, 0.2]], [[51.508, 0.1],[51.508, 0.2],[51.508, 0.3]], 
[[51.508, 0.1],[51.508, 0.2],[51.508, 0.3],[51.508, 0.4]], 
[[51.508, 0.1],[51.508, 0.2],[51.508, 0.3],[51.508, 0.4],[51.508, 0.5]]  ];

timelineLayer.data(time, data, function(d){
        return {coordinate: d, options: option};
    }
)
```

### on() method

( event_type: *String*, callback_function: *Function* ) => this

Bind the event response function to the layer.

#### params

- *event_type: String* : The event class, such as `"timechange"`, will be executed at the time of the time shift of the timeline.

example：

```javascript
timelineLayer.on("timechange",function(d,i,t,layer){
	console.log(i);
	console.log(d);
	console.log(t);
	console.log(layer);
});
```

### renderAtTime() method

(index : String)

Render the layer at the corresponding moment.

#### params

- *index: String* : Enter a string of the corresponding time, which will render the layer at the corresponding time.

example：

```javascript
timelineLayer.renderAtTime("2015/1/2");
```

### play() method

(index : String)

Render the layer at the corresponding time and start playing at the previous time interval

#### params

- *index: String* : Enter a string of the corresponding time, which will render the layer at the corresponding time. Then play at the previous interval.

example：

```javascript
timelineLayer.play("2015/1/1");
```

