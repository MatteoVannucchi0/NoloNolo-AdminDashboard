import axios from 'axios';
import config from './config';

async function request(params) {
	const headers = params.headers || { 'Content-Type': 'application/json' };
	headers.authorization = config.token;

	return axios({
		method: params.method || 'get',
		url: params.url,
		mode: params.mode || 'cors',
		headers,
		data: params.data,
		timeout: params.timeout,
	});
}

const api = {
	customer: {
		async get() {
			return request({
				url: config.customersApiUrl,
				method: 'get',
			});
		},
		async post(data) {
			// TODO se si aggiungono le immagini va messo multiplart form data
			return request({
				url: config.customersApiUrl,
				method: 'post',
				data,
			});
		},
		async login(credentials) {
			return request({
				url: `${config.serverApiUrl}/authentication/customers/login`,
				method: 'post',
				data: credentials,
				timeout: config.loginTimeout,
			});
		},
	},
	employees: {
		async get() {
			return request({
				url: config.employeesApiUrl,
				method: 'get',
			});
		},
		async post(data) {
			// TODO se si aggiungono le immagini va messo multiplart form data
			return request({
				url: config.employeesApiUrl,
				method: 'post',
				data,
			});
		},
		async login(credentials) {
			return request({
				url: `${config.serverApiUrl}/authentication/employees/login`,
				method: 'post',
				data: credentials,
				timeout: config.loginTimeout,
			});
		},
	},
	rentals: {
		async get() {
			return request({
				url: config.rentalsApiUrl,
				method: 'get',
			});
		},
		async post(data) {
			// TODO se si aggiungono le immagini va messo multiplart form data
			return request({
				url: config.rentalsApiUrl,
				method: 'post',
				data,
			});
		},
	},
	products: {
		async get() {
			return request({
				url: config.productsApiUrl,
				method: 'get',
			});
		},
		async post(data) {
			// TODO se si aggiungono le immagini va messo multiplart form data
			return request({
				url: config.productsApiUrl,
				method: 'post',
				data,
			});
		},
	},
};

export default api;
