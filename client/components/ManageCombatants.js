import React, { Component } from 'react';
import HitpointTracker from './HitpointTracker'
import { connect } from 'react-redux';

class ManageCombatants extends Component {

  componentWillMount () {
    this.props.dispatch({ type: 'SET_CURRENT_ENEMY_HIT_POINTS' });
  }

  updateHP (newVal, key) {
    this.props.dispatch({
      type: 'SET_HITPOINTS',
      newVal,
      key,
    })
  }


  render () {
    return (
      <div>
        {this.props.enemies.map((enemy, i) => {
          return (
            <div key={enemy.key}>
              {enemy.name.first}:
              <HitpointTracker
                person={enemy}
                updateHP={(value, key) => { this.updateHP(value, key) }}
              />
            </div>
          )
        })}
    </div>
    )
  }
};

const mapStateToProps = state => {
	return Object.assign(
    {},
    {
      enemies: state.enemies,
    },
  );
}

module.exports = connect(mapStateToProps)(ManageCombatants);
