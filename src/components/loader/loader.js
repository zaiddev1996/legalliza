import React from 'react';
import { Modal, Spin } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import './loader.css';

export function Loader({ visible }) {
	return (
		<Modal
			visible={visible}
			footer={null}
			centered
			title={null}
			content={null}
			wrapClassName={'loader-modal'}
			bodyStyle={{
				background: 'rgba(52, 52, 52, 0.0)',
				borderRadius: '8px'
			}}
			style={{
				backgroundColor: 'rgba(52, 52, 52, 0.0)'
			}}
		>
			<Spin size={'large'} spinning indicator={<CaretRightFilled style={{ color: '#98C21F' }} spin />} />
		</Modal>
	);
}
