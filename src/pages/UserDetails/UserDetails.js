import React from 'react';
import './UserDetails.css';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Upload, message } from 'antd';
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { SearchBar } from '../../components/SearchBar/SearchBar';

export function UserDetails() {
	function beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}
	const uploadButton = (
		<div className=" d-flex flex-column justify-content-center upload-btn">
			<UploadIcon className="align-self-center" />
			<text className="upload-text">
				Anexar<br />Documentos
			</text>
		</div>
	);

	return (
		<div className="user-details pb-5">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<span className="user-name">Fazenda São Miguel</span>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				<div className="d-flex">
					<SolidPrimaryButton text={'Trocar Senha'} onClick={() => {}} btnStyle={'change-pass-btn'} />
					<ButtonWithIcon text={'Excluir Fazenda'} onClick={() => {}} btnStyle={'delete-button'} />
				</div>
			</div>
			<div className="d-flex flex-wrap contact-info-div">
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">CPF/CNPJ:</text>
					<text className="cpf">082.159.119-35</text>
				</div>
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">Telefone:</text>
					<text className="cpf">(47) 99938 6147</text>
				</div>
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">Telefone:</text>
					<text className="cpf email">(47) 99938 6147</text>
				</div>
			</div>
			<div className="d-flex">
				<img
					src={
						'data:image/jpeg;base64,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'
					}
					className="uploaded-img"
				/>
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
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
			</div>
			<h1 className="heading-light extra-top-margin">Permissões - Gestão de Documentos</h1>
			<div className="d-flex flex-wrap ">
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
				<CheckBox text={'Gestão de Usuários'} className="checkbox-user-details" />
			</div>
			<h1 className="heading-light extra-top-margin">Permissões - Aplicativo (Imóveis)</h1>
			<div className="d-flex justify-content-between mt-4">
				<SearchBar />
				<CheckBox text={'Selecionar Todos'} />
			</div>
		</div>
	);
}
