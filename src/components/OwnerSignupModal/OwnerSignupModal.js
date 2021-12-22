import { React, useState } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import './OwnerSignupModal.css';
import { message } from 'antd';
import History from '../../@history';
import { useSignup } from '../../hooks/signin-signup/useSignup';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { useUsersManagement } from '../../hooks/users/userUsersManagement';

export function OwnerSignupModal({ visible, changeVisibility, userId }) {
	const [ loading, setLoading ] = useState(false);
	const { ownerSignup } = useSignup();
	const { changePassword } = useUsersManagement();

	const onSignup = (e) => {
		setLoading(true);
		changePassword(userId, e.password).then(
			function(rsp) {
				message.success('Password changed');
				setLoading(false);
				changeVisibility();
			},
			function(error) {
				setLoading(false);
				message.error(error);
			}
		);
	};
	return (
		<Modal
			visible={visible}
			footer={null}
			centered
			title={null}
			destroyOnClose={true}
			onCancel={() => {
				changeVisibility();
			}}
			content={null}
			wrapClassName={'owner-signup-modal'}
			bodyStyle={{
				background: 'rgba(52, 52, 52, 0.0)',
				borderRadius: '8px'
			}}
			style={{
				backgroundColor: 'rgba(52, 52, 52, 0.0)'
			}}
		>
			<div className="ms-0 mr-0 container signup-main">
				<div className="row">
					<div>
						<div className="d-flex justify-content-between signup-header" />
						<div className="d-flex justify-content-center flex-column">
							<p className="create-acc-heading">Change Password</p>
							<Form onFinish={(e) => onSignup(e)} className="signup-form">
								<div className="d-flex flex-column align-items-center inputs-div">
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
														new Error('The passwords that you entered do not match!')
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
		</Modal>
	);
}
