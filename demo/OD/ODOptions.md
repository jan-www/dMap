## Options for OD

OD is a class that draw a trail according to the given two points, i.e. origin point and destination point. Options of OD is shown as following. 

| Option         |   Type   |  Default  | Description                                                  |
| :------------- | :------: | :-------: | :----------------------------------------------------------- |
| color          |  String  | '#4682B4' | Specify the color of the trail. You can also use description like `color: "red"`. |
| opacity        |  Number  |    0.5    | Specify the opacity of the trail.                            |
| weight         |  Number  |     3     | Specify the width of the trail in pixels.                    |
| icon           |  `Icon`  |           | Give an icon to show animation on the trail. Default is a plane. `Icon` is the icon object in Leaflet. |
| curvature      |  Number  |    4.0    | How much to simplify the trial on map. More means less curved the trial is, and less means more curved the trial is. Note that curvature have to be greater than 3.0. Otherwise, you will get a straight trail. |
| leftSide       | Boolean  |   false   | Make the trial on the right side of line from origin to destination. |
| points         | Boolean  |   false   | Whether to add origin and destination points on the map.     |
| pointsColor    |  String  | '#00C5CD' | Specify the color of the origin and destination points.      |
| pointsRadius   |  Number  |     2     | Specify the size of the origin and destination points.       |
| pointsOpacity  |  Number  |    0.5    | Specify the opacity of the origin and destination points.    |
| preferCenter   | `latLng` |           | When the difference between org.lng and dst.lng is lager than 180, we choose the point nearer to preferCenter as the base point and move another one to make the trail sense. If it is not specified, we set it as  `L.latLng(destinaton)`. |
| popup          | Boolean  |   false   | Whether to bind popup of latlng to the origin and destination points. |
| popupContent   | `Object` |           | Specify the popup content when popup is true. Note that it is supposed to be like `{org: "your content a", dst: "your content b"} `. Default is {org: org.latLng, dst: dst.latLng}. |
| trailHighlight | Boolean  |   false   | Whether to highlight the trail.                              |
| trailAnimate   | Boolean  |   false   | Whether to setup animation of trial by using the icon in options. |
| twoWay         | Boolean  |   false   | Whether the trail is two-way.                                |
And it also includes options inherited from `L.Path`.