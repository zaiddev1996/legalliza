import './App.css';
import { Switch } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';

function App(props) {
	const getUrl = (pathname) => {
		let pathArray = pathname.split('/');
		return `/${pathArray[1]}` === '/'
			? false
			: `/${pathArray[1]}` === '/signup'
				? true
				: `/${pathArray[1]}` === '/signin' ? true : `/${pathArray[1]}` === '/forget-password' ? true : false;
	};
	return (
		<div className="App">
			{getUrl(props.location.pathname) ? (
				<Switch />
			) : (
				<div>
					<Dashboard data={props.location} />
				</div>
			)}
		</div>
	);
}

export default App;
