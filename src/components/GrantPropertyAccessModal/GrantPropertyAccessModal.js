import { React, useEffect } from 'react';
import './GrantPropertyAccessModal.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import History from '../../@history';
import { Table, Popconfirm, message } from 'antd';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { useState } from 'react';
import { Modal } from 'antd';
import { ReactComponent as FarmIcon } from '../../assets/images/farm-icon.svg';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { Loader } from '../../components/loader/loader';
import { useFarmAndPropertyManagement } from '../../hooks/getAllFarmsAndProperties';
import { cloneDeep } from 'lodash';

export function GrantPropertyAccessModal({ visible, id, changeVisibility }) {
	const [ allFarms, setAllFarms ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ userId, setUserId ] = useState();
	const { getAllFarmsAndProperties } = useFarmAndPropertyManagement();
	const { updateUserInfo } = useUsersManagement();
	const [ allCheckbox, setAllCheckbox ] = useState(false);

	useEffect(
		() => {
			setLoading(true);
			setAllFarms([]);
			setUserId(id);
			getAllFarmsAndProperties(id)
				.then((list) => {
					setAllFarms(list);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					console.log('Some error happened');
				});
		},
		[ id ]
	);

	const selectproperty = (farmId, propertyIndex, checked) => {
		let tempList = cloneDeep(allFarms);
		for (let i = 0; i < tempList.length; i++) {
			if (tempList[i].key == farmId) {
				tempList[i].propertiesList[propertyIndex] = {
					...tempList[i].propertiesList[propertyIndex],
					isChecked: checked
				};
				setAllFarms(tempList);

				console.log(allFarms);
				break;
			}
		}
	};

	const selectAllPropertiesOfFarm = (farmIndex, checked) => {
		let tempList = cloneDeep(allFarms);
		tempList[farmIndex] = { ...tempList[farmIndex], isChecked: checked };
		for (let i = 0; i < tempList[farmIndex].propertiesList.length; i++) {
			tempList[farmIndex].propertiesList[i] = {
				...tempList[farmIndex].propertiesList[i],
				isChecked: checked
			};
		}
		setAllFarms(tempList);
	};

	const columns2 = [
		{
			title: 'Nome',
			dataIndex: 'name',
			render: (_, record, rowIndex) => (
				<div className="d-flex">
					<CheckBox
						className="align-self-center"
						customStyle={'checkbox-style mt-0'}
						checked={record.isChecked}
						onChange={(e) => {
							selectAllPropertiesOfFarm(rowIndex, e.target.checked);
							// console.log(record);
						}}
					/>
					<div className="d-flex flex-column">
						<text className="permission-field-1">{record.farm}</text>
						<text className="permission-field-2">{record.location}</text>
					</div>
				</div>
			)
		},
		{
			title: 'CPF/CNPJ',
			dataIndex: 'cpf',
			render: (_, record) => (
				<div className="d-flex flex-column">
					<text className="permission-field-1">{record.longitude}</text>
					<text className="permission-field-2">{record.properties} Imóveis</text>
				</div>
			)
		}
	];
	const columns3 = [
		{
			title: 'Nome',
			dataIndex: 'name',
			render: (_, record, rowIndex) => (
				<div className="d-flex">
					<CheckBox
						className="align-self-center"
						customStyle={'checkbox-style mt-0'}
						checked={record.isChecked}
						onChange={(e) => {
							selectproperty(record.farmId, rowIndex, e.target.checked);
							// console.log(record);
						}}
					/>
					<text className="permission-field-1">{record.property}</text>
				</div>
			)
		},
		{
			title: 'CPF/CNPJ',
			dataIndex: 'cpf',
			render: (_, record) => <text className="permission-field-1">{record.location}</text>
		}
	];
	// const handleDelete = (key) => {
	// 	const data = userRows.filter((item) => item.key !== key);
	// 	console.log(data);
	// 	setUserRows(data);
	// };

	const onConfirm = () => {
		setLoading(true);
		var propertiesArray = [];
		for (let i = 0; i < allFarms.length; i++) {
			for (let j = 0; j < allFarms[i].propertiesList.length; j++) {
				if (allFarms[i].propertiesList[j].isChecked) {
					propertiesArray.push(allFarms[i].propertiesList[j].key);
				}
			}
		}
		console.log(userId);
		updateUserInfo(userId, { propertiesAccess: propertiesArray })
			.then(() => {
				setLoading(false);
				message.success('Properties Access Updated');
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				message.error('Some error happened');
			});
		// console.log(propertiesArray);
	};

	const onSelectAllCheckbox = (checked) => {
		let tempList = cloneDeep(allFarms);

		for (let i = 0; i < tempList.length; i++) {
			tempList[i] = { ...tempList[i], isChecked: checked };
			for (let j = 0; j < tempList[i].propertiesList.length; j++) {
				tempList[i].propertiesList[j] = {
					...tempList[i].propertiesList[j],
					isChecked: checked
				};
			}
		}

		setAllFarms(tempList);
	};
	return (
		<div className="property-access-modal">
			<Modal
				title={null}
				content={null}
				footer={null}
				visible={visible}
				destroyOnClose={true}
				bodyStyle={{
					background: 'rgba(52, 52, 52, 0.0)',
					borderRadius: '8px'
				}}
				style={{
					backgroundColor: 'rgba(52, 52, 52, 0.0)'
				}}
				wrapClassName="custom-dial"
			>
				<div>
					<div className="custom-modal-header-2 d-flex">
						<FarmIcon className="align-self-center header-icon-modal" />
						<span className="align-self-center header-title-text">Aplicativo - Permissão Imóveis</span>
					</div>
					<div className="custom-modal-body-2">
						<text className="select-docs-text">
							Selecione os imóveis que o usuário pode visualizar no aplicativo:
						</text>
						<div className=" d-flex justify-content-between searchbar-div">
							<SearchBar className="modal-searchbar" />
							<CheckBox
								text={'Selecionar Todos'}
								className="align-self-center"
								customStyle={'checkbox-style mt-0'}
								checked={allCheckbox}
								onChange={(e) => {
									setAllCheckbox(e.target.checked);
									onSelectAllCheckbox(e.target.checked);
								}}
							/>
						</div>
						<Table
							dataSource={allFarms}
							columns={columns2}
							className="farmers-table hide-header"
							pagination={false}
							showHeader={false}
							loading={loading}
							expandable={{
								expandedRowRender: (record) => (
									<Table
										pagination={false}
										showHeader={false}
										dataSource={record.propertiesList}
										columns={columns3}
										className="farmers-table farmers-table-2 mt-0"
									/>
								),
								rowExpandable: (record) => record.name !== 'Not Expandable',
								// expandRowByClick: true,
								expandIconColumnIndex: 2
							}}
						/>

						<div className="d-flex justify-content-end">
							<SolidPrimaryButton
								text={'Cancelar'}
								btnStyle={'cancel-btn-modal'}
								onClick={() => {
									changeVisibility();
								}}
							/>
							<SolidPrimaryButton
								text={'Confirmar'}
								btnStyle={'confirm-btn-modal'}
								onClick={() => {
									onConfirm();
								}}
							/>
						</div>
					</div>
				</div>
			</Modal>
			{/* <Loader visible={loading} /> */}
		</div>
	);
}
