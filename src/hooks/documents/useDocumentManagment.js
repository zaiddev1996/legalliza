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
	deleteDoc
} from 'firebase/firestore';
import { usePropertyManagement } from '../properties/usePropertyManagement';

export function useDocumentManagement() {
	const auth = getAuth();
	const db = getFirestore();
	const { changeDocumentCount } = usePropertyManagement();

	const addNewDocument = (farmId, propertyId, documentCategory, documentDetails) =>
		new Promise((resolve, reject) => {
			console.log(documentDetails);
			addDoc(collection(db, 'properties', propertyId, 'documents', 'documentFiles', documentCategory), {
				...documentDetails,
				createdAt: Timestamp.fromDate(new Date())
			})
				.then((doc) => {
					changeDocumentCount(farmId, propertyId, 1)
						.then(() => {
							resolve(doc.id);
							console.log(doc);
						})
						.catch(() => {
							reject('Some error happened');
						});
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const addNewDocumentData = (farmId, propertyId, documentCategory, documentDetails) =>
		new Promise((resolve, reject) => {
			console.log(documentDetails);
			addDoc(collection(db, 'properties', propertyId, 'documents', 'documentsData', documentCategory), {
				...documentDetails,
				createdAt: Timestamp.fromDate(new Date())
			})
				.then((doc) => {
					resolve(doc.id);
					console.log(doc);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getAllDocuments = (farmId, propertyId, documentCategory) =>
		new Promise((resolve, reject) => {
			const q = query(
				collection(db, 'properties', propertyId, 'documents', 'documentFiles', documentCategory),
				orderBy('createdAt', 'desc')
			);
			getDocs(q)
				.then((querySnapshot) => {
					let documentList = [];
					querySnapshot.forEach((doc) => {
						const documentData = doc.data();
						const data = {
							key: doc.id,
							type: documentData.type,
							comments: documentData.comments,
							addedBy: documentData.addedBy,
							url: documentData.url
						};
						documentList.push(data);
					});
					resolve(documentList);
					// console.log(documentList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getAllDocumentData = (farmId, propertyId, documentCategory) =>
		new Promise((resolve, reject) => {
			const q = query(
				collection(db, 'properties', propertyId, 'documents', 'documentsData', documentCategory),
				orderBy('createdAt', 'desc')
			);
			getDocs(q)
				.then((querySnapshot) => {
					let documentList = [];
					querySnapshot.forEach((doc) => {
						const documentData = doc.data();
						const data = {
							key: doc.id,
							first: documentData.first,
							second: documentData.second,
							third: documentData.third,
							fourth: documentData.fourth,
							fifth: documentData.fifth
						};
						documentList.push(data);
					});
					resolve(documentList);
					// console.log(documentList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const deleteDocument = (farmId, propertyId, documentCategory, documentId) =>
		new Promise((resolve, reject) => {
			deleteDoc(doc(db, 'properties', propertyId, 'documents', 'documentFiles', documentCategory, documentId))
				.then((doc) => {
					changeDocumentCount(farmId, propertyId, -1)
						.then(() => {
							resolve();
						})
						.catch(() => {
							reject('Some error happened');
						});
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});
	const deleteDocumentData = (farmId, propertyId, documentCategory, documentId) =>
		new Promise((resolve, reject) => {
			deleteDoc(doc(db, 'properties', propertyId, 'documents', 'documentsData', documentCategory, documentId))
				.then((doc) => {
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const updateColumnName = (farmId, propertyId, documentCategory, data) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			setDoc(doc(db, 'properties', propertyId, 'documents', 'documentsData', 'columns', documentCategory), data, {
				merge: true
			})
				.then((doc) => {
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getColumnNames = (farmId, propertyId, documentCategory) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			getDoc(doc(db, 'properties', propertyId, 'documents', 'documentsData', 'columns', documentCategory))
				.then((doc) => {
					console.log(doc.data());
					resolve(doc.data());
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	return {
		addNewDocument,
		getAllDocuments,
		deleteDocument,
		updateColumnName,
		getColumnNames,
		addNewDocumentData,
		getAllDocumentData,
		deleteDocumentData
	};
}
