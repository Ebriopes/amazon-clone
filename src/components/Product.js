import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faStar as fullStar,
	faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import { faStar as voidStar } from '@fortawesome/free-regular-svg-icons';
import { useStateValue } from 'contexts/StateProvidder';
import './Product.css';

const Product = ({ id, image, price, rating, title }) => {
	const [quantity, setQuantity] = useState(1);
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		const newBasket = [...basket];
		const basketItem = newBasket?.find(item => item.id === id);

		basketItem
			? (basketItem.quantity += quantity)
			: newBasket.push({ id, image, price, quantity, rating, title });

		dispatch({
			type: 'ADD_TO_BASKET',
			item: newBasket
		});
	};

	return (
		<section className='product'>
			<div className='product-info'>
				<p className='product-title'>{title}</p>
				<div className='product-rating'>
					{Array(5)
						.fill()
						.map((_, i) => {
							const star =
								i + 0.3 < rating && rating < i + 0.85
									? faStarHalfAlt
									: rating >= i + 0.85
									? fullStar
									: voidStar;

							return (
								<FontAwesomeIcon
									icon={star}
									color='#F7981D'
									aria-label='star'
									key={Math.random()}
								/>
							);
						})}

					<label hidden aria-label='Rate calification'>
						Rating: <strong>{rating}</strong>
					</label>
				</div>
				<CurrencyFormat
					renderText={value => (
						<p className='product-price'>
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
			</div>

			<img className='product-image' alt='product' src={image} />

			<div className='product-add'>
				<label>
					Qty:{' '}
					<select
						name='quantity'
						id={`quantity-${id}`}
						className='product-quantity'
						value={quantity}
						onChange={e => setQuantity(Number.parseInt(e.currentTarget.value))}
					>
						{Array(10)
							.fill()
							.map((_, value) => (
								<option key={`${id}-${value}`} value={value + 1}>
									{value + 1}
								</option>
							))}
					</select>
				</label>
				<button onClick={addToBasket}>Add to basket</button>
			</div>
		</section>
	);
};

export default Product;
