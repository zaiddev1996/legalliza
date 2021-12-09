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
	updateDoc,
	arrayUnion,
	where
} from 'firebase/firestore';
import { usePropertyManagement } from '../properties/usePropertyManagement';

export function useFarmManagement() {
	const db = getFirestore();

	const addNewFarm = (farmDetails) =>
		new Promise((resolve, reject) => {
			addDoc(collection(db, 'farms'), {
				...farmDetails,
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

	const getAllFarms = () =>
		new Promise((resolve, reject) => {
			const q = query(collection(db, 'farms'), orderBy('createdAt', 'desc'));
			getDocs(q)
				.then((querySnapshot) => {
					let farmList = [];
					querySnapshot.forEach((doc) => {
						const farmData = doc.data();
						const data = {
							key: doc.id,
							farm: farmData.name,
							location: farmData.country,
							longitude: `${farmData.latDegree}º${farmData.latMinutes}’${farmData.latSeconds}’’${farmData.latDirection} | ${farmData.longDegree}º${farmData.longMinutes}’${farmData.longSeconds}’’${farmData.longDirection}`,
							properties: farmData.propertyCount ? farmData.propertyCount : 0,
							legal: `${farmData.legalFarm}%`,
							group: farmData.group
						};
						farmList.push(data);
					});
					resolve(farmList);
					// console.log(farmList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getFarm = (farmId) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			getDoc(doc(db, 'farms', `${farmId + ''}`))
				.then((doc) => {
					resolve(doc.data());
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const deleteFarm = (farmId) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			deleteDoc(doc(db, 'farms', `${farmId + ''}`))
				.then((doc) => {
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const updateFarm = (farmId, data) =>
		new Promise((resolve, reject) => {
			console.log(data);
			setDoc(doc(db, 'farms', `${farmId + ''}`), data, { merge: true })
				.then((doc) => {
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const updateGroupArray = (group) =>
		new Promise((resolve, reject) => {
			updateDoc(doc(db, 'lists', 'groups'), { farmGroups: arrayUnion(group) }, { merge: true })
				.then((doc) => {
					console.log();
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getGroupArray = () =>
		new Promise((resolve, reject) => {
			// console.log(farmId);
			getDoc(doc(db, 'lists', 'groups'))
				.then((doc) => {
					console.log(doc.data());
					resolve(doc.data());
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const changePropertyCount = (farmId, count) =>
		new Promise((resolve, reject) => {
			console.log(farmId);
			setDoc(doc(db, 'farms', `${farmId + ''}`), { propertyCount: increment(count) }, { merge: true })
				.then((doc) => {
					console.log(doc);
					resolve();
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	const getMultipleFarms = (userId) =>
		new Promise((resolve, reject) => {
			const q = query(
				collection(db, 'farms'),
				where('farmAccess', 'array-contains', userId),
				orderBy('createdAt', 'desc')
			);
			getDocs(q)
				.then((querySnapshot) => {
					let farmList = [];
					querySnapshot.forEach((doc) => {
						const farmData = doc.data();
						const data = {
							key: doc.id,
							farm: farmData.name,
							location: farmData.country,
							longitude: `${farmData.latDegree}º${farmData.latMinutes}’${farmData.latSeconds}’’${farmData.latDirection} | ${farmData.longDegree}º${farmData.longMinutes}’${farmData.longSeconds}’’${farmData.longDirection}`,
							properties: farmData.propertyCount ? farmData.propertyCount : 0,
							legal: `${farmData.legalFarm}%`,
							group: farmData.group
						};
						farmList.push(data);
					});
					resolve(farmList);
					// console.log(farmList);
				})
				.catch((error) => {
					reject(error);
					console.log(error);
				});
		});

	return {
		addNewFarm,
		getAllFarms,
		getFarm,
		updateFarm,
		deleteFarm,
		changePropertyCount,
		updateGroupArray,
		getGroupArray,
		getMultipleFarms
	};
}
