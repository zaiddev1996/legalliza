export function useUserDetails() {
	let userSingularDetails = {
		name: '',
		cpf: '',
		telephone: '',
		email: '',
		userManagementPermission: '',
		farmManagementPermission: '',
		documentManagementPermission: '',
		appAccessPermission: '',
		Matricula: false,
		GEO: false,
		CCIR: false,
		CAR: false,
		LAR: false,
		Outroga: false,
		ITR: false,
		ADA: false,
		Laudo: false,
		GSSMATR: false,
		LTCAT: false,
		documentUrl: ''
	};
	return { userSingularDetails };
}
