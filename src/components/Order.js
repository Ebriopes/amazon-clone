import React from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import './Order.css';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
	return (
		<div className='order'>
			<h2>Order</h2>

			<p>
				{moment
					.unix(order?.created)
					.locale('es-mx')
					.format('YYYY MMMM Do, h:mma')}
			</p>

			<p className='order-id'>
				<small>{order?.id}</small>
			</p>

			{order?.basket?.map(item => (
				<CheckoutProduct
					id={item?.id}
					image={item?.image}
					key={item?.id}
					price={item?.price}
					quantity={item?.quantity}
					rating={item?.rating}
					title={item?.title}
					hiddenOptions
				/>
			))}

			<span className='order-total'>
				<CurrencyFormat
					renderText={value => <p>Total: {value}</p>}
					displayType='text'
					prefix='$'
					decimalScale={2}
					fixedDecimalScale
					thousandSeparator
					value={order?.amount / 100}
				/>
			</span>
		</div>
	);
}

export default Order;
