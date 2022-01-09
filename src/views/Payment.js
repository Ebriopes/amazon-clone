import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { doc, setDoc } from 'firebase/firestore/lite';
import { db } from 'firebase';
import { useStateValue } from 'contexts/StateProvidder';
import { getBasketTotal } from 'contexts/Reducer';
import CheckoutProduct from 'components/CheckoutProduct';
import { firebaseInstance as axios } from 'services/Axios';
import './Payment.css';

function Payment() {
	const history = useHistory();
	const [{ basket, user }, dispatch] = useStateValue();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [processing, setProcessing] = useState(false);
	const [succeeeded, setSucceeeded] = useState(false);
	const [clientSecret, setClientSecret] = useState(null);
	const { quantity: products, amount } = getBasketTotal(basket);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async event => {
		event.preventDefault();

		if (clientSecret) {
			setProcessing(true);

			await stripe
				.confirmCardPayment(clientSecret, {
					payment_method: {
						card: elements.getElement(CardElement)
					}
				})
				.then(async ({ error, paymentIntent }) => {
					setProcessing(false);

					if (!error) {
						setSucceeeded(true);
						setError(null);

						await setDoc(
							doc(db, 'users', user?.uid, 'orders', paymentIntent?.id),
							{
								basket: basket,
								amount: paymentIntent?.amount,
								created: paymentIntent?.created
							},
							{ merge: true }
						);

						dispatch({
							type: 'EMPTY_BASKET'
						});

						history.replace('/orders');
					} else {
						setError(error?.message);
					}
				});
		} else {
			setError('client secret error');
		}
	};

	const handleChange = event => {
		setDisabled(!event?.complete);
		setError(event?.error ? event?.error?.message : '');
	};

	useEffect(() => {
		const getClientSecret = async () => {
			if (products) {
				try {
					const response = await axios({
						method: 'post',
						url: `/payments/create?total=${(amount * 100).toFixed(0)}`
					});

					setClientSecret(response?.data?.clientSecret);
				} catch {}
			}
		};

		getClientSecret();
	}, [products, amount]);
	return (
		<div className='payment'>
			<div className='payment-container'>
				<h1>
					{' '}
					Checkout (<Link to='/checkout'>{products} items</Link>){' '}
				</h1>

				<div className='payment-section'>
					<div className='payment-title'>
						<h3>Delivery Address</h3>
						<p>{user?.address}</p>
					</div>

					<div className='payment-address'>
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>
				<div className='payment-section'>
					<div className='payment-title'>
						<h3>Review items and delivery</h3>
					</div>

					<div className='payment-items'>
						{products ? (
							basket.map(item => (
								<CheckoutProduct
									hiddenButton
									id={item?.id}
									image={item?.image}
									key={item?.id}
									price={item?.price}
									quantity={item?.quantity}
									rating={item?.rating}
									title={item?.title}
								/>
							))
						) : (
							<h2>Oops... Your basket is empty!</h2>
						)}
					</div>
				</div>
				<div className='payment-section'>
					<div className='payment-title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment-details'>
						<form onSubmit={handleSubmit}>
							<CardElement className='payment-card' onChange={handleChange} />

							<div className='payment-price-container'>
								<CurrencyFormat
									renderText={value => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={amount}
									displayType={'text'}
									thousandSeparator={true}
									prefix='$'
								/>
								<button
									disabled={processing || disabled || succeeeded || !products}
								>
									<span>{processing ? 'Processing' : 'Buy now'}</span>
								</button>
							</div>

							{error && <div className='payment-error'>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
