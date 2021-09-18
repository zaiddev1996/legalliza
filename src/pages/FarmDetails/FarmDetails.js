import React from 'react';
import './FarmDetails.css';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { Select } from 'antd';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Table } from 'antd';
import History from '../../@history';

export function FarmDetails() {
	const { Option } = Select;
	const dataSource = [
		{
			key: '1',
			property: 'Rancho Fundo I',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			users: '3',
			documents: '8/11'
		},
		{
			key: '2',
			property: 'Rancho Fundo II',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			users: '3',
			documents: '11/11'
		}
	];

	const columns = [
		{
			title: 'Imóvel',
			dataIndex: 'property',
			key: 'property'
		},
		{
			title: 'Localização',
			dataIndex: 'location',
			key: 'location'
		},
		{
			title: 'Latitude | Longitude',
			dataIndex: 'longitude',
			key: 'longitude'
		},
		{
			title: 'Usuários',
			dataIndex: 'users',
			key: 'users'
		},
		{
			title: 'Documentos',
			dataIndex: 'documents',
			key: 'documents'
		}
	];
	return (
		<div className="farm-details">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<span className="farm-name">Fazenda São Miguel</span>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				<ButtonWithIcon text={'Excluir Fazenda'} onClick={() => {}} btnStyle={'delete-button'} />
			</div>
			<div className="d-flex farm-detail-div flex-wrap">
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
					<span className="align-self-start detail-heading">Fazenda Legal:</span>
					<Select defaultValue="30" className="select-options legal">
						<Option value="30">30%</Option>
						<Option value="40">40%</Option>
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
			<div className="d-flex justify-content-between search-bar-div">
				<SearchBar />
				<SolidPrimaryButton
					text={'+ Novo Imóvel'}
					onClick={() => {
						History.push({ pathname: '/property-details' });
					}}
				/>
			</div>
			<Table dataSource={dataSource} columns={columns} className="property-table" />;
		</div>
	);
}
