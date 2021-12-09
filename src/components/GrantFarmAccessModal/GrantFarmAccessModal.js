import { React, useEffect } from 'react';
import './GrantFarmAccessModal.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import History from '../../@history';
import { Table, Popconfirm, message, Form, Input, Button } from 'antd';
import { CheckBox } from '../../components/CheckBox/CheckBox';
import { useState } from 'react';
import { Modal } from 'antd';
import { ReactComponent as FarmIcon } from '../../assets/images/farm-icon.svg';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';
import { Loader } from '../../components/loader/loader';
import { cloneDeep } from 'lodash';
import { useFarmManagement } from '../../hooks/farms/useFarmManagement';
import { useSignup } from '../../hooks/signin-signup/useSignup';

export function GrantFarmAccessModal({ visible, id, changeVisibility }) {
	const [ allUsers, setAllUsers ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ farmId, setFarmID ] = useState(id);
	const { updateUserInfo, getAllUsers } = useUsersManagement();
	const { updateFarm, getFarm } = useFarmManagement();
	const [ allCheckbox, setAllCheckbox ] = useState(false);
	const [ showSignupForm, setShowSignupForm ] = useState(false);
	const { signup } = useSignup();

	useEffect(
		() => {
			setAllUsers([]);
			setFarmID(id);
			populateUsersTable();
		},
		[ id ]
	);

	const populateUsersTable = () => {
		setLoading(true);
		getAllUsers()
			.then((list) => {
				getFarm(farmId)
					.then((doc) => {
						if (doc.farmAccess) {
							for (let i = 0; i < list.length; i++) {
								if (doc.farmAccess.includes(list[i].key)) {
									list[i].isChecked = true;
								}
							}
						}

						setAllUsers(list);
						setLoading(false);
					})
					.catch((error) => {
						console.log(error);
						setLoading(false);
						message.error('Some error happened');
					});
			})
			.catch((error) => {
				setLoading(false);

				message.error('Some error happened');
			});
	};

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
					<CheckBox
						className="align-self-center"
						customStyle={'checkbox-style mt-0'}
						checked={record.isChecked}
						onChange={(e) => {
							selectUser(rowIndex, e.target.checked);
							// console.log(record);
						}}
					/>
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
		setLoading(true);
		var farmIdsArray = [];
		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i].isChecked) {
				farmIdsArray.push(allUsers[i].key);
			}
		}
		console.log(farmId);
		updateFarm(farmId, { farmAccess: farmIdsArray })
			.then(() => {
				setLoading(false);
				message.success('Farm Access Updated');
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				message.error('Some error happened');
			});
		console.log(farmIdsArray);
	};

	const onSelectAllCheckbox = (checked) => {
		let tempList = cloneDeep(allUsers);
		for (let i = 0; i < tempList.length; i++) {
			tempList[i] = { ...tempList[i], isChecked: checked };
		}
		setAllUsers(tempList);
	};

	const onSignup = (e) => {
		setLoading(true);
		signup(e.name, e.email_address, e.password, 'User').then(
			function(rsp) {
				setLoading(false);
				message.success(rsp);
				setShowSignupForm(false);
				populateUsersTable();
			},
			function(error) {
				setLoading(false);
				message.error(error);
			}
		);
	};

	return (
		<div className="property-access-modal">
			<Modal
				title={null}
				content={null}
				footer={null}
				visible={visible}
				destroyOnClose={true}
				onCancel={() => {
					changeVisibility();
				}}
				bodyStyle={{
					background: 'rgba(52, 52, 52, 0.0)',
					borderRadius: '8px'
				}}
				style={{
					backgroundColor: 'rgba(52, 52, 52, 0.0)'
				}}
				wrapClassName="modal-farm-access"
				width={640}
			>
				<div>
					<div className="custom-modal-header-2 d-flex">
						<FarmIcon className="align-self-center header-icon-modal" />
						<span className="align-self-center header-title-text">Aplicativo - Permissão fazendas</span>
					</div>
					{showSignupForm ? (
						<div className="ms-0 mr-0 container signup-main">
							<div className="row">
								<div>
									<div className="d-flex justify-content-between signup-header">
										{/* <div>
							<Link to="/" className="d-flex flex-wrap align-items-center logo-div">
								<img height="26" width="29" src={Logo} alt="logo" className="mr-2" />
								<p className="mb-0 font-weight-bold logo-text">
									Babbling<span className="text-brooks">Brook</span>
								</p>
							</Link>
						</div> */}
									</div>
									<div className="d-flex justify-content-center flex-column">
										<p className="create-acc-heading">Create new User account</p>
										<Form onFinish={(e) => onSignup(e)} className="signup-form">
											<div className="d-flex flex-column align-items-center inputs-div">
												<Form.Item
													name="name"
													rules={[
														{
															required: true,
															message: 'Please input your First Name!'
														}
													]}
												>
													<Input placeholder="Full Name" className="signup-inputs" />
												</Form.Item>
												<Form.Item
													name="email_address"
													rules={[
														{
															type: 'email',
															message: 'The input is not valid E-mail!'
														},
														{
															required: true,
															message: 'Please input your E-mail!'
														}
													]}
												>
													<Input placeholder="Email Address" className="signup-inputs" />
												</Form.Item>

												<Form.Item
													name="password"
													rules={[
														{
															required: true,
															message: 'Please input your Password!'
														}
													]}
												>
													<Input.Password placeholder="Password" className="signup-inputs" />
												</Form.Item>
												<Form.Item
													name="re_password"
													dependencies={[ 'password' ]}
													rules={[
														{
															required: true,
															message: 'Please confirm your password!'
														},
														({ getFieldValue }) => ({
															validator(_, value) {
																if (!value || getFieldValue('password') === value) {
																	return Promise.resolve();
																}
																return Promise.reject(
																	new Error(
																		'The passwords that you entered do not match!'
																	)
																);
															}
														})
													]}
												>
													<Input.Password placeholder="Re Enter" className="signup-inputs" />
												</Form.Item>

												{/* <p className="already-acc-text">
									Already have an account?{' '}
									<Link className="login-text" to="/signin">
										Login
									</Link>
								</p> */}
												{loading ? (
													<Button type="primary" className="btn-signup" loading>
														Signup
													</Button>
												) : (
													<Button type="primary" htmlType="submit" className="btn-signup">
														Signup
													</Button>
												)}
											</div>
										</Form>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="custom-modal-body-2">
							<text className="select-docs-text">
								Selecione as fazendas que o usuário pode visualizar no aplicativo:
							</text>
							<div className=" d-flex justify-content-between searchbar-div">
								<SolidPrimaryButton
									text={'Adicionar usuário'}
									btnStyle={'add-btn-modal'}
									onClick={() => {
										setShowSignupForm(true);
									}}
								/>
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
								dataSource={allUsers}
								columns={columns2}
								className="farmers-table hide-header"
								// pagination={false}
								showHeader={true}
								loading={loading}
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
					)}
				</div>
			</Modal>
			<Loader visible={loading} />
		</div>
	);
}
