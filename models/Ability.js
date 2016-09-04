var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;
// var newRoll = require('react-dice').newRoll;

var Ability = new keystone.List('Ability', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Ability.add({
	name: { type: String, required: true, index: true },
	action: { type: Types.Select, options: 'action, bonus action, reaction, free action, duration' },
	description: { type: Types.Textarea },
	isAttack: { type: Boolean },
	isSpell: { type: Boolean },
	// Need to include details if it is an attack or is a spell
});

transform.toJSON(Ability);

Ability.register();
