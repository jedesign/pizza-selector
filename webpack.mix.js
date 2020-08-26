const mix = require('laravel-mix');

mix
	.js('src/js/app.js', 'dist/js')
	.sass('src/scss/main.scss', 'dist/css');
