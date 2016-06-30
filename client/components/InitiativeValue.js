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
					onChange={(e) => { this.props.setInitiativeValue(this.props.key, e.target.value) } }
					style={{ textAlign: 'center', border: 'none' }}
				/></td>
				<td>{this.props.perception}</td>
				<td>{this.props.insight}</td>
				<td>{this.props.investigation}</td>
			</tr>
		);
	}
};

module.exports = InitiativeValue;
