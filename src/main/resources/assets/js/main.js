import {Map} from './Map';
import {Form} from "./Form";
window.carte = new Vue({
    el: '#carte',
    data: {
        user: {},
        showConfig: true,
        gMapCheckbox: true,
        positionCheckbox: false,
        zone: {},
        map: {},
        claim: {
            id: 0
        },
        geoserver: {},
        form: new Form({
            model: {
                title: '',
                description: '',
                lon: 0,
                lat: 0,
                feature: ''
            }
        })
    },
    methods: {
        getAuth(){
            let _this = this;
            return new Promise(function (resolve, reject) {
                axios.get('/auth').then(response => {
                    _this.user = response.data;
                    let roles = [];
                    for (let role in _this.user.roles) {
                        roles.push(_this.user.roles[role].id)
                    }
                    _this.user.roles = roles;
                    resolve();
                });
            });
        },
        isAdmin(){
            for (let role in this.user.roles) {
                if (this.user.roles[role] == 1) {
                    return true
                }
                return false;
            }
        },
        isAgent(){
            for (let role in this.user.roles) {
                if (this.user.roles[role] == 2) {
                    return true
                }
                return false;
            }
        },
        getAllCouches(){
            let vm = this;
            axios.post('getAllCouches').then(function (response) {
                axios.get('admin/geoserver').then(config => {
                    vm.geoserver = config.data;
                    vm.map = new Map({
                        layers: response.data,
                        defaultLayer: 'batdf_Project2_Clip',
                        workspace: config.data.workspace,
                        srsName: config.data.srsName,
                        featureNS: config.data.featureNS,
                        url: config.data.url,
                        btnSelect: $('#btnSelect'),
                        btnDelete: $('#btnDelete'),
                        btnDraw: $('#btnArea'),
                        btnEdit: $('#btnEdit'),
                        btnPoint: $('#btnPoint'),
                        btnLine: $('#btnLine'),
                        btnMesure: $('#btnMesure'),
                        google: false,
                        layers_primary_key: config.data.layers_primary_key
                    });
                    let layersWFS_array = vm.map.addLayersToMap();
                    vm.map.detectActionButton();
                    //vm.map.renderSync();
                });
            });
        },
        saveClaim(){
            this.storeClaim().then(()=>{
                window.location.reload();
            });
        },
        storeClaim(){
            let vm = this;
            return new Promise(function (resolve, reject) {
                vm.form.post('/claims').then(response => {
                    vm.claim = response;
                    vm.zone.options.url = "/claims/" + vm.claim.id + "/upload";
                    vm.zone.processQueue();
                    resolve();
                });
            });
        },
        validateFeature(claim){
            let newClaim = {};
            axios.get('/api/claims/' + claim).then(response => {
                newClaim.id = response.data.id;
                newClaim.title = response.data.title;
                newClaim.description = response.data.description;
                newClaim.created_at = response.data.created_at;
                newClaim.user = response.data.user;
                newClaim.feature = response.data.feature;
                // this.form.model.adjustments = response.data.adjustments;
                newClaim.photos = response.data.photos;
                newClaim.updated_at = moment();
                axios.patch('/api/features/' + response.data.feature.id, {
                    status: 'validée',
                    claim: newClaim
                }).then(response => {
                    window.location.reload();
                    Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
                });

            });
        },
        cancelFeature(claim){
            let newClaim = {};
            axios.get('/api/claims/' + claim).then(response => {
                newClaim.id = response.data.id;
                newClaim.title = response.data.title;
                newClaim.description = response.data.description;
                newClaim.created_at = response.data.created_at;
                newClaim.user = response.data.user;
                newClaim.feature = response.data.feature;
                // this.form.model.adjustments = response.data.adjustments;
                newClaim.photos = response.data.photos;
                newClaim.updated_at = moment();
                axios.patch('/api/features/' + response.data.feature.id, {
                    status: 'annulée',
                    claim: newClaim
                }).then(response => {
                    window.location.reload();
                    Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
                });
            });
        }
    },
    mounted(){
        this.getAuth().then(() => {
            this.getAllCouches();
            console.log(this.isAdmin());
        });
        let vm = this;
        Dropzone.autoDiscover = false;
        this.zone = new Dropzone('#dzone', {
            url: "/claims/" + vm.claim.id + "/upload",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            dictDefaultMessage: 'Déposez vos photos ici',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    },
    watch: {
        gMapCheckbox: function (value) {
            this.getAllCouches();
        },
    },
});
ol.Feature.prototype.getLayer = function (map) {
    var this_ = this, layer_, layersToLookFor = [];
    var check = function (layer) {
        var source = layer.getSource();
        if (source instanceof ol.source.Vector) {
            var features = source.getFeatures();
            if (features.length > 0) {
                layersToLookFor.push({
                    layer: layer,
                    features: features
                });
            }
        }
    };
    //loop through map layers
    map.getLayers().forEach(function (layer) {
        if (layer instanceof ol.layer.Group) {
            layer.getLayers().forEach(check);
        } else {
            check(layer);
        }
    });
    layersToLookFor.forEach(function (obj) {
        var found = obj.features.some(function (feature) {
            return this_ === feature;
        });
        if (found) {
            //this is the layer we want
            layer_ = obj.layer;
        }
    });
    return layer_;
};
/**
 * OpenLayers 3 Popup Overlay.
 * See [the examples](./examples) for usage. Styling can be done via CSS.
 * @constructor
 * @extends {ol.Overlay}
 * @param {Object} opt_options Overlay options
 */
ol.Overlay.Popup = function (opt_options) {

    var options = opt_options || {};

    if (options.autoPan === undefined) {
        options.autoPan = true;
    }

    if (options.autoPanAnimation === undefined) {
        options.autoPanAnimation = {
            duration: 250
        };
    }

    this.container = document.createElement('div');
    this.container.className = 'ol-popup';

    this.closer = document.createElement('a');
    this.closer.className = 'ol-popup-closer';
    this.closer.href = '#';
    this.container.appendChild(this.closer);

    var that = this;
    this.closer.addEventListener('click', function (evt) {
        that.container.style.display = 'none';
        that.closer.blur();
        evt.preventDefault();
    }, false);

    this.content = document.createElement('div');
    this.content.className = 'ol-popup-content';
    this.container.appendChild(this.content);

    // Apply workaround to enable scrolling of content div on touch devices
    ol.Overlay.Popup.enableTouchScroll_(this.content);

    ol.Overlay.call(this, Object.assign(options, {
        element: this.container
    }));

};

ol.inherits(ol.Overlay.Popup, ol.Overlay);

/**
 * Show the popup.
 * @param {ol.Coordinate} coord Where to anchor the popup.
 * @param {String|HTMLElement} html String or element of HTML to display within the popup.
 */
ol.Overlay.Popup.prototype.show = function (coord, html) {
    if (html instanceof HTMLElement) {
        this.content.innerHTML = "";
        this.content.appendChild(html);
    } else {
        this.content.innerHTML = html;
    }
    this.container.style.display = 'block';
    this.content.scrollTop = 0;
    this.setPosition(coord);
    return this;
};

/**
 * @private
 * @desc Determine if the current browser supports touch events. Adapted from
 * https://gist.github.com/chrismbarr/4107472
 */
ol.Overlay.Popup.isTouchDevice_ = function () {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * @private
 * @desc Apply workaround to enable scrolling of overflowing content within an
 * element. Adapted from https://gist.github.com/chrismbarr/4107472
 */
ol.Overlay.Popup.enableTouchScroll_ = function (elm) {
    if (ol.Overlay.Popup.isTouchDevice_()) {
        var scrollStartPos = 0;
        elm.addEventListener("touchstart", function (event) {
            scrollStartPos = this.scrollTop + event.touches[0].pageY;
        }, false);
        elm.addEventListener("touchmove", function (event) {
            this.scrollTop = scrollStartPos - event.touches[0].pageY;
        }, false);
    }
};

/**
 * Hide the popup.
 */
ol.Overlay.Popup.prototype.hide = function () {
    this.container.style.display = 'none';
    return this;
};


/**
 * Indicates if the popup is in open state
 */
ol.Overlay.Popup.prototype.isOpened = function () {
    return this.container.style.display == 'block';
};

