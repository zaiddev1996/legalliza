import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import './NewDocumentDataModal.css';
import SolidPrimaryButton from '../Buttons/SolidPrimaryButton';
import { useManageFiles } from '../../hooks/files/useManageFiles';
import { useDocumentManagement } from '../../hooks/documents/useDocumentManagment';
import { doc } from '@firebase/firestore';

export function NewDocumentDataModal({ visible, farmId, propertyId, name, changeVisibility }) {
	const { TextArea } = Input;
	const [ first, setFirst ] = useState('');
	const [ second, setSecond ] = useState('');
	const [ third, setThird ] = useState('');
	const [ fourth, setFourth ] = useState('');
	const [ fifth, setFifth ] = useState('');
	const { addNewDocumentData } = useDocumentManagement();
	const [ loading, setLoading ] = useState(false);

	const onUpload = () => {
		if (first.length > 0 && second.length > 0 && third.length > 0 && fourth.length > 0 && fifth.length > 0) {
			var data = {
				first: first,
				second: second,
				third: third,
				fourth: fourth,
				fifth: fifth
			};
			addNewDocumentData(farmId, propertyId, name, data)
				.then(() => {
					message.success('Document Data Added');
					setLoading(false);
					changeVisibility();
				})
				.catch((error) => {
					message.error(error);
					setLoading(false);
				});
		} else {
			message.error('Please input all details');
		}
	};

	return (
		<Modal
			visible={visible}
			footer={null}
			centered
			destroyOnClose={true}
			onCancel={() => {
				changeVisibility();
			}}
			title={null}
			content={null}
			wrapClassName={'document-data-modal'}
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
					placeholder="Enter first column data"
					allowClear
					value={first}
					onChange={(e) => {
						setFirst(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>
				<TextArea
					placeholder="Enter second column data"
					allowClear
					onChange={(e) => {
						setSecond(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>
				<TextArea
					placeholder="Enter third column data"
					allowClear
					onChange={(e) => {
						setThird(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>
				<TextArea
					placeholder="Enter fourth column data"
					allowClear
					onChange={(e) => {
						setFourth(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>
				<TextArea
					placeholder="Enter fifth column data"
					allowClear
					onChange={(e) => {
						setFifth(e.target.value);
					}}
					className={'comment-input'}
					maxLength={25}
					autoSize
					showCount
				/>

				<SolidPrimaryButton
					loading={loading}
					text={'Add'}
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
