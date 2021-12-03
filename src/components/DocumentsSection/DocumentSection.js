import React, { useState, useEffect } from 'react';
import './DocumentSection.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { message, Table, Popconfirm, Input, Space, Button } from 'antd';
import History from '../../@history';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';
import { Loader } from '../../components/loader/loader';
import { ReactComponent as DeleteBtn } from '../../assets/images/delete-icon-white.svg';
import { ReactComponent as DownloadBtn } from '../../assets/images/download.svg';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import { NewDocumentModal } from '../NewDocumentModal/NewDocumentModal';
import { useDocumentManagement } from '../../hooks/documents/useDocumentManagment';
import { useManageFiles } from '../../hooks/files/useManageFiles';
import { NewDocumentDataModal } from '../NewDocumentDataModal/NewDocumentDataModal';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { OwnerSignupModal } from '../OwnerSignupModal/OwnerSignupModal';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { AddOwnerModal } from '../AddOwnerModal/AddOwnerModal';

export function DocumentSection({ name, farmId, propertyId }) {
	const [ loading, setLoading ] = useState(false);
	const [ fileModalVisibility, setFileModalVisibility ] = useState(false);
	const [ documentDataVisibility, setDocumentDataVisibility ] = useState(false);
	const {
		getAllDocuments,
		deleteDocument,
		updateColumnName,
		getColumnNames,
		getAllDocumentData,
		deleteDocumentData
	} = useDocumentManagement();
	const [ documentList, setDocumentList ] = useState([]);
	const [ documentDataList, setDocumentDataList ] = useState([]);
	const [ ownersList, setOwnersList ] = useState([]);
	const [ columnName, setColumnName ] = useState('');
	const [ columnNames, setColumnNames ] = useState({
		first: 'Type here',
		second: 'Type here',
		third: 'Type here',
		fourth: 'Type here',
		fifth: 'Type here'
	});
	const [ searchText, setSearchText ] = useState('');
	const [ searchedColumn, setSearchColumn ] = useState('');
	const [ ownerSignupVisibility, setOwnerSignupVisibility ] = useState(false);
	const { getPropertyOwners, deleteOwner } = usePropertyManagement();
	const { getUserData } = useUsersManagement();

	useEffect(
		() => {
			setColumnNames({
				...columnNames,
				first: 'Type here',
				second: 'Type here',
				third: 'Type here',
				fourth: 'Type here',
				fifth: 'Type here'
			});
			populateOwnerTable();
			populateDocumentsTable();
			populateDataTableHeader();
			populateDocumentsDataTable();
		},
		[ name ]
	);
	const populateOwnerTable = () => {
		setLoading(true);
		getPropertyOwners(propertyId)
			.then((list) => {
				console.log(list);
				for (let i = 0; i < list.length; i++) {
					getUserData(list[i].owner)
						.then((userData) => {
							list[i] = { ...list[i], ...userData };
							if (i == list.length - 1) {
								setOwnersList(list);
								console.log(ownersList);
								setLoading(false);
							}
						})
						.catch(() => {
							setLoading(false);
							message.error('Some error happened');
						});
				}
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				message.error('Some error happened');
			});
	};
	const populateDataTableHeader = () => {
		setLoading(true);
		getColumnNames(farmId, propertyId, name)
			.then((data) => {
				setLoading(false);
				if (data != undefined) {
					var tempList = {
						...{
							first: 'Type here',
							second: 'Type here',
							third: 'Type here',
							fourth: 'Type here',
							fifth: 'Type here'
						},
						...data
					};
					setColumnNames(tempList);
				}
			})
			.catch((error) => {
				setLoading(false);
				message.error('Some error happened');
			});
	};
	const populateDocumentsTable = () => {
		setLoading(true);
		getAllDocuments(farmId, propertyId, name)
			.then((list) => {
				// console.log(list);
				setDocumentList(list);
				console.log(documentList);
				setLoading(false);
			})
			.catch((error) => {
				message.error(error);
				setLoading(false);
			});
	};
	const populateDocumentsDataTable = () => {
		setLoading(true);
		getAllDocumentData(farmId, propertyId, name)
			.then((list) => {
				// console.log(list);
				setDocumentDataList(list);
				// console.log(documentList);
				setLoading(false);
			})
			.catch((error) => {
				message.error(error);
				setLoading(false);
			});
	};

	const getDocumentColumnSearchProps = (dataIndex) => ({
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

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					// ref={(node) => {
					// 	this.searchInput = node;
					// }}
					placeholder={`Enter column name`}
					value={columnName}
					onChange={(e) => setColumnName(e.target.value)}
					//   onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => {
							if (columnName.length > 0) {
								confirm();
								setLoading(true);
								var data = { [dataIndex]: columnName };
								updateColumnName(farmId, propertyId, name, data)
									.then(() => {
										populateDataTableHeader();
										// setLoading(false);
									})
									.catch((error) => {
										setLoading(false);
										message.error('Some error happened');
									});
							} else {
								message.error('Enter name first');
							}
						}}
						size="small"
						style={{ width: 90 }}
					>
						Atualizar
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <EditIcon />,
		// onFilter: (value, record) =>
		// 	record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
		onFilterDropdownVisibleChange: (visible) => {
			if (!visible) {
				setColumnName('');
				// setTimeout(() => this.searchInput.select(), 100);
			}
		}
	});

	const columns = [
		{
			title: columnNames.first,
			dataIndex: 'first',
			key: 'first',
			...getColumnSearchProps('first')
		},
		{
			title: columnNames.second,
			dataIndex: 'second',
			key: 'second',
			...getColumnSearchProps('second')
		},
		{
			title: columnNames.third,
			dataIndex: 'third',
			key: 'third',
			...getColumnSearchProps('third')
		},
		{
			title: columnNames.fourth,
			dataIndex: 'fourth',
			key: 'fourth',
			...getColumnSearchProps('fourth')
		},
		{
			title: columnNames.fifth,
			dataIndex: 'fifth',
			key: 'fifth',
			...getColumnSearchProps('fifth')
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
							deleteDocumentData(farmId, propertyId, name, record.key)
								.then(() => {
									setLoading(false);
									const data = documentDataList.filter((item) => item.key !== record.key);
									setDocumentDataList(data);
								})
								.catch((error) => {
									setLoading(false);
									message.error(error);
								});
						}}
					>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
		}
	];

	const documentsTableColumns = [
		{
			title: 'Tipo de Documento',
			dataIndex: 'type',
			key: 'type',
			...getDocumentColumnSearchProps('type')
		},
		{
			title: 'Observações',
			dataIndex: 'comments',
			key: 'comments',
			...getDocumentColumnSearchProps('comments')
		},
		{
			title: 'Anexado Por',
			dataIndex: 'addedBy',
			key: 'addedBy',
			...getDocumentColumnSearchProps('addedBy')
		},
		{
			title: 'Anexos',
			dataIndex: 'Anexos',
			render: (_, record) => (
				<div>
					<a href={record.url} download target="_blank">
						<DownloadBtn
							className="delete-btn"
							fill="#D15757"
							// onClick={() => {
							// 	downloadFile(record.url);
							// }}
						/>
						{/* download */}
					</a>
				</div>
			)
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record, rowIndex) => (
				<div>
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => {
							console.log(record.key);
							setLoading(true);
							deleteDocument(farmId, propertyId, name, record.key)
								.then(() => {
									setLoading(false);
									const data = documentList.filter((item) => item.key !== record.key);
									setDocumentList(data);
								})
								.catch((error) => {
									setLoading(false);
									message.error(error);
								});
						}}
					>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
		}
	];

	const ownersTableColumns = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
			...getDocumentColumnSearchProps('name')
		},
		{
			title: 'CPF',
			dataIndex: 'cpf',
			key: 'cpf',
			...getDocumentColumnSearchProps('comments')
		},
		{
			title: 'Porcentagem',
			dataIndex: 'percentage',
			key: 'percentage',
			...getDocumentColumnSearchProps('percentage'),
			render: (_, record, rowIndex) => <div>{record.percentage}%</div>
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Telefone',
			dataIndex: 'telephone',
			key: 'telephone'
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, record, rowIndex) => (
				<div>
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => {
							console.log(record.key);
							setLoading(true);
							deleteOwner(propertyId, record.key)
								.then(() => {
									setLoading(false);
									const data = ownersList.filter((item) => item.key !== record.key);
									setOwnersList(data);
								})
								.catch((error) => {
									setLoading(false);
									message.error(error);
								});
						}}
					>
						<DeleteBtn className="delete-btn" fill="#D15757" />
					</Popconfirm>
				</div>
			)
		}
	];

	const onNewDocument = () => {
		setFileModalVisibility(true);
	};

	return (
		<div className="document-section-main">
			<div className="line-seperator" />
			<p className="documents-heading">{name}:</p>
			<div className="d-flex justify-content-between">
				<SearchBar />
				<SolidPrimaryButton
					text={`+ Nova ${name}`}
					onClick={() => {
						setDocumentDataVisibility(true);
					}}
				/>
			</div>
			<Table dataSource={documentDataList} columns={columns} className="farmers-table" />
			{name == 'Matrícula' ? (
				<div>
					{' '}
					<div className="line-seperator" />
					<p className="documents-heading">Proprietários:</p>
					<div className="d-flex justify-content-end">
						{/* <SearchBar /> */}
						<SolidPrimaryButton
							text={'+ Novo Proprietário'}
							onClick={() => {
								setOwnerSignupVisibility(true);
								// onNewDocument();
							}}
						/>
					</div>
					<Table dataSource={ownersList} columns={ownersTableColumns} className="farmers-table" />
				</div>
			) : (
				<div />
			)}

			<div className="line-seperator" />
			<p className="documents-heading">Documentos de {name}:</p>
			<div className="d-flex justify-content-end">
				{/* <SearchBar /> */}
				<SolidPrimaryButton
					text={'+ Novo Documento'}
					onClick={() => {
						onNewDocument();
					}}
				/>
			</div>
			<Table dataSource={documentList} columns={documentsTableColumns} className="farmers-table" />
			{fileModalVisibility ? (
				<NewDocumentModal
					visible={fileModalVisibility}
					name={name}
					farmId={farmId}
					propertyId={propertyId}
					changeVisibility={() => {
						setFileModalVisibility(false);
						populateDocumentsTable();
					}}
				/>
			) : (
				<div />
			)}

			{documentDataVisibility ? (
				<NewDocumentDataModal
					visible={documentDataVisibility}
					name={name}
					farmId={farmId}
					propertyId={propertyId}
					changeVisibility={() => {
						setDocumentDataVisibility(false);
						populateDocumentsDataTable();
					}}
				/>
			) : (
				<div />
			)}
			{ownerSignupVisibility ? (
				<AddOwnerModal
					visible={ownerSignupVisibility}
					farmId={farmId}
					propertyId={propertyId}
					changeVisibility={() => {
						setOwnerSignupVisibility(false);
						populateOwnerTable();
					}}
				/>
			) : (
				<div />
			)}

			<Loader visible={loading} />
		</div>
	);
}
