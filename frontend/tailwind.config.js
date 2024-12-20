const colors = require('tailwindcss/colors')
module.exports = {
	darkMode: 'class',
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'primary': '#58a840',
				'primary-800': '#7dd962',
				'secondary': '#ff9247',
				'secondary-800': '#ffa466',
				'grey': '#9194A2',
				'white': '#f7f7f7',
				'onPrimary': '#f7f7f7',
				'black': '#333333',
			},
		},
		fontFamily: {
			Inter: ['Inter, sans-serif'],
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1124px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('tailwind-scrollbar-hide'),
	],
};
