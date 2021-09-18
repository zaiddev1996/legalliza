import React from 'react';
import './ForgetPassword.css';
import { Link } from 'react-router-dom';
import EmailLogo from '../../assets/images/email.svg';
import SendEmail from '../../components/ForgetPasswordScreens/EmailSend/EmailSend';
import VerifyCode from '../../components/ForgetPasswordScreens/CodeVerify/CodeVerify';
import SetNewPassword from '../../components/ForgetPasswordScreens/SetNewPassword/SetNewPassword';

const ForgetPassword = () => {
	// let step = 0;

	// if (loginResponse == true) {
	// 	history.push({
	// 		pathname: '/dashboard'
	// 	});
	// }

	// const signin = (e) => {
	// 	const data = {
	// 		email: e.email,
	// 		password: e.password
	// 	};
	// 	dispatch(Actions.loginLoadingToggle());
	// 	dispatch(Actions.submitLogin(data));
	// };

	// const stepDiv = () => {
	// 	if (step === 0) {
	// 		return;
	// 	} else if (step === 1) {
	// 		return <VerifyCode email={'step.payload'} />;
	// 	} else if (step === 2) {
	// 		return <SetNewPassword data={'step.payload'} />;
	// 	}
	// };

	return (
		<div className="row forget-pass-main">
			<div className="col-md-5  left-col d-none d-md-block">
				<div className="d-flex flex-column left-col-second-div">
					<img src={EmailLogo} alt="" className="left-col-logo" />
					<span className="left-col-top-text">Check your email</span>
					<span className="left-col-mid-text">
						We will send a verification code on your email. Put your email address associated with your
						account to reset your password.
					</span>
					<Link to="/signin" className="left-col-bottom-text  mt-auto">
						Return to login Page
					</Link>
				</div>
			</div>
			<div className="col-md-7  right-col">
				<div className="d-flex justify-content-between signup-header">
					<div className="d-flex flex-wrap align-items-center logo-div" />
				</div>
				<div className="steps-div ">{<SendEmail />}</div>
			</div>
		</div>
	);
};
export default ForgetPassword;
