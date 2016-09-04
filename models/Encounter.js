var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Encounter = new keystone.List('Encounter');

Encounter.add({
	name: { type: String, required: true, initial: true },
	subEncounter: { type: String },
	description: { type: Types.Textarea, required: true, default: '' },
});

transform.toJSON(Encounter);

Encounter.register();
