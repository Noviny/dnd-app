import React, { Component } from 'react';

import InitiativeTracker from './components/InitiativeTracker';
import StatBlock from './components/StatBlock';

import { SimpleDie, StaticRoll } from 'react-dice';

var enemies = [];

class App extends Component {

	render () {
		return (
			<div>
				<InitiativeTracker />
					<SimpleDie
					  dieCount={2}
					  dieType={2}
					  bonus={0}
						showResultsArr
					/>
				<br/>
				{enemies.map((enemy) => {
					return <div>enemy.name</div>
				})}
			</div>
		);
	}
};

module.exports = App;
