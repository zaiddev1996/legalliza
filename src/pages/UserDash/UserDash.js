import { React } from 'react';
import './UserDash.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import History from '../../@history';
import { Table, Popconfirm } from 'antd';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { ReactComponent as DeleteBtn } from '../../assets/images/delete-icon-white.svg';
import { useState } from 'react';
import { Modal } from 'antd';
import { ReactComponent as FileIcon } from '../../assets/images/file-icon.svg';
import { ReactComponent as FarmIcon } from '../../assets/images/farm-icon.svg';

const dataSource = [
	{
		key: '1',
		name: 'Fazenda São Miguel',
		cpf: '082.159.119-35'
	},
	{
		key: '2',
		name: 'Fazenda São Miguel',
		cpf: '082.159.119-35'
	},
	{
		key: '3',
		name: 'Fazenda São Miguel',
		cpf: '082.159.119-35'
	},
	{
		key: '4',
		name: 'Fazenda São Miguel',
		cpf: '082.159.119-35'
	}
];
export function UserDash() {
	const [ isFirstModalVisible, setIsFirstModalVisible ] = useState(false);
	const [ isSecondModalVisible, setIsSecondModalVisible ] = useState(false);
	const [ userRows, setUserRows ] = useState(dataSource);

	const showFirstModal = () => {
		setIsFirstModalVisible(true);
	};
	const hideFirstModal = () => {
		setIsFirstModalVisible(false);
	};
	const showSecondModal = () => {
		setIsSecondModalVisible(true);
	};
	const hideSecondModal = () => {
		setIsSecondModalVisible(false);
	};
	const dataSource2 = [
		{
			key: '1',
			name: 'Fazenda São Miguel',
			cpf: '082.159.119-35'
		},
		{
			key: '2',
			name: 'Fazenda São Miguel',
			cpf: '082.159.119-35'
		},
		{
			key: '3',
			name: 'Fazenda São Miguel',
			cpf: '082.159.119-35'
		}
	];
	const dataSource3 = [
		{
			key: '1',
			name: 'Rancho Fundo I',
			cpf: 'Formosa/GO'
		},
		{
			key: '2',
			name: 'Rancho Fundo I',
			cpf: 'Formosa/GO'
		},
		{
			key: '3',
			name: 'Rancho Fundo I',
			cpf: 'Formosa/GO'
		}
	];

	const columns = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'CPF/CNPJ',
			dataIndex: 'cpf',
			key: 'cpf'
		},
		{
			title: 'Gestão Usuários',
			dataIndex: 'user_management',
			render: () => <CheckBox onChange={() => {}} customStyle={'checkbox-style-light'} />
		},
		{
			title: 'Gestão Fazendas',
			dataIndex: 'farm_management',
			render: () => <CheckBox onChange={() => {}} customStyle={'checkbox-style-light'} />
		},
		{
			title: 'Gestão Documentos',
			dataIndex: 'documnets_management',
			render: () => <CheckBox onChange={() => {}} customStyle={'checkbox-style-light'} />
		},
		{
			title: 'Acesso Aplicativo',
			dataIndex: 'appliaction_access',
			render: () => <CheckBox onChange={() => {}} customStyle={'checkbox-style-light'} />
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div>
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
		}
	];
	const columns2 = [
		{
			title: 'Nome',
			dataIndex: 'name',
			render: () => (
				<div className="d-flex">
					<CheckBox className="align-self-center" customStyle={'checkbox-style mt-0'} />
					<div className="d-flex flex-column">
						<text className="permission-field-1">Fazenda São Miguel</text>
						<text className="permission-field-2">Jaraguá do Sul/GO</text>
					</div>
				</div>
			)
		},
		{
			title: 'CPF/CNPJ',
			dataIndex: 'cpf',
			render: () => (
				<div className="d-flex flex-column">
					<text className="permission-field-1">15º52’57.10’’S | 49º40’3.85’’O</text>
					<text className="permission-field-2">2 Imóveis</text>
				</div>
			)
		}
	];
	const columns3 = [
		{
			title: 'Nome',
			dataIndex: 'name',
			render: () => (
				<div className="d-flex">
					<CheckBox className="align-self-center" customStyle={'checkbox-style mt-0'} />
					<text className="permission-field-1">Rancho Fundo I</text>
				</div>
			)
		},
		{
			title: 'CPF/CNPJ',
			dataIndex: 'cpf',
			render: () => <text className="permission-field-1">Formosa/GO</text>
		}
	];
	const handleDelete = (key) => {
		const data = userRows.filter((item) => item.key !== key);
		console.log(data);
		setUserRows(data);
	};
	return (
		<div className="farmer-dashboard">
			<div className="d-flex justify-content-between">
				<SearchBar />
				<SolidPrimaryButton
					text={'+ Novo Usuário'}
					onClick={() => {
						showFirstModal();
					}}
				/>
			</div>
			<Table dataSource={userRows} columns={columns} className="farmers-table" />
			<Modal
				title={null}
				content={null}
				footer={null}
				visible={isFirstModalVisible}
				bodyStyle={{
					background: 'rgba(52, 52, 52, 0.0)',
					borderRadius: '8px'
				}}
				style={{
					backgroundColor: 'rgba(52, 52, 52, 0.0)'
				}}
				wrapClassName="custom-dial"
			>
				<div>
					<div className="custom-modal-header d-flex">
						<FileIcon className="align-self-center header-icon-modal" />
						<span className="align-self-center header-title-text">Permissão - Gestão de Documentos</span>
					</div>
					<div className="custom-modal-body">
						<text className="select-docs-text">
							Selecione os documentos que podem ser editados pelo usuário:
						</text>
						<div className="container">
							<div className="row">
								<div className="col-3 documents-col">
									<CheckBox text="Matrícula" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="GEO" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="CCIR" customStyle={'checkbox-style'} />
								</div>
							</div>
							<div className="row">
								<div className="col-3 documents-col">
									<CheckBox text="CAR" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="LAR" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="Outorga" customStyle={'checkbox-style'} />
								</div>
							</div>
							<div className="row">
								<div className="col-3 documents-col">
									<CheckBox text="ITR" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="ADA" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="Laudo" customStyle={'checkbox-style'} />
								</div>
							</div>
							<div className="row">
								<div className="col-3 documents-col">
									<CheckBox text="GSSMATR" customStyle={'checkbox-style'} />
								</div>
								<div className="col-3 documents-col">
									<CheckBox text="LTCAT" customStyle={'checkbox-style'} />
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-end">
							<SolidPrimaryButton
								text={'Cancelar'}
								btnStyle={'cancel-btn-modal'}
								onClick={() => {
									hideFirstModal();
								}}
							/>
							<SolidPrimaryButton
								text={'Confirmar'}
								btnStyle={'confirm-btn-modal'}
								onClick={() => {
									hideFirstModal();
									showSecondModal();
								}}
							/>
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				title={null}
				content={null}
				footer={null}
				visible={isSecondModalVisible}
				bodyStyle={{
					background: 'rgba(52, 52, 52, 0.0)',
					borderRadius: '8px'
				}}
				style={{
					backgroundColor: 'rgba(52, 52, 52, 0.0)'
				}}
				wrapClassName="custom-dial"
			>
				<div>
					<div className="custom-modal-header-2 d-flex">
						<FarmIcon className="align-self-center header-icon-modal" />
						<span className="align-self-center header-title-text">Aplicativo - Permissão Imóveis</span>
					</div>
					<div className="custom-modal-body-2">
						<text className="select-docs-text">
							Selecione os imóveis que o usuário pode visualizar no aplicativo:
						</text>
						<div className=" d-flex justify-content-between searchbar-div">
							<SearchBar className="modal-searchbar" />
							<CheckBox
								text={'Selecionar Todos'}
								className="align-self-center"
								customStyle={'checkbox-style mt-0'}
							/>
						</div>
						<Table
							dataSource={dataSource2}
							columns={columns2}
							className="farmers-table hide-header"
							pagination={false}
							showHeader={false}
							expandable={{
								expandedRowRender: (record) => (
									<Table
										pagination={false}
										showHeader={false}
										dataSource={dataSource3}
										columns={columns3}
										className="farmers-table mt-0 "
									/>
								),
								rowExpandable: (record) => record.name !== 'Not Expandable',
								expandRowByClick: true,
								expandIconColumnIndex: 2
							}}
						/>

						<div className="d-flex justify-content-end">
							<SolidPrimaryButton
								text={'Cancelar'}
								btnStyle={'cancel-btn-modal'}
								onClick={() => {
									hideSecondModal();
								}}
							/>
							<SolidPrimaryButton
								text={'Confirmar'}
								btnStyle={'confirm-btn-modal'}
								onClick={() => {
									History.push({
										pathname: '/user-details'
									});
								}}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
