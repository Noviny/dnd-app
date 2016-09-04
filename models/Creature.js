var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;
// var roll = require('react-dice').roll;

var Creature = new keystone.List('Creature', {
	autokey: { from: 'name.first', path: 'key', unique: true },
});

Creature.add({
	name: { type: Types.Name, required: true, index: true },
	level: { type: Number, default: 1, initial: true },
}, 'Stats', {
	strength: { type: Number, required: true, initial: false, default: 8 },
	dexterity: { type: Number, required: true, initial: false, default: 8 },
	constitution: { type: Number, required: true, initial: false, default: 8 },
	intelligence: { type: Number, required: true, initial: false, default: 8 },
	wisdom: { type: Number, required: true, initial: false, default: 8 },
	charisma: { type: Number, required: true, initial: false, default: 8 },
}, 'Stat Modifiers', {
	strMod: { type: Number, noedit: true, hidden: true },
	dexMod: { type: Number, noedit: true, hidden: true },
	conMod: { type: Number, noedit: true, hidden: true },
	intMod: { type: Number, noedit: true, hidden: true },
	wisMod: { type: Number, noedit: true, hidden: true },
	chaMod: { type: Number, noedit: true, hidden: true },
}, 'Random Things', {
	profBonus: { type: Number, default: 2, noedit: true, hidden: true },
	hitDice: { type: Number, initial: true, required: true },
	initiativeBonus: { type: Number, default: 0, required: true },
	armorBonus: { type: Number, default: 0, required: true },
	speed: { type: Number, default: 30, required: true },
	size: { type: String, default: 'medium', required: true },
	challengeRating: { type: Number, required: true, default: 1, initial: true },
	actions: { type: Types.Relationship, ref: 'Action', many: true },
	// TODO: Add vulnerabilities and resistances
});


Creature.schema.pre('save', function (next) {
	this.strMod = Math.floor((this.strength - 10) / 2);
	this.dexMod = Math.floor((this.dexterity - 10) / 2);
	this.conMod = Math.floor((this.constitution - 10) / 2);
	this.intMod = Math.floor((this.intelligence - 10) / 2);
	this.wisMod = Math.floor((this.wisdom - 10) / 2);
	this.chaMod = Math.floor((this.charisma - 10) / 2);
	next();
});

Creature.schema.pre('save', function (next) {
	if (this.level < 5) this.profBonus = 2;
	else if (this.level < 8) this.profBonus = 3;
	else if (this.level < 13) this.profBonus = 4;
	else if (this.level < 17) this.profBonus = 5;
	else this.profBonus = 6;
	next();
});


Creature.schema.virtual('initiativeModifier').get(function () {
	if (this.initiativeBonus) return this.initiativeBonus + this.dexMod;
	return this.dexMod;
});

Creature.schema.virtual('hitPoints').get(function () {
	return roll(level, hitDice, (level * conMod)).total;
});

transform.toJSON(Creature);

Creature.defaultColumns = 'name, key';
Creature.register();
