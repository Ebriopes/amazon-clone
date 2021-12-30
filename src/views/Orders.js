import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { useStateValue } from 'contexts/StateProvidder';
import { db } from 'firebase';
import Order from 'components/Order';
import './Orders.css';

function Orders() {
	const [{ user }] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getOrders = async () => {
			if (user) {
				const fbOrders = await getDocs(
					query(
						collection(db, 'users', user?.uid, 'orders'),
						orderBy('created', 'desc')
					)
				);

				setOrders(fbOrders.docs?.map(doc => ({ ...doc.data(), id: doc?.id })));
			}
		};

		getOrders();
	}, [user]);

	return (
		<div className="orders">
			<h1>Your Orders</h1>

			<div className="orders-order">
				{orders.map(order => (
					<Order order={order} key={order?.id} />
				))}
			</div>
		</div>
	);
}

export default Orders;
