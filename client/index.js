import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { newRoll } from 'react-dice';

import App from './App';
import dndApp from './reducers';

let store = createStore(dndApp);

fetch('/api/characters/partymembers')
	.then(res => res.json())
	.then(response => {
		response.characters.forEach(char => {
			store.dispatch({
				type: 'ADD_CHARACTER',
				name: char.name.first,
				initiativeBonus: char.initiativeBonus,
				playerName: 'point',
			});
		});
	});

[
	{ name: 'Davar', initiativeBonus: 2, maxHP: newRoll(15, 8, 45).total },
	{ name: 'Merra', initiativeBonus: 3, maxHP: newRoll(9, 8).total },
	{ name: 'Revenant1', initiativeBonus: 2, maxHP: newRoll(16, 8, 64).total },
	{ name: 'Revenant2', initiativeBonus: 2, maxHP: newRoll(16, 8, 64).total },
	{ name: 'Revenant3', initiativeBonus: 2, maxHP: newRoll(16, 8, 64).total },
	{ name: 'Banshee', initiativeBonus: 2, maxHP: newRoll(13, 8).total },
].forEach(char => {
	store.dispatch({
		type: 'ADD_CHARACTER',
		name: char.name,
		initiativeBonus: char.initiativeBonus,
		maxHP: char.maxHP,
	});
});


render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App} />
		</Router>
	</Provider>
), document.getElementById('app'));
