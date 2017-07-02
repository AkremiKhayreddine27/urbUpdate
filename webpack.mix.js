const {mix} = require('laravel-mix');

mix.js('src/main/resources/assets/js/app.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/main.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/users.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/claims.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/layers.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/editClaim.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/editUser.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/showClaim.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/geoserver.js', 'src/main/resources/static/js')
    .js('src/main/resources/assets/js/urbUpdateMap.js', 'src/main/resources/static/js')
    .sass('src/main/resources/assets/sass/app.scss', 'src/main/resources/static/css');

mix.styles([
    'src/main/resources/static/css/app.css',
    'src/main/resources/static/css/font-awesome.css',
    'node_modules/dropzone/dist/dropzone.css',
    'node_modules/toastr/build/toastr.css',
    'node_modules/spectrum-colorpicker/spectrum.css',
    'node_modules/lity/dist/lity.css',
    'node_modules/wowjs/css/libs/animate.css'
], 'src/main/resources/static/css/all.css');