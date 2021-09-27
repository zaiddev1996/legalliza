import { React, useState } from 'react';
import { Button, Input, Form, Radio } from 'antd';
import './Signup.css';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import History from '../../@history';
import { useSignup } from '../../hooks/signin-signup/useSignup';

const Signup = (props) => {
	const [ loading, setLoading ] = useState(false);

	const notify = () => {
		message.success('Signed up');
	};

	const { signup } = useSignup();

	// if (signupResponse != null) {
	// 	if (signupResponse.success == true) {
	// 		notify();
	// 		history.push({
	// 			pathname: '/signin'
	// 		});
	// 	} else {
	// 		toast.error(signupResponse.message);
	// 	}
	// }

	const onSignup = (e) => {
		setLoading(true);
		signup(e.name, e.email_address, e.password, props.match.params.type).then(
			function(rsp) {
				setLoading(false);
				message.success(rsp);
				History.push({
					pathname: '/dashboard'
				});
			},
			function(error) {
				setLoading(false);
				message.error(error);
			}
		);
	};

	// function onDateChange(e) {
	//   console.log(e.format("YYYY-MM-DD"));
	//   setStartDate()
	// }
	return (
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
						<p className="create-acc-heading">Create new {props.match.params.type} account</p>
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
	);
};
export default Signup;
