import React, { useState, useEffect } from 'react';
import './OutlinedButton.css';

export default function OutlinedButton({ text, onClick }) {
	return (
		<div className="outlined-btn-main">
			<button className="custom-btn-outlined" onClick={onClick}>
				{text}
			</button>
		</div>
	);
}
