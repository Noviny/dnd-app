import React, { Component } from 'react';
import InitiativeValue from './InitiativeValue';

import { d20 } from 'react-dice'

const rollInitiative = (combatants) => {
  combatants.forEach(combatant => {
    combatant.initiative = d20(combatant.initiativeBonus);
  });
  return combatants;
}

const sortCombatants = (combatants) => {
  var sortedCombatants = combatants.sort((a, b) => {
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

  return sortedCombatants;
};

class InitiativeTracker extends Component {
  constructor () {
    super();
    this.handleInitiativeUpdate = this.handleInitiativeUpdate.bind(this);
    this.rerollInitiative = this.rerollInitiative.bind(this);
  }

  componentWillMount () {
    let combatants = rollInitiative(this.props.combatants);
    this.setState({
      combatants: sortCombatants(combatants),
    });
  };

  handleInitiativeUpdate (combatantName, newValue) {
    var { combatants } = this.state;
    combatants.forEach(c => {
      if (c.name === combatantName) {
        c.initiative = newValue;
      }
    })
    this.setState({ combatants: sortCombatants(combatants) });
  };

  rerollInitiative () {
    let combatants = rollInitiative(this.props.combatants);
    this.setState({
      combatants: sortCombatants(combatants),
    });
  };

  render () {
    return (
      <div>
        <table>
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
            {this.state.combatants.map((combatant, i) => {
              return <InitiativeValue
                name={combatant.name}
                initiative={combatant.initiative}
                setInitiativeValue={this.handleInitiativeUpdate}
                key={combatant.name}
              />
            })}
          </tbody>
        </table>
        <button onClick={this.rerollInitiative}>Roll Initiative</button>
      </div>
    )
  };
};


module.exports = InitiativeTracker;
