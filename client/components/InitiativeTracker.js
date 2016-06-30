import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newRoll } from 'react-dice';
import InitiativeValue from './InitiativeValue';
import { fetchCharacters } from '../requests';
import { Table } from 'elemental';

const rollInitiative = (combatants) => {
	combatants.forEach(combatant => {
		combatant.initiative = newRoll().total + combatant.initiativeBonus + combatant.dexMod;
	});
	return combatants;
};

const enemies = [];

class InitiativeTracker extends Component {
	constructor () {
		super();
		this.handleInitiativeUpdate = this.handleInitiativeUpdate.bind(this);
		this.rerollInitiative = this.rerollInitiative.bind(this);
		this.advanceTurnOrder = this.advanceTurnOrder.bind(this);
	}

	componentWillMount () {
		fetchCharacters((err, characters) => {
			if (err || !characters) return console.error('error:', err);

			// TODO: Make all these actions actually things the store can do.
			// TODO: Find how to do side-effect free things in redux well because dang
			// random numbers are not what we want to come out of these. Maybe we do
			// want to roll initiative here and then dispatch to SORT_COMBATANTS ?
			this.props.dispatch({ type: 'SET_CHARACTERS', characters });
			let combatants = rollInitiative(characters.concat(this.props.enemies));
			this.props.dispatch({ type: 'SET_COMBATANTS', characters, enemies });
			this.props.dispatch({ type: 'ROLL_INITIATIVE_FOR_COMBATANTS' });
			this.props.dispatch({ type: 'SORT_COMBATANTS', combatants });
			this.props.dispatch({ type: 'START_TURN_ORDER' });
		});
	};

	handleInitiativeUpdate (key, newValue) {
		this.props.dispatch({
			type: 'UPDATE_INITIATIVE',
			key,
			newValue,
		});
		// var { combatants } = this.props;
		// combatants.forEach(c => {
		//   if (c.name.first === combatantName) {
		//     c.initiative = parseInt(newValue);
		//   }
		// })
		// this.props.dispatch({ type: 'SORT_COMBATANTS', combatants });
	};

	advanceTurnOrder () {
		this.props.dispatch({ type: 'ADVANCE_TURN_ORDER' });
	}

	rerollInitiative () {
		let combatants = rollInitiative(this.props.combatants);
		this.props.dispatch({ type: 'SORT_COMBATANTS', combatants });
	};

	render () {
		console.log('rendering');
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Initiative</th>
							<th>Perception</th>
							<th>Insight</th>
							<th>Investigation</th>
						</tr>
					</thead>
					<tbody>
						{this.props.combatants.map((combatant, i) => {
							return (
								<InitiativeValue
									name={combatant.name.first}
									initiative={combatant.initiative}
									setInitiativeValue={this.handleInitiativeUpdate}
									key={combatant.key}
									isActive={(this.props.activePlayer === combatant.key)}
								/>
							);
						})}
					</tbody>
				</Table>
				<button onClick={this.rerollInitiative}>Roll Initiative</button>
				<button onClick={this.advanceTurnOrder}>Next Turn</button>
				<button onClick={this.addPerson}>Add Person</button>
			</div>
		);
	};
};
const mapStateToProps = state => {
	console.log(state.combatants);
	return Object.assign(
		{},
		{
			combatants: state.combatants,
			characters: state.characters,
			enemies: state.enemies,
			activePlayer: state.activePlayer,
		}
	);
};


module.exports = connect(mapStateToProps)(InitiativeTracker);
