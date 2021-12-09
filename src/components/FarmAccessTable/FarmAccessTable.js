import React, { useState, useEffect } from 'react';
import './FarmAccessTable.css';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Table, message, Input, Button, Space, Popconfirm } from 'antd';
import { ReactComponent as DeleteBtn } from '../../assets/images/delete-icon-white.svg';
import History from '../../@history';
import { Loader } from '../../components/loader/loader';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { GrantFarmAccessModal } from '../GrantFarmAccessModal/GrantFarmAccessModal';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';

export function FarmAccessTable({ id, data, reloadFarm }) {
	const [ loading, setLoading ] = useState(false);
	const [ farmAccessModalVisibility, setFarmAccessModalVisibility ] = useState(false);
	const [ farmId, setFarmId ] = useState(id);
	const [ farmData, setFarmdata ] = useState(data);
	const [ users, setUsers ] = useState([]);
	const [ searchText, setSearchText ] = useState('');
	const [ searchedColumn, setSearchColumn ] = useState('');
	const { getMultipleUsers } = useUsersManagement();
	const { updateFarm } = useFarmManagement();

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
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
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

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};

	const columns = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name')
		},
		{
			title: 'CPF',
			dataIndex: 'cpf',
			key: 'cpf',
			...getColumnSearchProps('cpf')
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email')
		},
		{
			title: 'Telefone',
			dataIndex: 'telephone',
			key: 'telephone',
			...getColumnSearchProps('telephone')
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div>
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => {
							console.log(record.key);
							setLoading(true);
							var farmIdsArray = [];
							for (let i = 0; i < users.length; i++) {
								if (users[i].uid != record.key) {
									farmIdsArray.push(users[i].key);
								}
							}
							// console.log(farmId);
							updateFarm(id, { farmAccess: farmIdsArray })
								.then(() => {
									setLoading(false);
									message.success('Farm access revoked for one user');
									reloadFarm();
								})
								.catch((error) => {
									setLoading(false);
									console.log(error);
									message.error('Some error happened');
								});
							console.log(farmIdsArray);
						}}
					>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
		}
	];

	useEffect(
		() => {
			if (id != undefined) {
				setFarmId(id);
				setFarmdata(data);
				console.log(data);
				getPrivilligedUsers();
			}
		},
		[ data ]
	);

	const getPrivilligedUsers = () => {
		if (data.farmAccess && data.farmAccess.length > 0) {
			setLoading(true);
			getMultipleUsers(data.farmAccess)
				.then((list) => {
					setUsers(list);
					setLoading(false);
				})
				.catch((error) => {
					message.error('Some error happened');
					setLoading(false);
				});
		}
	};

	return (
		<div className="farm-access-table">
			<div>
				<div className="d-flex justify-content-end search-bar-div">
					{/* <SearchBar /> */}
					<SolidPrimaryButton
						text={'+ adicionar usuário'}
						onClick={() => {
							setFarmAccessModalVisibility(true);
							// History.push({ pathname: `/property-details/${singularDetailsState.name}/${farmId}` });
						}}
					/>
				</div>
				<Table
					onRow={(record, rowIndex) => {
						return {
							onClick: (event) => {
								History.push(
									{
										// pathname: `/property-details/${singularDetailsState.name}/${farmId}/${record.key}`
									}
								);
							}, // click row
							onDoubleClick: (event) => {}, // double click row
							onContextMenu: (event) => {}, // right button click row
							onMouseEnter: (event) => {}, // mouse enter row
							onMouseLeave: (event) => {} // mouse leave row
						};
					}}
					dataSource={users}
					columns={columns}
					className="property-table"
				/>
			</div>
			{farmAccessModalVisibility ? (
				<GrantFarmAccessModal
					visible={farmAccessModalVisibility}
					id={farmId}
					changeVisibility={() => {
						setFarmAccessModalVisibility(false);
						reloadFarm();
					}}
				/>
			) : (
				<div />
			)}

			<Loader visible={loading} />
		</div>
	);
}
