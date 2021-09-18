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

export function Dashboard(props) {
	return (
		<div className="dashboard-main">
			<Header />
			<div className="dashboard-content-main">
				<Switch>
					<Route exact path="/dashboard" component={FarmDash} />
					<Route exact path="/farms" component={FarmDash} />
					<Route exact path="/farmers" component={UserDash} />
					<Route exact path="/farm-details" component={FarmDetails} />
					<Route exact path="/property-details" component={PropertyDetails} />
					<Route exact path="/registration" component={Registration} />
					<Route exact path="/user-details" component={UserDetails} />
				</Switch>
			</div>
		</div>
	);
}
