import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { doc, setDoc } from 'firebase/firestore/lite';
import { useStateValue } from 'contexts/StateProvidder';
import { getBasketTotal } from 'contexts/Reducer';
import CheckoutProduct from 'components/CheckoutProduct';
import axios from 'services/Axios';
import { db } from 'firebase';
import './Payment.css';

function Payment() {
	const history = useHistory();
	const [{ basket, user }, dispatch] = useStateValue();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [processing, setProcessing] = useState(false);
	const [succeeeded, setSucceeeded] = useState(false);
	const [clientSecret, setClientSecret] = useState(null);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async event => {
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
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
	};

	const handleChange = event => {
		setDisabled(!event?.complete);
		setError(event?.error ? event?.error?.message : '');
	};

	useEffect(() => {
		const getClientSecret = async () => {
			if (getBasketTotal(basket) > 0) {
				try {
					const response = await axios({
						method: 'post',
						url: `/payments/create?total=${getBasketTotal(basket) * 100}`
					});

					setClientSecret(response?.data?.clientSecret);
				} catch {}
			}
		};

		getClientSecret();
	}, []);
	return (
		<div className="payment">
			<div className="payment-container">
				<h1>
					{' '}
					Checkout (<Link to="/checkout">{basket?.length} items</Link>){' '}
				</h1>

				<div className="payment-section">
					<div className="payment-title">
						<h3>Delivery Address</h3>
						<p>{user?.address}</p>
					</div>

					<div className="payment-address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>
				<div className="payment-section">
					<div className="payment-title">
						<h3>Review items and delivery</h3>
					</div>

					<div className="payment-items">
						{basket.map(item => (
							<CheckoutProduct
								id={item?.id}
								title={item?.title}
								image={item?.image}
								price={item?.price}
								rating={item?.rating}
								key={item?.id}
								hiddenButton
							/>
						))}
					</div>
				</div>
				<div className="payment-section">
					<div className="payment-title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment-details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment-price-container">
								<CurrencyFormat
									renderText={value => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix="$"
								/>
								<button disabled={processing || disabled || succeeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy now'}</span>
								</button>
							</div>

							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
