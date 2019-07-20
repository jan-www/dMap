# GeoJson : L.geoJSON

## Element description

We use the Leaflet element [L.geoJSON](https://leafletjs.com/reference-1.4.0.html#geojson) as `GeoJson`  layer's element，in oder to draw up the GeoJson layer by `dmap.GeoJson` 

## Parameter Description

+ data: the data with geoJSON type
+ options: inherit L.geoJSON

The format of the specific format: [L.geoJSON](https://leafletjs.com/reference-1.4.0.html#geojson)

## Method description

### Constructor

( data: *L.geoJSON*, options: *GeoJSON options*)

The constructor of the GeoJson layer. Constructed according to the data and options parameters.

example：

```javascript
var mygeo = dmap.GeoJson(data, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
})
```

The "data" is L.geoJSON type data, and the "style" is a parameter of the GeoJSON options type.

### setStyle(style) method

(options : *GeoJSON options*) => this

Set the configuration of the Geojson layer.

example：

```javascript
function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.density)
    };
}
mygeo.setStyle(style)
```

### addData(data) method

(data：*L.geoJSON*) => this

Add data to the Geojson layer.

example：

```javascript
mygeo.addData(data)
```

### on(event,callback) method

(event_type：*event*, callback：*func*)

Add a response event to the Geojson layer.

example：

```javascript
function trig(layer,feature){
    var popupContent = "<p>My name is " +
    feature.properties.name + "</p>";
    layer.bindPopup(popupContent).openPopup();
}
mygeo.on("click",trig)
```

## Code example

For the geojson object in the test.js file (the variable is named statesData), it represents the distribution of various continents in the United States. In the <body> section of the html file being tested, we can add the following code:

```javascript
function trig(layer,feature){
    var popupContent = "<p>My name is " +
        feature.properties.name + "</p>";
    // console.log(popupContent)
    layer.bindPopup(popupContent).openPopup();
}
mygeo = new GeoJson(statesData, {style: style}).addTo(map);
mygeo.on("click",trig)       //mouseover,click
```

This achieves the addition of the on method to each object of the GeoJson class.