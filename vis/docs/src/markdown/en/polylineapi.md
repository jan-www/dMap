# PolylineLayer : GroupLayer

## Element
We use Leaflet element [L.Polyline](https://leafletjs.com/reference-1.4.0.html#polyline) as display element for `PolylineLayer`, to display coordnates by `L.Polyline`s.

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
| coordinates  | `Array(Array(2))`/`Array<L.Latlng>` | Coordinates of polyline |
| options | `Object` | lement style, same as `L.Polyline`'s option |

### enter
*() => this*

Call `generate` method and map `this._data` to array of `L.Polyline`.

### generate
*() => Array*

Map `this._data` to `Array<L.Polyline>`.

### addTo
*(Map) => this*

Add this layer on Leaflet `map` container.

### `on`

*(String:event_type, Function:callback) => this*

Bind a callback function to all elements in this layer.


### getBounds
*() => L.Bounds*

Return rendering range of this layer. Provide argument for map-scaling functions.

## Demo

Display some streets.

```javascript
var roads = [
    {
        coords: [
            [39.976566, 116.441737], 
            [39.977007, 116.417831],
            ...
        ],
        type: "subway"
    },
    {
        coords: [
            [39.969476, 116.431473],
            [39.969326, 116.417946],
            ...
        ],
        type: "road"
    },
    {
        coords: [
            [39.977586, 116.394475],
            [39.968540, 116.395207],
            ...
        ],
        type: "subway"
    }
]
var pLayer = new dmap.PolylineLayer(options);

pLayer.data(roads, (d) => {
    let color;
    switch (d.type) {
        case "road": color = "#7D7D7D"; break;
        case "subway": color = "#7C1200"; break;
        default: color = "#000"; 
    }
    return {
        coordinates: d.coords,
        options: { color }
    }
})
    .enter()
    .addTo(map)

```