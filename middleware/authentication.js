import config from '../assets/helper/config';

export default async function ({ redirect, route }) {
	// Solo nel caso in cui non sia già nella pagina di login effettuo i controlli
	if (route.path === '/login' || route.path === '/login/') {
		return undefined;
	}

	// If the user is not authenticated
	if (!(await config.loggedIn())) {
		return redirect('/login');
	}

	return undefined;
}
