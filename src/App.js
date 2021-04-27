import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Statistics } from './pages/Statistics';
import { ROUTE } from './Routes';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container pt-1">
				<Switch>
					<Route path={ROUTE.game} exact component={Home} />
					<Route path={ROUTE.settings} component={Settings} />
					<Route path={ROUTE.statistics} component={Statistics} />
					<Route path={ROUTE.about} component={About} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
