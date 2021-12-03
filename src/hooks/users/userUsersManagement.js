import { getAuth } from 'firebase/auth';
import { message } from 'antd';
import History from '../../@history';
import {
	doc,
	getDoc,
	getFirestore,
	collection,
	addDoc,
	getDocs,
	Timestamp,
	query,
	orderBy,
	setDoc,
	deleteDoc,
	where
} from 'firebase/firestore';
import { usePropertyManagement } from '../properties/usePropertyManagement';
import axios from 'axios';

export function useUsersManagement() {
	const auth = getAuth();
	const db = getFirestore();

	const getAllUsers = () =>
		new Promise((resolve, reject) => {
			const q = query(collection(db, 'users'), where('type', '==', 'User'), orderBy('createdAt', 'desc'));
			getDocs(q)
				.then((querySnapshot) => {
					let documentList = [];
					querySnapshot.forEach((doc) => {
						const documentData = doc.data();
						const data = {
							...documentData,
							key: doc.id
						};
						documentList.push(data);
					});
					console.log(documentList);
					resolve(documentList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getMultipleUsers = (userIds) =>
		new Promise((resolve, reject) => {
			const q = query(collection(db, 'users'), where('uid', 'in', userIds), orderBy('createdAt', 'desc'));
			getDocs(q)
				.then((querySnapshot) => {
					let documentList = [];
					querySnapshot.forEach((doc) => {
						const documentData = doc.data();
						const data = {
							...documentData,
							key: doc.id
						};
						documentList.push(data);
					});
					console.log(documentList);
					resolve(documentList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getUserData = (userId) =>
		new Promise((resolve, reject) => {
			// console.log(farmId);
			getDoc(doc(db, 'users', `${userId + ''}`))
				.then((doc) => {
					resolve(doc.data());
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const updateUserInfo = (userId, data) =>
		new Promise((resolve, reject) => {
			setDoc(doc(db, 'users', userId), data, { merge: true })
				.then((doc) => {
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const changePassword = (userId, password) =>
		new Promise((resolve, reject) => {
			axios
				.patch(`https://us-central1-legalliza-7de19.cloudfunctions.net/update`, {
					id: userId,
					data: {
						password: password
					}
				})
				.then(function(response) {
					console.log(response);
					resolve();
				})
				.catch(function(error) {
					console.log(error);
					reject('Error: ', error);
				});
		});

	const deleteUser = (userId) =>
		new Promise((resolve, reject) => {
			console.log(userId);
			axios
				.post(`https://us-central1-legalliza-7de19.cloudfunctions.net/delete`, {
					id: userId
				})
				.then(function(response) {
					deleteDoc(doc(db, 'users', `${userId + ''}`))
						.then((doc) => {
							resolve();
							console.log(doc);
						})
						.catch((error) => {
							reject(error);
							console.log(error);
						});
					// console.log(response);
					// resolve();
				})
				.catch(function(error) {
					console.log(error);
					reject('Error: ', error);
				});
		});

	return {
		getAllUsers,
		getUserData,
		updateUserInfo,
		getMultipleUsers,
		changePassword,
		deleteUser
	};
}
