module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	purge: [
		'./*.html',
		'./src/**/*.vue',
	],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'xxl': '1680px',
		}
	},
	variants: {},
	plugins: [],
};
