import React, { Component } from 'react';

class InitiativeValue extends Component {

  render () {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><input type="number"
          value={this.props.initiative}
          onChange={(e) => { this.props.setInitiativeValue(this.props.name, e.target.value) } }
          style={{ maxWidth: '30px', textAlign: 'center', border: 'none' }}
        /></td>
        <td>{this.props.perception}</td>
        <td>{this.props.insight}</td>
        <td>{this.props.investigation}</td>
      </tr>
    )
  }
};

module.exports = InitiativeValue;
