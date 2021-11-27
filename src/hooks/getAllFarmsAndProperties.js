import { getAuth } from 'firebase/auth';
import { message } from 'antd';
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
	updateDoc
} from 'firebase/firestore';
import { useFarmManagement } from './farms/useFarmManagement';
import { usePropertyManagement } from './properties/usePropertyManagement';
import { useUsersManagement } from './users/userUsersManagement';

export function useFarmAndPropertyManagement() {
	const db = getFirestore();
	const { getAllFarmsProperties } = usePropertyManagement();
	const { getAllFarms } = useFarmManagement();
	const { getUserData } = useUsersManagement();

	const getAllFarmsAndProperties = (userId) =>
		new Promise((resolve, reject) => {
			getAllFarms()
				.then((farmsList) => {
					getAllFarmsProperties()
						.then((propertiesList) => {
							getUserData(userId)
								.then((userData) => {
									for (let i = 0; i < propertiesList.length; i++) {
										if (userData.propertiesAccess.includes(propertiesList[i].key)) {
											propertiesList[i] = { ...propertiesList[i], isChecked: true };
										}
									}
									var allFarmsAndPropertiesList = [];
									for (let i = 0; i < farmsList.length; i++) {
										const data = propertiesList.filter(
											(property) => property.farmId == farmsList[i].key
										);
										allFarmsAndPropertiesList.push({ ...farmsList[i], propertiesList: data });
									}
									console.log(allFarmsAndPropertiesList);
									resolve(allFarmsAndPropertiesList);
								})
								.catch((error) => {
									reject();
									console.error(error);
								});
						})
						.catch((error) => {
							reject();
							console.error(error);
						});
				})
				.catch((error) => {
					reject();
					console.log(error);
				});
		});

	return { getAllFarmsAndProperties };
}
