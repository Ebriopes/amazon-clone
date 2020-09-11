import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.css';
import logo from '../images/logo_white.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvidder';

const Header = () => {
	const [{ basket }] = useStateValue();
	return (
		<div className="header">
			<Link to="/">
				<img className="header_logo" src={logo} alt="logo"/>
			</Link>
			<div className="header_search">
				<input className="header_search_input" type="text" />
				<SearchIcon className="header_search_icon"/>
			</div>
			<div className="header_nav">
				<div className="header_option">
					<span className="header_line_one">
						Lenguage
					</span>
					<span className="header_line_two">
						Spanish
					</span>
				</div>
				<div className="header_option">
					<span className="header_line_one">
						Hi bruh
					</span>
					<span className="header_line_two">
						Count
					</span>
				</div>
				<div className="header_option">
					<span className="header_line_one">
						returns
					</span>
					<span className="header_line_two">
						& orders
					</span>
				</div>
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
	)
}

export default Header;