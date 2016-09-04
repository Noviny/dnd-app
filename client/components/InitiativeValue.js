import React, { Component } from 'react';

class InitiativeValue extends Component {

	render () {
		const style = {};
		if (this.props.isActive) style.backgroundColor = 'green';

		return (
			<tr style={style} >
				<td>{this.props.name}</td>
				<td><input type="number"
					value={this.props.initiative}
					onChange={(e) => { this.props.setInitiativeValue(this.props.keyVal, e.target.value); }}
					style={{ textAlign: 'center', border: 'none' }}
				/></td>
				<td onClick={() => { this.props.rollInitiative(this.props.keyVal); }}>CLICK</td>
				<td onClick={() => { this.props.hideChar(this.props.keyVal); }}>X</td>
			</tr>
		);
	}
};

module.exports = InitiativeValue;
