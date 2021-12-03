import { React, useEffect } from 'react';
import './AddOwnerModal.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import History from '../../@history';
import { Table, Popconfirm, message, Input } from 'antd';
import { useState } from 'react';
import { Modal } from 'antd';
import { ReactComponent as FarmIcon } from '../../assets/images/farm-icon.svg';
import { Loader } from '../../components/loader/loader';
import { cloneDeep } from 'lodash';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';

export function AddOwnerModal({ visible, propertyId, changeVisibility }) {
	const [ allUsers, setAllUsers ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ selectedUserId, setSelectedUserId ] = useState();
	const [ percentage, setPercentage ] = useState();
	const { addNewOwner } = usePropertyManagement();
	const { getAllUsers } = useUsersManagement();

	useEffect(
		() => {
			setLoading(true);
			setAllUsers([]);
			getAllUsers()
				.then((list) => {
					// getFarm(farmId)
					// 	.then((doc) => {
					// 		if (doc.farmAccess) {
					// 			for (let i = 0; i < list.length; i++) {
					// 				if (doc.farmAccess.includes(list[i].key)) {
					// 					list[i].isChecked = true;
					// 				}
					// 			}
					// 		}

					// 	})
					// 	.catch((error) => {
					// 		console.log(error);
					// 		setLoading(false);
					// 		message.error('Some error happened');
					// 	});
					setAllUsers(list);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);

					message.error('Some error happened');
				});
		},
		[ visible ]
	);

	const selectUser = (userRowIndex, checked) => {
		let tempList = cloneDeep(allUsers);
		tempList[userRowIndex] = {
			...tempList[userRowIndex],
			isChecked: checked
		};
		setAllUsers(tempList);
	};

	// const selectAllPropertiesOfFarm = (farmIndex, checked) => {
	// 	let tempList = cloneDeep(allFarms);
	// 	tempList[farmIndex] = { ...tempList[farmIndex], isChecked: checked };
	// 	for (let i = 0; i < tempList[farmIndex].propertiesList.length; i++) {
	// 		tempList[farmIndex].propertiesList[i] = {
	// 			...tempList[farmIndex].propertiesList[i],
	// 			isChecked: checked
	// 		};
	// 	}
	// 	setAllFarms(tempList);
	// };

	const columns2 = [
		{
			title: 'Nome',
			dataIndex: 'name',
			render: (_, record, rowIndex) => (
				<div className="d-flex">
					{/* <CheckBox
						className="align-self-center"
						customStyle={'checkbox-style mt-0'}
						checked={record.isChecked}
						onChange={(e) => {
							selectUser(rowIndex, e.target.checked);
							// console.log(record);
						}}
					/> */}
					<div className="d-flex flex-column">
						<text className="permission-field-1">{record.name}</text>
					</div>
				</div>
			)
		},
		{
			title: 'email',
			dataIndex: 'email'
		}
	];

	const onConfirm = () => {
		if (percentage > 0) {
			setLoading(true);
			addNewOwner(propertyId, { userId: selectedUserId, percentage: percentage })
				.then(() => {
					message.success('Owner Added');
					setLoading(false);
					changeVisibility();
				})
				.catch(() => {
					message.error('Some error happened');
				});
		}

		// console.log(farmIdsArray);
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
				wrapClassName="modal-farm-access"
			>
				<div>
					<div className="custom-modal-header-2 d-flex">
						<FarmIcon className="align-self-center header-icon-modal" />
						<span className="align-self-center header-title-text">Aplicativo - Permissão Imovels</span>
					</div>
					<div className="custom-modal-body-2">
						{selectedUserId ? (
							<div>
								<Input
									placeholder="Percentage"
									value={percentage}
									onChange={(e) => {
										setPercentage(e.target.value);
									}}
									type={'number'}
									className="signup-inputs"
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
						) : (
							<Table
								dataSource={allUsers}
								columns={columns2}
								className="farmers-table hide-header"
								// pagination={false}
								onRow={(record, rowIndex) => {
									return {
										onClick: (event) => {
											setSelectedUserId(record.key);
										}, // click row
										onDoubleClick: (event) => {}, // double click row
										onContextMenu: (event) => {}, // right button click row
										onMouseEnter: (event) => {}, // mouse enter row
										onMouseLeave: (event) => {} // mouse leave row
									};
								}}
								showHeader={true}
								loading={loading}
							/>
						)}
					</div>
				</div>
			</Modal>
			<Loader visible={loading} />
		</div>
	);
}
