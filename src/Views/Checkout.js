import React from 'react';
import Subtotal from '../components/Subtotal';
import './Checkout.css'

const Checkout = () => {
	return (
		<div className="checkout">
			<div className="checkout_left">
				<div>
					<h2 className="checkout_title"> Your basket shop</h2>
				</div>
			</div>
			<div className="checkour_right">
				<Subtotal/>
			</div>
		</div>
	)
}

export default Checkout;