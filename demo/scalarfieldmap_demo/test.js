var map = L.map('mapid').setView([6.9270786, 79.861243], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var l = undefined;

d3.text('data/test.asc', function (asc) {
    let s = dmap.ScalarField.fromASCIIGrid(asc);
    let identify = function (e) {
        console.log(e.latlng);
        if (e.value !== null) {
          let epsilon = 0.000005/2;
          let v = e.value.toFixed(3);
          console.log(e)
          let lat = e.latlng.lat, lon = e.latlng.lng;
          let [ii, jj] = l._field._getDecimalIndexes(lon, lat);
          let [fi, ci, fj, cj] = l._field._getFourSurroundingIndexes(ii, jj);
          if (fi == ci) ci = fi + 1;
          if (fj == cj) cj = fj + 1;
          let xlllon = l._field.xllCorner + fi * l._field.cellXSize,
              ylllat = l._field.yurCorner - fj * l._field.cellYSize;
              
          console.log(lon - xlllon, xlllon + l._field.cellXSize - lon, ylllat-lat,  -ylllat + l._field.cellYSize + lat)
          
          let html = `<span class="popupText">value: ${v} <br> lat: ${lat}, lon: ${lon}<br> ylllat:${ylllat}  xlllon:${xlllon}<br>${fi}, ${ci}, ${fj},${cj}</span>`;
          let popup = L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
        }
      };

      // Bilinear interpolation
      let interpolated = dmap.scalarFieldMap(s, {
        border: true,
        // color: function(v) {
        //   if (v > 0.8) return 'yellow';
        //   return 'orange';
        // },
        opacity: 0.9
      });
      interpolated.on('click', identify);
      interpolated.addTo(map);
      map.fitBounds(interpolated.getBounds());

      l = interpolated;
});
