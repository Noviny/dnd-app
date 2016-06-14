var React = require('react');
var ReactDOM = require('react-dom');

var InitiativeTracker = require('../components/InitiativeTracker');

var store = require('../store');

var combatants = [
  { name: 'Iman', key: 'iman', initiativeBonus: 2 },
  { name: 'Murin', key: 'murin', initiativeBonus: -1 },
  { name: 'Illya', key: 'illya', initiativeBonus: 3 },
  { name: 'Red', key: 'red', initiativeBonus: 3 },
  { name: 'Demetos', key: 'demetos', initiativeBonus: 3 },
  { name: 'Orsik Stonehammer', key: 'orsik', initiativeBonus: -1 }
]


var App = React.createClass({
	render: function() {
		return (
			<div>
				<InitiativeTracker combatants={combatants} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
