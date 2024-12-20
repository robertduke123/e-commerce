import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	creatUserDocumentFromAuth,
	onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";

import { setCurrentUser } from "./store/user/user.action";

import Navigation from "./routes/navigation/navigation.components";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				creatUserDocumentFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});
		return unsubscribe;
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="/shop/*" element={<Shop />} />
				<Route path="/auth" element={<Authentication />} />
				<Route path="/checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
