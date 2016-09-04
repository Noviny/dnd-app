var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Spell = new keystone.List('Spell');

Spell.add({
	name: { type: String, required: true, initial: true },
	action: { type: Types.Select, options: 'action, bonus action, reaction' },
	description: { type: Types.Textarea, required: true, default: '' },
	isAttack: { type: Boolean, default: false },
});

transform.toJSON(Spell);

Spell.register();
