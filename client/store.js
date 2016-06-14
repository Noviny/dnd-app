import { createStore } from 'redux';

const initialState = {
	players: {},
}

const encounter = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PLAYERS':
			fetch('/api/characters/partymembers')
				.then(res => res.json())
				.then(response => {
					// TODO: spread current state with response.players being mapped to players
				})
      return 'something';
		case 'EXCLUDE_PLAYER':
			return 'hahaha';
		default:
			return state;
	}
}

let store = createStore(encounter)

export default store
