var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Proficiency = new keystone.List('Proficiency', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true,
});

Proficiency.add({
	name: { type: String, required: true, index: true },
	type: {
		type: Types.Select,
		options: 'skill, tool, save, ability check, weapon, armor',
		default: 'skill',
		required: true,
		initial: true
	},
});

transform.toJSON(Proficiency);

Proficiency.defaultColumns = 'name';
Proficiency.register();
