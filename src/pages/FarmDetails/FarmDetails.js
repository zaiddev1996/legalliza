import React, { useState, useEffect } from 'react';
import './FarmDetails.css';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { Select } from 'antd';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Table, message, Input, Button, Space, Divider } from 'antd';
import History from '../../@history';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';
import { useFarmDetails } from '../../hooks/farms/useFarmDetails';
import { useDetailsValidation } from '../../hooks/farms/useDetailsVaildation';
import { Loader } from '../../components/loader/loader';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { FarmAccessTable } from '../../components/FarmAccessTable/FarmAccessTable';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { PlusOutlined } from '@ant-design/icons';
import { list } from '@firebase/storage';

export function FarmDetails(props) {
	const {
		addNewFarm,
		getFarm,
		updateFarm,
		deleteFarm,
		updateGroupArray,
		getGroupArray,
		getStates,
		getCities
	} = useFarmManagement();
	const { getAllProperties } = usePropertyManagement();
	const { farmSingularDetails } = useFarmDetails();
	const { validateDetails } = useDetailsValidation();
	const [ singularDetailsState, setSingularDetailsState ] = useState(farmSingularDetails);
	const [ loading, setLoading ] = useState(false);
	const [ farmId, setFarmId ] = useState();
	const [ properties, setProperties ] = useState([]);
	const { Option } = Select;
	const [ searchText, setSearchText ] = useState('');
	const [ searchedColumn, setSearchColumn ] = useState('');
	const [ newGroup, setNewGroup ] = useState('');
	const [ groupArray, setGroupArray ] = useState([]);

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
			title: 'Imóvel',
			dataIndex: 'property',
			key: 'property',
			...getColumnSearchProps('property')
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
			title: 'Documentos',
			dataIndex: 'documents',
			key: 'documents',
			...getColumnSearchProps('documents')
		}
	];

	useEffect(() => {
		populateGroupList();
		getStates();
		getCities();
		if (props.match.params.id != undefined) {
			setLoading(true);
			setFarmId(props.match.params.id);
			getFarmDetails();

			getAllProperties(props.match.params.id)
				.then((propertyList) => {
					setLoading(false);
					setProperties(propertyList);
				})
				.catch((error) => {
					setLoading(false);
					message.error(error);
				});
		}
	}, []);

	const populateGroupList = () => {
		setLoading(true);
		getGroupArray()
			.then((data) => {
				setLoading(false);
				setGroupArray(data.farmGroups);
			})
			.catch((error) => {
				setLoading(false);
				message.error(error);
			});
	};

	const getFarmDetails = () => {
		getFarm(props.match.params.id)
			.then((data) => {
				setLoading(false);
				setSingularDetailsState(data);

				console.log(data);
			})
			.catch((error) => {
				setLoading(false);
				message.error(error);
			});
	};

	const onCreateFarm = () => {
		setLoading(true);
		if (validateDetails(singularDetailsState)) {
			console.log(singularDetailsState);
			addNewFarm(singularDetailsState)
				.then((doc) => {
					message.success('New farm added');
					setFarmId(doc);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					message.error(error);
				});
		} else {
			setLoading(false);
			console.log(singularDetailsState);
			message.error('Please input all details');
		}
	};
	const onUpdateFarm = () => {
		setLoading(true);
		if (validateDetails(singularDetailsState)) {
			updateFarm(farmId, singularDetailsState)
				.then(() => {
					message.success('Farm Updated');
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					message.error(error);
				});
		} else {
			setLoading(false);
			console.log(singularDetailsState);
			message.error('Please input all details');
		}
	};
	const onDeleteFarm = () => {
		setLoading(true);
		deleteFarm(farmId)
			.then(() => {
				message.success('Farm Deleted');
				History.push({ pathname: `/farms` });
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				message.error(error);
			});
	};
	return (
		<div className="farm-details">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<input
						className="farm-name"
						value={singularDetailsState.name}
						onChange={(e) => {
							setSingularDetailsState({
								...singularDetailsState,
								name: e.target.value
							});
						}}
					/>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				{farmId == null ? (
					<SolidPrimaryButton
						text={'Salve'}
						onClick={() => {
							onCreateFarm();
						}}
						btnStyle={'create-button'}
					/>
				) : (
					<div className={'d-flex'}>
						<SolidPrimaryButton
							text={'atualizar'}
							onClick={() => {
								onUpdateFarm();
							}}
							btnStyle={'create-button'}
						/>
						<ButtonWithIcon
							text={'Excluir Fazenda'}
							onClick={() => {
								onDeleteFarm();
							}}
							btnStyle={'delete-button'}
						/>
					</div>
				)}
			</div>
			<div className="d-flex farm-detail-div flex-wrap">
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Estado:</span>
					<Select
						value="SC"
						className="select-options state"
						onChange={(e) => {
							singularDetailsState.state = e;
						}}
					>
						{/* <Option value="SC">SC</Option>
						<Option value="WC">WC</Option> */}
					</Select>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Município:</span>
					<Select
						value="Jaraguá do Sul"
						className="select-options county"
						onChange={(e) => {
							singularDetailsState.country = e;
						}}
					>
						{/* <Option value="Jaraguá do Sul">Jaraguá do Sul</Option>
						<Option value="Jaraguá do Sull">Jaraguá do Sul</Option> */}
					</Select>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Fazenda Legal:</span>
					<Select
						value={singularDetailsState.legalFarm}
						className="select-options legal"
						onChange={(e) => {
							singularDetailsState.legalFarm = e;
						}}
					>
						<Option value="0">0%</Option>
						<Option value="10">10%</Option>
						<Option value="20">20%</Option>
						<Option value="30">30%</Option>
						<Option value="40">40%</Option>
						<Option value="50">50%</Option>
						<Option value="60">60%</Option>
						<Option value="70">70%</Option>
						<Option value="80">80%</Option>
						<Option value="90">90%</Option>
						<Option value="100">100%</Option>
					</Select>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Latitude:</span>
					<div className="d-flex">
						<input
							value={singularDetailsState.latDegree.concat('º')}
							className="input-location-points degree"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latDegree: e.target.value.replace('º', '').replace(' ', '')
								});
							}}
						/>
						<input
							value={singularDetailsState.latMinutes.concat('’')}
							className="input-location-points minutes"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latMinutes: e.target.value.replace('’', '').replace(' ', '')
								});
							}}
						/>

						<input
							value={singularDetailsState.latSeconds.concat('’’')}
							className="input-location-points seconds"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latSeconds: e.target.value.replace('’’', '').replace(' ', '')
								});
							}}
						/>
						<Select
							value={singularDetailsState.latDirection}
							className="select-options latitude"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latDirection: e
								});
							}}
						>
							<Option value="E">E</Option>
							<Option value="W">W</Option>
							<Option value="S">S</Option>
							<Option value="N">N</Option>
						</Select>
					</div>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Longitude:</span>
					<div className="d-flex">
						<input
							value={singularDetailsState.longDegree.concat('º')}
							className="input-location-points degree"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longDegree: e.target.value.replace('º', '').replace(' ', '')
								});
							}}
						/>
						<input
							value={singularDetailsState.longMinutes.concat('’')}
							className="input-location-points minutes"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longMinutes: e.target.value.replace('’', '').replace(' ', '')
								});
							}}
						/>

						<input
							value={singularDetailsState.longSeconds.concat('’’')}
							className="input-location-points seconds"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longSeconds: e.target.value.replace('’’', '').replace(' ', '')
								});
							}}
						/>
						<Select
							value={singularDetailsState.longDirection}
							className="select-options latitude"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longDirection: e
								});
							}}
						>
							<Option value="E">E</Option>
							<Option value="W">W</Option>
							<Option value="S">S</Option>
							<Option value="N">N</Option>
						</Select>
					</div>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Grupo:</span>
					<Select
						value={singularDetailsState.group}
						className="select-options legal"
						onChange={(e) => {
							setSingularDetailsState({
								...singularDetailsState,
								group: e
							});
						}}
						dropdownRender={(menu) => (
							<div>
								{menu}
								<Divider style={{ margin: '4px 0' }} />
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										padding: 8,
										color: '#98C21F',
										gap: '10px',
										alignItems: 'center'
									}}
									onClick={() => {}}
								>
									<Input
										placeholder={'grupo'}
										value={newGroup}
										onChange={(e) => {
											setNewGroup(e.target.value);
										}}
									/>
									<SolidPrimaryButton
										text={'Adicionar'}
										onClick={() => {
											setLoading(true);
											updateGroupArray(newGroup)
												.then(() => {
													setLoading(false);
												})
												.catch((error) => {
													setLoading(false);
												});
										}}
									/>
								</div>
							</div>
						)}
					>
						{groupArray.map((group) => <Option value={group}>{group}</Option>)}
					</Select>
				</div>
			</div>
			<div className="line-seperator" />
			{farmId == null ? (
				<div />
			) : (
				<div>
					<div className="d-flex justify-content-end search-bar-div">
						{/* <SearchBar /> */}
						<SolidPrimaryButton
							text={'+ Novo Imóvel'}
							onClick={() => {
								History.push({ pathname: `/property-details/${singularDetailsState.name}/${farmId}` });
							}}
						/>
					</div>
					<Table
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									History.push({
										pathname: `/property-details/${singularDetailsState.name}/${farmId}/${record.key}`
									});
								}, // click row
								onDoubleClick: (event) => {}, // double click row
								onContextMenu: (event) => {}, // right button click row
								onMouseEnter: (event) => {}, // mouse enter row
								onMouseLeave: (event) => {} // mouse leave row
							};
						}}
						dataSource={properties}
						columns={columns}
						className="property-table"
					/>
					<FarmAccessTable
						id={farmId}
						data={singularDetailsState}
						reloadFarm={() => {
							getFarmDetails();
						}}
					/>
				</div>
			)}
			<Loader visible={loading} />
		</div>
	);
}
