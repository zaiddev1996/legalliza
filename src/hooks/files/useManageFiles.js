import { getAuth } from 'firebase/auth';
import { message } from 'antd';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function useManageFiles() {
	const uploadFile = (name, file) =>
		new Promise((resolve, reject) => {
			var storage = getStorage();
			const fileReferance = ref(storage, name);
			uploadBytes(fileReferance, file)
				.then((snapshot) => {
					getFileUrl(name).then((url) => {
						resolve(url);
					});
					console.log('Uploaded a blob or file!');
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});

	const getFileUrl = (name) =>
		new Promise((resolve, reject) => {
			var storage = getStorage();
			const fileReferance = ref(storage, name);
			getDownloadURL(fileReferance)
				.then((url) => {
					// Insert url into an <img> tag to "download"
					resolve(url);
					console.log(url);
				})
				.catch((error) => {
					console.log(error);
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/object-not-found':
							// File doesn't exist
							break;
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
						case 'storage/canceled':
							// User canceled the upload
							break;

						// ...

						case 'storage/unknown':
							// Unknown error occurred, inspect the server response
							break;
					}
				});
		});

	return { uploadFile, getFileUrl };
}
