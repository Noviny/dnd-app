import React, { Component } from 'react';
import HitpointTracker from './HitpointTracker'

class EnemyBlock extends Component {

  render () {
    return (
      <div>
        {this.props.name}:
        <HitpointTracker />
    </div>
    )
  }
};

module.exports = EnemyBlock;
