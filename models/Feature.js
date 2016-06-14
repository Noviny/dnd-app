var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Feature = new keystone.List('Feature');

Feature.add({
  name: { type: String, required: true, initial: true },
  description: { type: Types.Textarea, required: true, default: '' },
  isAction: { type: Boolean, default: false },
  action: { type: Types.Select, options: 'action, bonus action, reaction', dependsOn: { isAction: true } },
  isAttack: { type: Boolean, default: false },
  attack: { type: Types.Relationship, ref: 'Attack', dependsOn: { isAttack: true } },
  isSpell: { type: Boolean, default: false },
  spell: { type: Types.Relationship, ref: 'Spell', dependsOn: { isSpell: true } },
});

transform.toJSON(Feature);

Feature.register();
