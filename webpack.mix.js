const mix = require('laravel-mix');

mix
	.js('src/js/app.js', 'dist/js')
	.postCss('src/css/main.css', 'dist/css', [
		require('tailwindcss'),
	])
	.browserSync({
		proxy: false,
		server: true,
		https: true,
		notify: false,
		open: false,
		files: [
			'*.html',
			'dist/**/*.css',
			'dist/**/*.js',
		],
	});
