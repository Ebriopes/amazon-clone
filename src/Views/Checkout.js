import React from 'react';
import Subtotal from '../components/Subtotal';
import './Checkout.css';
import CheckoutProduct from '../components/CheckoutProduct';
import { useStateValue } from '../contexts/StateProvidder';

const Checkout = () => {
	const [ { basket } ] = useStateValue();

	return (
		<div className="checkout">
			<div className="checkout_left">
				<div>
					<h2 className="checkout_title"> Your basket shop</h2>
					<br />
					{basket.map( ( item ) => (
						<CheckoutProduct
							key={Math.random( item.id )}
							id={item.id}
							image={item.image}
							price={item.price}
							rating={item.rating}
							title={item.title}
						/> ) )}
				</div>
			</div>
			<div className="checkour_right">
				<Subtotal />
			</div>
		</div>
	);
};

export default Checkout;