import React from 'react';
import './SolidPrimaryButton.css';
import { Button } from 'antd';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete-icon-white.svg';

export default function ButtonWithIcon({ text, className, btnStyle, onClick, type, loading, startIcon }) {
	return (
		<div className={`solid-btn-main ${className}`}>
			<Button
				shape={'round'}
				className={`custom-btn-solid ${btnStyle}`}
				disabled={loading}
				onClick={onClick}
				type={type}
				loading={loading}
				size={'large'}
			>
				<div className="d-flex justify-content-center">
					<DeleteIcon className="delete-icon" fill="white" />
					<div>{text}</div>
				</div>
			</Button>
		</div>
	);
}
