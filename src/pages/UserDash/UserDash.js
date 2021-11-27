import { React, useEffect } from 'react';
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
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { Loader } from '../../components/loader/loader';
import { GrantPropertyAccessModal } from '../../components/GrantPropertyAccessModal/GrantPropertyAccessModal';

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
	const [ isSecondModalVisible, setIsSecondModalVisible ] = useState(false);
	const [ userRows, setUserRows ] = useState(dataSource);
	const { getAllUsers } = useUsersManagement();
	const [ usersList, setUsersList ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ selectedUserId, setSelectedUserId ] = useState();

	useEffect(() => {
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
	}, []);

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
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
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
							History.push({ pathname: `/user-details/${record.key}` });
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
