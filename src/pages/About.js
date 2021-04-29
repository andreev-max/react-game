import React from 'react';
import RSSCHOOLOGO from '../icons/logo-rs.svg';
import leftArrow from '../icons/arrow-left.png';
import rightArrow from '../icons/arrow-right.png';
import space from '../icons/space.png';

export const About = () => {
	return (
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1 className="display-4 about-title">About this application</h1>
				<hr id="horizontal-bar" />
				<h2 className="subtitle">You can сontrol cards by keyboard( click 'Tab' two times ):</h2>
				<div className="about-key">
					<img className="about-key-image" src={leftArrow} title="Left Arrow Key" alt="left arrow" />
					<p className="about-key-description">&nbsp;&nbsp;&mdash;&nbsp;&nbsp;Go prev card</p>
				</div>
				<div className="about-key">
					<img className="about-key-image" src={rightArrow} title="Right Arrow Key" alt="left arrow" />
					<p className="about-key-description">&nbsp;&nbsp;&mdash;&nbsp;&nbsp;Go next card</p>
				</div>
				<div className="about-key">
					<img className="about-key-image" src={space} title="Space Key" alt="left arrow" />
					<p className="about-key-description">&nbsp;&nbsp;&mdash;&nbsp;&nbsp;Flip card</p>
				</div>
				<hr id="horizontal-bar" />
				<p className="lead lead-year">
					This App was creating in <h3 className="year">&nbsp;2021&nbsp;</h3>
				</p>

				<p className="lead">
					by&nbsp;
					<a href="https://github.com/nAzdAc" className="link">
						Max Andreev
					</a>
				</p>
				<p className="lead">
					My LinkedIn&nbsp;
					<a className="link linkedin" href="https://www.linkedin.com/in/max-andreev-b74736207/">
						Go Connect
					</a>
				</p>
				<p className="lead">
					Thank you&nbsp;
					<a className="link" href="https://rs.school/react/">
						RS School
					</a>
				</p>
				<a className="logo-link" href="https://rs.school/react/">
					<img className="about-logo" src={RSSCHOOLOGO} alt="RS School" title="RS School Logo" />
				</a>

				<p className="lead">
					Version <span>1.1.42</span>
				</p>
			</div>
		</div>
	);
};
