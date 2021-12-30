import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from 'contexts/StateProvidder';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

function CheckoutProduct({
	id,
	image,
	price,
	rating,
	title,
	hiddenButton = false
}) {
	const [, dispatch] = useStateValue();

	const removeFromBasket = () => {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id
		});
	};
	return (
		<div className="checkout_product">
			<img className="checkout_product_image" src={image} alt="Product" />
			<div className="checkout_product_info">
				<p className="checkout_Product_title">{title}</p>
				<CurrencyFormat
					renderText={value => (
						<p>
							<strong>{value}</strong>
						</p>
					)}
					decimalScale={2}
					fixedDecimalScale={true}
					value={price}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'$'}
				/>
				<div className="checkout_product_rating">
					{Array(5)
						.fill()
						.map((_, i) => (
							<FontAwesomeIcon
								icon={i < rating ? faStar : farStar}
								color="gold"
								aria-label="star"
								key={i}
							/>
						))}
				</div>
				{!hiddenButton && (
					<button onClick={removeFromBasket}>Remove from basket</button>
				)}
			</div>
		</div>
	);
}

export default CheckoutProduct;
