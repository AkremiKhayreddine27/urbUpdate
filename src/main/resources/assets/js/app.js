/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Dropzone = require("dropzone");
window.moment = require('moment');
window.toastr = require('toastr');
window.spectrum = require('spectrum-colorpicker');
window.summernote = require('summernote');
window.lity = require('lity');
window.WOW = require('wowjs');
let wow = new WOW.WOW().init();
window.moment.locale('fr');
$(document).ready(function () {
    var url = window.location;
    $('ul.nav a[href="' + url + '"]').parent().addClass('active');
    $('ul.nav a').filter(function () {
        return this.href == url;
    }).parent().addClass('active');
    $('ul.user-settings a[href="' + url + '"]').parent().addClass('active');
});
window.Event = new Vue();
Vue.component('layer-color', {
    props: ['color', 'layer', 'showinput'],
    template: '<input type="text" />',
    mounted(){
        let vm = this;
        $(this.$el).css("background-color", this.color);
        $(this.$el).css("color", "#FFFFFF");
        $(this.$el).val(this.color);
        $(this.$el).spectrum({
            color: this.color,
            showInput: vm.showinput,
            showAlpha: true,
            showInitial: true,
            preferredFormat: 'rgb',
            chooseText: "Choisir",
            cancelText: "Annuler",
            change: function (color) {
                $(vm.$el).val(color);
                $(vm.$el).css("background-color", color);
            },
            move: function (color) {
                $(vm.$el).css("background-color", color);
                $(vm.$el).val(color);
            },
            hide: function (color) {
                $(vm.$el).val(color);
                $(vm.$el).css("background-color", color);
                if (vm.layer.id) {
                    axios.patch('/layers/' + vm.layer.id, {
                        id: vm.layer.id,
                        stroke: vm.layer.stroke,
                        active: vm.layer.active,
                        name: vm.layer.name,
                        color: $(vm.$el).val()
                    }).then(() => {

                    });
                } else {
                    layers.form.model.color = $(vm.$el).val();
                }
            }
        });
        if (vm.showinput) {
            $(this.$el).css("display", "inline");
        }
        $(this.$el).css("box-shadow", "none");
        $(this.$el).css("outline", "none");
        $(this.$el).css("border", "0");
        $(this.$el).css("padding", "5px");
        $(this.$el).css("margin-right", "10px");
    },
});
Vue.component('layer-stroke', {
    props: ['stroke', 'layer', 'showinput'],
    template: '<input type="text" />',
    mounted(){
        let vm = this;
        $(this.$el).css("background-color", this.stroke);
        $(this.$el).css("color", "#FFFFFF");
        $(this.$el).val(this.stroke);
        $(this.$el).spectrum({
            color: this.stroke,
            showInput: vm.showinput,
            showAlpha: true,
            showInitial: true,
            preferredFormat: 'rgb',
            chooseText: "Choisir",
            cancelText: "Annuler",
            change: function (color) {
                $(vm.$el).val(color);
                $(vm.$el).css("background-color", color);
            },
            move: function (color) {
                $(vm.$el).css("background-color", color);
                $(vm.$el).val(color);
            },
            hide: function (color) {
                $(vm.$el).val(color);
                $(vm.$el).css("background-color", color);
                if (vm.layer.id) {
                    axios.patch('/layers/' + vm.layer.id, {
                        id: vm.layer.id,
                        active: vm.layer.active,
                        name: vm.layer.name,
                        color: vm.layer.color,
                        stroke: $(vm.$el).val()
                    }).then(() => {

                    });
                } else {
                    layers.form.model.stroke = $(vm.$el).val();
                }
            }
        });
        if (vm.showinput) {
            $(this.$el).css("display", "inline");
        }
        $(this.$el).css("box-shadow", "none");
        $(this.$el).css("outline", "none");
        $(this.$el).css("border", "0");
        $(this.$el).css("padding", "5px");
        $(this.$el).css("margin-right", "10px");
    },
});
Vue.component('alert', {
    props: ['title', 'message', 'type'],
    template: '<div></div>',
    created(){
        toastr.options = {
            "timeOut": "5000",
            "extendedTimeOut": "5000",
            "showDuration": "300",
            "progressBar": true,
            "closeButton": true,
        }
    },
    mounted(){
        toastr[this.type](this.message);
    }
});
window.alerts = new Vue({
    el: '#alerts',
    data: {
        message: '',
        type: 'success',
        show: false
    },
    methods: {
        hide(){
            var vm = this;
            setTimeout(function () {
                vm.show = false;
            }, 5000);
        }
    },
    created(){
        Event.$on('alert', (message) => {
            this.show = true;
            this.message = message;
            var vm = this;
        })
    },
    watch: {
        show: function (value) {
            if (value) {
                this.hide();
            }
        },
    },
});
