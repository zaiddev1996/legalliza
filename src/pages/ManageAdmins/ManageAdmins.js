import React, { useState } from 'react';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import History from '../../@history';
import { useCheckLoginState } from '../../hooks/signin-signup/useCheckLoginState';

export function ManageAdmins() {
	const { checkAccessLevel } = useCheckLoginState();
	const [ accessLevelType, setAccessLevelType ] = useState('Admin');

	checkAccessLevel()
		.then((accType) => {
			setAccessLevelType(accType);
		})
		.catch((error) => {});
	const onAddAdmin = (referer) => {
		History.push({
			pathname: `/signup/${referer}`
		});
	};
	return (
		<div>
			{accessLevelType === 'SuperAdmin' ? (
				<div>
					<SolidPrimaryButton text="Adicionar Admin" onClick={() => onAddAdmin('Admin')} />
					<SolidPrimaryButton text="Adicionar usuário" className="mt-5" onClick={() => onAddAdmin('User')} />
				</div>
			) : (
				<div>
					<SolidPrimaryButton text="Adicionar usuário" className="mt-5" onClick={() => onAddAdmin('User')} />
				</div>
			)}
		</div>
	);
}
