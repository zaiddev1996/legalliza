import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import './AddAreaModal.css';
import SolidPrimaryButton from '../Buttons/SolidPrimaryButton';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { Loader } from '../loader/loader';

export function AddAreaModal({ visible, propertyId, changeVisibility }) {
	const { TextArea } = Input;
	const [ areaName, setAreaName ] = useState('');
	const [ value, setaValue ] = useState();
	const [ percentage, setPercentage ] = useState();
	const [ comment, setComment ] = useState('');
	const [ type, setType ] = useState('');
	const [ color, setColor ] = useState('#92D050');
	const { addNewRuralArea } = usePropertyManagement();
	const [ loading, setLoading ] = useState(false);

	const onUpload = () => {
		if (areaName.length > 0 && value > 0 && percentage > 0 && type.length > 0) {
			setLoading(true);
			const data = {
				area: areaName,
				value: value,
				percentage: percentage,
				type: type,
				comment: comment,
				color: color
			};
			addNewRuralArea(propertyId, data)
				.then((id) => {
					setLoading(false);
					message.success('Rural Area info added');
					changeVisibility();
				})
				.catch((error) => {
					setLoading(false);
					console.log(error);
					message.error('Some error happened.');
				});
		} else {
			message.error('Please input all fields first');
		}
	};

	return (
		<Modal
			visible={visible}
			footer={null}
			centered
			destroyOnClose
			onCancel={() => {
				changeVisibility();
			}}
			title={null}
			content={null}
			wrapClassName={'area-modal'}
			bodyStyle={{
				background: 'rgba(52, 52, 52, 0.0)',
				borderRadius: '8px'
			}}
			style={{
				backgroundColor: 'rgba(52, 52, 52, 0.0)'
			}}
		>
			<div className="main-div">
				<input
					className="file-input"
					placeholder="Enter Area Name"
					value={areaName}
					onChange={(e) => {
						setAreaName(e.target.value);
					}}
				/>
				<input
					placeholder="Enter Value"
					type="number"
					value={value}
					className="file-input"
					onChange={(e) => {
						setaValue(e.target.value);
						// setFile(e.target.files[0]);
					}}
				/>
				<input
					placeholder="Enter percentage"
					type="number"
					value={percentage}
					className="file-input"
					onChange={(e) => {
						setPercentage(e.target.value);
						// setFile(e.target.files[0]);
					}}
				/>
				<input
					placeholder="Enter Type"
					className="file-input"
					value={type}
					onChange={(e) => {
						setType(e.target.value);
					}}
				/>
				<input
					placeholder="Enter Comments"
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					className="file-input"
				/>
				<div className={'d-flex'}>
					Select Color:
					<input
						placeholder="Enter percentage"
						type="color"
						value={color}
						onChange={(e) => {
							setColor(e.target.value);
							// setFile(e.target.files[0]);
						}}
					/>
				</div>

				<SolidPrimaryButton
					text={'Add'}
					onClick={() => {
						onUpload();
					}}
					className="upload-btn"
					btnStyle="upload-btn-style"
				/>
			</div>
			<Loader visible={loading} />
		</Modal>
	);
}
