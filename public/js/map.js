
mapboxgl.accessToken = mapToken;

let coordinate = center_.toString().split(",");
const map = new mapboxgl.Map({
    container: 'map',
    // You can add layers to the predetermined slots within the Standard style basemap.
    style: 'mapbox://styles/mapbox/standard',
    center: [coordinate[0], coordinate[1]],
    zoom: 5,
    maxZoom: 9
});

const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat([coordinate[0], coordinate[1]])
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${location_}</h4> <p>Exact location after booking.</p>`)
        .setMaxWidth("300px")
    )
       
    .addTo(map);


map.on('style.load', () => {
    map.addSource('urban-areas', {
        'type': 'geojson',
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
    });

    map.addLayer({
        'id': 'urban-areas-fill',
        'type': 'fill',
        // This property allows you to identify which `slot` in
        // the Mapbox Standard your new layer should be placed in (`bottom`, `middle`, `top`).
        'slot': 'middle',
        'source': 'urban-areas',
        'layout': {},
        'paint': {
            'fill-color': '#f08',
            'fill-opacity': 0.4
        }
    });
});
