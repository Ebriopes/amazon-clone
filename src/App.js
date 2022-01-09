import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useStateValue } from './contexts/StateProvidder';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './components/Header';
import Home from './views/Home';
import Login from './views/Login';
import Checkout from './views/Checkout';
import Payment from './views/Payment';
import Orders from 'views/Orders';
import './App.css';
import Product from 'views/Product';

const promise = loadStripe(
	'pk_test_51KBR2KLvjBdLcdzrCmKGsttQM2ZBte2YUXWtGJ5HvF0UBjsFV4hLK1ozJgnX1Lb44rKuulRiLUT9E5ZepQ5E7X8x001bqW8awK'
);

function App() {
	const [{ basket }, dispatch] = useStateValue();

	useEffect(() => {
		localStorage.setItem('basket', JSON.stringify(basket || []));
	}, [basket]);

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch({
					type: 'SET_USER',
					user
				});
			} else {
				dispatch({
					type: 'SET_USER',
					user: null
				});
			}
		});
	}, [dispatch]);

	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Header />
					<Home />
				</Route>
				<Route exact path='/checkout'>
					<Header />
					<Checkout />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Route exact path='/payment'>
					<Header />
					<Elements stripe={promise}>
						<Payment />
					</Elements>
				</Route>
				<Route exact path='/orders'>
					<Header />
					<Orders />
				</Route>
				<Route exact path='/product/:id'>
					<Header />
					<Product />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
