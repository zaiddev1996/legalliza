import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export function useSignin() {
	const auth = getAuth();
	const db = getFirestore();

	const signin = (email, password) =>
		new Promise(function(resolve, reject) {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					const docRef = doc(db, 'users', user.uid);
					getDoc(docRef)
						.then((doc) => {
							if (doc.exists()) {
								if (doc.data().type === 'User') {
									reject("This account doesn't have admin access");
								} else {
									resolve();
								}
							} else {
								resolve();
							}
						})
						.catch((error) => {
							reject(error);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(error);
					if (errorCode === 'auth/user-not-found') {
						reject('User not found');
					} else if (errorCode === 'auth/wrong-password') {
						reject('Invalid Password');
					} else {
						reject('Something happended.. Try again later');
					}
				});
		});

	return { signin };
}
