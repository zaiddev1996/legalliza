import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import './NewDocumentModal.css';
import SolidPrimaryButton from '../Buttons/SolidPrimaryButton';
import { useManageFiles } from '../../hooks/files/useManageFiles';
import { useDocumentManagement } from '../../hooks/documents/useDocumentManagment';
import { doc } from '@firebase/firestore';

export function NewDocumentModal({ visible, farmId, propertyId, name, changeVisibility }) {
	const { TextArea } = Input;
	const [ file, setFile ] = useState(null);
	const [ comment, setComment ] = useState('-');
	const [ type, setType ] = useState('-');
	const { uploadFile } = useManageFiles();
	const { addNewDocument } = useDocumentManagement();
	const [ loading, setLoading ] = useState(false);

	const onUpload = () => {
		if (file != null) {
			setLoading(true);
			console.log(file.name);
			var randomFileName = Math.floor(Math.random() * 100000000000).toString();
			console.log(randomFileName);
			uploadFile(randomFileName, file)
				.then((url) => {
					var data = {
						type: type,
						comments: comment,
						addedBy: 'zaid',
						url: url
					};
					addNewDocument(farmId, propertyId, name, data)
						.then(() => {
							message.success('Document uploaded');
							setLoading(false);
							changeVisibility();
						})
						.catch((error) => {
							message.error(error);
							setLoading(false);
						});
				})
				.catch((error) => {
					message.error(error);
					console.log(error);
					setLoading(false);
				});
		} else {
			message.error('Please select a file first');
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
			wrapClassName={'document-modal'}
			bodyStyle={{
				background: 'rgba(52, 52, 52, 0.0)',
				borderRadius: '8px'
			}}
			style={{
				backgroundColor: 'rgba(52, 52, 52, 0.0)'
			}}
		>
			<div className="main-div">
				<TextArea
					placeholder="Enter Document Type"
					allowClear
					onChange={(e) => {
						setType(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>
				<TextArea
					placeholder="Enter Comments"
					allowClear
					onChange={(e) => {
						setComment(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>

				<input
					type="file"
					className="file-input"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
				/>
				<SolidPrimaryButton
					loading={loading}
					text={'Upload'}
					onClick={() => {
						onUpload();
					}}
					className="upload-btn"
					btnStyle="upload-btn-style"
				/>
			</div>
		</Modal>
	);
}
