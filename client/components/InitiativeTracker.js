import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newRoll } from 'react-dice';
import InitiativeValue from './InitiativeValue';
import { Table, FormInput, Button } from 'elemental';

// const rollInitiative = (characters) => {
// 	characters.forEach(character => {
// 		character.initiative = newRoll().total + character.initiativeBonus;
// 	});
// 	return characters;
// };

class InitiativeTracker extends Component {
	constructor () {
		super();
		this.updateNewName = this.updateNewName.bind(this);
		this.updateNewInitiative = this.updateNewInitiative.bind(this);
		this.updateNewMaxHP = this.updateNewMaxHP.bind(this);
		this.addCharacter = this.addCharacter.bind(this);
		this.handleInitiativeUpdate = this.handleInitiativeUpdate.bind(this);
		this.rerollInitiative = this.rerollInitiative.bind(this);
		this.rollInitiative = this.rollInitiative.bind(this);
		this.hideCharacter = this.hideCharacter.bind(this);
		this.state = {
			newName: '',
			newInitiative: '',
			newMaxHP: '',
		};
	}

	addCharacter (e) {
		const initiativeBonus = parseInt(this.state.newInitiative);
		this.props.dispatch({
			type: 'ADD_CHARACTER',
			name: this.state.newName,
			initiativeBonus,
			initiative: newRoll(1, 20, initiativeBonus).total,
			maxHP: parseInt(this.state.newMaxHP),
		});

	}
	rerollInitiative () {
		this.props.characters.forEach(char => {
			this.props.dispatch({ type: 'ROLL_INITIATIVE', key: char.key });
		});
	}
	updateNewName (e) {
		this.setState({ newName: e.target.value });
	}
	updateNewInitiative (e) {
		this.setState({ newInitiative: e.target.value });
	}
	updateNewMaxHP (e) {
		this.setState({ newMaxHP: e.target.value });
	}
	handleInitiativeUpdate (key, initiative) {
		this.props.dispatch({
			type: 'UPDATE_INITIATIVE',
			initiative: parseInt(initiative),
			key,
		});
	}
	rollInitiative (key) {
		this.props.dispatch({ type: 'ROLL_INITIATIVE', key });
	}
	hideCharacter (key) {
		this.props.dispatch({ type: 'TOGGLE_TRACK_INITIATIVE', key });
	}
	render () {
		const characters = this.props.characters.filter(character => {
			return character.trackInitiative;
		}).sort((a, b) => {
			if (a.initiative < b.initiative) {
				return 1;
			}
			if (a.initiative > b.initiative) {
				return -1;
			}
			if (a.initiativeBonus < b.initiativeBonus) {
				return 1;
			}
			if (a.initiativeBonus > b.initiativeBonus) {
				return -1;
			}
			return Math.round(Math.random());
		});

		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Initiative</th>
							<th>Reroll</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{characters.map((character, i) => {
							return (
								<InitiativeValue
									name={character.name}
									initiative={character.initiative}
									key={character.key}
									keyVal={character.key}
									isActive={(this.props.activePlayer === character.name)}
									setInitiativeValue={this.handleInitiativeUpdate}
									rollInitiative={this.rollInitiative}
									hideChar={this.hideCharacter}
								/>
							);
						})}
					</tbody>
				</Table>
				<div>
					<FormInput
						style={{ maxWidth: '10rem', display: 'inline-block' }}
						type="text"
						placeholder="name"
						value={this.state.newName}
						onChange={this.updateNewName}
					/>
					<FormInput
						style={{ maxWidth: '8rem', display: 'inline-block' }}
						type="number"
						placeholder="initiative"
						value={this.state.newInitiative}
						onChange={this.updateNewInitiative}

					/>
					<FormInput
						style={{ maxWidth: '8rem', display: 'inline-block' }}
						type="number"
						placeholder="max HP"
						value={this.state.newMaxHP}
						onChange={this.updateNewMaxHP}

					/>
					<Button onClick={this.addCharacter}>Add Character</Button>
				</div>
				<button onClick={this.rerollInitiative}>Roll Initiative</button>
				<button onClick={this.advanceTurnOrder}>Next Turn</button>
			</div>
		);
	};
};
const mapStateToProps = state => {
	return Object.assign(
		{},
		{
			characters: state.characters,
			activePlayer: state.activePlayer,
		}
	);
};


module.exports = connect(mapStateToProps)(InitiativeTracker);
