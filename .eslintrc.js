module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
		ecmaVersion: 12,
		sourceType: 'module',
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended',
		'airbnb-base',
	],
	plugins: [
		'vue',
	],
	// add your custom rules here
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: false,
				optionalDependencies: false,
				peerDependencies: false,
			},
		],
		'linebreak-style': 0,
		indent: [
			'error',
			'tab',
		],
		'no-tabs': 0,
		'vue/html-indent': ['error', 'tab'],
		'max-len': 'off',
	},
	settings: {
		'import/core-modules': ['vue', 'vuex'], // these modules are included in nuxt.js
	},
};
