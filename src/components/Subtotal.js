import CurrencyFormat from 'react-currency-format';
import React from 'react';
import './Subtotal.css';
import { useStateValue } from '../contexts/StateProvidder';

const Subtotal = () => {
	const [ { basket } ] = useStateValue();
	const subTotal = basket.reduce( ( accumulator, currentValue ) => accumulator + currentValue.price, 0 );

	return (
		<div className="subtotal">
			<CurrencyFormat renderText={value => (
				<>
					<p>
						subtotal ({basket?.length} items): <strong>{value}</strong>
					</p>
					<small className="subtotal_gift">
						<input type="checkbox" />This order contains a gift
						</small>
				</>
			)}
				decimalScale={2}
				fixedDecimalScale={true}
				value={subTotal}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			<button>Proceed to checkout</button>
		</div>
	);
};

export default Subtotal;