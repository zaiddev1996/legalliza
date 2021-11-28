import { React, useState, useEffect } from 'react';
import './FarmDash.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { message, Table, Input, Button, Space } from 'antd';
import History from '../../@history';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';
import { Loader } from '../../components/loader/loader';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export function FarmDash() {
	const { getAllFarms } = useFarmManagement();
	const [ farms, setFarms ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ searchText, setSearchText ] = useState('');
	const [ searchedColumn, setSearchColumn ] = useState('');

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

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					// ref={(node) => {
					// 	this.searchInput = node;
					// }}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
					{/* <Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							set
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex
							});
						}}
					>
						Filter
					</Button> */}
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
		// onFilterDropdownVisibleChange: (visible) => {
		// 	if (visible) {
		// 		setTimeout(() => this.searchInput.select(), 100);
		// 	}
		// },
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[ searchText ]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			)
	});

	const columns = [
		{
			title: 'Fazenda',
			dataIndex: 'farm',
			key: 'farm',
			...getColumnSearchProps('farm')
		},
		{
			title: 'Localização',
			dataIndex: 'location',
			key: 'location',
			...getColumnSearchProps('location')
		},
		{
			title: 'Latitude | Longitude',
			dataIndex: 'longitude',
			key: 'longitude',
			...getColumnSearchProps('longitude')
		},
		{
			title: 'Imóveis',
			dataIndex: 'properties',
			key: 'properties',
			...getColumnSearchProps('properties')
		},
		{
			title: 'Usuários',
			dataIndex: 'users',
			key: 'users',
			...getColumnSearchProps('users')
		},
		{
			title: 'Fazenda Legal',
			dataIndex: 'legal',
			key: 'legal',
			...getColumnSearchProps('legal')
		}
	];

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	return (
		<div className="farm-main">
			<div className="d-flex justify-content-end">
				{/* <SearchBar
					onChange={(val) => {
						onSearchFarms(val);
					}}
				/> */}
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
