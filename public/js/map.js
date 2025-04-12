
mapboxgl.accessToken = mapToken;
console.log(mapToken);
const map = new mapboxgl.Map({
    container: 'map',
    // You can add layers to the predetermined slots within the Standard style basemap.
    style: 'mapbox://styles/mapbox/standard',
    center: [8.6821, 50.1109],
    zoom: 5,
    maxZoom: 6
});

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
