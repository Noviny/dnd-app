var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Race = new keystone.List('Race');

Race.add({
	name: { type: String, required: true, initial: true },
	subRace: { type: String },
	description: { type: Types.Textarea, required: true, default: '' },
});

transform.toJSON(Race);

Race.register();
