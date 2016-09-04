import React, { Component } from 'react';

class HitpointTracker extends Component {
	// TODO: Make this work, make damagePending a thing, allow it to be updated
	constructor () {
		super();
		this.updateDamagePending = this.updateDamagePending.bind(this);
		this.dealDamage = this.dealDamage.bind(this);
		this.state = { damagePending: 0 };
	}

	updateDamagePending (e) {
		this.setState({ damagePending: e.target.value });
	}

	dealDamage (e) {
		e.preventDefault();
		const newHPVal = this.props.character.currentHP - this.state.damagePending;
		this.props.updateHP(newHPVal, this.props.character.key);
	}

	render () {
		const character = this.props.character;

		const inputStyle = {
			textAlign: 'center',
		};

		const isBloodied = (character.currentHP <= character.maxHP / 2);

		if (isBloodied) inputStyle.color = 'red';

		return (
			<div>
				{character.name}:
				<input
					type="number"
					value={character.currentHP}
					onChange={(e) => this.props.updateHP(e.target.value, character.key)}
					style={inputStyle}
				/> /{character.maxHP} -
				<form onSubmit={this.dealDamage}>
					<input
						type="number"
						value={this.state.damagePending}
						onChange={this.updateDamagePending}
						style={inputStyle}
					/>
				</form>
			</div>
		);
	}
};

module.exports = HitpointTracker;
