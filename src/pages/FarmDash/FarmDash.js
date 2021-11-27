import { React, useState, useEffect } from 'react';
import './FarmDash.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { message, Table } from 'antd';
import History from '../../@history';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';
import { Loader } from '../../components/loader/loader';

export function FarmDash() {
	const { getAllFarms } = useFarmManagement();
	const [ farms, setFarms ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllFarms()
			.then((farmList) => {
				setLoading(false);
				setFarms(farmList);
			})
			.catch((error) => {
				setLoading(false);
				message.error(error);
			});
	}, []);

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
				<SearchBar onChange={() => {}} />
				<SolidPrimaryButton
					text={'+ Nova Fazenda'}
					onClick={() => {
						History.push({ pathname: '/farm-details', state: 'create' });
					}}
				/>
			</div>
			<Table
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							History.push({ pathname: `/farm-details/${record.key}` });
						}, // click row
						onDoubleClick: (event) => {}, // double click row
						onContextMenu: (event) => {}, // right button click row
						onMouseEnter: (event) => {}, // mouse enter row
						onMouseLeave: (event) => {} // mouse leave row
					};
				}}
				dataSource={farms}
				columns={columns}
				className="farms-table"
			/>
			<Loader visible={loading} />
		</div>
	);
}
