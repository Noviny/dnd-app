import React, { Component } from 'react';

import InitiativeTracker from './components/InitiativeTracker';
import ManageCombatants from './components/ManageCombatants';

import { Dice, roll } from 'react-dice';
import { Row, Col } from 'elemental';

class App extends Component {

	render () {
		return (
			<div>
				<Row>
					<Col sm="2/20" />
					<Col sm="1/2">
						<InitiativeTracker />
					</Col>
					<Col sm="8/20">
						<ManageCombatants />
					</Col>
				</Row>
				<Row>
					<Col sm="2/20" />
					<Dice rolls={[roll()]} />
					<Col sm="4/20">
						<Dice rolls={[roll(1, 6)]} />
					</Col>
					<Col sm="4/20">
						<Dice
							rolls={[roll(3, 6), roll(1, 8)]}
							showResults
						/>
					</Col>
					<Col sm="4/20">
						<Dice
							rolls={[roll(3, 6), roll(1, 8), roll(1, 10, 12)]}
							showResults
						/>
					</Col>
				</Row>
			</div>
		);
	}
};

module.exports = App;
