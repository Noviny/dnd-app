var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;
// var newRoll = require('react-dice').newRoll;

var Class = new keystone.List('Class', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Class.add({
	name: { type: String, required: true, index: true },
	hitDieType: { type: Number, required: true, initial: 6 },
	startingSkillCount: { type: Number, required: true, default: 2 },
	spellcaster: { type: Boolean, default: false },
	spellCastingAbility: {
		type: Types.Select,
		dependsOn: { spellcaster: true },
		options: 'strength, dexterity, constitution, intelligence, wisdom, charisma',
		default: 'wisdom',
	},
});

transform.toJSON(Class);

Class.register();
