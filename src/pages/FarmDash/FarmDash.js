import { React } from 'react';
import './FarmDash.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Table } from 'antd';
import History from '../../@history';

export function FarmDash() {
	const dataSource = [
		{
			key: '1',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '2',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '3',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '4',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '5',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '6',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '7',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		},
		{
			key: '8',
			farm: 'Fazenda São Miguel',
			location: 'Jaraguá do Sul/GO',
			longitude: '15º52’57.10’’S | 49º40’3.85’’O',
			properties: '4',
			users: '3',
			legal: '30%'
		}
	];

	const columns = [
		{
			title: 'Fazenda',
			dataIndex: 'farm',
			key: 'farm'
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
			title: 'Imóveis',
			dataIndex: 'properties',
			key: 'properties'
		},
		{
			title: 'Usuários',
			dataIndex: 'users',
			key: 'users'
		},
		{
			title: 'Fazenda Legal',
			dataIndex: 'legal',
			key: 'legal'
		}
	];
	return (
		<div className="farm-main">
			<div className="d-flex justify-content-between">
				<SearchBar />
				<SolidPrimaryButton
					text={'+ Nova Fazenda'}
					onClick={() => {
						History.push({ pathname: '/farm-details' });
					}}
				/>
			</div>
			<Table dataSource={dataSource} columns={columns} className="farms-table" />;
		</div>
	);
}
