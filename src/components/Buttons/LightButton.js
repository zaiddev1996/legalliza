import React, { useState, useEffect } from 'react';
import './LightButton.css';

export default function LightButton({ text, className, btnStyle, onClick }) {
	return (
		<div className={`light-btn-main ${className}`}>
			<button className={`custom-btn-solid ${btnStyle}`} onClick={() => onClick()}>
				{text}
			</button>
		</div>
	);
}
