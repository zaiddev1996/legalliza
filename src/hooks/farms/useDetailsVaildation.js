export function useDetailsValidation() {
	const validateDetails = (farmDetails) => {
		return (
			farmDetails.name.length > 0 &&
			farmDetails.latDegree.length > 0 &&
			farmDetails.latMinutes.length > 0 &&
			farmDetails.latSeconds.length > 0 &&
			farmDetails.longDegree.length > 0 &&
			farmDetails.longMinutes.length > 0 &&
			farmDetails.longSeconds.length > 0
		);
	};
	return { validateDetails };
}
