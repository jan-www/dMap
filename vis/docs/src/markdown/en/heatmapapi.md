
# Heatmap

## Element description

First of all, our heatmap implementation is implemented according to [`leaflet-heatmap`](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html), users need to download the leaflet in advance- Heatmap.js and heatmap.js, see their official documentation at [`here`](https://github.com/pa7/heatmap.js/tree/develop)

## Parameter Description

+ options: 
    Same as the document in [`leaflet-heatmap`](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html). For an example of the specific form, please refer to [Additional Description](#extra)

## Method description

### AddTo

*(Map) => this*

Add the instantiated object of the HeatmapOverlay class to the map.

### setData

*(data) => this*

Load the data into the instantiated object of the HeatmapOverlay class and render it on the map.

The format of "data" is as follows:

~~~javascript
var testData = {
        max: 8,
        data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1},...,{lat: 35.8278, lng:-78.6421, count: 1}]
    };
~~~

Where "max" generally represents the maximum value of count.

<h2 id="extra">Additional Description</h2>

Options is an object whose description of the list of commonly used parameters is as follows:
| parameter         |   Types   | Description |
| :------------- | :------: | :----------------------------------------------------------- |
| radius          |  Number  | Radius indicating the size of the heat circle |
| maxOpacity        |  Number  | Specify the transparency of the heatmap |
| gradient         |  Object  | Specify the color gradient of the heatmap |
| scaleRadius           |  Boolean  | Indicates whether the radius of the heatmap is scaled according to the map zoom |
| useLocalExtrema      |  Boolean  | True means the maximum value of the data used at the current layer boundary |
| latField       | String | Specify the relative position of the track and the line connecting the starting and ending points. The default is the left side, that is, the left side of the line connecting the starting point. |
| lngField         | String | The default is 'lng', which indicates longitude when assigned |
| valueField         | String | Specifies the variable that reflects the size of the location, defaults to "value" |

Here is an example:

~~~javascript
var cfg = {
    "radius": 2,
    "maxOpacity": .8, 
    "gradient": { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
    "scaleRadius": true, 
    "useLocalExtrema": true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
};
~~~