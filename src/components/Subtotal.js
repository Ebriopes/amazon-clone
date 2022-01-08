import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from 'contexts/StateProvidder';
import { getBasketTotal } from 'contexts/Reducer';
import './Subtotal.css';

const Subtotal = () => {
	const history = useHistory();
	const [{ basket }] = useStateValue();
	const { quantity: items, amount } = getBasketTotal(basket);

	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={value => (
					<>
						<p>
							Subtotal ({items} item{items > 1 ? 's' : ''}):{' '}
							<strong>{value}</strong>
						</p>
						<small className='subtotal_gift'>
							<input type='checkbox' />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				fixedDecimalScale={true}
				value={amount}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
			<button onClick={() => history.push('/payment')}>
				Proceed to checkout
			</button>
		</div>
	);
};

export default Subtotal;
