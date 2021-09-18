import React from 'react';
import './EmailSend.css';
import { Button, Input, Form, Radio } from 'antd';

const EmailSend = () => {
	const loading = false;
	//   const response = useSelector(
	//     ({ profiling }) => profiling.ResetPasswordResponse
	//   );

	//   if (response.msg != null) {
	//     if (response.success) {
	//       dispatch(Actions.changeStep(1));
	//     } else {
	//       console.log("ERRORRR");
	//       toast.error(response.msg);
	//     }
	//   }

	function sendEmail(e) {}

	return (
		<div className="d-flex justify-content-center flex-column email-send-main">
			<p className="create-acc-heading">Reset your password</p>
			<span className="email-send-info">Put your associated email below to reset your password</span>
			<Form onFinish={(e) => sendEmail(e)}>
				<div className="d-flex flex-column align-items-center inputs-div">
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your Email!'
							}
						]}
					>
						<Input placeholder="Email Address" className="signup-inputs" />
					</Form.Item>

					{loading ? (
						<Button type="primary" className="btn-signup" loading>
							Send Email
						</Button>
					) : (
						<Button type="primary" htmlType="submit" className="btn-signup">
							Send Email
						</Button>
					)}
					{/* <p className="already-acc-text">
            Didn't get any email?{" "}
            <span to="/signup" className="login-text">
              Resend
            </span>
          </p> */}
				</div>
			</Form>
		</div>
	);
};
export default EmailSend;
