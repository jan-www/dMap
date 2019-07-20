# PointLayer : GroupLayer

## Element

We use Leaflet element [L.CircleMarker](https://leafletjs.com/reference-1.4.0.html#circlemarker) as display element for `PointLayer`, to display coordinates by circle

Coordinate of `L.CircleMarker` is set by `coordinate` option.

## Parameters

+ options: 均继承自 BaseLayer

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | Layer level in Z-axis |

## Methods

### data
*(Array&lt;any&gt;, Function) => this*

Map origin data to array of object with specific keys.

Please view[Guide](#/zh/guide/quickstart) to get `data` method calling example.

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinate  | `Array(2)`/`L.Latlng` | Coordinate of marker |
| options | `Object` | Element style, same as `L.CircleMarker`'s option |

### enter
*() => this*

Call `generate` method and map `this._data` to array of `L.CircleMarker`.

### generate
*() => Array*

Map `this._data` to `Array<L.CircleMarker>`。

### addTo
*(L.Map) => this*

Add this layer on Leaflet `map` container.

### `on`

*(String:event_type, Function:callback) => this*

Bind a callback function to all elements in this layer.


### getBounds
*() => L.Bounds*

Return rendering range of this layer. Provide argument for map-scaling functions.


*Note: Size of points in `CircleMap` will NOT change when map scales. If want to use point that size varies when map scales, please render  `L.Circle`*

## Demo

We display provincal capitals in China by `PointLayer`.

```javascript
var coords = [
    {name:'甘肃', geoCoord:[36.03, 103.73 ]},
    {name:'青海', geoCoord:[36.56, 101.74 ]},
    {name:'四川', geoCoord:[30.67, 104.06 ]},
    {name:'河北', geoCoord:[38.03, 114.48 ]},
    {name:'云南', geoCoord:[25.04, 102.73 ]},
    {name:'贵州', geoCoord:[26.57, 106.71 ]},
    {name:'湖北', geoCoord:[30.52, 114.31 ]},
    {name:'河南', geoCoord:[34.76, 113.65 ]},
    {name:'山东', geoCoord:[36.65, 117 ]},
    ...
]
var pLayer = new dmap.PointLayer(options);

pLayer.data(coords, (d)=>{return {coordinate: d}})
    .enter()
    .addTo(map);

```