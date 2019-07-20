# PolygonLayer : GroupLayer

## Element

We use Leaflet element [`L.Polygon`](https://leafletjs.com/reference-1.5.0.html#polygon) as display element for `PolygonLayer` to display polygon elements on map.

Coordinate series of `L.Polygon` is set by `coordinates` option.

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
| coordinates  | `Array(2)`/`L.Latlng` | Coordinates of polygon border |
| options | `Object` | Element style, same as `L.Polygon`'s option

### enter
*() => this*

Call `generate` method and map `this._data` to array of `L.Polygon`.

### generate
*() => Array*

Map `this._data` to `Array<L.Polygon>`.

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

We use `dmap.PolygonLayer` to display Australia administrative division.

```javascript
pLayer = new dmap.PolygonLayer();

pLayer.data(coordsAustralia, coords => {
    coords.forEach(coord=>coord.reverse())
    return { coordinates: coords }
})

pLayer.enter().addTo(map)

map.fitBounds(pLayer.getBounds())
```