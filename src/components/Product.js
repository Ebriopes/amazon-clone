import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
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
			: newBasket.push({
					id: id,
					title: title,
					image: image,
					price: price,
					rating: rating,
					quantity
			  });

		dispatch({
			type: 'ADD_TO_BASKET',
			item: newBasket
		});
	};
	return (
		<div className='product'>
			<div className='product-info'>
				<p>{title}</p>
				<div className='product-rating'>
					{Array(5)
						.fill()
						.map((_, i) => (
							<FontAwesomeIcon
								icon={i < rating ? faStar : farStar}
								color='#F7981D'
								aria-label='star'
								key={Math.random()}
							/>
						))}
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
						{Array.from({ length: 10 }, (_, i) => i + 1).map((_, value) => (
							<option key={`${id}-${value}`} value={value + 1}>
								{value + 1}
							</option>
						))}
					</select>
				</label>
				<button onClick={addToBasket}>Add to basket</button>
			</div>
		</div>
	);
};

export default Product;
