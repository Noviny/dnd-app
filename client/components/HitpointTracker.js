import React, { Component } from 'react';

class HitpointTracker extends Component {

  render () {
    return (
      <div>
        {this.props.name}:
        <input type="number"
          value={this.props.currentHitpoints}
          onChange={(e) => {} }
          style={{ maxWidth: '60px', textAlign: 'center' }}
        />
      /{this.props.maxHitPoints}
    </div>
    )
  }
};

module.exports = HitpointTracker;
