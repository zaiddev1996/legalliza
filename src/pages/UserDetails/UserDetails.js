import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Upload, message } from 'antd';
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { useUserDetails } from '../../hooks/users/useUserDetails';
import { Loader } from '../../components/loader/loader';
import { useManageFiles } from '../../hooks/files/useManageFiles';

export function UserDetails(props) {
	const { getUserData, updateUserInfo } = useUsersManagement();
	const [ userId, setUserId ] = useState();
	const { userSingularDetails } = useUserDetails();
	const [ userData, setUserData ] = useState(userSingularDetails);
	const [ laoding, setLoading ] = useState(false);
	const { uploadFile } = useManageFiles();
	const [ allCheckbox, setAllCheckbox ] = useState(false);

	useEffect(
		() => {
			if (props.match.params.userId != undefined) {
				setUserId(props.match.params.userId);
				setLoading(true);
				getUserData(userId)
					.then((data) => {
						setLoading(false);
						var list = { ...userSingularDetails, ...data };
						setUserData({ ...userSingularDetails, ...data });
						// console.log(userData);
					})
					.catch((error) => {
						setLoading(false);
						message.error('Some error happened');
					});
			}
		},
		[ userId ]
	);

	const onUpdate = () => {
		if (userData.name.length > 0) {
			setLoading(true);
			updateUserInfo(userId, userData)
				.then(() => {
					setLoading(false);
					message.success('User info updated');
				})
				.catch((error) => {
					setLoading(false);
					message.error('Some error happened');
				});
		} else {
			message.error('O campo do nome não deve estar vazio');
		}
	};
	function beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		} else if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		} else {
			onUploadFile(file);
		}
	}
	const uploadButton = (
		<div className=" d-flex flex-column justify-content-center upload-btn">
			<UploadIcon className="align-self-center" />
			<text className="upload-text">
				Anexar<br />Documentos
			</text>
		</div>
	);

	const onUploadFile = (file) => {
		if (file != null) {
			setLoading(true);
			console.log(file.name);
			var randomFileName = Math.floor(Math.random() * 100000000000).toString();
			console.log(randomFileName);
			uploadFile(randomFileName, file)
				.then((url) => {
					var data = {
						documentUrl: url
					};
					updateUserInfo(userId, data)
						.then(() => {
							message.success('Document uploaded');
							setUserData({ ...userData, documentUrl: url });
							setLoading(false);
						})
						.catch((error) => {
							message.error(error);
							setLoading(false);
						});
				})
				.catch((error) => {
					message.error(error);
					console.log(error);
					setLoading(false);
				});
		} else {
			message.error('Please select a file first');
		}
	};

	return (
		<div className="user-details pb-5">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<input
						className="user-name"
						value={userData.name}
						onChange={(e) => {
							setUserData({ ...userData, name: e.target.value });
						}}
					/>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				<div className="d-flex">
					<SolidPrimaryButton
						text={'atualizar'}
						onClick={() => {
							onUpdate();
						}}
						btnStyle={'update-btn'}
					/>
					<SolidPrimaryButton text={'Trocar Senha'} onClick={() => {}} btnStyle={'change-pass-btn'} />
					<ButtonWithIcon text={'Excluir Fazenda'} onClick={() => {}} btnStyle={'delete-button'} />
				</div>
			</div>
			<div className="d-flex flex-wrap contact-info-div">
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">CPF/CNPJ:</text>
					<input
						className="cpf"
						value={userData.cpf}
						onChange={(e) => {
							setUserData({ ...userData, cpf: e.target.value });
						}}
					/>
				</div>
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">Telefone:</text>
					<input
						className="cpf"
						value={userData.telephone}
						onChange={(e) => {
							setUserData({ ...userData, telephone: e.target.value });
						}}
					/>
				</div>
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">email:</text>
					<text className="cpf">{userData.email}</text>
				</div>
			</div>
			<div className="d-flex">
				{userData.documentUrl.length > 0 ? (
					<a href={userData.documentUrl} target={'_blank'} download>
						<img alt={'adds'} src={userData.documentUrl} className="uploaded-img" />
					</a>
				) : (
					<div />
				)}

				<Upload
					showUploadList={false}
					beforeUpload={beforeUpload}

					// onPreview={this.handlePreview}
					// onChange={this.handleChange}
				>
					{uploadButton}
				</Upload>
			</div>
			<div className="seperator" />
			<h1 className="heading-light">Permissões - Geral</h1>
			<div className="d-flex flex-wrap">
				<CheckBox
					text={'Gestão de Usuários'}
					className="checkbox-user-details"
					checked={userData.userManagementPermission}
					onChange={(e) => {
						setUserData({ ...userData, userManagementPermission: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Gestão de Fazendas'}
					className="checkbox-user-details"
					checked={userData.farmManagementPermission}
					onChange={(e) => {
						setUserData({ ...userData, farmManagementPermission: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Gestão de Documentos'}
					className="checkbox-user-details"
					checked={userData.documentManagementPermission}
					onChange={(e) => {
						setUserData({ ...userData, documentManagementPermission: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Acesso Aplicativo'}
					className="checkbox-user-details"
					checked={userData.appAccessPermission}
					onChange={(e) => {
						setUserData({ ...userData, appAccessPermission: e.target.checked });
					}}
				/>
			</div>
			<h1 className="heading-light extra-top-margin">Permissões - Gestão de Documentos</h1>
			<div className="d-flex flex-wrap ">
				<CheckBox
					text={'Matrícula'}
					className="checkbox-user-details"
					checked={userData.Matricula}
					onChange={(e) => {
						setUserData({ ...userData, Matricula: e.target.checked });
					}}
				/>
				<CheckBox
					text={'GEO'}
					className="checkbox-user-details"
					checked={userData.GEO}
					onChange={(e) => {
						setUserData({ ...userData, GEO: e.target.checked });
					}}
				/>
				<CheckBox
					text={'CCIR'}
					className="checkbox-user-details"
					checked={userData.CCIR}
					onChange={(e) => {
						setUserData({ ...userData, CCIR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'CAR'}
					className="checkbox-user-details"
					checked={userData.CAR}
					onChange={(e) => {
						setUserData({ ...userData, CAR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'LAR'}
					className="checkbox-user-details"
					checked={userData.LAR}
					onChange={(e) => {
						setUserData({ ...userData, LAR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Outorga'}
					className="checkbox-user-details"
					checked={userData.Outroga}
					onChange={(e) => {
						setUserData({ ...userData, Outroga: e.target.checked });
					}}
				/>
				<CheckBox
					text={'ITR'}
					className="checkbox-user-details"
					checked={userData.ITR}
					onChange={(e) => {
						setUserData({ ...userData, ITR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'ADA'}
					className="checkbox-user-details"
					checked={userData.ADA}
					onChange={(e) => {
						setUserData({ ...userData, ADA: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Laudo'}
					className="checkbox-user-details"
					checked={userData.Laudo}
					onChange={(e) => {
						setUserData({ ...userData, Laudo: e.target.checked });
					}}
				/>
				<CheckBox
					text={'GSSMATR'}
					className="checkbox-user-details"
					checked={userData.GSSMATR}
					onChange={(e) => {
						setUserData({ ...userData, GSSMATR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'LTCAT'}
					className="checkbox-user-details"
					checked={userData.LTCAT}
					onChange={(e) => {
						setUserData({ ...userData, LTCAT: e.target.checked });
					}}
				/>
			</div>
			<h1 className="heading-light extra-top-margin">Permissões - Aplicativo (Imóveis)</h1>
			<div className="d-flex justify-content-between mt-4">
				<SearchBar />
				<CheckBox
					text={'Selecionar Todos'}
					checked={allCheckbox}
					onChange={(e) => {
						setAllCheckbox(e.target.checked);
						setUserData({
							...userData,
							Matricula: e.target.checked,
							GEO: e.target.checked,
							CCIR: e.target.checked,
							CAR: e.target.checked,
							LAR: e.target.checked,
							Outroga: e.target.checked,
							ITR: e.target.checked,
							ADA: e.target.checked,
							Laudo: e.target.checked,
							GSSMATR: e.target.checked,
							LTCAT: e.target.checked
						});
					}}
				/>
			</div>
			<Loader visible={laoding} />
		</div>
	);
}
