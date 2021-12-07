import { React, useEffect, useState } from 'react';
import './PropertyDetails.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import SolidPrimaryButton from '../../components/Buttons/SolidPrimaryButton';
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { Select, Radio, message } from 'antd';
import { Table } from 'antd';
import History from '../../@history';
import { DocumentSection } from '../../components/DocumentsSection/DocumentSection';
import { usePropertyManagement } from '../../hooks/properties/usePropertyManagement';
import { usePropertyDetails } from '../../hooks/properties/usePropertyDetails';
import { useDetailsValidation } from '../../hooks/properties/useDetailsVaildation';
import { Loader } from '../../components/loader/loader';
import { ManagerialPropertyInfo } from '../../components/ManagerialPropertyInfo/ManagerialPropertyInfo';

export function PropertyDetails(props) {
	const { Option } = Select;
	const [ selectedDocument, setSelectedDocument ] = useState('Matrícula');
	const [ farmId, setFarmId ] = useState(props.match.params.farmId);
	const [ propertyId, setPropertyId ] = useState();
	const { propertySingularDetails } = usePropertyDetails();
	const { validatePropertyDetails } = useDetailsValidation();
	const [ singularDetailsState, setSingularDetailsState ] = useState(propertySingularDetails);
	const { addNewProperty, getProperty, deleteProperty, updateProperty } = usePropertyManagement();
	const [ loading, setLoading ] = useState(false);
	const [ selectedButton, setSelectedButton ] = useState(0);

	const onCreateProperty = () => {
		setLoading(true);
		if (validatePropertyDetails(singularDetailsState)) {
			console.log(singularDetailsState);
			addNewProperty(farmId, singularDetailsState)
				.then((id) => {
					message.success('New property added');
					setPropertyId(id);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					message.error(error);
				});
		} else {
			setLoading(false);
			console.log(singularDetailsState);
			message.error('Please input all details');
		}
	};

	useEffect(() => {
		if (props.match.params.propertyId != undefined) {
			setLoading(true);
			setPropertyId(props.match.params.propertyId);
			getProperty(props.match.params.farmId, props.match.params.propertyId)
				.then((data) => {
					setLoading(false);
					setSingularDetailsState(data);
				})
				.catch((error) => {
					setLoading(false);
					message.error(error);
				});
		}
	}, []);

	const onDeleteProperty = () => {
		setLoading(true);
		deleteProperty(farmId, propertyId)
			.then(() => {
				message.success('Property Deleted');
				setLoading(false);
				History.goBack();
			})
			.catch((error) => {
				setLoading(false);
				message.error(error);
			});
	};

	const onUpdateProperty = () => {
		setLoading(true);
		if (validatePropertyDetails(singularDetailsState)) {
			updateProperty(farmId, propertyId, singularDetailsState)
				.then(() => {
					message.success('Property Updated');
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					message.error(error);
				});
		} else {
			setLoading(false);
			console.log(singularDetailsState);
			message.error('Please input all details');
		}
	};

	return (
		<div className="property-details">
			<p className="farm-name">{props.match.params.farmName}</p>
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<input
						className="property-name"
						value={singularDetailsState.name}
						onChange={(e) => {
							setSingularDetailsState({
								...singularDetailsState,
								name: e.target.value
							});
						}}
					/>
					<EditIcon className="align-self-center edit-icon" />
				</div>
				{propertyId == null ? (
					<SolidPrimaryButton
						text={'Salve'}
						onClick={() => {
							onCreateProperty();
						}}
						btnStyle={'create-button'}
					/>
				) : (
					<div className={'d-flex'}>
						<SolidPrimaryButton
							text={'atualizar'}
							onClick={() => {
								onUpdateProperty();
							}}
							btnStyle={'create-button'}
						/>
						<SolidPrimaryButton
							text={'Documental'}
							onClick={() => {
								setSelectedButton(0);
								// onUpdateProperty();
							}}
							btnStyle={selectedButton == 0 ? 'create-button' : 'unselected-button'}
						/>
						<SolidPrimaryButton
							text={'Gerencial'}
							onClick={() => {
								setSelectedButton(1);
								// onUpdateProperty();
							}}
							btnStyle={selectedButton == 1 ? 'create-button' : 'unselected-button'}
						/>
						<ButtonWithIcon
							text={'Excluir Imóvel'}
							onClick={() => {
								onDeleteProperty();
							}}
							btnStyle={'delete-button'}
						/>
					</div>
				)}
			</div>
			<div className="d-flex farm-detail-div flex-wrap">
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Estado:</span>
					<Select
						defaultValue="SC"
						className="select-options state"
						onChange={(e) => {
							singularDetailsState.state = e;
						}}
					>
						<Option value="SC">SC</Option>
						<Option value="WC">WC</Option>
					</Select>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Município:</span>
					<Select
						defaultValue="Jaraguá do Sul"
						className="select-options county"
						onChange={(e) => {
							singularDetailsState.country = e;
						}}
					>
						<Option value="Jaraguá do Sul">Jaraguá do Sul</Option>
						<Option value="Jaraguá do Sull">Jaraguá do Sul</Option>
					</Select>
				</div>
				{/* <div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Fazenda Legal:</span>
					<Select
						defaultValue="30"
						className="select-options legal"
						onChange={(e) => {
							singularDetailsState.legalFarm = e;
						}}
					>
						<Option value="30">30%</Option>
						<Option value="40">40%</Option>
					</Select>
				</div> */}
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Latitude:</span>
					<div className="d-flex">
						<input
							value={singularDetailsState.latDegree.concat('º')}
							className="input-location-points degree"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latDegree: e.target.value.replace('º', '').replace(' ', '')
								});
							}}
						/>
						<input
							value={singularDetailsState.latMinutes.concat('’')}
							className="input-location-points minutes"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latMinutes: e.target.value.replace('’', '').replace(' ', '')
								});
							}}
						/>

						<input
							value={singularDetailsState.latSeconds.concat('’’')}
							className="input-location-points seconds"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									latSeconds: e.target.value.replace('’’', '').replace(' ', '')
								});
							}}
						/>
						<Select
							defaultValue="S"
							className="select-options latitude"
							onChange={(e) => {
								singularDetailsState.latDirection = e;
							}}
						>
							<Option value="S">S</Option>
							<Option value="D">D</Option>
						</Select>
					</div>
				</div>
				<div className="d-flex flex-column detail-div-left-margin">
					<span className="align-self-start detail-heading">Longitude:</span>
					<div className="d-flex">
						<input
							value={singularDetailsState.longDegree.concat('º')}
							className="input-location-points degree"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longDegree: e.target.value.replace('º', '').replace(' ', '')
								});
							}}
						/>
						<input
							value={singularDetailsState.longMinutes.concat('’')}
							className="input-location-points minutes"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longMinutes: e.target.value.replace('’', '').replace(' ', '')
								});
							}}
						/>

						<input
							value={singularDetailsState.longSeconds.concat('’’')}
							className="input-location-points seconds"
							onChange={(e) => {
								setSingularDetailsState({
									...singularDetailsState,
									longSeconds: e.target.value.replace('’’', '').replace(' ', '')
								});
							}}
						/>
						<Select
							defaultValue="S"
							className="select-options latitude"
							onChange={(e) => {
								singularDetailsState.longDirection = e;
							}}
						>
							<Option value="S">S</Option>
							<Option value="D">D</Option>
						</Select>
					</div>
				</div>
			</div>
			{propertyId == null ? (
				<div />
			) : (
				<div>
					{selectedButton == 0 ? (
						<div>
							<div className="line-seperator" />
							<p className="documents-heading">Documentos:</p>
							<div className="container documents-container">
								<Radio.Group
									defaultValue="Matrícula"
									buttonStyle="solid"
									className="row gx-3 gy-4"
									onChange={(e) => {
										setSelectedDocument(e.target.value);
									}}
								>
									<div className="col-4">
										<Radio.Button value="Matrícula" className="document">
											Matrícula
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="GEO" className="document">
											GEO
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="CCIR" className="document">
											CCIR
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="CAR" className="document">
											CAR
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="LAR" className="document">
											LAR
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="Outorga" className="document">
											Outorga
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="ITR" className="document">
											ITR
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="ADA" className="document">
											ADA
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="Laudo" className="document">
											Laudo
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="GSSMATR" className="document">
											GSSMATR
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="LTCAT" className="document">
											LTCAT
										</Radio.Button>
									</div>
									<div className="col-4">
										<Radio.Button value="Gerencial" className="document">
											Gerencial
										</Radio.Button>
									</div>
								</Radio.Group>
							</div>
							<DocumentSection name={selectedDocument} farmId={farmId} propertyId={propertyId} />
						</div>
					) : (
						<div>
							<div className="line-seperator" />
							<ManagerialPropertyInfo propertyId={propertyId} />
						</div>
					)}
				</div>
			)}
			<Loader visible={loading} />
		</div>
	);
}
