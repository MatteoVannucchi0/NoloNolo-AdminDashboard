export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	target: 'server',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'dashboard',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/styles/login',
		'@/assets/styles/card',
		'@/assets/styles/sidebar',
		'@/assets/styles/layout',
		'@/assets/styles/navbar',
		'@/assets/styles/helper',
		'@/assets/styles/chart',
	],

	script: [
		{
			type: 'text/javascript',
			src: '@/assets/global.js',
		},
		{
			type: 'text/javascript',
			src: '@/assets/helper/graphHelper.js',
		},
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		// '@nuxtjs/eslint-module',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/bootstrap
		'bootstrap-vue/nuxt',
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
	],

	bootstrapVue: {
		icons: true,
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: process.env.BROWSER_BASE_URL,
		},
		apiBaseURL: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL_PROD : process.env.API_BASE_URL_TEST,
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		// Set the absolute path where the assets are.
		// https://nuxtjs.org/api/configuration-build#publicpath
		publicPath: 'https://site202120.tw.cs.unibo.it/dashboard/',
	},

	router: {
		// Set the "Base" of the router.
		// https://router.vuejs.org/en/api/options.html#base
		base: '/dashboard/',
		middleware: ['authentication'],
	},

	link: [
		// Do this if you have files that are located at /static/
		// https://nuxtjs.org/guide/assets#static
	],
};
