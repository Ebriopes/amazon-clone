import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-regular-svg-icons';
import { useStateValue } from 'contexts/StateProvidder';
import './CheckoutProduct.css';

function CheckoutProduct({
	id,
	image,
	price,
	rating,
	title,
	quantity,
	hiddenButton = false,
	hiddenOptions = false
}) {
	const [{ basket }, dispatch] = useStateValue();

	const removeFromBasket = () => {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id
		});
	};

	const modifyBasket = e => {
		const value = Number.parseInt(e.currentTarget.value);

		if (value > 0) {
			const newBasket = [...basket];
			const item = newBasket.find(basketItem => basketItem?.id === id);

			item.quantity = value;

			dispatch({
				type: 'ADD_TO_BASKET',
				item: newBasket
			});
		} else if (value === 0) {
			removeFromBasket();
		}
	};

	return (
		<article className='checkout-product'>
			<img className='checkout-product-image' src={image} alt='Product' />

			<aside className='checkout-product-info'>
				<section>
					<p className='checkout-product-title'>
						{title}
						<CurrencyFormat
							renderText={value => (
								<span>
									{hiddenOptions && quantity > 1 && `(${quantity} items) `}
									<strong>{value}</strong>
								</span>
							)}
							decimalScale={2}
							fixedDecimalScale
							value={price}
							displayType={'text'}
							thousandSeparator
							prefix={'$'}
						/>
					</p>
					<div className='checkout-product-rating'>
						{Array(5)
							.fill()
							.map((_, i) => (
								<FontAwesomeIcon
									icon={i < rating ? emptyStar : fullStar}
									color='#F7981D'
									aria-label='star'
									key={i}
								/>
							))}
					</div>
				</section>

				{!hiddenOptions && (
					<section className='checkout-product-options'>
						<select
							name='quantity'
							id={`quantity-${id}`}
							className='checkout-product-quantity'
							value={quantity}
							onChange={modifyBasket}
						>
							{Array.from({ length: 11 }).map((_, value) => (
								<option
									key={`${id}-${value}`}
									value={value === 10 && quantity > value ? quantity : value}
								>
									Qty:{' '}
									{value === 0
										? '0 (Delete)'
										: value === 10 && quantity > value
										? quantity
										: value}
								</option>
							))}
						</select>

						{!hiddenButton && (
							<button
								className='checkout-product-remove'
								onClick={removeFromBasket}
							>
								Delete
							</button>
						)}
					</section>
				)}
			</aside>
		</article>
	);
}

export default CheckoutProduct;
