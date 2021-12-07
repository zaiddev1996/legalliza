import React, { useEffect, useState } from 'react';
import './ManagerialPropertyInfo.css';
import { message, Table, Upload, Image } from 'antd';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import SolidPrimaryButton from '../Buttons/SolidPrimaryButton';
import { AddAreaModal } from '../AddAreaModal/AddAreaModal';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { Loader } from '../loader/loader';
import { useManageFiles } from '../../hooks/files/useManageFiles';

export function ManagerialPropertyInfo({ propertyId }) {
	const [ areaVisibility, setAreaVisibility ] = useState(false);
	const [ ruralAreaList, setRuralAreaList ] = useState([]);
	const [ areaTypeTotalList, setAreaTypeTotalList ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const { getRuralAreas, updateProperty, getProperty } = usePropertyManagement();
	const { uploadFile } = useManageFiles();
	const [ propertyAttachments, setPropertyAttachments ] = useState({ solidImage: '', image: '', kmlFile: '' });
	const [ previewPicture, setPreviewPicture ] = useState('');
	useEffect(
		() => {
			getAttachments();
			getAreasList();
		},
		[ propertyId ]
	);

	const getAttachments = () => {
		getProperty('', propertyId)
			.then((doc) => {
				if (doc.propertyAttachments) setPropertyAttachments(doc.propertyAttachments);
				console.log(propertyAttachments);
			})
			.catch((error) => {
				message.error('Some error happened');
			});
	};

	const getAreasList = () => {
		setLoading(true);
		getRuralAreas(propertyId)
			.then((list) => {
				setRuralAreaList(list);
				calculateTotals(list);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				message.error('Some error happened');
			});
	};
	const calculateTotals = (list) => {
		var data = [];
		for (let i = 0; i < list.length; i++) {
			const type = list[i].type;
			const percentage = list[i].percentage;
			const value = list[i].value;
			var alreadyAdded = false;
			for (let j = 0; j < data.length; j++) {
				if (data[j].type == type) {
					data[j].value = parseFloat(data[j].value) + parseFloat(value);
					data[j].percentage = parseFloat(data[j].percentage) + parseFloat(percentage);
					alreadyAdded = true;
					break;
				}
			}
			if (!alreadyAdded) {
				data.push({ type: list[i].type, value: list[i].value, percentage: list[i].percentage });
			}
		}
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
			key: 'value'
		},
		{
			title: 'Porcentagem',
			dataIndex: 'percentage',
			key: 'percentage',
			render: (_, record) => <span>{record.percentage}%</span>
		},
		{
			title: 'Tipo',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: 'Comentários',
			dataIndex: 'comments',
			key: 'comments'
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
			<Table dataSource={ruralAreaList} columns={columns} className="property-table" pagination={false} />
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
					getAreasList();
				}}
				propertyId={propertyId}
			/>
			<Loader visible={loading} />
		</div>
	);
}
