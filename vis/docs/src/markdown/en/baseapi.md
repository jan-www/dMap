# BaseLayer

## Element
`BaseLayer`, which is inherited from `L.Layer`, is base class of all `dmap` layers. There is no need for `BaseLayer` to render data. It provides method interfaces for `dmap` layers.

## Parameters

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| zIndex | Number | 300   | Layer level in Z-axis |


## Methods

### data
*(Array&lt;any&gt;, Function) => this*

Map origin data to array of object with specific keys.

Please view each layer's introduction page to get more details.

### enter
*() => this*

Call `generate` method and map `this._data` to array of certain element.

### generate
*() => Array*

Map `this._data` to array of certain element.

### addTo
*(L.Map) => this*

Add this layer on Leaflet `map` container.

### `on`

*(String:event_type, Function:callback) => this*

Bind a callback function to all the elements of this layer.

### getBounds
*() => L.Bounds*

Return rendering range of this layer. Provide argument for map-scaling functions.
