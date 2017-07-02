var format = 'image/png';
var bounds = [346.43086859108007, -15171.47000474253,
    11440.885596590253, 519.8528592562999];

var projection = new ol.proj.Projection({
    code: 'EPSG:404000',
    units: 'degrees',
    axisOrientation: 'neu',
    global: false
});
var nv = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8080/geoserver/sabrine/wms',
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            STYLES: '',
            LAYERS: 'sabrine:geotiff_coverage_nv',
        }
    })
});
var anc = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8080/geoserver/sabrine/wms',
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            STYLES: '',
            LAYERS: 'sabrine:geotiff_coverage_anc',
        }
    })
});
var london = ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857');
var view1 = new ol.View({
    projection: projection
});
var view2 = new ol.View({
    projection: projection
});
// create two maps
var map1 = new ol.Map({
    target: 'map1',
    layers: [nv],
    view: view1
});
var map2 = new ol.Map({
    target: 'map2',
    layers: [anc],
    view: view2
});
map1.getView().fit(bounds, map1.getSize());
map2.getView().fit(bounds, map2.getSize());
view1.on('change:center', function (evt) {
    view2.setCenter(view1.getCenter());
});
view2.on('change:center', function (evt) {
    view1.setCenter(view2.getCenter());
});
map1.getView().on('change:resolution', function(evt) {
    map2.getView().setZoom(map1.getView().getZoom());
});
map2.getView().on('change:resolution', function(evt) {
    map1.getView().setZoom(map2.getView().getZoom());
});
