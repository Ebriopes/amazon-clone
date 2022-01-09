import Stars from 'components/Stars';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CurrencyFormat from 'react-currency-format';
import { fakeStoreInstance as axios } from 'services/Axios';
import { useStateValue } from 'contexts/StateProvidder';
import { addItemToBasket } from 'contexts/Reducer';
import Loader from 'components/Loader';
import './Product.css';

function Product() {
	// @ts-ignore
	const { id } = useParams();
	const [{ basket }, dispatch] = useStateValue();
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [productDetails, setProductDetails] = useState({
		description: '',
		image: '',
		price: 0,
		rating: { rate: 0, count: 0 },
		title: '',
		quantity
	});

	const addToBasket = () => {
		const newBasket = addItemToBasket(basket, { ...productDetails, quantity });

		dispatch({
			type: 'ADD_TO_BASKET',
			item: newBasket
		});
	};

	useEffect(() => {
		const getProductInfo = async () => {
			try {
				const res = await axios.get(`/products/${id}`);
				const details = res.data;

				setProductDetails(details);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getProductInfo();
	}, [id]);

	return (
		<React.Fragment>
			{loading ? (
				<Loader />
			) : (
				<section className='product'>
					<img alt='product presentation' src={productDetails?.image} />

					<article className='product-details'>
						<h1 className='product-title'> {productDetails?.title} </h1>

						<Stars rating={productDetails?.rating} />

						<CurrencyFormat
							renderText={value => <p>{value}</p>}
							decimalScale={2}
							fixedDecimalScale={true}
							value={productDetails?.price}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'$'}
						/>

						<p className='product-description'>{productDetails?.description}</p>

						<div className='product-options'>
							<label>
								Qty:{' '}
								<select
									name='quantity'
									id={`quantity-${id}`}
									className='product-quantity'
									value={1}
									onChange={e =>
										setQuantity(Number.parseInt(e.currentTarget.value))
									}
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
					</article>
				</section>
			)}
		</React.Fragment>
	);
}

export default Product;
