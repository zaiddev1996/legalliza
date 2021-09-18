import React from 'react';
import './CodeVerify.css';
import { Button, Input, Form } from 'antd';

const EmailSend = (props) => {
	const loading = false;

	function verifyCode(e) {}

	return (
		<div className="d-flex justify-content-center flex-column verify-code-main">
			<p className="create-acc-heading">Reset your password</p>
			<span className="email-send-info">Put verification code we’ve sent to your email.</span>
			<Form onFinish={(e) => verifyCode(e)}>
				<div className="d-flex flex-column align-items-center inputs-div">
					<Form.Item
						name="code"
						rules={[
							{
								required: true,
								message: 'Please input your code!'
							}
						]}
					>
						<Input placeholder="Enter Verification Code" className="signup-inputs" />
					</Form.Item>

					{loading ? (
						<Button type="primary" className="btn-signup" loading>
							Next
						</Button>
					) : (
						<Button type="primary" htmlType="submit" className="btn-signup">
							Next
						</Button>
					)}
					<p className="already-acc-text">
						Didn't get any email?{' '}
						<span to="/signup" className="login-text">
							Resend
						</span>
					</p>
				</div>
			</Form>
		</div>
	);
};
export default EmailSend;
