import React, { Component } from 'react';
import HitpointTracker from './HitpointTracker';
import { connect } from 'react-redux';

class ManageCombatants extends Component {
	constructor () {
		super();
		this.updateHP = this.updateHP.bind(this);
	}

	componentWillMount () {
		this.props.dispatch({ type: 'SET_CURRENT_ENEMY_HIT_POINTS' });
	}

	updateHP (newVal, key) {
		this.props.dispatch({
			type: 'UPDATE_HITPOINTS',
			currentHP: parseInt(newVal),
			key,
		});
	}


	render () {
		return (
			<div>
				{this.props.characters.map((character, i) => {
					return (
						<div
							key={character.key}
							style={{ border: '1px' }}
						>
							<HitpointTracker
								character={character}
								updateHP={this.updateHP}
							/>
						</div>
					);
				})}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return Object.assign(
		{},
		{
			characters: state.characters.filter(char => {
				return char.trackHP;
			}),
		}
	);
};

module.exports = connect(mapStateToProps)(ManageCombatants);
