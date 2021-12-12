import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useStateValue } from '../contexts/StateProvidder';
import './Product.css';

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
					<p className="product_price"><strong>
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
					{Array( 5 ).fill().map( ( _, i ) =>
						<FontAwesomeIcon 
              icon={ i < rating ? faStar : farStar}
              color="gold"
              aria-label="star"
              key={Math.random( i )}/>
					)}
				</div>
			</div>
			<img className="product_image" alt="product" src={image} />
			<button onClick={addToBasket}>Add to basket</button>
		</div>
	);
};

export default Product;
