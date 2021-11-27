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
	increment,
	where
} from 'firebase/firestore';
import { useFarmManagement } from '../farms/useFarmManagement';

export function usePropertyManagement() {
	const db = getFirestore();
	const { changePropertyCount } = useFarmManagement();

	const addNewProperty = (farmId, propertyDetails) =>
		new Promise((resolve, reject) => {
			addDoc(collection(db, 'properties'), {
				...propertyDetails,
				createdAt: Timestamp.fromDate(new Date()),
				farmId: farmId
			})
				.then((doc) => {
					changePropertyCount(farmId, 1)
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

	const getAllProperties = (farmId) =>
		new Promise((resolve, reject) => {
			const q = query(collection(db, 'properties'), where('farmId', '==', farmId), orderBy('createdAt', 'desc'));
			getDocs(q)
				.then((querySnapshot) => {
					let propertyList = [];
					querySnapshot.forEach((doc) => {
						const propertyData = doc.data();
						const data = {
							key: doc.id,
							property: propertyData.name,
							location: propertyData.country,
							longitude: `${propertyData.latDegree}º${propertyData.latMinutes}’${propertyData.latSeconds}’’${propertyData.latDirection} | ${propertyData.longDegree}º${propertyData.longMinutes}’${propertyData.longSeconds}’’${propertyData.longDirection}`,
							users: '3',
							documents: propertyData.documentCount,
							farmId: propertyData.farmId
						};
						propertyList.push(data);
					});
					resolve(propertyList);
					// console.log(farmList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getAllFarmsProperties = (farmId) =>
		new Promise((resolve, reject) => {
			const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
			getDocs(q)
				.then((querySnapshot) => {
					let propertyList = [];
					querySnapshot.forEach((doc) => {
						const propertyData = doc.data();
						const data = {
							key: doc.id,
							property: propertyData.name,
							location: propertyData.country,
							longitude: `${propertyData.latDegree}º${propertyData.latMinutes}’${propertyData.latSeconds}’’${propertyData.latDirection} | ${propertyData.longDegree}º${propertyData.longMinutes}’${propertyData.longSeconds}’’${propertyData.longDirection}`,
							users: '3',
							documents: propertyData.documentCount,
							farmId: propertyData.farmId
						};
						propertyList.push(data);
					});
					resolve(propertyList);
					// console.log(farmList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getProperty = (farmId, propertyId) =>
		new Promise((resolve, reject) => {
			// console.log(farmId);
			getDoc(doc(db, 'properties', `${propertyId + ''}`))
				.then((doc) => {
					resolve(doc.data());
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const deleteProperty = (farmId, propertyId) =>
		new Promise((resolve, reject) => {
			deleteDoc(doc(db, 'properties', `${propertyId + ''}`))
				.then((doc) => {
					changePropertyCount(farmId, -1)
						.then(() => {
							resolve();
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

	const updateProperty = (farmId, propertyId, data) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			setDoc(doc(db, 'properties', `${propertyId + ''}`), data, { merge: true })
				.then((doc) => {
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const changeDocumentCount = (farmId, propertyId, count) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			setDoc(doc(db, 'properties', `${propertyId + ''}`), { documentCount: increment(count) }, { merge: true })
				.then((doc) => {
					console.log(doc);
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	return {
		addNewProperty,
		getAllProperties,
		getProperty,
		deleteProperty,
		updateProperty,
		changeDocumentCount,
		getAllFarmsProperties
	};
}
