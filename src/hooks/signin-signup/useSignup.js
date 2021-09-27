import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

export function useSignup() {
	const auth = getAuth();
	const db = getFirestore();

	const signup = (name, email, password, type) =>
		new Promise((resolve, reject) => {
			console.log(`${email} ${password}`);
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const data = {
						email: email,
						uid: userCredential.user.uid,
						name: name,
						type: type
					};
					setDoc(doc(db, 'users', userCredential.user.uid), data)
						.then(() => {
							resolve(`${email} is created with ${type} access`);
						})
						.catch((error) => {
							reject('Error adding document: ', error);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					reject(errorCode);
				});
		});

	return { signup };
}
