import { createStore } from 'redux';

import{ newRoll } from 'react-dice';

const initialState = {
	characters: [],
	enemies: [
		{ name:{ first: 'Haaag' }, key: 'haaag', initiativeBonus: 1, dexMod: 0, maxHP: newRoll(11, 8, 33).total },
		{ name:{ first: 'Oni' }, key: 'oni', initiativeBonus: 3, dexMod: 0, maxHP: newRoll(8, 10, 40).total },
	],
	combatants: [],
}

const encounter = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CHARACTERS':
			return Object.assign({}, state, { characters: action.characters })
		case 'EXCLUDE_PLAYER':
			return state;
		case 'FETCH_ENEMIES_FOR_ENCOUNTER':
			// TODO: Make this actually retrieve a set of enemy stat blocks from DB.
			// What you want is a fetch request based on a list of names, and to populate
			// The right number of fields
		case 'SORT_COMBATANTS':
			var sortedCombatants = action.combatants.sort((a, b) => {
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
			return Object.assign({}, state, { combatants: sortedCombatants });
		default:
			return state;
	}
}

let store = createStore(encounter)

export default store
