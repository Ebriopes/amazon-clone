import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from 'contexts/StateProvidder';
import { addItemToBasket } from 'contexts/Reducer';
import Stars from './Stars';
import './HomeProduct.css';

const HomeProduct = ({ id, image, price, rating, title }) => {
	const history = useHistory();
	const [quantity, setQuantity] = useState(1);
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		const newBasket = addItemToBasket(basket, {
			id,
			image,
			price,
			quantity,
			rating,
			title
		});

		dispatch({
			type: 'ADD_TO_BASKET',
			item: newBasket
		});
	};

	const handleProduct = () => {
		history.replace(`/product/${id}`);
	};

	return (
		<section className='home-product'>
			<div className='home-product-info'>
				<p onClick={handleProduct} className='home-product-title'>
					{title}
				</p>

				<Stars rating={rating} />

				<CurrencyFormat
					renderText={value => (
						<p className='home-product-price'>
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

			<img
				onClick={handleProduct}
				className='home-product-image'
				alt='product'
				src={image}
			/>

			<div className='home-product-add'>
				<label>
					Qty:{' '}
					<select
						name='quantity'
						id={`quantity-${id}`}
						className='home-product-quantity'
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

export default HomeProduct;
