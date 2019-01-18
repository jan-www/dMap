var map = L.map('mapid').setView([6.9270786, 79.861243], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var l = undefined;

d3.text('data/out.asc', function (asc) {
    let s = dmap.ScalarField.fromASCIIGrid(asc);
    let identify = function (e) {
        console.log(e.latlng);
        if (e.value !== null) {
          let v = e.value.toFixed(3);
          let html = `<span class="popupText">value: ${v}</span>`;

          let popup = L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
        }
      };

      // Bilinear interpolation
      let interpolated = dmap.scalarFieldMap(s, {
        opacity: 0.99,
        border: true,
        color: function(v) {
          if (v < 3.78571428) return '#FFFFB2';
          if (v < 7.57142857) return '#FED976';
          if (v < 11.3571428) return '#FEB24C';
          if (v < 15.1428571) return '#FD8D3C';
          if (v < 18.9285714) return '#FC4E2A';
          if (v < 22.7142857) return '#E31A1C';
          return '#B10026';
        },
        borderColor: 'black',
        borderWidth: 6,
        borderOpacity: 0.9
      });
      interpolated.on('click', identify);
      interpolated.addTo(map);
      map.fitBounds(interpolated.getBounds());

      l = interpolated;
});
