# CanvasGridLayer : CanvasLayer

## Element

Grid map renders value distribution on map by regular 2-D scalar matrix. `CanvasGridLayer` draws serval rectangles on canvas to render data. In dmap, 2-D data is represented by `dMap.ScalarField`, which contains basic information of 2-D matrix.

## Parameters
| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| opacity | Number | `0.99` | Opacity of canvas |
| createPane | Boolean | `true` | Whether create canvas on a new pane |
| zIndex | Number | `300` | Layer level in Z-axis |
| color  | Function | `null` | Data2Color mapping function |
| border  | Boolean | `false` | Whether draw border for rectangles |
| borderWidth | Number | `0.5` | Border width in pixel |
| borderColor | String | `#000000` | Border color | 
| borderOpacity | Number | `0.99` | Border opacity |

## Generate grid structure

Dmap provides `ScalarField.fromASCIIGrid` function, by which user can get 2-D matrix data `arr` from ASC file, and feed `arr.grid` and `arr.params` to `data` method as the first and third arguments. Pattern of the first six lines in ASC files is:

| Name | Description |
| :--- | :------- |
| ncols | Number of columns, width of grid map |
| nrows | Number of rows, height of grid map |
| xllcorner | Latitude of left-lower corner |
| yllcorner | Longitude of left-lower corner |
| NODATA_value | Number that indicates invalid number (transparent in grid map) |

Starting from the seventh line, each line represents one row in origin data. For example:

```
ncols        3
nrows        5
xllcorner    116.34084820747375
yllcorner    39.979241217295936
cellsize     0.000505058366 0.0004625
NODATA_value  -9999
0.94221 0.92999 0.93455
0.95111 0.91213 0.97551
0.96115 0.92999 0.93520
0.93115 -9999 0.95112 -9999
-9999 -9999 -9999 -9999
```

`fromASCIIGrid` function returns a `ScalarField` object, of which `params` attribute is an `Object` containing information like `ncols` of ASC file, `grid` attribute is 2-D matrix origin data.

## Methods
### data
*(Array&lt;any&gt;: grid, Function: map_function, Object: params) => this*

Map origin data set to `this._data`, an array of objects with certain keys. Input data shouold be 2-D matrix or 1-D array, return value of mapping function should be a 2-D matrix, of which elements are `Number`s, indicating value of each entry.

The first argument `grid` and third argument `parmas` can be obtained from a `ScalarField` object's `grid` and `params` attributes, which is the return value of `fromASCIIGrid` function.

### hide
*() => ()*

Hide this layer and disable all interactions.

### show
*() => ()*

Display this layer and allow all interactions.

### on
*(String event_type, Function callback_function, Object? context) => this*

Bind callback function on this layer.
+ `event_type`: *String*, event
+ `callback_function`: *Function (Polyline p, Number index, Object originData)*, callback function
+ `context`: *Object*, context when calling callback function

### enter
*() => this*

Map `this._data` to 2-D `ScalarField` structure.

### addTo
*(Map) => this*

Add this layer on Leaflet `map` container.

### getBounds
*() => L.Bounds*

Return rendering range of this layer. Provide argument for map-scaling functions.

### needRedraw
*() => this*

Force to re-render this layer.

## Demo

```javascript

d3.text('data/out.asc', function (asc) {
    // load grid from ASC file
    let s = dmap.ScalarField.fromASCIIGrid(asc);
    
    // display information on map
    let identify = function (v, index, e) {
        if (v !== null) {
            let html = `<span class="popupText">value: ${v}</span>`;
            L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
        }
    };

    let gridLayer = new dmap.CanvasGridLayer({
        opacity: 0.78,
        border: true,
        color: dmap.Util.colorScale(['#FFFFB2', '#E31A1C']).domain([0, 27]),
        borderColor: '#111111',
        borderWidth: 0.71,
        borderOpacity: 0.7,
        controlBar: true,
        zIndex: 200
    });
    gridLayer
    .data(s.grid, (d)=>d ,s.params)
    .enter()
    .addTo(map)
    .on('click', identify); // bind event

    map.fitBounds(gridLayer.getBounds());

    l = gridLayer;
});

```
