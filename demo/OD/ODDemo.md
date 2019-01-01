## Demo for OD Layer

> Let us use `dMap` to make an easy example.

### Map setup

First you are supposed to [setup a leaflet map](https://leafletjs.com/). In order for a better user experience, here we specify some features for the map, such as `minZoom: 2` and `maxBounds: bounds`. 

### Data Preparing

Prepare the data before you use it to draw trails on a map.

```js
// Prepare the data of airports and airlines
let  airports = odData.Airport_LOC,
    trails = odData.flights;
```

We load our data from file `trails.json` mainly because it is not proper to write so much raw data in logical part of code. The format of our data is like:

```js
{
    "Airport_LOC":Object{...},
    "flights":Array[length]
}
```

### Data Feeding and Trail Rendering

You can create an `OD Layer` instance by `var ods = new dmap.ODLayer()`.

Then feed data by function `data(data, callback)`.

```js
ods.data(trails, function(t){
    return {
        origin: t.origin, 
        destination: t.destination, 
        options: yourOptions
    }
})
```

Note that `callback` function is supposed to return an json object with specified fields `origin, destination, options`.

After feeding data to od layer, you can easily render trails by invoking `enter()`. Do **NOT** forget add od layer to your map.

### Scripts Including

In order to display your map in browser, you are supposed to have an `html` file. Before opening your browser, please check the checklist before:

* Have you include [leaflet](https://leafletjs.com/)?
* Have you include [dMap](https://github.com/sugarspectre/dMap)?
* Have you include your data? *(If you set your data in your code directly, please ignore this item.)*
* Have you include your `js` script?

If you have done the items above. Then you may get the trails below.

![ODDemo](https://raw.githubusercontent.com/sugarspectre/dMap/master/demo/OD/ODDemo.PNG)

May you succeed! :rocket:
