# GroupLayer

## Element

`GroupLayer` is the base class of dmap layers which renders SVG elements. It is inherited from `BaseLayer`.

## Parameters

+ options: inherited from `BaseLayer`
  
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

Call `generate` method and map `this._data` to array of certain element and create an `L.FeatureGroup` object to manage layer elements.

### generate
*() => Array*

Map elements in `this_data` to SVG elements.

### `on`
*(String:event_type, Function:callback) => this*

`GroupLayer` manages elements by an `L.FeatureGroup`. By `on` method, user can bind callback function to all the elements in the FeatureGroup.

Function `callback` of `GroupLayer` receives up to 4 arguments:
+ `data`: corresponding data object in `this._data`
+ `index`: corresponding index of this element in origin data set
+ `layer`: corresponding Leaflet component in the group, such as a `L.Marker` object
+ `event`: original event, which contains helpful information such as `latlng` 

### setElementOptions
*(Array: data, Function: map_function)*

Map `data` array parameter to array of `options`, then set option for each element of `GroupLayer` in order.
