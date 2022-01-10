import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useStateValue } from 'contexts/StateProvidder';
import Stars from './Stars';
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
	const history = useHistory();
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

	const handleProduct = () => {
		history.replace(`/product/${id}`);
	};

	return (
		<article className='checkout-product'>
			<img
				onClick={handleProduct}
				className='checkout-product-image'
				src={image}
				alt='Product'
			/>

			<aside className='checkout-product-info'>
				<section>
					<p onClick={handleProduct} className='checkout-product-details'>
						<span className='checkout-product-title'>{title}</span>
						<CurrencyFormat
							renderText={value => (
								<span className='checkout-product-price'>
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

					<Stars rating={rating} />
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
