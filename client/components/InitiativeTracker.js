import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newRoll } from 'react-dice'
import InitiativeValue from './InitiativeValue';
import { fetchCharacters } from '../requests'

const rollInitiative = (combatants) => {
  combatants.forEach(combatant => {
    let initModifier = combatant.initiativeBonus + combatant.dexMod
    combatant.initiative = newRoll(1, 20, initModifier).total;
  });
  return combatants;
}

class InitiativeTracker extends Component {
  constructor () {
    super();
    this.handleInitiativeUpdate = this.handleInitiativeUpdate.bind(this);
    this.rerollInitiative = this.rerollInitiative.bind(this);
  }

  componentWillMount () {
    fetchCharacters((err, characters) => {
      if (err || !characters) return console.error('error:', err);
      this.props.dispatch({ type: 'SET_CHARACTERS', characters });
      let combatants = rollInitiative(characters.concat(this.props.enemies));
      this.props.dispatch({ type: 'SORT_COMBATANTS', combatants });
    })

  };

  handleInitiativeUpdate (combatantName, newValue) {
    var { combatants } = this.props;
    combatants.forEach(c => {
      if (c.name.first === combatantName) {
        c.initiative = parseInt(newValue);
      }
    })
    this.props.dispatch({ type: 'SORT_COMBATANTS', combatants });
  };

  rerollInitiative () {
    let combatants = rollInitiative(this.props.combatants);
    this.props.dispatch({ type: 'SORT_COMBATANTS', combatants })
  };

  render () {
    console.log(this.props);
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
            {this.props.combatants.map((combatant, i) => {
              return <InitiativeValue
                name={combatant.name.first}
                initiative={combatant.initiative}
                setInitiativeValue={this.handleInitiativeUpdate}
                key={combatant.name.first}
              />
            })}
          </tbody>
        </table>
        <button onClick={this.rerollInitiative}>Roll Initiative</button>
      </div>
    )
  };
};
const mapStateToProps = state => {
	return Object.assign(
    {},
    {
      combatants: state.combatants,
      characters: state.characters,
      enemies: state.enemies,
      randomNum: Math.random(),
    },
  );
}


module.exports = connect(mapStateToProps)(InitiativeTracker);
