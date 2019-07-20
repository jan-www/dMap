# MarkerLayer : GroupLayer

## Element

We use Leaflet element [L.Marker](https://leafletjs.com/reference-1.4.0.html#marker) as display element for `MarkerLayer`, to display coordinates by `L.Marker`s.

Coordinate of `L.Marker` is set by `coordinate` option.

## Parameters

+ options: inherited from BaseLayer

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
| options | `Object` | Element style, same as `L.Marker`'s option |

### enter
*() => this*

Call `generate` method and map `this._data` to array of `L.Marker`.

### generate
*() => Array*

Map `this._data` to `Array<L.Marker>`.

### addTo
*(L.Map) => this*

Add this layer on Leaflet `map` container.

### `on`

*(String:event_type, Function:callback) => this*

Bind a callback function to all elements in this layer.


### getBounds
*() => L.Bounds*

Return rendering range of this layer. Provide argument for map-scaling functions.


## Demo

We display some Asia cities' location by `MarkerLayer`

```javascript
let capitals = [ 
      [39.83912266447, 116.3671875], 
      [35.56462917627, 139.7460937], 
      [37.55247109621, 126.9799804], 
      [39.01838346715, 125.7275390], 
      [47.92830585913, 107.0068359] 
    ],
    mLayer = new dmap.MarkerLayer(options);

mLayer.data(capitals, (d)=>{return {coordinate: d}})
    .enter()
    .addTo(map);

```