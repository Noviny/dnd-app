import { newRoll } from 'react-dice';

const character = (state, action) => {
	switch (action.type) {
		case 'ADD_CHARACTER':
			return {
				name: action.name,
				initiativeBonus: action.initiativeBonus || 0,
				initiative: action.initiative || 0,
				trackInitiative: true,
				trackHP: !!action.maxHP,
				owner: action.playerName || 'DM',
				currentHP: action.HP || action.maxHP || null,
				maxHP: action.maxHP || null,
				key: Math.random().toString(36).substring(7),
			};
		case 'UPDATE_INITIATIVE':
			if (state.key !== action.key) {
				return state;
			}
			return Object.assign({}, state, { initiative: action.initiative });
		case 'UPDATE_HITPOINTS':
			if (state.key !== action.key) {
				return state;
			}
			return Object.assign({}, state, { currentHP: action.currentHP });
		case 'DEAL_DAMAGE':
			if (state.key !== action.key) {
				return state;
			}
			return Object.assign({}, state, { currentHP: state.currentHP - action.damage });

		case 'ROLL_INITIATIVE':
			if (state.key !== action.key) {
				return state;
			}
			return Object.assign({}, state, { initiative: newRoll(1, 20, state.initiativeBonus).total });

		case 'TOGGLE_TRACK_INITIATIVE':
			if (state.key !== action.key) {
				return state;
			}
			return Object.assign({}, state, { trackInitiative: !state.trackInitiative });

		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}

			return Object.assign({}, state, {
				completed: !state.completed,
			});
		default:
			return state;
	}
};

const characters = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CHARACTER':
			return [
				...state,
				character(undefined, action),
			];
		case 'UPDATE_INITIATIVE':
			return state.map(c => character(c, action));
		case 'UPDATE_HITPOINTS':
			return state.map(c => character(c, action));
		case 'DEAL_DAMAGE':
			return state.map(c => character(c, action));
		case 'TOGGLE_TRACK_INITIATIVE':
			return state.map(c => character(c, action));
		case 'ROLL_INITIATIVE':
			return state.map(c => character(c, action));
		case 'TOGGLE_TODO':
			return state.map(t =>
				character(t, action)
			);
		default:
			return state;
	}
};

export default characters;
