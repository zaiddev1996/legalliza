import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc, Timestamp } from 'firebase/firestore';
import axios from 'axios';

export function useSignup() {
	const auth = getAuth();
	const db = getFirestore();

	const signup = (name, email, password, type) =>
		new Promise((resolve, reject) => {
			console.log(`${email} ${password}`);
			axios
				.post('https://us-central1-legalliza-7de19.cloudfunctions.net/create', {
					name: name,
					email: email,
					password: password
				})
				.then(function(response) {
					console.log(response);
					const data = {
						email: email,
						uid: response.data.id,
						name: name,
						type: type,
						createdAt: Timestamp.fromDate(new Date())
					};
					setDoc(doc(db, 'users', response.data.id), data)
						.then(() => {
							resolve(`${email} is created with ${type} access`);
						})
						.catch((error) => {
							reject('Error adding document: ', error);
						});
				})
				.catch(function(error) {
					console.log(error);
					reject('Error signing up: ', error);
				});
		});

	const ownerSignup = (name, email, password, type) =>
		new Promise((resolve, reject) => {
			console.log(`${email} ${password}`);
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const data = {
						email: email,
						uid: userCredential.user.uid,
						name: name,
						type: type,
						createdAt: Timestamp.fromDate(new Date())
					};
					setDoc(doc(db, 'users', userCredential.user.uid), data)
						.then(() => {
							resolve(userCredential.user.uid);
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

	return { signup, ownerSignup };
}
