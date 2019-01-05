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
          let v = e.value.toFixed(3);
          let html = `<span class="popupText">value: ${v}</span>`;
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
        opacity: 0.5
      });
      interpolated.on('click', identify);
      interpolated.addTo(map);
      map.fitBounds(interpolated.getBounds());

      l = interpolated;
});
