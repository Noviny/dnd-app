import React, { Component } from 'react';

import InitiativeTracker from './components/InitiativeTracker';
import ManageCombatants from './components/ManageCombatants'

import { SimpleDie, StaticRoll, Dice, generateRoll } from 'react-dice';
import { Row, Col } from 'elemental';

class App extends Component {

	render () {
		return (
			<Row>
				<Col sm="1/2">
					<InitiativeTracker />
				</Col>
				<Col sm="1/2">
					<ManageCombatants />
				</Col>
				<Dice
					rollsArray={[generateRoll(3, 6), generateRoll(1, 8), generateRoll(1, 10, 12)]}
					showResultsArr
				/>
				<Dice
					rollsArray={[
						{ dieCount: 2, dieType: 6, bonus: 0 },
						{ dieCount: 3, dieType: 8, bonus: 5 },
						{ dieCount: 1, dieType: 10, bonus: 3 },
					]}
					bonus={6}
				/>
				<Dice
					rollsArray={[
						{ dieCount: 2, dieType: 6 },
						{ dieCount: 3, dieType: 8 },
						{ dieCount: 1, dieType: 10 },
					]}
				/>
				<Dice
					rollsArray={[
						{ dieCount: 2 },
						{ dieType: 8 },
						{},
					]}
				/>
				<Dice rollsArray={[generateRoll()]} />
			</Row>
		);
	}
};

module.exports = App;
