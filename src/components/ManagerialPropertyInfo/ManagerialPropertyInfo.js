import React, { useEffect, useState } from 'react';
import './ManagerialPropertyInfo.css';
import { message, Table, Upload, Image } from 'antd';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import SolidPrimaryButton from '../Buttons/SolidPrimaryButton';
import { AddAreaModal } from '../AddAreaModal/AddAreaModal';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { Loader } from '../loader/loader';
import { useManageFiles } from '../../hooks/files/useManageFiles';

let defaultData = [
	{ color: '#FF0000', area: 'Estradas e Corredores', type: 'Consolidada', comments: 'test test test' },
	{ color: '#808080', area: 'Benfeitorias', type: 'Consolidada' },
	{ color: '#FFC000', area: 'Lavouras', type: 'Consolidada' },
	{ color: '#F4B084', area: 'Pastagens', type: 'Consolidada' },
	{ color: '#BF8F00', area: 'Reflorestamento', type: 'Consolidada' },
	{ color: '#00B0F0', area: 'Espelhos D’água', type: 'Ambiental' },
	{ color: '#92D050', area: 'AAP-Matas e Bordas', type: 'Ambiental' },
	{ color: '#99FF33', area: 'Reserva Legal ( Mata )', type: 'Ambiental' }
];

