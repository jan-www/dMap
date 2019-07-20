# DMap Introduction

----

## Design Philosophy
  DMap uses leaflet, d3 and echarts for reference, which are the three mainstream js library about map and data visualization. We take their advantages to design and develop a set of map visualization development suite for data binding. The basic idea is as follows：
* leaflet：Layered map rendering that can generate highly complex map interactions
* d3：Flexible data binding mechanism and range rendering mechanism
* echarts：Configure the chart with flexible configuration items

## Three layers
DMap provides basic map rendering and map-based charts, and the API is divided into three layers:

1.Map Rendering

Use Leaflet engine to render the base map within a specific `<div>` . Basically, the design of this layer makes use of Leafley api, which returns a concrete map object.

```
var map = new dMap.Map(‘#div’, (options))
```
2.Create New Layer and Binding Data

The specific display effect is called by the map object, which can be divided into thermal diagram, point diagram, OD diagram, block diagram, etc. Default color scheme is set. An object collection of all elements in a layer will be returned. The geoJSON of the corresponding point class, line class or surface class element needs to be passed in according to the specific diagram. Use option to define some basic configuration styles for the chart, use data to load data and customize the data, and use enter to inject data into layer.

**（D3 syntax is used here）**

```
var layer = new dMap.PointMap(options)
.data(data,function(d){})
.enter()
```

3. Layer Display

You can choose to add layers to the map.
```
layer.addTo(map)
```
## Options,Data and Layer
The implemention of echart puts more emphasis on setting options before pushing data. This has the advantage that an option determines the display state of the data, but the disadvantage is that it makes the configuration items too complex and very unintuitive when customizing every element in the diagram is needed.

On the other hand, The implemention of D3 tends to the binding operation of data, which makes the type and basic configuration of the map more difficult. 

Nevertheless, in the implemention of dmap, we carry out a balance between the two ways and access the leaflet layer logic:
* Use ```option``` to configure the entire diagram
* Use ```.data``` to inject data, and use the callback function in ```.data``` to configure a specific element
* Use `.layer` for layer stacking
## Implementation Idea
### Map Level
The design of this layer makes use of Leaflet API, and keep option settings consistent with our interface
### Layer Level
basically retain leaflet API

This layer mainly combines the `layer control` in leaflet and `enter` in d3. On the layer implementation, we can either consider the direct implementation of the leaflet-based plug-in (such as a `heatmap`), or consider the empty layer setting based on the leaflet API, and then carry out the painting at the d3 level through the selection of the d3 selector.
### Element Level
This level mainly targets on the implementation of `attr`, `enter`, `draw`, `select` and other methods. 

For the d3-based layers (such as point diagram, OD diagram, and block diagram), the `attr` method and the `select` method can be directly migrated, the `enter` method can be overwritten, and the `draw` method can be implemented by setting the `display` property. 

For the layer implemented based on the leaflet plug-in (such as thermal diagram), the above methods need to be overwritten.
## Types of Layers
DMap provide the following types of layers:
### Basic Layer:
Basic Layer is uesd to bind data and display content.
* Marker Map (dMap.MarkerMap)
* Point Map(dMap.PointMap)
* Polyon Map (dMap.PolyonMap)
* OD Map (dMap.ODMap)
* GeoJSON Map (dMap.GeoJsonMap)
* Head Map (dMap.HeatMap)
* Timeline Map (dMap.TimelineMap)
### Control Layer:
The control layer is used to display some map controllers that can basically inherit the control elements of leaflet
* Zoomimg (dMap.control.zoom)
* Visibality (dMap.control.layers)
* Scale(dMap.control.scale)
* Timeline
## Map
This layer just retain the map configuration of the leaflet. All the included options can be referred to the following links:

[https://leafletjs.com/reference-1.3.4.html#map-factory](https://leafletjs.com/reference-1.3.4.html#map-factory)

### Theme Settings
In order to help the user to better configure the map, on the basis of the interface in leaflet, map theme settings can be added.
```
map.setOptions({theme:'...'})
```
### Import new Configuration
```
map.setOptions(options)
```

## Layer Configuration
### Basic Configuration
The layer base configuration works on normal layers. Following options are supported :
```
options = {
  name: 'layer1', //name of layer
  enable_tooltip: boolean, //is tooltip enabled
  tooltip_element: '#div', //locate tooltip element
  enable_popup: boolean, // is popup enabled 
  style: {  //configure the layer style
    opacity:  number,
  },
  element_style: {  //style of element
    fill_color: '',
    ...
  }
}
```

### MarkerMap
```
options = {
  icon: 'src'  
  icon_size: 23 //if icon size is setted in specific element, this can be ignored
}
```
### PointMap
```
options = {
  radius: 200 //if radius is setted in specific element, this can be ignored
}
```
### ODMap
```
options = {
  arc: 233, 
  startIcon: 'src',
  endIcon: 'src',
  startStyle:{
    
  },
  endStyle:{
  }
}
```
### TimeLineMap
```
options = {
  enableControl: boolean, //is control bar displayed (default:true)
  autoPlay: boolean, 
  tickTime: 3444,//millisecond
  layerType: 'HeatMap',// include 'HeatMap' and 'PointMap'
}
```
## Element Configuration
### Basic Configuration
```
layer.data(data,function(d){
  return {
    //Basic configuration required to render the element, including geographic coordinates, etc
    lat: d[0],
    lon: d[1],
    size: d[3],
    ...,
    //The tooltip when hovering
    tooltip_html: ''
    //rendering when clicked
    style: { 
      
    }
  }
}).enter()
```
### 
### Data Entering
Data injection refers to the implementation of d3, which mainly includes the following basic operations, and use the set operations to calculate and render

```
enter, //inject
exit, //delete

```
## Layer Event
Event configuration is used to configure the event for the layer, refer to the layer event type of leaflet

[https://leafletjs.com/reference-1.3.4.html#map-event](https://leafletjs.com/reference-1.3.4.html#map-event)
However, the calling style is sightly different. The event configuration in dMap is configured like this:
```
layer.on('eventname',function(){
  ....
})
```
You can override the bind method here to ensure that newly added elements are not reloaded with events
```
layer.bind('eventname',function(){
  ....
})

```
## Element Event
An element event is an event when specifically triggers a particular element, including:
```
click,
hover,
mousemove,
mouseover,
mouseout,
...
```
The element events in the dMap are configured as follows:

```
layer.onElement('eventname',function(d){
  ....
})
```
## Data Mapping
Data mapping can be used to generate gradient colors, values, etc., using ideas from d3, as shown below:
```
//Map 10-100 to a brown to blue gradient
var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"]);
//generate a color
color(5)
```
See the documentation for d3
[https://github.com/d3/d3-scale/blob/master/README.md#_continuous](https://github.com/d3/d3-scale/blob/master/README.md#_continuous)
