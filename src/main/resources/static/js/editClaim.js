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
/******/ 	return __webpack_require__(__webpack_require__.s = 180);
/******/ })
/************************************************************************/
/******/ ({

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(3);

var editClaim = new Vue({
    el: '#editClaim',
    data: {
        claim: {
            id: 0
        },
        form: new __WEBPACK_IMPORTED_MODULE_0__Form__["a" /* Form */]({
            model: {
                id: 0,
                titre: '',
                description: '',
                type: '',
                planification: '',
                etat_avancement: '',
                epannelage: '',
                created_at: '',
                updated_at: '',
                user: {},
                feature: {},
                //  adjustments: [],
                photos: []
            }
        }),
        zone: {}
    },
    methods: {
        getClaim: function getClaim() {
            var _this = this;

            var url = window.location.pathname;
            axios.get('/api' + url).then(function (response) {
                _this.claim = response.data;
                _this.form.model.id = response.data.id;
                _this.form.model.titre = response.data.titre;
                _this.form.model.description = response.data.description;
                _this.form.model.type = response.data.type;
                _this.form.model.planification = response.data.planification;
                _this.form.model.etat_avancement = response.data.etat_avancement;
                _this.form.model.epannelage = response.data.epannelage;
                _this.form.model.created_at = response.data.created_at;
                _this.form.model.updated_at = response.data.updated_at;
                _this.form.model.user = response.data.user;
                _this.form.model.feature = response.data.feature;
                // this.form.model.adjustments = response.data.adjustments;
                _this.form.model.photos = response.data.photos;
            });
        },
        saveClaim: function saveClaim() {
            var _this2 = this;

            var vm = this;
            this.form.patch('/claims/' + this.claim.id).then(function (response) {
                _this2.claim = response;
                _this2.form.model.titre = response.titre;
                _this2.form.model.type = response.type;
                _this2.form.model.planification = response.planification;
                _this2.form.model.etat_avancement = response.etat_avancement;
                _this2.form.model.epannelage = response.epannelage;
                _this2.form.model.description = response.description;
                if (_this2.zone.files.length > 0) {
                    _this2.zone.options.url = "/claims/" + vm.claim.id + "/upload";
                    _this2.zone.processQueue();
                } else {
                    vm.getClaim();
                    Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
                }
            });
        },
        deletePhoto: function deletePhoto(photoId) {
            var vm = this;
            axios.delete('/claims/' + this.claim.id + '/photos/' + photoId).then(function () {
                vm.getClaim();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        }
    },
    mounted: function mounted() {
        this.getClaim();
        var vm = this;
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
            },
            init: function init() {
                // Set up any event handlers
                this.on('completemultiple', function () {
                    vm.getClaim();
                    Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
                });
            }
        });
    }
});

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(132);


/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Errors; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Errors = function () {
    function Errors() {
        _classCallCheck(this, Errors);

        this.errors = {};
    }

    _createClass(Errors, [{
        key: "record",
        value: function record(errors) {
            this.errors = errors;
        }
    }, {
        key: "has",
        value: function has(field) {
            return this.errors.hasOwnProperty(field);
        }
    }, {
        key: "any",
        value: function any() {
            return Object.keys(this.errors).length > 0;
        }
    }, {
        key: "get",
        value: function get(field) {
            if (this.errors[field]) {
                return this.errors[field][0];
            }
        }
    }, {
        key: "clear",
        value: function clear(field) {
            if (field) {
                delete this.errors[field];
            } else {
                this.errors = {};
            }
        }
    }]);

    return Errors;
}();

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Errors__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Form; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var Form = function () {
    function Form(data) {
        _classCallCheck(this, Form);

        this.model = {};
        this.originalData = data;
        for (var field in data.model) {
            this.model[field] = data.model[field];
        }
        this.errors = new __WEBPACK_IMPORTED_MODULE_0__Errors__["a" /* Errors */]();
    }

    _createClass(Form, [{
        key: 'reset',
        value: function reset() {
            for (var field in this.originalData.model) {
                this.model[field] = '';
            }
            this.errors.clear();
        }
    }, {
        key: 'data',
        value: function data() {
            var data = {};
            for (var property in this.model) {
                data[property] = this.model[property];
            }
            return data;
        }
    }, {
        key: 'submit',
        value: function submit(requestType, url) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                axios[requestType](url, _this.data()).then(function (response) {
                    _this.onSuccess(response.data);
                    resolve(response.data);
                }).catch(function (error) {
                    _this.onFail(error.response.data);
                    reject(error.response.data);
                });
            });
        }
    }, {
        key: 'onSuccess',
        value: function onSuccess(response) {
            this.reset();
        }
    }, {
        key: 'post',
        value: function post(url) {
            return this.submit('post', url);
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            return this.submit('delete', url);
        }
    }, {
        key: 'patch',
        value: function patch(url) {
            return this.submit('patch', url);
        }
    }, {
        key: 'onFail',
        value: function onFail(errors) {
            this.errors.record(errors);
        }
    }]);

    return Form;
}();

/***/ })

/******/ });