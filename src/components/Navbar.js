import React from 'react';
import { NavLink } from 'react-router-dom';
import brainIcon from '../icons/brain.png';
import { ROUTE } from '../Routes';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<NavLink className="link" to={ROUTE.game} exact>
				<div className="navbar-brand">
					<img src={brainIcon} alt="Brain icon" title="Brain" className="brand-icon" />
					<h1 className="brand-title">Memory</h1>
				</div>
			</NavLink>

			<ul className="navbar-nav">
				<li className="nav-item">
					<NavLink className="link" to={ROUTE.game} exact>
						Game
					</NavLink>
				</li>

				<li className="nav-item">
					<NavLink className="link" to={ROUTE.settings}>
						Settings
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="link" to={ROUTE.statistics}>
						Statistics
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="link" to={ROUTE.about}>
						About
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
