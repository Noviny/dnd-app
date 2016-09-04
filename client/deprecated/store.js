import { createStore } from 'redux';

import { newRoll } from 'react-dice';
import reactDice from 'react-dice';
console.log('All react dice', reactDice);

const initialState = {
	characters: [],
	enemies: [
		// The revenants
		// { name: { first: 'Revenant 1' }, key: 'rev1', initiativeBonus: 0, dexMod: 2, maxHP: newRoll(16, 8, 64).total },
		// { name: { first: 'Revenant 2' }, key: 'rev2', initiativeBonus: 0, dexMod: 2, maxHP: newRoll(16, 8, 64).total },
		// { name: { first: 'Revenant 3' }, key: 'rev3', initiativeBonus: 0, dexMod: 2, maxHP: newRoll(16, 8, 64).total },
	],
	combatants: [],
};

const encounter = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CHARACTERS':
			return Object.assign({}, state, { characters: action.characters });
		case 'EXCLUDE_PLAYER':
			return state;
		case 'FETCH_ENEMIES_FOR_ENCOUNTER':
			// TODO: Make this actually retrieve a set of enemy stat blocks from DB.
			// What you want is a fetch request based on a list of names, and to populate
			// The right number of fields
			return Object.assign({}, state);
		case 'SORT_COMBATANTS':
			return Object.assign(
				{},
				state,
				{
					combatants: action.combatants.sort((a, b) => {
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
					}),
				}
			);
		case 'SET_CURRENT_ENEMY_HIT_POINTS':
			const newEnemiesArr = state.enemies.map(enemy => {
				enemy.currentHP = enemy.maxHP;
				return enemy;
			});
			return Object.assign({}, state, { enemies: newEnemiesArr });
		case 'SET_HITPOINTS':
			return Object.assign(
				{},
				state,
				{
					enemies: state.enemies.map((enemy) => {
						if (enemy.key === action.key) {
							return Object.assign({}, enemy, { currentHP: action.newVal });
						}
						return enemy;
					}),
				}
			);
		case 'START_TURN_ORDER':
			return Object.assign(
				{},
				state,
				{ activePlayer: state.activePlayer ? state.activePlayer : state.combatants[0].key }
			);
		case 'ADVANCE_TURN_ORDER':
			const newActivePlayer = {};
			state.combatants.forEach((combatant, i, a) => {
				if (combatant.key === state.activePlayer) {
					if (i < a.length - 1) return newActivePlayer.activePlayer = a[i + 1].key;
					return newActivePlayer.activePlayer = a[0].key;
				}
			});
			return Object.assign(
				{},
				state,
				newActivePlayer
			);
		case 'UPDATE_INITIATIVE':
			return {
				...state,
				combatants: state.combatants.map(combatant => {
					if (combatant.key === action.key) {
						return combatant.initiative = parseInt(action.newValue);
					}
					return combatant;
				}),
			};
		default:
			return state;
	}
};

let store = createStore(encounter);

export default store;
