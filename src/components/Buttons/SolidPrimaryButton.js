import React from 'react';
import './SolidPrimaryButton.css';
import { Button } from 'antd';

export default function SolidPrimaryButton({ text, className, btnStyle, onClick, type, loading, startIcon }) {
	return (
		<div className={`solid-btn-main ${className}`}>
			<Button
				shape={'round'}
				className={`custom-btn-solid ${btnStyle}`}
				disabled={loading}
				onClick={onClick}
				type="primary"
				loading={loading}
				size={'large'}
			>
				<div>{text}</div>
			</Button>
		</div>
	);
}
