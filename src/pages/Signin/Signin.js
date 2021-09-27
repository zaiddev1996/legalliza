import React, { useState } from 'react';
import Zain from '../../assets/images/signin-background.png';
import './Signin.css';
import { Button, Input, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import History from '../../@history';
import { useSignin } from '../../hooks/signin-signup/useSignin';

const Signin = () => {
	const { signin } = useSignin();

	const [ loading, setLoading ] = useState(false);
	const onSignin = (e) => {
		setLoading(true);
		signin(e.email, e.password).then(
			function() {
				setLoading(false);
				History.push({ pathname: '/dashboard' });
			},
			function(error) {
				setLoading(false);
				message.error(error);
			}
		);
	};

	return (
		<div className="ms-0 mr-0 container signin-main">
			<div className="row">
				<div className="col-md-5 ps-0 left-col d-none d-md-block">
					<img alt="background_img" src={Zain} className="img-background" />
					{/* <div>
						<LogoIcon className="mt-3" />
					</div> */}
				</div>
				<div className="col-md-7  right-col ps-0 pe-0">
					<div className="d-flex justify-content-center flex-column">
						<p className="create-acc-heading">Login to your Account</p>
						<Form onFinish={(e) => onSignin(e)}>
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

								{/* <Link className="forget-pass-text" to="/forget-password">
									Forget Password?
								</Link> */}

								{loading ? (
									<Button type="primary" className="btn-signup" loading>
										Signin
									</Button>
								) : (
									<Button type="primary" htmlType="submit" className="btn-signup">
										Signin
									</Button>
								)}
								{/* <p className="already-acc-text">
									Don't have an account?{' '}
									<span>
										<Link to="/signup" className="login-text">
											Signup
										</Link>
									</span>
								</p> */}
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Signin;
