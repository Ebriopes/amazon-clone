import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from '../contexts/StateProvidder';
import CurrencyFormat from 'react-currency-format';

function CheckoutProduct ( { id, image, price, rating, title } ) {
	const [, dispatch ] = useStateValue();

	const removeFromBasket = () => {
		dispatch( {
			type: "REMOVE_FROM_BASKET",
			id: id,
		} );
	};
	return (
		<div className="checkout_product">
			<img className="checkout_product_image" src={image} alt="Product" />
			<div className="checkout_product_info">
				<p className="checkout_Product_title">{title}</p>
				<CurrencyFormat renderText={value => (
					<p><strong>
						{value}
					</strong></p>
				)}
					decimalScale={2}
					fixedDecimalScale={true}
					value={price}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
				<div className="checkout_product_rating">
					{Array( rating ).fill().map( ( _, i ) =>
						<span role="img" aria-label="star" key={Math.random( i )}>🌟</span>
					)}
				</div>
				<button onClick={removeFromBasket}>Remove from basket</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;