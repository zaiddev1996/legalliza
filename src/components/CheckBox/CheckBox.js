import React from 'react';
import './CheckBox.css';
import { Checkbox } from 'antd';

export function CheckBox({ onChange, text, customStyle, className, checked }) {
	return (
		<div className={className}>
			<Checkbox onChange={onChange} className={`checkbox-custom ${customStyle}`} checked={checked}>
				{text}
			</Checkbox>
		</div>
	);
}
