var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Action = new keystone.List('Action');

Action.add({
  name: { type: String, required: true, initial: true },
  action: { type: Types.Select, options: 'action, bonus action, reaction' },
  description: { type: Types.Textarea, required: true, default: '' },
  isAttack: { type: Boolean, default: false },
  attack: { type: Types.Relationship, ref: 'Attack', dependsOn: { isAttack: true } },
  isSpell: { type: Boolean, default: false },
  spell: { type: Types.Relationship, ref: 'Spell', dependsOn: { isSpell: true } },
});

transform.toJSON(Action);

Action.register();
