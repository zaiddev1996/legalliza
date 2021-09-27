import { getAuth } from 'firebase/auth';
import { message } from 'antd';
import History from '../../@history';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export function useCheckLoginState() {
	const auth = getAuth();
	const user = auth.currentUser;
	const db = getFirestore();

	if (user) {
	} else {
		message.error('No user is signed in');
		History.push({ pathname: '/' });
	}

	const checkAccessLevel = () =>
		new Promise((resolve, reject) => {
			const docRef = doc(db, 'users', user.uid);
			getDoc(docRef)
				.then((doc) => {
					if (doc.exists()) {
						resolve('Admin');
					} else {
						resolve('SuperAdmin');
					}
				})
				.catch((error) => {
					reject(error);
				});
		});

	return { checkAccessLevel };
}
