import { React, useEffect } from 'react';
import './UserDash.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import History from '../../@history';
import { Table, Popconfirm, Input, Button, Space, message } from 'antd';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { ReactComponent as DeleteBtn } from '../../assets/images/delete-icon-white.svg';
import { useState } from 'react';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { Loader } from '../../components/loader/loader';
import { GrantPropertyAccessModal } from '../../components/GrantPropertyAccessModal/GrantPropertyAccessModal';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export function UserDash() {
	const [ isSecondModalVisible, setIsSecondModalVisible ] = useState(false);

	const { getAllUsers, deleteUser } = useUsersManagement();
	const [ usersList, setUsersList ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ selectedUserId, setSelectedUserId ] = useState();
	const [ searchText, setSearchText ] = useState('');
	const [ searchedColumn, setSearchColumn ] = useState('');

	useEffect(() => {
		getUsersList();
	}, []);

	const getUsersList = () => {
		setLoading(true);
		getAllUsers()
			.then((list) => {
				setUsersList(list);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log('Some error happened');
			});
	};

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
			title: 'CPF/CNPJ',
			dataIndex: 'cpf',
			key: 'cpf',
			...getColumnSearchProps('cpf')
		},
		{
			title: 'Gestão Usuários',
			dataIndex: 'userManagementPermission',
			render: (_, record) => (
				<CheckBox
					onChange={() => {}}
					customStyle={'checkbox-style-light'}
					checked={record.userManagementPermission}
				/>
			)
		},
		{
			title: 'Gestão Fazendas',
			dataIndex: 'farmManagementPermission',
			render: (_, record) => (
				<CheckBox
					onChange={() => {}}
					customStyle={'checkbox-style-light'}
					checked={record.farmManagementPermission}
				/>
			)
		},
		{
			title: 'Gestão Documentos',
			dataIndex: 'documentManagementPermission',
			render: (_, record) => (
				<CheckBox
					onChange={() => {}}
					customStyle={'checkbox-style-light'}
					checked={record.documentManagementPermission}
				/>
			)
		},
		{
			title: 'Acesso Aplicativo',
			dataIndex: 'appAccessPermission',
			render: (_, record) => (
				<span
					onClick={(e) => {
						e.stopPropagation();
						if (record.appAccessPermission) {
							setSelectedUserId(record.key);
							setIsSecondModalVisible(true);
						}
					}}
				>
					<CheckBox customStyle={'checkbox-style-light'} checked={record.appAccessPermission} />
				</span>
			)
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record) => (
				<div>
					<Popconfirm
						title="Sure to delete?"
						onClick={(e) => {
							e.stopPropagation();
						}}
						onConfirm={(e) => {
							e.stopPropagation();
							handleDelete(record.key);
						}}
					>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
		}
	];

	const handleDelete = (key) => {
		setLoading(true);
		deleteUser(key)
			.then(() => {
				setLoading(false);
				getUsersList();
			})
			.catch((error) => {
				setLoading(false);
				message.error('Some error happened');
			});
		// const data = userRows.filter((item) => item.key !== key);
		// console.log(data);
		// setUserRows(data);
	};
	return (
		<div className="farmer-dashboard">
			<div className="d-flex justify-content-end">
				{/* <SearchBar /> */}
				<SolidPrimaryButton
					text={'+ Novo Usuário'}
					onClick={() => {
						History.push({
							pathname: `/signup/User`
						});
					}}
				/>
			</div>
			<Table
				dataSource={usersList}
				columns={columns}
				className="farmers-table"
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							History.push({ pathname: `/user-details/${record.uid}` });
						}, // click row
						onDoubleClick: (event) => {}, // double click row
						onContextMenu: (event) => {}, // right button click row
						onMouseEnter: (event) => {}, // mouse enter row
						onMouseLeave: (event) => {} // mouse leave row
					};
				}}
			/>
			{selectedUserId ? (
				<GrantPropertyAccessModal
					visible={isSecondModalVisible}
					changeVisibility={() => {
						setIsSecondModalVisible(false);
					}}
					id={selectedUserId}
				/>
			) : (
				<div />
			)}

			<Loader visible={loading} />
		</div>
	);
}
