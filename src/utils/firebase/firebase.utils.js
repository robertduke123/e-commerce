import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA0u6-hv_f71oXMA7TnjjCMK9iQeiJO_bU",
	authDomain: "crwn-clothing-db-28c79.firebaseapp.com",
	projectId: "crwn-clothing-db-28c79",
	storageBucket: "crwn-clothing-db-28c79.appspot.com",
	messagingSenderId: "469564710944",
	appId: "1:469564710944:web:b8bd3c189a77dcb8c3dc45",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const creatUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
