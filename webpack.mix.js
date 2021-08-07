const mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist/js').vue();

mix.postCss('src/css/app.css', 'dist/css', [
	require('postcss-import'),
	require('tailwindcss'),
	require('postcss-nested'),
	require('postcss-preset-env')({stage: 0}),
]);

mix.browserSync({
	proxy: false,
	server: true,
	https: true,
	notify: false,
	open: false,
	files: [
		'index.html',
		'dist/**/*.css',
		'dist/**/*.js',
	],
});

mix.disableSuccessNotifications();
