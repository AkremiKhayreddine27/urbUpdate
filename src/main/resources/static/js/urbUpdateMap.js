/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 186);
/******/ })
/************************************************************************/
/******/ ({

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilder__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrbUpdateMap", function() { return UrbUpdateMap; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var UrbUpdateMap = function () {
    function UrbUpdateMap() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$layers = _ref.layers,
            layers = _ref$layers === undefined ? [] : _ref$layers,
            _ref$defaultLayer = _ref.defaultLayer,
            defaultLayer = _ref$defaultLayer === undefined ? '' : _ref$defaultLayer,
            _ref$featureNS = _ref.featureNS,
            featureNS = _ref$featureNS === undefined ? 'urbupdate' : _ref$featureNS,
            _ref$srsName = _ref.srsName,
            srsName = _ref$srsName === undefined ? 'EPSG:32632' : _ref$srsName,
            _ref$workspace = _ref.workspace,
            workspace = _ref$workspace === undefined ? 'workspace' : _ref$workspace,
            _ref$format = _ref.format,
            format = _ref$format === undefined ? 'image/png' : _ref$format,
            _ref$url = _ref.url,
            url = _ref$url === undefined ? 'http://localhost:8080/geoserver' : _ref$url,
            _ref$btnSelect = _ref.btnSelect,
            btnSelect = _ref$btnSelect === undefined ? {} : _ref$btnSelect,
            _ref$btnDelete = _ref.btnDelete,
            btnDelete = _ref$btnDelete === undefined ? {} : _ref$btnDelete,
            _ref$btnDraw = _ref.btnDraw,
            btnDraw = _ref$btnDraw === undefined ? {} : _ref$btnDraw,
            _ref$google = _ref.google,
            google = _ref$google === undefined ? false : _ref$google,
            _ref$layers_primary_k = _ref.layers_primary_key,
            layers_primary_key = _ref$layers_primary_k === undefined ? 'ID' : _ref$layers_primary_k;

        _classCallCheck(this, UrbUpdateMap);

        this.layers = layers;
        this.layers_primary_key = layers_primary_key;
        this.defaultLayer = defaultLayer;
        this.featureNS = featureNS;
        this.srsName = srsName;
        this.workspace = workspace;
        this.format = format;
        this.url = url;
        this.bounds = [553582.863643649, 3984163.3300781306, 625006.0800781315, 4053139.11661919];
        this.formatGeoJSON_array = {};
        this.sourceWFS_array = {};
        this.styles_array = {};
        this.layersWFS_array = {};
        this.formatGML_array = {};
        this.formatWFS_array = {};
        this.map = {};
        this.olGM = {};
        this.btnSelect = btnSelect;
        this.btnDelete = btnDelete;
        this.btnDraw = btnDraw;
        this.interactionSelect = new ol.interaction.Select({
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255,0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#FF2828'
                })
            }),
            geometryName: 'the_geom'
        });
        this.interactionDelete = new ol.interaction.Select();
        this.projection = {};
        this.google = google;
        this.perimetreArray = [];
        this.perimetre = 0;
    }

    _createClass(UrbUpdateMap, [{
        key: 'createMap',
        value: function createMap() {
            var _this = this;
            var mousePositionControl = new ol.control.MousePosition({
                className: 'custom-mouse-position',
                target: document.getElementById('location'),
                coordinateFormat: ol.coordinate.createStringXY(5),
                undefinedHTML: '&nbsp;'
            });
            var projection = this.getProjection();
            var view = new ol.View({
                projection: projection,
                Zoom: 21
            });

            if (this.google) {
                jQuery('#map').html('<div id="olmap" class="fill"></div>');
                var center = [-7908084, 6177492];
                var googleLayer = new olgm.layer.Google();
                _this.map = new ol.Map({
                    interactions: olgm.interaction.defaults(),
                    target: 'olmap',
                    layers: [googleLayer],
                    view: new ol.View({
                        center: center,
                        zoom: 7
                    })
                });
                this.olGM = new olgm.OLGoogleMaps({
                    map: _this.map,
                    watchVector: false
                }); // map is the ol.Map instance
                this.olGM.activate();
            } else {
                jQuery('#map').html('<div id="olmap" class="fill"></div>');
                this.map = new ol.Map({
                    interactions: ol.interaction.defaults({
                        altShiftDragRotate: false,
                        dragPan: false,
                        rotate: false
                    }).extend([new ol.interaction.DragPan({ kinetic: null })]),
                    controls: ol.control.defaults({
                        zoom: true,
                        attribution: false
                    }).extend([mousePositionControl]),
                    target: 'olmap',
                    view: view
                });
            }
        }
    }, {
        key: 'getDraw',
        value: function getDraw() {
            var _this = this;
            return new ol.interaction.Draw({
                type: 'MultiPolygon',
                source: this.layersWFS_array[_this.defaultLayer].getSource(),
                geometryName: 'the_geom'
            });
        }
    }, {
        key: 'getProjection',
        value: function getProjection() {
            var _this = this;
            if (this.google) {
                proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");
                proj4.defs("EPSG:22332", "+proj=utm +zone=32 +a=6378249.2 +b=6356515 +towgs84=-263,6,431,0,0,0,0 +units=m +no_defs");
                return new ol.proj.Projection({
                    code: 'EPSG:3857',
                    units: 'm',
                    axisOrientation: 'neu'
                });
            } else {
                return new ol.proj.Projection({
                    code: _this.srsName,
                    units: 'm',
                    axisOrientation: 'neu'
                });
            }
        }
    }, {
        key: 'createFormatGML',
        value: function createFormatGML(layerName) {
            var _this = this;
            return new ol.format.GML({
                featureNS: _this.featureNS,
                featureType: layerName,
                srsName: _this.srsName
            });
        }
    }, {
        key: 'createFormatWFS',
        value: function createFormatWFS(layerName) {
            var _this = this;
            return new ol.format.WFS({
                featureNS: _this.featureNS,
                featureType: _this.workspace + ':' + layerName,
                srsName: _this.srsName
            });
        }
    }, {
        key: 'createImageWMS',
        value: function createImageWMS(layerName) {
            var _this = this;
            return new ol.layer.Image({
                source: new ol.source.ImageWMS({
                    ratio: 1,
                    url: _this.url + '/' + _this.workspace + '/wms',
                    params: {
                        'FORMAT': _this.format,
                        'VERSION': '1.1.1',
                        STYLES: '',
                        LAYERS: _this.workspace + ':' + layerName
                    }
                })
            });
        }
    }, {
        key: 'createStyle',
        value: function createStyle(color, stroke) {
            return new ol.style.Style({
                fill: new ol.style.Fill({ color: color }),
                stroke: new ol.style.Stroke({ color: stroke })
            });
        }
    }, {
        key: 'createFormatGeoJSON',
        value: function createFormatGeoJSON(layerName) {
            var _this = this;
            return new ol.format.GeoJSON({
                featureNS: _this.featureNS,
                featureType: _this.workspace + ':' + layerName,
                srsname: _this.srsName
            });
        }
    }, {
        key: 'createSourceWFS',
        value: function createSourceWFS(layerName) {
            var _this = this;
            var projection = _this.getProjection();
            var sourceWFS = void 0;
            var claims = [];
            sourceWFS = new ol.source.Vector({
                loader: function loader(extent, resolution, projection) {
                    jQuery.ajax(_this.url + '/' + _this.workspace + '/wfs', {
                        type: 'GET',
                        data: {
                            service: 'WFS',
                            version: '2.0.0',
                            outputFormat: 'application/json',
                            request: 'GetFeature',
                            typename: _this.workspace + ':' + layerName,
                            srsname: _this.srsName,
                            bbox: extent.join(',')
                        },
                        error: function error(xhr, ajaxOptions, thrownError) {
                            if (xhr.status == 404) {
                                Event.$emit('alert', thrownError);
                            }
                        },
                        success: function success(response) {
                            var features = [];
                            if (_this.google) {
                                features = _this.formatGeoJSON_array[layerName].readFeatures(response, {
                                    dataProjection: _this.srsName,
                                    featureProjection: 'EPSG:3857'
                                });
                            } else {
                                features = _this.formatGeoJSON_array[layerName].readFeatures(response);
                            }
                            axios.get('/features').then(function (data) {
                                claims = data.data;
                                features.forEach(function (feature) {
                                    claims.forEach(function (claim) {
                                        var emptyImgStyle = new ol.style.Style({ image: '' });
                                        if (feature.get(_this.layers_primary_key)) {
                                            if (feature.get(_this.layers_primary_key) === parseInt(claim.id) && claim.status === 'annulé') {
                                                feature.setStyle(emptyImgStyle);
                                            }
                                            if (feature.get(_this.layers_primary_key) === parseInt(claim.id) && claim.status === 'En instance') {
                                                if (carte.isAdmin()) {
                                                    var coordinate = ol.proj.transform([claim.lon, claim.lat], 'EPSG:4326', 'EPSG:3857');
                                                    var popup = new ol.Overlay.Popup({ insertFirst: false });
                                                    _this.map.addOverlay(popup);
                                                    popup.show(coordinate, '<div>' + '<p>' + claim.claim.user.name + '</p>' + '<a href="/claims/' + claim.claim.id + '">' + claim.claim.title + '</a><br/>' + '<a style="margin-top: 10px" class="btn btn-success btn-sm" onclick="carte.validateFeature(' + claim.id + ')"><i class="fa fa-check"></i> valider</a>' + '<a style="margin-top: 10px;margin-left: 10px" class="btn btn-danger btn-sm" onclick="carte.cancelFeature(' + claim.id + ')"><i class="fa fa-close"></i> annuler</a>' + '</div>');
                                                } else if (claim.claim.user.id === carte.user.id) {
                                                    var _coordinate = ol.proj.transform([claim.lon, claim.lat], 'EPSG:4326', 'EPSG:3857');
                                                    var popup = new ol.Overlay.Popup({ insertFirst: false });
                                                    _this.map.addOverlay(popup);
                                                    popup.show(_coordinate, '<div>' + '<p>Votre réclamation</p>' + '<a href="/claims/' + claim.claim.id + '">' + claim.claim.title + '</a><br/>' + '<a style="margin-top: 10px;margin-left: 10px" class="btn btn-danger btn-sm" onclick="carte.cancelFeature(' + claim.id + ')"><i class="fa fa-close"></i> annuler</a>' + '</div>');
                                                } else {
                                                    feature.setStyle(emptyImgStyle);
                                                }
                                            }
                                        }
                                    });
                                });
                                sourceWFS.addFeatures(features);
                            }).catch(function (error) {});
                            var f = [];
                            features.forEach(function (feature) {
                                feature.getGeometry().getCoordinates().forEach(function (coords) {
                                    f.push(JSON.stringify({ 'type': 'Polygon', 'coordinates': coords }));
                                });
                            });
                            features = f;
                            sourceWFS.addFeatures(features);
                        }
                    });
                },

                strategy: ol.loadingstrategy.bbox,

                projection: 'EPSG:3857'
            });
            return sourceWFS;
        }
    }, {
        key: 'createLayerWFS',
        value: function createLayerWFS(layerName) {
            var _this = this;
            return new ol.layer.Vector({
                name: layerName,
                source: _this.sourceWFS_array[layerName],
                style: _this.styles_array[layerName]
            });
        }
    }, {
        key: 'addFormatGML',
        value: function addFormatGML() {
            var _this = this;
            jQuery.each(_this.layers, function (key, value) {
                if (_this.layers[key]['status'] === 'active') {
                    _this.formatGML_array[_this.layers[key]['name']] = _this.createFormatGML(_this.layers[key]['name']);
                }
            });
        }
    }, {
        key: 'addFormatWFS',
        value: function addFormatWFS() {
            var _this = this;
            jQuery.each(_this.layers, function (key, value) {
                if (_this.layers[key]['status'] === 'active') {
                    _this.formatWFS_array[_this.layers[key]['name']] = _this.createFormatWFS(_this.layers[key]['name']);
                }
            });
        }
    }, {
        key: 'addImageWMS',
        value: function addImageWMS() {
            var imageWMS_array = {};
            var _this = this;
            jQuery.each(_this.layers, function (key, value) {
                if (_this.layers[key]['status'] === 'active') {
                    imageWMS_array[_this.layers[key]['name']] = _this.createImageWMS(_this.layers[key]['name']);
                }
            });
            return imageWMS_array;
        }
    }, {
        key: 'addLayersToMap',
        value: function addLayersToMap() {
            var _this = this;
            _this.createMap();
            jQuery("#legende").html('<h2>Legend</h2>');
            jQuery.each(_this.layers, function (key, value) {
                _this.styles_array[_this.layers[key]['name']] = _this.createStyle(_this.layers[key]['color'], _this.layers[key]['stroke']);
                _this.formatGeoJSON_array[_this.layers[key]['name']] = _this.createFormatGeoJSON(_this.layers[key]['name']);
                _this.sourceWFS_array[_this.layers[key]['name']] = _this.createSourceWFS(_this.layers[key]['name']);
                _this.layersWFS_array[_this.layers[key]['name']] = _this.createLayerWFS(_this.layers[key]['name']);
                _this.map.addLayer(_this.layersWFS_array[_this.layers[key]['name']]);
                if (_this.google) {
                    _this.map.getView().fit(ol.proj.transformExtent(_this.bounds, _this.srsName, 'EPSG:3857'), _this.map.getSize());
                    _this.map.getView().setZoom(7);
                } else {
                    _this.map.getView().fit(_this.bounds, _this.map.getSize());
                }
                var storage = jQuery.localStorage;
                storage.set(key, 'checked');
                jQuery("#legende").append("" + "<div style='flex-basis: 50%;display: flex;'>" + "<div style='background-color: " + _this.layers[key]['color'] + "' class='slideThree'>" + "<input id='" + _this.layers[key]['name'] + "' type='checkbox' />" + "<label for='" + _this.layers[key]['name'] + "'></label>" + "</div>" + "<p style='margin-left: 5px'>" + _this.layers[key]['name'] + "</p>" + "</div>");
            });
            console.log(this.map.getLayers().getArray());
            return _this.layersWFS_array;
        }
    }, {
        key: 'detectActionButton',
        value: function detectActionButton() {
            var _this = this;
            _this.btnSelect.click(function () {
                _this.selectAction();
            });
            _this.btnDelete.click(function () {
                _this.deleteAction();
            });
            _this.btnDraw.click(function () {
                _this.drawAction();
            });
        }
    }, {
        key: 'getActiveLayers',
        value: function getActiveLayers(layers) {
            var active_layers_array = {};
            jQuery.each(layers, function (key, value) {
                if (layers[key]['status'] === 'active') {
                    active_layers_array[key] = layers[key]['name'];
                }
            });
            return active_layers_array;
        }
    }, {
        key: 'selectAction',
        value: function selectAction() {
            var _this = this;
            _this.btnSelect.parent().find('.btn').each(function (index, element) {
                jQuery(this).removeClass('active');
            });
            _this.btnSelect.addClass('active');
            _this.map.removeInteraction(_this.getDraw());
            _this.interactionSelect.on('select', function (evt) {
                var view = _this.map.getView();
                var imageWMS_array = _this.addImageWMS();
                var viewResolution = view.getResolution();
                var mail = '';
                var info = '';
                jQuery.each(imageWMS_array, function (key, value) {
                    var source = imageWMS_array[key].getSource();
                    var url = source.getGetFeatureInfoUrl(evt.mapBrowserEvent.coordinate, viewResolution, view.getProjection(), { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
                    var aa = evt.selected[0].getGeometry().getExtent();
                    var oo = ol.extent.getCenter(aa);
                    proj4.defs("EPSG:22332", "+proj=utm +zone=32 +a=6378249.2 +b=6356515 +towgs84=-263,6,431,0,0,0,0 +units=m +no_defs");
                    var coord = ol.proj.transform(oo, 'EPSG:3857', 'EPSG:4326');
                    var lon = coord[0];
                    var lat = coord[1];

                    if (url) {
                        jQuery.ajax({
                            url: url,
                            dataType: 'json'
                        }).then(function (response) {
                            var feature = response.features[0];
                            if (feature !== undefined) {
                                var props = feature.properties;
                                info += '<h2 style="font-size:14px;color:#FFFFFF;display:inline;margin-bottom:15px;font-weight:bold;border-bottom:1px solid #FFFFFF">' + key + '</h2><div style="color:#ffffff;border: none;line-height:30px;padding:10px;font-size:13px">';
                                jQuery.each(props, function (key, value) {
                                    info += '<div class="col-md-4">' + key + ':</div><div class="col-md-8">' + value + '</div>';
                                });
                                axios.get('/features/' + evt.selected[0].get(_this.layers_primary_key)).then(function (response) {
                                    info += '<div class="col-md-12 alert alert-danger">' + '<ul style="list-style: none;margin: 0;padding: 0">' + '<li>' + response.data.claim.title + '</li>' + '<li>' + response.data.claim.description + '</li>' + '</ul></div>';
                                    info += '</div>';
                                    jQuery("#infosPopup").show();
                                    jQuery("#infosPopup-bottom").show();
                                    document.getElementById('infosPopupCont').innerHTML = info;
                                }).catch(function (error) {
                                    info += '</div>';
                                    jQuery("#infosPopup").show();
                                    jQuery("#infosPopup-bottom").show();
                                    //document.getElementById('nodelist').innerHTML = table;
                                    document.getElementById('mailContent').innerHTML = mail;
                                    document.getElementById('infosPopupCont').innerHTML = info;
                                });
                            }
                        });
                    }
                });
            });
            _this.map.addInteraction(_this.interactionSelect);
        }
    }, {
        key: 'deleteAction',
        value: function deleteAction() {
            var _this = this;
            _this.addFormatWFS();
            _this.addFormatGML();
            _this.btnDelete.parent().find('.btn').each(function (index, element) {
                jQuery(this).removeClass('active');
            });
            _this.btnDelete.addClass('active');
            _this.map.removeInteraction(_this.interactionSelect);
            _this.map.removeInteraction(_this.getDraw());
            _this.map.addInteraction(this.interactionDelete);
            _this.interactionDelete.getFeatures().on('add', function (e) {
                var layerSelected = e.target.item(0).getLayer(_this.map);
                var s = new XMLSerializer();
                jQuery.ajax(_this.url + '/' + _this.workspace + '/wfs', {
                    type: 'POST',
                    dataType: 'xml',
                    contentType: 'text/xml',
                    data: s.serializeToString(_this.formatWFS_array[layerSelected.get('name')].writeTransaction(null, null, [e.target.item(0)], _this.formatGML_array[layerSelected.get('name')])),
                    success: function success(data) {
                        Event.$emit('alert', 'Votre modification a été enregistré avec succé');
                        _this.layersWFS_array[layerSelected.get('name')].getSource().clear();
                        _this.interactionDelete.getFeatures().clear();
                        _this.map.removeInteraction(_this.interactionDelete);
                    }
                }).done();
            });
        }
    }, {
        key: 'drawAction',
        value: function drawAction() {
            var _this = this;
            this.btnDraw.parent().find('.btn').each(function (index, element) {
                jQuery(this).removeClass('active');
            });
            this.btnDraw.addClass('active');
            this.map.removeInteraction(this.interactionSelect);
            this.map.removeInteraction(this.interactionDelete);
            var interactionDraw = this.getDraw();
            interactionDraw.on('drawstart', function (e) {
                _this.perimetreArray = [];
                _this.map.on('singleclick', function (evt) {
                    var sourceProj = _this.map.getView().getProjection();
                    _this.perimetreArray.push(ol.proj.transform(evt.coordinate, sourceProj, 'EPSG:4326'));
                });
            });
            interactionDraw.on('drawend', function (e) {
                proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");
                proj4.defs("EPSG:22332", "+proj=utm +zone=32 +a=6378249.2 +b=6356515 +towgs84=-263,6,431,0,0,0,0 +units=m +no_defs");
                var aa = e.feature.getGeometry().getExtent();
                var oo = ol.extent.getCenter(aa);
                var newFeature = _this.transform_geometry(e.feature);
                var coord = ol.proj.transform(oo, 'EPSG:3857', 'EPSG:4326');
                var lon = coord[0];
                var lat = coord[1];
                var props;
                jQuery("#sendMailNewData").click();
                _this.addFormatWFS();
                _this.addFormatGML();
                var form = new __WEBPACK_IMPORTED_MODULE_0__FormBuilder__["a" /* FormBuilder */]();
                form.init('POST', _this.getActiveLayers(_this.layers));
                jQuery('#select_layer').change(function () {
                    var array = _this.layersWFS_array[jQuery('#select_layer').val()].getSource().getFeatures().sort(function (a, b) {
                        return a.get(_this.layers_primary_key) - b.get(_this.layers_primary_key);
                    });
                    var fid = _this.layersWFS_array[jQuery('#select_layer').val()].getSource().getFeatures().length;
                    console.log(array[0].get(_this.layers_primary_key));
                    console.log(array[fid - 2].get(_this.layers_primary_key));
                    console.log(array[fid - 1].get(_this.layers_primary_key));
                    newFeature.setId(array[fid - 1].get(_this.layers_primary_key) + 1);
                    props = form.create(jQuery('#select_layer').val(), _this.layersWFS_array, _this.formatPerimetre(e.feature.getGeometry()), _this.formatArea(e.feature.getGeometry()), _this.layers_primary_key, newFeature.getId());
                });
                jQuery("#saveFeature").click(function () {
                    form.submit(jQuery('#select_layer').val(), props, newFeature, _this.formatWFS_array, _this.formatGML_array, _this.formatPerimetre(e.feature.getGeometry()), _this.formatArea(e.feature.getGeometry())).then(function (response) {
                        carte.form.model.lon = lon;
                        carte.form.model.lat = lat;
                        carte.form.model.feature = response;
                        $('#addClaim').click();
                    });
                });
            });
            this.map.addInteraction(interactionDraw);
        }
    }, {
        key: 'transform_geometry',
        value: function transform_geometry(element) {
            // var sourceProj = this.map.getView().getProjection();
            // console.log(sourceProj);
            proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");
            // console.log(element.getGeometry().getCoordinates());
            // let newFeature = element.clone();
            // newFeature.getGeometry().transform(sourceProj,"EPSG:32632");
            var newFeature = element.clone();
            var polyCoords = [];
            var coords = element.getGeometry().getCoordinates();
            console.log(coords);
            for (var i in coords[0][0]) {
                var c = coords[0][0][i];
                polyCoords.push(ol.proj.transform([parseFloat(c[0]), parseFloat(c[1])], 'EPSG:3857', 'EPSG:32632'));
            }
            newFeature.getGeometry().setCoordinates([[polyCoords]]);
            console.log(newFeature.getGeometry().getCoordinates());
            return newFeature;
        }
    }, {
        key: 'formatArea',
        value: function formatArea(polygon) {
            var area;
            //does'it work because our geom is Multipolygon and we need Polygon
            //  var wgs84Sphere = new ol.Sphere(6378137);
            //  var sourceProj = this.map.getView().getProjection();
            //  var geom = (polygon.clone().transform(sourceProj, 'EPSG:4326'));
            //  var polygon = new ol.geom.Polygon(geom.getCoordinates());
            //  var coordinates = geom.getLinearRing(0).getCoordinates();
            // area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
            area = polygon.getArea();
            var output;
            output = Math.round(area * 100) / 100;
            return output;
        }
    }, {
        key: 'formatPerimetre',
        value: function formatPerimetre(polygon) {
            var sourceProj = this.map.getView().getProjection();
            this.perimetre = 0;
            var wgs84Sphere = new ol.Sphere(6378137);
            var lastPoint = ol.proj.transform(polygon.clone().getLastCoordinate(), sourceProj, 'EPSG:4326');
            this.perimetreArray.push(lastPoint);
            for (var i = 0, ii = this.perimetreArray.length - 1; i < ii; ++i) {
                this.perimetre += wgs84Sphere.haversineDistance(this.perimetreArray[i], this.perimetreArray[i + 1]);
            }
            this.perimetre = Math.round(this.perimetre * 100) / 100;
            return this.perimetre;
        }
    }]);

    return UrbUpdateMap;
}();

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(138);


/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormBuilder; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormBuilder = function () {
    function FormBuilder() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$content = _ref.content,
            content = _ref$content === undefined ? jQuery("#formBuilder") : _ref$content;

        _classCallCheck(this, FormBuilder);

        this.content = content;
    }

    _createClass(FormBuilder, [{
        key: 'init',
        value: function init(method, layers, feature) {
            this.content.html('');
            this.content.append('<form class="form-group" method = ' + method + '>');
            var select = '<div  class="form-group" style="margin-bottom: 20px;">' + '<label style="width: 45%;position:relative;float:left">Choisir couche</label>' + '<select id="select_layer" class="form-control" style="background-color: #ffffff;' + 'border: 1px solid #e4e7ea;' + 'border-radius: 0;' + 'box-shadow: none;' + 'color: #565656;' + 'height: 38px;' + 'max-width: 100%;' + 'padding: 7px 12px;' + 'transition: all 300ms linear 0s;width: 50%">' + '<option value="">Choisir couche</option>';
            jQuery.each(layers, function (key, value) {
                console.log(layers[key]['geometryType']);
                console.log(feature.getGeometry().getType());
                if (feature.getGeometry().getType() === layers[key]['geometryType']) select += '<option value="' + layers[key]['name'] + '">' + layers[key]['name'] + '</option>';
            });
            select += '</select></div>';
            this.content.append(select);
        }
    }, {
        key: 'create',
        value: function create(selected_layer, layersWFS_array, PERIMETER, AREA, layers_primary_key, id) {
            var elements = layersWFS_array[selected_layer].getSource().getFeatures();
            var props = elements[0].getProperties();
            jQuery('#content').remove();
            var content = '<div id="content"><form class="form-horizontal"> ';
            jQuery.each(props, function (key, value) {
                if (key !== 'geometry') {
                    if (key === 'PERIMETER') {
                        content += '<div  class="form-group" >' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input value="' + PERIMETER + '" id="' + key + '" class="form-control" ></div></div>';
                    } else if (key === 'AREA') {
                        content += '<div  class="form-group">' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input value="' + AREA + '" id="' + key + '"  class="form-control" ></div></div>';
                    } else if (key == layers_primary_key) {
                        content += '<div  class="form-group">' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input value="' + id + '" id="' + key + '"  class="form-control" ></div></div>';
                    } else {
                        content += '<div  class="form-group">' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input id="' + key + '" class="form-control" ></div></div>';
                    }
                }
            });
            content += '</form></div>';
            this.content.append(content);
            this.closeForm();
            return props;
        }
    }, {
        key: 'createLine',
        value: function createLine(selected_layer, layersWFS_array, PERIMETER) {
            var elements = layersWFS_array[selected_layer].getSource().getFeatures();
            var props = elements[0].getProperties();
            jQuery('#content').remove();
            var content = '<div id="content"><form class="form-horizontal"> ';
            jQuery.each(props, function (key, value) {
                if (key !== 'geometry') {
                    if (key === 'LONGUEUR') {
                        content += '<div  class="form-group" >' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input value="' + PERIMETER + '" id="' + key + '" class="form-control" ></div></div>';
                    } else {
                        content += '<div  class="form-group">' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input id="' + key + '" class="form-control" ></div></div>';
                    }
                }
            });
            content += '</form></div>';
            this.content.append(content);
            this.closeForm();
            return props;
        }
    }, {
        key: 'createPoint',
        value: function createPoint(selected_layer, layersWFS_array) {
            var elements = layersWFS_array[selected_layer].getSource().getFeatures();
            var props = elements[0].getProperties();
            jQuery('#content').remove();
            var content = '<div id="content"><form class="form-horizontal"> ';
            jQuery.each(props, function (key, value) {
                if (key !== 'geometry') {
                    content += '<div  class="form-group">' + '<label class="col-md-4">' + key + '</label>' + '<div class="col-md-8" ><input id="' + key + '" class="form-control" ></div></div>';
                }
            });
            content += '</form></div>';
            this.content.append(content);
            this.closeForm();
            return props;
        }
    }, {
        key: 'closeForm',
        value: function closeForm() {
            this.content.append('</form');
        }
    }, {
        key: 'submit',
        value: function submit(selected_layer, props, newFeature, formatWFS_array, formatGML_array, PERIMETER, AREA) {
            return new Promise(function (resolve, reject) {
                var featureProp = {};
                var s = new XMLSerializer();
                jQuery.each(props, function (key, value) {
                    if (key !== 'geometry') {
                        featureProp[key] = jQuery('#' + key).val();
                    }
                });
                newFeature.setProperties(featureProp);
                console.log(newFeature.getProperties());
                jQuery.ajax(window.carte.geoserver.url + '/' + window.carte.geoserver.workspace + '/wfs', {
                    type: 'POST',
                    dataType: 'xml',
                    contentType: 'text/xml',
                    data: s.serializeToString(formatWFS_array[selected_layer].writeTransaction([newFeature], null, null, formatGML_array[selected_layer])),
                    success: function success(data) {
                        $('#closeModal').click();
                        resolve(newFeature.get('ID'));
                    }
                }).done();
            });
        }
    }]);

    return FormBuilder;
}();

/***/ })

/******/ });