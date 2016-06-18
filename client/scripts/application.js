var React = require('react');
var ReactDOM = require('react-dom');

var InitiativeTracker = require('../components/InitiativeTracker');
var StatBlock = require('../components/StatBlock');

var store = require('../store');

// var SimpleDie = require('react-dice').SimpleDie;
// var StaticRoll = require('react-dice').StaticRoll;

import { StaticRoll } from 'react-dice';

var combatants = [
  { name: 'Iman', key: 'iman', initiativeBonus: 2 },
  { name: 'Murin', key: 'murin', initiativeBonus: -1 },
  { name: 'Illya', key: 'illya', initiativeBonus: 3 },
  { name: 'Red', key: 'red', initiativeBonus: 3 },
  { name: 'Demetos', key: 'demetos', initiativeBonus: 3 },
  { name: 'Orsik Stonehammer', key: 'orsik', initiativeBonus: -1 },
  { name: 'Arata', key: 'arata', initiativeBonus: 4 },
]

var enemies = [];

var App = React.createClass({
	render: function() {

		console.log('our store', store.getState());
		return (
			<div>
				<InitiativeTracker combatants={combatants} />
					<SimpleDie
					  dieCount={2}
					  dieType={2}
					  bonus={0}
						showResultsArr
					/>
				<br/>
				{enemies.map((enemy) => {
					return <StatBlock stats={enemy} />
				})}
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
