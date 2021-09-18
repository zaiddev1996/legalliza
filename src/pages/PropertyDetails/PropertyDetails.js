import { React } from 'react';
import './PropertyDetails.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { Select } from 'antd';
import { Table } from 'antd';
import History from '../../@history';

export function PropertyDetails() {
	const { Option } = Select;
	const dataSource = [
		{
			key: '1',
			name: 'Felipe Dallagnolo',
			cpf: '082.159.119-35'
		},
		{
			key: '2',
			name: 'Felipe Dallagnolo',
			cpf: '082.159.119-35'
		},
		{
			key: '3',
			name: 'Felipe Dallagnolo',
			cpf: '082.159.119-35'
		},
		{
			key: '4',
			name: 'Felipe Dallagnolo',
			cpf: '082.159.119-35'
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
		}
	];
	return (
		<div className="property-details">
			<p className="farm-name">Fazenda São Miguel</p>
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<span className="property-name">Rancho Fundo I</span>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				<ButtonWithIcon text={'Excluir Imóvel'} onClick={() => {}} btnStyle={'delete-button'} />
			</div>
			<div className="d-flex flex-wrap property-detail-div">
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Estado:</span>
					<Select defaultValue="SC" className="select-options state">
						<Option value="SC">SC</Option>
						<Option value="WC">WC</Option>
					</Select>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Município:</span>
					<Select defaultValue="Jaraguá do Sul" className="select-options county">
						<Option value="Jaraguá do Sul">Jaraguá do Sul</Option>
						<Option value="Jaraguá do Sull">Jaraguá do Sul</Option>
					</Select>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Latitude:</span>
					<div className="d-flex">
						<input value="15º" className="input-location-points degree" />
						<input value="52’" className="input-location-points minutes" />
						<input value="57.10’’" className="input-location-points seconds" />
						<Select defaultValue="S" className="select-options latitude">
							<Option value="S">S</Option>
							<Option value="D">D</Option>
						</Select>
					</div>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Longitude:</span>
					<div className="d-flex">
						<input value="15º" className="input-location-points degree" />
						<input value="52’" className="input-location-points minutes" />
						<input value="57.10’’" className="input-location-points seconds" />
						<Select defaultValue="S" className="select-options latitude">
							<Option value="S">S</Option>
							<Option value="D">D</Option>
						</Select>
					</div>
				</div>
			</div>
			<div className="line-seperator" />
			<div class="container documents-div">
				<div class="row">
					<div class="col-7 left-col">
						<div className="d-flex justify-content-between">
							<SearchBar />
							<SolidPrimaryButton
								text={'+ Novo Usuário'}
								onClick={() => {
									History.push({ pathname: '/registration' });
								}}
							/>
						</div>
						<Table dataSource={dataSource} columns={columns} className="user-table" />;
					</div>
					<div class="col-5 right-col">
						<p className="documents-heading">Documentos:</p>
						<div className="container documents-container">
							<div className="row">
								<div className="col-3 document">
									<span className="document-text">Matrícula</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">GEO</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">CCIR</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">CAR</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">LAR</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">Outorga</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">ITR</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">ADA</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">Laudo</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">GSSMATR</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">LTCAT</span>
								</div>
								<div className="col-3 document">
									<span className="document-text">GEO</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
