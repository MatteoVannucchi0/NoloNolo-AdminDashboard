import config from '../assets/helper/config';

export default async function ({ redirect }) {
	// If the user is not authenticated
	if (!(await config.loggedIn())) {
		return redirect('/login');
	}

	return undefined;
}
