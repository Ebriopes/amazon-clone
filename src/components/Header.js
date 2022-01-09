import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '@firebase/auth';
import { auth } from 'firebase';
import { useStateValue } from 'contexts/StateProvidder';
import { getBasketTotal } from 'contexts/Reducer';
import logo from 'images/logo_white.png';
import './Header.css';

const Header = () => {
	const [{ basket, user }] = useStateValue();
	const { quantity: items } = getBasketTotal(basket);

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
		<nav className='header'>
			<Link to='/'>
				<img className='header-logo' src={logo} alt='logo' />
			</Link>

			<div className='header-search'>
				<div className='header-search-bar'>
					<input className='header-search-input' type='text' />
					<FontAwesomeIcon icon={faSearch} className='header-search-icon' />
				</div>
			</div>

			<div className='header-nav'>
				<Link to={!user ? '/login' : ''}>
					<div onClick={handleAuthentication} className='header-option'>
						<span className='header-line-one'>
							Hello{user ? ' ' + user?.email : ', Sign in'}
						</span>
						<span className='header-line-two'>
							{user ? 'Sign-out' : 'Sign-In'}
						</span>
					</div>
				</Link>

				<Link to='/orders'>
					<div className='header-option'>
						<span className='header-line-one'>returns</span>
						<span className='header-line-two'>& orders</span>
					</div>
				</Link>

				<Link to='/checkout'>
					<div className='header-option-basket'>
						<FontAwesomeIcon
							icon={faShoppingBag}
							size='lg'
							fixedWidth
							arial-label='basket'
						/>
						<span className='header-line-two header-basket-count'>{items}</span>
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default Header;
