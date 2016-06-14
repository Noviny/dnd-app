var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;
// var newRoll = require('react-dice').newRoll;

var Attack = new keystone.List('Attack', {
	autokey: { from: 'name.first', path: 'key', unique: true }
});

Attack.add({
	name: { type: Types.Name, required: true, index: true },
	range: { type: Number, required: true, initial: 5 },
	isProficient: { type: Boolean, default: true },
	ability: {
		type: Types.Select,
		options: 'strength, dexterity, constitution, intelligence, wisdom, charisma',
		default: 'strength',
		required: true,
	},
});

transform.toJSON(Attack);

Attack.register();
