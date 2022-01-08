export const initialState = {
	basket: localStorage.getItem('basket')
		? JSON.parse(localStorage.getItem('basket'))
		: [],
	user: null
};

export const getBasketTotal = basket =>
	basket?.reduce(
		(items, { quantity, price }) => {
			items.quantity += quantity;
			items.amount += quantity * price;

			return items;
		},
		{ quantity: 0, amount: 0 }
	);

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return {
				...state,
				basket: action?.item
			};
		case 'REMOVE_FROM_BASKET':
			const index = state.basket.findIndex(
				basketItem => basketItem.id === action.id
			);

			let newBasket = [...state.basket];

			if (index >= 0) newBasket.splice(index, 1);

			return {
				...state,
				basket: newBasket
			};
		case 'EMPTY_BASKET':
			return {
				...state,
				basket: []
			};
		case 'SET_USER':
			return {
				...state,
				user: action.user
			};
		default:
			break;
	}
};

export default reducer;
