# ODLayer : GroupLayer

## Element

Based on [`L.Path`](https://leafletjs.com/reference-1.5.0.html#path) in Leaflet, we construct the `OD` class, which builds up the `ODLayer`. In this way, a trajectory formed by each coordinate pair (ie, the origin and destination coordinates) in the dataset is displayed on the map.

The `OD` class is used to draw a trajectory of a clickable bindable event. The trajectory consists of three parts: origin point, destination point, and trajectory. These three parts can accept event binding as a whole, or can accept event binding separately. An instance of class `OD` takes a coordinate pair as input, and the coordinate pair must contain the origin coordinate and destination coordinate to generate a track.

## Parameters

+ options: inherited from `BaseLayer`

Since the the element of `ODLayer`, `OD`, is a new class constructed by ourselves, there are some extra parameters, please refer to [Addition] (#extra).

## Methods

#### `data`

*(trail_data, callback) => this*

Method `data` is used to fill the trace data into `ODLayer`, there is an example as follows.

```javascript
let paths = [
    [origin0, destination0], [origin1, destination1], ...
]
let odLayer = new dmap.ODLayer();

odLayer.data(paths, function(path) {
    return {
        origin: path[0], 
        destination: path[1],
        options: {color: 'red', ...}
    }
}).enter().addTo(map);

```

### `generate`

*() => Array*

One can use method `generate` to map `this._data` to an array of `OD` instances, which is used to generate an instance of `ODLayer`.

### `on`

*(event_type, callback) => this*

Method `on` is used to bind an event to all elements of a common attribute in the layer at once, note that *event_type* requires a special format:

+ org_*your_event_type*: bind the event *your_event_type* to all origin points
+ dst_*your_event_type*: bind the event *your_event_type* to all destination points
+ trail_*your_event_type*: bind the event *your_event_type* to all traces

For example, we want the latitude and longitude of the point to be showed when users' mouse is above the origin point of any trace. In order to implement the function, we can simply use the following code. 

```javascript
// 必须先定义一个popup，用于展示事件效果
var orgpopup = L.popup();

// 注意第一个参数的前缀*org_*代表事件作用在该层的所有起点上
myODLayer.on('org_mouseover', function(e){ 
    orgpopup
        .setLatLng(e.latlng)
        .setContent('org: '+ e.latlng.toString())
        .openOn(map);
});
```

## Demo

```javascript
// Prepare the data of airports and airlines
var odData = {
    Airport_LOC: {
        "BGR": [44.807442, -68.828102],
        "DCA": [38.852081, -77.037697],
        "CAE": [33.938831, -81.119499],
        "PHL": [39.871941, -75.241096]
    },
    flights: [
        ["BGR", "DCA", 1, 0, 44580051.972303644, 1],
        ["BGR", "PHL", 1, 0, 60163158.81116707, 0],
        ["DCA", "PHL", 1, 0, 14984886.90177007, 1],
        ["CAE", "DCA", 1, 0, 28849199.039916407, 0]
    ]
}

let  airports = odData.Airport_LOC,
    trails = odData.flights;

var ods = new dmap.ODLayer();
// Feed data to OD layer and use `enter()` to render it 
ods.data(trails, function(t){
    return {
        origin: airports[t[0]], 
        destination: airports[t[1]], 
        options: {
            // @trail relevant
            color: '#4682B4',
            dashArray: 0,
            curvature: 5,
            opacity: 0.3,
            weight: 2,
            // @points relevant
            points: true,
            pointsColor: '#00C5CD',
            pointsOpacity: 0.3,
            pointsRadius: 1,
            preferCenter: [30, -90],
            // @interaction relevant
            popup: true,
            popuopContent: {
                org: t[0],
                dst: t[1]
            }, 
            trailHighlight: true,
            trailAnimate: true,
            twoWay: t[5]==1?true: false
        }
    }
}).enter();
ods.addTo(map);
```

## Addition

`OD` is a class that draw a trail according to the given two coordinates, i.e. origin coordinate and destination coordinate. Options of OD is shown as following. 
`OD` is inherited from `L.Path`, so in addition to the parameters of the parent class, there are some new parameters as follows.

| Option         |   Type   |  Default  | Description                                                  |
| :------------- | :------: | :-------: | :----------------------------------------------------------- |
| color          |  String  | '#4682B4' | Specify the color of the trail. You can also use description like color: "red". |
| opacity        |  Number  |    0.5    | Specify the opacity of the trail.                            |
| weight         |  Number  |     3     | Specify the width of the trail in pixels.                    |
| icon           |  [Icon](https://leafletjs.com/reference-1.5.0.html#icon)  |           | Give an icon to show animation on the trail. Default is a plane. Icon is the icon object in Leaflet. |
| curvature      |  Number  |    4.0    | How much to simplify the trial on map. More means less curved the trial is, and less means more curved the trial is. Note that curvature have to be greater than 3.0. Otherwise, you will get a straight trail. |
| leftSide       | Boolean  |   false   | Make the trial on the right side of line from origin to destination. |
| points         | Boolean  |   false   | Whether to add origin and destination points on the map.     |
| pointsColor    |  String  | '#00C5CD' | Specify the color of the origin and destination points.      |
| pointsRadius   |  Number  |     2     | Specify the size of the origin and destination points.       |
| pointsOpacity  |  Number  |    0.5    | Specify the opacity of the origin and destination points.    |
| preferCenter   | [latLng](https://leafletjs.com/reference-1.5.0.html#latlng) |       `L.latLng(destinaton)`    | When the difference between org.lng and dst.lng is lager than 180, we choose the point nearer to preferCenter as the base point and move another one to make the trail sense. |
| popup          | Boolean  |   false   | Whether to bind popup of latlng to the origin and destination points. |
| popupContent   | Object |    `{org: org.latLng, dst: dst.latLng}`       | Specify the popup content when popup is true. |
| trailHighlight | Boolean  |   false   | Whether to highlight the trail.                              |
| trailAnimate   | Boolean  |   false   | Whether to setup animation of trial by using the icon in options. |
| twoWay         | Boolean  |   false   | Whether the trail is two-way. |
