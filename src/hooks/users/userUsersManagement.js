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

	// const addNewDocument = (farmId, propertyId, documentCategory, documentDetails) =>
	// 	new Promise((resolve, reject) => {
	// 		console.log(documentDetails);
	// 		addDoc(
	// 			collection(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentFiles',
	// 				documentCategory
	// 			),
	// 			{
	// 				...documentDetails,
	// 				createdAt: Timestamp.fromDate(new Date())
	// 			}
	// 		)
	// 			.then((doc) => {
	// 				changeDocumentCount(farmId, propertyId, 1)
	// 					.then(() => {
	// 						resolve(doc.id);
	// 						console.log(doc);
	// 					})
	// 					.catch(() => {
	// 						reject('Some error happened');
	// 					});
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});

	// const addNewDocumentData = (farmId, propertyId, documentCategory, documentDetails) =>
	// 	new Promise((resolve, reject) => {
	// 		console.log(documentDetails);
	// 		addDoc(
	// 			collection(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentsData',
	// 				documentCategory
	// 			),
	// 			{
	// 				...documentDetails,
	// 				createdAt: Timestamp.fromDate(new Date())
	// 			}
	// 		)
	// 			.then((doc) => {
	// 				resolve(doc.id);
	// 				console.log(doc);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});

	// const getAllDocumentData = (farmId, propertyId, documentCategory) =>
	// 	new Promise((resolve, reject) => {
	// 		const q = query(
	// 			collection(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentsData',
	// 				documentCategory
	// 			),
	// 			orderBy('createdAt', 'desc')
	// 		);
	// 		getDocs(q)
	// 			.then((querySnapshot) => {
	// 				let documentList = [];
	// 				querySnapshot.forEach((doc) => {
	// 					const documentData = doc.data();
	// 					const data = {
	// 						key: doc.id,
	// 						first: documentData.first,
	// 						second: documentData.second,
	// 						third: documentData.third,
	// 						fourth: documentData.fourth,
	// 						fifth: documentData.fifth
	// 					};
	// 					documentList.push(data);
	// 				});
	// 				resolve(documentList);
	// 				// console.log(documentList);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});

	// const deleteDocument = (farmId, propertyId, documentCategory, documentId) =>
	// 	new Promise((resolve, reject) => {
	// 		deleteDoc(
	// 			doc(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentFiles',
	// 				documentCategory,
	// 				documentId
	// 			)
	// 		)
	// 			.then((doc) => {
	// 				changeDocumentCount(farmId, propertyId, -1)
	// 					.then(() => {
	// 						resolve();
	// 					})
	// 					.catch(() => {
	// 						reject('Some error happened');
	// 					});
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});
	// const deleteDocumentData = (farmId, propertyId, documentCategory, documentId) =>
	// 	new Promise((resolve, reject) => {
	// 		deleteDoc(
	// 			doc(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentsData',
	// 				documentCategory,
	// 				documentId
	// 			)
	// 		)
	// 			.then((doc) => {
	// 				resolve();
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});

	// const updateColumnName = (farmId, propertyId, documentCategory, data) =>
	// 	new Promise((resolve, reject) => {
	// 		console.log(farmId);
	// 		setDoc(
	// 			doc(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentsData',
	// 				'columns',
	// 				documentCategory
	// 			),
	// 			data,
	// 			{ merge: true }
	// 		)
	// 			.then((doc) => {
	// 				resolve();
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});

	// const getColumnNames = (farmId, propertyId, documentCategory) =>
	// 	new Promise((resolve, reject) => {
	// 		console.log(farmId);
	// 		getDoc(
	// 			doc(
	// 				db,
	// 				'farms',
	// 				farmId,
	// 				'properties',
	// 				propertyId,
	// 				'documents',
	// 				'documentsData',
	// 				'columns',
	// 				documentCategory
	// 			)
	// 		)
	// 			.then((doc) => {
	// 				console.log(doc.data());
	// 				resolve(doc.data());
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 				console.log(error);
	// 			});
	// 	});

	return {
		getAllUsers,
		getUserData,
		updateUserInfo
	};
}
