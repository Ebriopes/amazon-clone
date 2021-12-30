import React from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import './Order.css';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {
	return (
		<div className="order">
			<h2>Order</h2>
			<p>
				{moment
					.unix(order?.created)
					.locale('es-mx')
					.format('YYYY MMMM Do, h:mma')}
			</p>
			<p className="order-id">
				<small>{order?.id}</small>
			</p>
			{order?.basket?.map(item => (
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
	);
}

export default Order;
