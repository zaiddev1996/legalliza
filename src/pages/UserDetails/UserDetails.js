import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Upload, message, Space, Button, Input, Table } from 'antd';
import { ReactComponent as UploadIcon } from '../../assets/images/upload.svg';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { useUserDetails } from '../../hooks/users/useUserDetails';
import { Loader } from '../../components/loader/loader';
import { useManageFiles } from '../../hooks/files/useManageFiles';
import { OwnerSignupModal } from '../../components/OwnerSignupModal/OwnerSignupModal';
import History from '../../@history';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';

export function UserDetails(props) {
	const { getUserData, updateUserInfo, deleteUser } = useUsersManagement();
	const [ userId, setUserId ] = useState();
	const [ farms, setFarms ] = useState([]);
	const [ properties, setProperties ] = useState([]);
	const { userSingularDetails } = useUserDetails();
	const [ userData, setUserData ] = useState(userSingularDetails);
	const [ laoding, setLoading ] = useState(false);
	const { uploadFile } = useManageFiles();
	const { getMultipleFarms } = useFarmManagement();
	const { getAllFarmsProperties } = usePropertyManagement();
	const [ allCheckbox, setAllCheckbox ] = useState(false);
	const [ passwordModalVisibility, setPassChangeVisibility ] = useState(false);
	const [ searchText, setSearchText ] = useState('');
	const [ searchedColumn, setSearchColumn ] = useState('');

	useEffect(
		() => {
			if (props.match.params.userId != undefined) {
				setUserId(props.match.params.userId);
				setLoading(true);
				getAccessibleFarms();
				getUserData(userId)
					.then((data) => {
						getAccessibleProperties(data.propertiesAccess);
						var list = { ...userSingularDetails, ...data };
						setUserData({ ...userSingularDetails, ...data });
						// console.log(userData);
					})
					.catch((error) => {
						console.log(error);
						setLoading(false);
						// message.error('Some error happened');
					});
			}
		},
		[ userId ]
	);

	const getAccessibleProperties = (accessArray) => {
		getAllFarmsProperties('')
			.then((propertiesList) => {
				const list = [];

				if (accessArray) {
					for (let i = 0; i < propertiesList.length; i++) {
						if (accessArray.includes(propertiesList[i].key)) {
							list.push(propertiesList[i]);
						}
					}
				}
				console.log(list);
				setProperties(list);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				message.error('Some error happened');
			});
	};

	const getAccessibleFarms = () => {
		getMultipleFarms(props.match.params.userId)
			.then((list) => {
				setFarms(list);
			})
			.catch((error) => {
				console.log(error);
				message.error('Error happened');
			});
	};

	const onUpdate = () => {
		if (userData.name.length > 0) {
			setLoading(true);
			updateUserInfo(userId, userData)
				.then(() => {
					setLoading(false);
					message.success('User info updated');
				})
				.catch((error) => {
					setLoading(false);
					message.error('Some error happened');
				});
		} else {
			message.error('O campo do nome não deve estar vazio');
		}
	};
	function beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		} else if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		} else {
			onUploadFile(file);
		}
	}
	const uploadButton = (
		<div className=" d-flex flex-column justify-content-center upload-btn">
			<UploadIcon className="align-self-center" />
			<text className="upload-text">
				Anexar<br />Documentos
			</text>
		</div>
	);

	const onUploadFile = (file) => {
		if (file != null) {
			setLoading(true);
			console.log(file.name);
			var randomFileName = Math.floor(Math.random() * 100000000000).toString();
			console.log(randomFileName);
			uploadFile(randomFileName, file)
				.then((url) => {
					var data = {
						documentUrl: url
					};
					updateUserInfo(userId, data)
						.then(() => {
							message.success('Document uploaded');
							setUserData({ ...userData, documentUrl: url });
							setLoading(false);
						})
						.catch((error) => {
							message.error(error);
							setLoading(false);
						});
				})
				.catch((error) => {
					message.error(error);
					console.log(error);
					setLoading(false);
				});
		} else {
			message.error('Please select a file first');
		}
	};

	const onDelete = () => {
		setLoading(true);
		deleteUser(userId)
			.then(() => {
				setLoading(true);
				setLoading(false);
				History.goBack();
			})
			.catch((error) => {
				setLoading(true);
				setLoading(false);
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
			title: 'Grupo',
			dataIndex: 'group',
			key: 'group',
			...getColumnSearchProps('group')
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
	const propertyColumns = [
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

	return (
		<div className="user-details pb-5">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<input
						className="user-name"
						value={userData.name}
						onChange={(e) => {
							setUserData({ ...userData, name: e.target.value });
						}}
					/>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				<div className="d-flex">
					<SolidPrimaryButton
						text={'atualizar'}
						onClick={() => {
							onUpdate();
						}}
						btnStyle={'update-btn'}
					/>
					<SolidPrimaryButton
						text={'Trocar Senha'}
						onClick={() => {
							setPassChangeVisibility(true);
						}}
						btnStyle={'change-pass-btn'}
					/>
					<ButtonWithIcon
						text={'Excluir Fazenda'}
						onClick={() => {
							onDelete();
						}}
						btnStyle={'delete-button'}
					/>
				</div>
			</div>
			<div className="d-flex flex-wrap contact-info-div">
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">CPF/CNPJ:</text>
					<input
						className="cpf"
						value={userData.cpf}
						onChange={(e) => {
							setUserData({ ...userData, cpf: e.target.value });
						}}
					/>
				</div>
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">Telefone:</text>
					<input
						className="cpf"
						value={userData.telephone}
						onChange={(e) => {
							setUserData({ ...userData, telephone: e.target.value });
						}}
					/>
				</div>
				<div className="d-flex flex-column justify-content-left single-info-div">
					<text className="contact-info-heading">email:</text>
					<text className="cpf">{userData.email}</text>
				</div>
			</div>
			<div className="d-flex">
				{userData.documentUrl.length > 0 ? (
					<a href={userData.documentUrl} target={'_blank'} download>
						<img alt={'adds'} src={userData.documentUrl} className="uploaded-img" />
					</a>
				) : (
					<div />
				)}

				<Upload
					showUploadList={false}
					beforeUpload={beforeUpload}

					// onPreview={this.handlePreview}
					// onChange={this.handleChange}
				>
					{uploadButton}
				</Upload>
			</div>
			<div className="seperator" />
			<h1 className="heading-light">Permissões - Geral</h1>
			<div className="d-flex flex-wrap">
				<CheckBox
					text={'Gestão de Usuários'}
					className="checkbox-user-details"
					checked={userData.userManagementPermission}
					onChange={(e) => {
						setUserData({ ...userData, userManagementPermission: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Gestão de Fazendas'}
					className="checkbox-user-details"
					checked={userData.farmManagementPermission}
					onChange={(e) => {
						setUserData({ ...userData, farmManagementPermission: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Gestão de Documentos'}
					className="checkbox-user-details"
					checked={userData.documentManagementPermission}
					onChange={(e) => {
						setUserData({ ...userData, documentManagementPermission: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Acesso Aplicativo'}
					className="checkbox-user-details"
					checked={userData.appAccessPermission}
					onChange={(e) => {
						setUserData({ ...userData, appAccessPermission: e.target.checked });
					}}
				/>
			</div>
			<h1 className="heading-light extra-top-margin">Permissões - Gestão de Documentos</h1>
			<div className="d-flex flex-wrap ">
				<CheckBox
					text={'Matrícula'}
					className="checkbox-user-details"
					checked={userData.Matricula}
					onChange={(e) => {
						setUserData({ ...userData, Matricula: e.target.checked });
					}}
				/>
				<CheckBox
					text={'GEO'}
					className="checkbox-user-details"
					checked={userData.GEO}
					onChange={(e) => {
						setUserData({ ...userData, GEO: e.target.checked });
					}}
				/>
				<CheckBox
					text={'CCIR'}
					className="checkbox-user-details"
					checked={userData.CCIR}
					onChange={(e) => {
						setUserData({ ...userData, CCIR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'CAR'}
					className="checkbox-user-details"
					checked={userData.CAR}
					onChange={(e) => {
						setUserData({ ...userData, CAR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'LAR'}
					className="checkbox-user-details"
					checked={userData.LAR}
					onChange={(e) => {
						setUserData({ ...userData, LAR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Outorga'}
					className="checkbox-user-details"
					checked={userData.Outroga}
					onChange={(e) => {
						setUserData({ ...userData, Outroga: e.target.checked });
					}}
				/>
				<CheckBox
					text={'ITR'}
					className="checkbox-user-details"
					checked={userData.ITR}
					onChange={(e) => {
						setUserData({ ...userData, ITR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'ADA'}
					className="checkbox-user-details"
					checked={userData.ADA}
					onChange={(e) => {
						setUserData({ ...userData, ADA: e.target.checked });
					}}
				/>
				<CheckBox
					text={'Laudo'}
					className="checkbox-user-details"
					checked={userData.Laudo}
					onChange={(e) => {
						setUserData({ ...userData, Laudo: e.target.checked });
					}}
				/>
				<CheckBox
					text={'GSSMATR'}
					className="checkbox-user-details"
					checked={userData.GSSMATR}
					onChange={(e) => {
						setUserData({ ...userData, GSSMATR: e.target.checked });
					}}
				/>
				<CheckBox
					text={'LTCAT'}
					className="checkbox-user-details"
					checked={userData.LTCAT}
					onChange={(e) => {
						setUserData({ ...userData, LTCAT: e.target.checked });
					}}
				/>
			</div>
			<h1 className="heading-light extra-top-margin">Permissões - Aplicativo (FAZENDAS)</h1>
			<div className="d-flex justify-content-end mt-4">
				{/* <SearchBar /> */}
				<CheckBox
					text={'Selecionar Todos'}
					checked={allCheckbox}
					onChange={(e) => {
						setAllCheckbox(e.target.checked);
						setUserData({
							...userData,
							Matricula: e.target.checked,
							GEO: e.target.checked,
							CCIR: e.target.checked,
							CAR: e.target.checked,
							LAR: e.target.checked,
							Outroga: e.target.checked,
							ITR: e.target.checked,
							ADA: e.target.checked,
							Laudo: e.target.checked,
							GSSMATR: e.target.checked,
							LTCAT: e.target.checked
						});
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
			<h1 className="heading-light extra-top-margin">Permissões - Aplicativo (Imóveis)</h1>
			<Table
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							// History.push({
							// 	pathname: `/property-details/${singularDetailsState.name}/farm/${record.key}`
							// });
						}, // click row
						onDoubleClick: (event) => {}, // double click row
						onContextMenu: (event) => {}, // right button click row
						onMouseEnter: (event) => {}, // mouse enter row
						onMouseLeave: (event) => {} // mouse leave row
					};
				}}
				dataSource={properties}
				columns={propertyColumns}
				className="farms-table"
			/>
			{passwordModalVisibility ? (
				<OwnerSignupModal
					visible={true}
					changeVisibility={() => {
						setPassChangeVisibility(false);
					}}
					userId={userId}
				/>
			) : (
				<div />
			)}

			<Loader visible={laoding} />
		</div>
	);
}
