import React from 'react';
import './CheckBox.css';
import { Checkbox } from 'antd';

export function CheckBox({ onChange, text, customStyle, className }) {
	return (
		<div className={className}>
			<Checkbox onChange={onChange} className={`checkbox-custom ${style}`}>
				{text}
			</Checkbox>
		</div>
	);
}
