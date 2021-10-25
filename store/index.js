/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
export const state = () => ({
	jwtToken: null,
});

export const mutations = {
	setToken(state, token) {
		state.jwtToken = token;
	},
};
