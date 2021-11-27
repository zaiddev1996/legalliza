export function useDetailsValidation() {
	const validatePropertyDetails = (propertyDetails) => {
		return (
			propertyDetails.name.length > 0 &&
			propertyDetails.latDegree.length > 0 &&
			propertyDetails.latMinutes.length > 0 &&
			propertyDetails.latSeconds.length > 0 &&
			propertyDetails.longDegree.length > 0 &&
			propertyDetails.longMinutes.length > 0 &&
			propertyDetails.longSeconds.length > 0
		);
	};
	return { validatePropertyDetails };
}
