import { React } from 'react';
import './Registration.css';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { Table } from 'antd';
import { ReactComponent as DeleteBtn } from '../../assets/images/delete-icon-white.svg';

export function Registration() {
	const dataSource = [
		{
			key: '1',
			registration: '10501',
			cns: '082.159.119-35',
			owners: '(2) Rafael, Rodrigo',
			attachments: 'https://support.content.office.net/en-us/media/e0f0122a-066d-469e-8e5d-7fe7eda30c1d.png'
		},
		{
			key: '2',
			registration: '10501',
			cns: '082.159.119-35',
			owners: '(2) Rafael, Rodrigo',
			attachments: 'https://support.content.office.net/en-us/media/e0f0122a-066d-469e-8e5d-7fe7eda30c1d.png'
		},
		{
			key: '3',
			registration: '10501',
			cns: '082.159.119-35',
			owners: '(2) Rafael, Rodrigo',
			attachments: 'https://support.content.office.net/en-us/media/e0f0122a-066d-469e-8e5d-7fe7eda30c1d.png'
		},
		{
			key: '4',
			registration: '10501',
			cns: '082.159.119-35',
			owners: '(2) Rafael, Rodrigo',
			attachments: 'https://support.content.office.net/en-us/media/e0f0122a-066d-469e-8e5d-7fe7eda30c1d.png'
		}
	];

	const columns = [
		{
			title: 'Matrícula',
			dataIndex: 'registration',
			key: 'registration'
		},
		{
			title: 'CNS',
			dataIndex: 'cns',
			key: 'cns'
		},
		{
			title: 'Proprietários',
			dataIndex: 'owners',
			key: 'owners'
		},
		{
			title: 'Anexos',
			dataIndex: 'attachments',
			render: (url) => (
				<div>
					<img src={url} alt={'sad'} className="attachment-image" />
				</div>
			)
		},
		{
			title: '',
			dataIndex: 'action',
			render: () => (
				<div>
					<DeleteBtn className="delete-btn" fill="#D15757" />
				</div>
			)
		}
	];
	return (
		<div className="registration">
			<p className="farm-name">Fazenda São Miguel</p>
			<p className="property-name">Rancho Fundo I</p>
			<div className="line-seperator" />
			<div className="d-flex justify-content-between new-btn-div">
				<text className="registration-heading">Matrícula</text>
				<SolidPrimaryButton
					text={'+ Nova Matrícula'}
					onClick={() => {
						History.push({ pathname: '/farm-details' });
					}}
				/>
			</div>
			<Table dataSource={dataSource} columns={columns} className="registrations-table" />;
		</div>
	);
}
