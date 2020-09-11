import React from 'react';
import './Product.css';
import { useStateValue } from '../contexts/StateProvidder';
import CurrencyFormat from 'react-currency-format';

const Product = ( { id, image, price, rating, title } ) => {
	const [ , dispatch ] = useStateValue();
	const addToBasket = () => {
		dispatch( {
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			}
		} );
	};
	return (
		<div className="product">
			<div className="product_info">
				<p>{title}</p>
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
				<div className="product_rating">
					{Array( rating ).fill().map( ( _, i ) =>
						<span role="img" aria-label="star" key={Math.random( i )}>🌟</span>
					)}
				</div>
			</div>
			<img className="product_image" alt="product" src={image} />
			<button onClick={addToBasket}>Add to basket</button>
		</div>
	);
};

export default Product;