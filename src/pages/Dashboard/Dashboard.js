import { React } from 'react';
import { Header } from '../../components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { FarmDash } from '../FarmDash/FarmDash';
import { UserDash } from '../UserDash/UserDash';
import { FarmDetails } from '../FarmDetails/FarmDetails';
import { PropertyDetails } from '../PropertyDetails/PropertyDetails';
import { Registration } from '../Registration/Registration';
import './Dashboard.css';
import { UserDetails } from '../UserDetails/UserDetails';
import { useCheckLoginState } from '../../hooks/signin-signup/useCheckLoginState';
import { ManageAdmins } from '../ManageAdmins/ManageAdmins';
import Signup from '../Signup/Signup';

export function Dashboard() {
	useCheckLoginState();

	return (
		<div className="dashboard-main">
			<Header />
			<div className="dashboard-content-main">
				<Switch>
					<Route exact path="/farms" component={FarmDash} />
					<Route exact path="/" component={FarmDash} />
					<Route exact path="/dashboard" component={FarmDash} />
					<Route exact path="/farmers" component={UserDash} />
					<Route exact path="/farm-details/:id" component={FarmDetails} />
					<Route exact path="/farm-details" component={FarmDetails} />
					<Route exact path="/property-details/:farmName/:farmId" component={PropertyDetails} />
					<Route exact path="/property-details/:farmName/:farmId/:propertyId" component={PropertyDetails} />
					<Route exact path="/registration" component={Registration} />
					<Route exact path="/user-details/:userId" component={UserDetails} />
					<Route exact path="/add-admins" component={ManageAdmins} />
					<Route exact path="/signup/:type" component={Signup} />
				</Switch>
			</div>
		</div>
	);
}
