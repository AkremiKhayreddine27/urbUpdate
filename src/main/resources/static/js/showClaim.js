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
/******/ 	return __webpack_require__(__webpack_require__.s = 185);
/******/ })
/************************************************************************/
/******/ ({

/***/ 137:
/***/ (function(module, exports) {

var showClaim = new Vue({
    el: '#showClaim',
    data: {
        claim: {},
        circle: 'circle',
        user: {}
    },
    methods: {
        getAuth: function getAuth() {
            var _this = this;
            return new Promise(function (resolve, reject) {
                axios.get('/auth').then(function (response) {
                    _this.user = response.data;
                    var roles = [];
                    for (var role in _this.user.roles) {
                        roles.push(_this.user.roles[role].id);
                    }
                    _this.user.roles = roles;
                    resolve();
                });
            });
        },
        getClaim: function getClaim() {
            var _this2 = this;

            var url = window.location.pathname;
            axios.get('/api' + url).then(function (response) {
                _this2.claim = response.data;
                _this2.claim.updated_at = moment(_this2.claim.updated_at).from(moment());
                for (var adjustment in _this2.claim.adjustments) {

                    _this2.claim.adjustments[adjustment].updated_at = moment(_this2.claim.adjustments[adjustment].updated_at).from(moment());
                    _this2.claim.adjustments[adjustment].old_version = JSON.parse(_this2.claim.adjustments[adjustment].old_version);
                    _this2.claim.adjustments[adjustment].new_version = JSON.parse(_this2.claim.adjustments[adjustment].new_version);
                }
            });
        },
        findUser: function findUser(id) {
            var user = void 0;
            axios.get("/api/users/" + id).then(function (response) {
                user = response.data;
            });
            return user;
        },
        saveClaim: function saveClaim() {
            var _this3 = this;

            this.form.patch('/claims/' + this.claim.id).then(function (response) {
                _this3.claim = response;
                _this3.form.model.title = response.title;
                _this3.form.model.description = response.description;
            });
        },
        validateFeature: function validateFeature(claim) {
            var _this4 = this;

            var newClaim = {};
            newClaim.id = claim.id;
            newClaim.titre = claim.titre;
            newClaim.description = claim.description;
            newClaim.type = claim.type;
            newClaim.planification = claim.planification;
            newClaim.etat_avancement = claim.etat_avancement;
            newClaim.epannelage = claim.epannelage;
            newClaim.created_at = claim.created_at;
            newClaim.user = claim.user;
            newClaim.feature = claim.feature;
            // this.form.model.adjustments = response.data.adjustments;
            newClaim.photos = claim.photos;
            newClaim.updated_at = moment();
            axios.patch('/api/features/' + claim.feature.id, {
                status: 'validée',
                claim: newClaim
            }).then(function (response) {
                _this4.getClaim();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        },
        cancelFeature: function cancelFeature(claim) {
            var _this5 = this;

            var newClaim = {};
            newClaim.id = claim.id;
            newClaim.titre = claim.titre;
            newClaim.description = claim.description;
            newClaim.type = claim.type;
            newClaim.planification = claim.planification;
            newClaim.etat_avancement = claim.etat_avancement;
            newClaim.epannelage = claim.epannelage;
            newClaim.created_at = claim.created_at;
            newClaim.user = claim.user;
            newClaim.feature = claim.feature;
            // this.form.model.adjustments = response.data.adjustments;
            newClaim.photos = claim.photos;
            newClaim.updated_at = moment();
            axios.patch('/api/features/' + claim.feature.id, {
                status: 'annulée',
                claim: newClaim
            }).then(function (response) {
                _this5.getClaim();
                Event.$emit('alert', 'Votre modification a été enregistrer avec succé');
            });
        }
    },
    mounted: function mounted() {
        var _this6 = this;

        this.getAuth().then(function () {
            _this6.getClaim();
        });
    },

    computed: {
        isAdmin: function isAdmin() {
            var result = false;
            for (var role in this.user.roles) {
                if (this.user.roles[role] == 1) {
                    result = true;
                    break;
                }
            }
            return result;
        },
        isAgent: function isAgent() {
            var result = false;
            for (var role in this.user.roles) {
                if (this.user.roles[role] == 2) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    }
});

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(137);


/***/ })

/******/ });