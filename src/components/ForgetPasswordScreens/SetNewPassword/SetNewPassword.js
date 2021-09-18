import React from 'react';
import './SetNewPassword.css';
import { Button, Input, Form } from 'antd';

const EmailSend = (props) => {
	const loading = false;
	function sendEmail(e) {}

	return (
		<div className="d-flex justify-content-center flex-column set-new-pass-main">
			<p className="create-acc-heading">Set new password</p>
			<span className="email-send-info">Set new password for your account.</span>
			<Form onFinish={(e) => sendEmail(e)}>
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
						<Input.Password placeholder="New Password" className="signup-inputs" />
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
									return Promise.reject(new Error('The passwords that you entered do not match!'));
								}
							})
						]}
					>
						<Input.Password placeholder="Re Enter New Password" className="signup-inputs" />
					</Form.Item>

					{loading ? (
						<Button type="primary" className="btn-signup" loading>
							Set New Password
						</Button>
					) : (
						<Button type="primary" htmlType="submit" className="btn-signup">
							Set New Password
						</Button>
					)}
				</div>
			</Form>
		</div>
	);
};
export default EmailSend;
