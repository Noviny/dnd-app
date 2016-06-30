import React, { Component } from 'react';

class HitpointTracker extends Component {
	// TODO: Make this work, make damagePending a thing, allow it to be updated
	dealDamage (e) {
		e.preventDefault();
		const newHPVal = this.props.person.currentHP - this.props.person.damagePending;
		this.props.updateHP(newHPVal, this.props.person.key);
		this.props.updateDamagePending(0, this.props.person.key);
	}

	render () {
		const person = this.props.person;

		const inputStyle = {
			textAlign: 'center',
		};

		const isBloodied = (person.currentHP <= person.maxHP / 2);

		if (isBloodied) inputStyle.color = 'red';

		return (
			<div>
				<input
					type="number"
					value={person.currentHP}
					onChange={(e) => this.props.updateHP(e.target.value, person.key)}
					style={inputStyle}
				/> /{person.maxHP} -
				<form onSubmit={(e) => {this.dealDamage(e)}}>
					<input
						type="number"
						value={person.damagePending || 0}
						onChange={(e) => this.props.updateDamagePending(e.target.value, person.key)}
						style={inputStyle}
					/>
				</form>
			</div>
		);
	}
};

module.exports = HitpointTracker;