export function ManagerialPropertyInfo({ propertyId }) {
	const [ areaVisibility, setAreaVisibility ] = useState(false);
	const [ ruralAreaList, setRuralAreaList ] = useState([
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' },
		{ value: 0, percentage: 0, comments: '' }
	]);
	const [ areaTypeTotalList, setAreaTypeTotalList ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const { updateProperty, updateRuralArea, getProperty } = usePropertyManagement();
	const { uploadFile } = useManageFiles();
	const [ propertyAttachments, setPropertyAttachments ] = useState({ solidImage: '', image: '', kmlFile: '' });
	const [ previewPicture, setPreviewPicture ] = useState('');
	const [ tableData, setTableData ] = useState([]);
	useEffect(
		() => {
			getAttachments();
			// getAreasList();
		},
		[ propertyId ]
	);

	const getAttachments = () => {
		getProperty('', propertyId)
			.then((doc) => {
				if (doc.propertyAttachments) setPropertyAttachments(doc.propertyAttachments);
				// ruralAreaList = doc.ruralAreas;
				setRuralAreaList(doc.ruralAreas);
				setTableData(defaultData);
				calculateTotals(doc.ruralAreas);
				console.log(propertyAttachments);
			})
			.catch((error) => {
				console.log(error);
				message.error('Some error happened');
			});
	};

	// const getAreasList = () => {
	// 	setLoading(true);
	// 	getRuralAreas(propertyId)
	// 		.then((list) => {
	// 			setRuralAreaList(list);
	// 			calculateTotals(list);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			setLoading(false);
	// 			console.log(error);
	// 			message.error('Some error happened');
	// 		});
	// };
	const calculateTotals = (list) => {
		var data = [];
		data.push({
			type: 'Consolidada',
			value:
				parseFloat(list[0].value) +
				parseFloat(list[1].value) +
				parseFloat(list[2].value) +
				parseFloat(list[3].value) +
				parseFloat(list[4].value),
			percentage:
				parseFloat(list[0].percentage) +
				parseFloat(list[1].percentage) +
				parseFloat(list[2].percentage) +
				parseFloat(list[3].percentage) +
				parseFloat(list[4].percentage)
		});
		data.push({
			type: 'Ambiental',
			value: list[5].value + list[6].value + list[7].value,
			percentage: list[5].percentage + list[6].percentage + list[7].percentage
		});
		setAreaTypeTotalList(data);
	};

	function onUploadFile(file) {
		if (file != null) {
			setLoading(true);
			console.log(file.name);
			uploadFile(propertyId.toString() + 'kml', file)
				.then((url) => {
					var data = {
						propertyAttachments: {
							...propertyAttachments,
							kmlFile: url
						}
					};

					updateProperty('', propertyId, data)
						.then(() => {
							message.success('Attachment updated');
							setPropertyAttachments({
								...propertyAttachments,
								kmlFile: url
							});
							// setUserData({ ...userData, documentUrl: url });
							setLoading(false);
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
	}

	function uploadSolidImage(file) {
		if (file != null) {
			setLoading(true);
			console.log(file.name);
			uploadFile(propertyId.toString() + 'solid', file)
				.then((url) => {
					var data = {
						propertyAttachments: {
							...propertyAttachments,
							solidImage: url
						}
					};

					updateProperty('', propertyId, data)
						.then(() => {
							message.success('Attachment updated');
							setPropertyAttachments({
								...propertyAttachments,
								solidImage: url
							});
							// setUserData({ ...userData, documentUrl: url });
							setLoading(false);
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
	}

	function uploadImage(file) {
		if (file != null) {
			setLoading(true);
			console.log(file.name);
			uploadFile(propertyId.toString() + 'image', file)
				.then((url) => {
					var data = {
						propertyAttachments: {
							...propertyAttachments,
							image: url
						}
					};

					updateProperty('', propertyId, data)
						.then(() => {
							message.success('Attachment updated');
							setPropertyAttachments({
								...propertyAttachments,
								image: url
							});
							// setUserData({ ...userData, documentUrl: url });
							setLoading(false);
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
	}

	const columns = [
		{
			title: '',
			dataIndex: 'color',
			key: 'color',
			render: (_, record) => <div className={'color-div'} style={{ background: record.color }} />
		},
		{
			title: 'areas',
			dataIndex: 'area',
			key: 'area'
		},
		{
			title: 'Valor',
			dataIndex: 'value',
			key: 'value',
			render: (_, record, index) => (
				<input
					defaultValue={ruralAreaList[index].value}
					className={'cell-input'}
					onKeyPress={(e) => {
						if (e.code == 'Enter') {
							if (e.target.value >= 0) {
								setLoading(true);
								ruralAreaList[index] = { ...ruralAreaList[index], value: e.target.value };
								updateRuralArea(propertyId, ruralAreaList)
									.then(() => {
										calculateTotals(ruralAreaList);
										setLoading(false);
									})
									.catch((error) => {
										message.error('Error in updating');
									});
								console.log(e.target.value);
							}
						}
					}}
				/>
			)
		},
		{
			title: 'Porcentagem',
			dataIndex: 'percentage',
			key: 'percentage',
			editable: true,
			render: (_, record, index) => (
				<input
					defaultValue={`${ruralAreaList[index].percentage}%`}
					className={'cell-input'}
					onKeyPress={(e) => {
						if (e.code == 'Enter') {
							if (e.target.value.replace('%', '') >= 0) {
								setLoading(true);
								ruralAreaList[index] = {
									...ruralAreaList[index],
									percentage: e.target.value.replace('%', '')
								};
								updateRuralArea(propertyId, ruralAreaList)
									.then(() => {
										calculateTotals(ruralAreaList);
										setLoading(false);
									})
									.catch((error) => {
										message.error('Error in updating');
									});
								console.log(e.target.value);
							}
						}
					}}
				/>
			)
		},
		{
			title: 'Tipo',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: 'Comentários',
			dataIndex: 'comments',
			key: 'comments',
			render: (_, record, index) => (
				<input
					defaultValue={ruralAreaList[index].comments}
					className={'cell-input'}
					onKeyPress={(e) => {
						if (e.code == 'Enter') {
							setLoading(true);
							ruralAreaList[index] = { ...ruralAreaList[index], comments: e.target.value };
							updateRuralArea(propertyId, ruralAreaList)
								.then(() => {
									setLoading(false);
								})
								.catch((error) => {
									message.error('Error in updating');
								});
							console.log(e.target.value);
						}
					}}
				/>
			)
		}
	];

	const columns2 = [
		{
			title: '',
			dataIndex: 'type',
			key: 'type',
			render: (_, record) => <span>Total de Áreas {record.type}</span>
		},
		{
			title: '',
			dataIndex: 'value',
			key: 'value'
		},
		{
			title: '',
			dataIndex: 'percentage',
			key: 'percentage',
			render: (_, record) => <span>{record.percentage}%</span>
		}
	];

	return (
		<div className={'managerial-info'}>
			<div className={'d-flex justify-content-between align-items-center'}>
				<p className="documents-heading">Quadro de Áreas do Imóvel Rural</p>
				<SolidPrimaryButton
					text={'Adicionar área'}
					onClick={() => {
						setAreaVisibility(true);
					}}
				/>
			</div>
			<Table dataSource={tableData} columns={columns} className="property-table" pagination={false} />
			<p className="documents-heading">Totais</p>
			<Table dataSource={areaTypeTotalList} columns={columns2} className="property-table" pagination={false} />
			<p className="documents-heading">Anexos</p>
			<div className={'d-flex'}>
				<div
					className={'d-flex justify-content-center attachment-div'}
					onClick={() => {
						setPreviewPicture(propertyAttachments.solidImage);
					}}
				>
					<div className={'edit-icon-div'}>
						<Upload
							showUploadList={false}
							beforeUpload={uploadSolidImage}
							accept={'image/*'}

							// onPreview={this.handlePreview}
							// onChange={this.handleChange}
						>
							{<EditIcon />}
						</Upload>
					</div>
					<span className={'attachment-text'}>Imagem Solida</span>
				</div>
				<div
					className={'d-flex justify-content-center attachment-div'}
					onClick={() => {
						setPreviewPicture(propertyAttachments.image);
					}}
				>
					<div className={'edit-icon-div'}>
						<Upload
							showUploadList={false}
							beforeUpload={uploadImage}
							accept={'image/*'}
							// onPreview={this.handlePreview}
							// onChange={this.handleChange}
						>
							{<EditIcon />}
						</Upload>
					</div>
					<span className={'attachment-text'}>Imagem</span>
				</div>
				<div className={'d-flex justify-content-center attachment-div'}>
					<div className={'edit-icon-div'}>
						<Upload
							showUploadList={false}
							beforeUpload={onUploadFile}
							accept={'.kml'}

							// onPreview={this.handlePreview}
							// onChange={this.handleChange}
						>
							{<EditIcon />}
						</Upload>
					</div>
					<span className={'attachment-text'}>Arquivo KML</span>
				</div>
			</div>
			<div className={'preview-image-div d-flex justify-content-center align-items-center'}>
				<Image alt={'Previa do arquivo selecionado'} width={200} src={previewPicture} />
			</div>
			<AddAreaModal
				visible={areaVisibility}
				changeVisibility={() => {
					setAreaVisibility(false);
					// getAreasList();
				}}
				propertyId={propertyId}
			/>
			<Loader visible={loading} />
		</div>
	);
}
