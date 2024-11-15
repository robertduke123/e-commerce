import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) => {
	return {
		type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
		payload: categories,
	};
};
