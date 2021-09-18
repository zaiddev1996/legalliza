import { React } from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as FarmTabLogo } from '../../assets/images/Union-tab.svg';
import { ReactComponent as UserTabLogo } from '../../assets/images/user-tab.svg';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import history from '../../@history';

export function Header() {
	const { TabPane } = Tabs;

	function callback(key) {
		switch (key) {
			case '1':
				history.push({
					pathname: '/farms'
				});
				break;
			case '2':
				history.push({
					pathname: '/farmers'
				});
		}
	}
	return (
		<div className="header-main d-flex justify-content-between align-items-center">
			<Logo className="header-logo" />
			<div className="d-flex align-self-end">
				<Tabs defaultActiveKey="1" tabPosition="top" onChange={callback}>
					<TabPane
						tab={
							<div className="d-flex">
								<FarmTabLogo />
								<span className="tab-text">FAZENDAS</span>
							</div>
						}
						key="1"
					/>
					<TabPane
						tab={
							<div className="d-flex">
								<UserTabLogo />
								<span className="tab-text">USUÁRIOS</span>
							</div>
						}
						key="2"
					/>
				</Tabs>
			</div>

			<span className="logout-text">SAIR</span>
		</div>
	);
}
