import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from 'firebase';
import { useStateValue } from 'contexts/StateProvidder';
import logo from 'images/logo_white.png';
import './Header.css';

const Header = () => {
	const [{ basket, user }] = useStateValue();

	const handleAuthentication = () => {
		if (user) {
			signOut(auth)
				.then(() => {
					// User left
				})
				.catch(err => {
					console.error(err);
				});
		}
	};

	return (
		<div className="header">
			<Link to="/">
				<img className="header_logo" src={logo} alt="logo" />
			</Link>

			<div className="header_search">
				<input className="header_search_input" type="text" />
				<SearchIcon className="header_search_icon" />
			</div>

			<div className="header_nav">
				<Link to={!user ? '/login' : ''}>
					<div onClick={handleAuthentication} className="header_option">
						<span className="header_line_one">
							Hello{user ? ' ' + user?.email : ', Sign in'}
						</span>
						<span className="header_line_two">
							{user ? 'Sign-out' : 'Sign-In'}
						</span>
					</div>
				</Link>

				<div className="header_option">
					<span className="header_line_one">Hi bruh</span>
					<span className="header_line_two">Count</span>
				</div>

				<Link to="/orders">
					<div className="header_option">
						<span className="header_line_one">returns</span>
						<span className="header_line_two">& orders</span>
					</div>
				</Link>

				<Link to="/checkout">
					<div className="header_option_basket">
						<ShoppingBasketIcon />
						<span className="header_line_two header_basket_count">
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
