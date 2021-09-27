import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';

function App(props) {
	const getUrl = (pathname) => {
		let pathArray = pathname.split('/');
		return `/${pathArray[1]}` === '/'
			? true
			: // : `/${pathArray[1]}` === '/signup'
				// 	? true
				`/${pathArray[1]}` === '/signin' ? true : `/${pathArray[1]}` === '/forget-password' ? true : false;
	};
	return (
		<div className="App">
			{getUrl(props.location.pathname) ? (
				<Switch>
					<Route exact path="/signin" component={Signin} />
					{/* <Route exact path="/signup" component={Signup} /> */}
					<Route exact path="/forget-password" component={ForgetPassword} />
					<Route exact path="/" component={Signin} />
				</Switch>
			) : (
				<div>
					<Dashboard data={props.location} />
				</div>
			)}
		</div>
	);
}

export default App;
