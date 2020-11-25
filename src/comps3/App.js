import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decode } from 'jsonwebtoken';

import Navigation from './Navigation';
import Alerts from './Alerts';
import Routes from './Routes';
import { getUserData } from '../actions/actions';

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	/*Check if user is logged in, load token from localstorage
    and save in state if available */
	useEffect(() => {
		async function checkUser() {
			const token = localStorage.getItem('user-token') || null;
			if (token) {
				const { username, id } = decode(token);
				await dispatch(getUserData(token, username, id));
			}
			setInfoLoaded(true);
		}
		checkUser();
	}, [dispatch]);

	if (!infoLoaded) {
		return <h3>Loading...</h3>;
	}

	return (
		<div>
			<Navigation />
			<Alerts />
			<Routes user_id={user.id} />
		</div>
	);
}

export default App;
