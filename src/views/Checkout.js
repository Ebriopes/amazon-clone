import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Subtotal from 'components/Subtotal';
import CheckoutProduct from 'components/CheckoutProduct';
import { useStateValue } from 'contexts/StateProvidder';
import { getBasketTotal } from 'contexts/Reducer';
import './Checkout.css';

const Checkout = () => {
	const [{ basket }] = useStateValue();
	const { quantity: items, amount } = getBasketTotal(basket);

	return (
		<main className='checkout'>
			<section className='checkout-left'>
				<div>
					<h1 className='checkout-title'> Your basket shop</h1>

					{basket.map(item => (
						<CheckoutProduct
							key={item.id}
							id={item.id}
							image={item.image}
							price={item.price}
							rating={item.rating}
							title={item.title}
							quantity={item.quantity}
						/>
					))}
				</div>

				<div className='checkout-subtotal'>
					<span>
						Subtotal{' '}
						<CurrencyFormat
							renderText={value => (
								<React.Fragment>
									({items} item{items > 1 ? 's' : ''}
									): <strong>{value}</strong>
								</React.Fragment>
							)}
							decimalScale={2}
							fixedDecimalScale={true}
							value={amount}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'$'}
						/>
					</span>
				</div>
			</section>
			<article className='checkout-right'>
				<Subtotal />
			</article>
		</main>
	);
};

export default Checkout;
