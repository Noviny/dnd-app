var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Character = new keystone.List('Character', {
	autokey: { from: 'name.first', path: 'key', unique: true }
});

Character.add({
	name: { type: Types.Name, required: true, index: true },
	level: { type: Number, default: 1, noedit: true },
	isPartyMember: { type: Boolean, default: false },
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
}, 'Class Info', {
	startingClass: {
		type: Types.Relationship,
		ref: 'Class',
		default: 'Bard',
		required: true,
		initial: true,
		label: 'Class'
	},
	startingClassLevel: { type: Number, required: true, default: 1 },
}, 'Multiclass', {
	isMulticlass: { type: Boolean, default: false },
	secondClass: {
		class: {
			type: Types.Relationship,
			ref: 'Class',
			required: false,
			dependsOn: { isMulticlass: true },
		},
		level: { type: Number, required: false,	dependsOn: { isMulticlass: true }, },
	},
}, 'Race Info', {
	race: {
		type: Types.Relationship,
		ref: 'Race',
		required: true,
		initial: true,
	},
}, 'Random Things', {
	initiativeBonus: { type: Number, default: 0 },
	profBonus: { type: Number, default: 2, noedit: true, hidden: true },
	proficiencies: { type: Types.Relationship, ref: 'Proficiency', many: true },
});


Character.schema.pre('save', function (next) {
	this.strMod = Math.floor((this.strength - 10) / 2);
	this.dexMod = Math.floor((this.dexterity - 10) / 2);
	this.conMod = Math.floor((this.constitution - 10) / 2);
	this.intMod = Math.floor((this.intelligence - 10) / 2);
	this.wisMod = Math.floor((this.wisdom - 10) / 2);
	this.chaMod = Math.floor((this.charisma - 10) / 2);
	next();
});

Character.schema.pre('save', function (next) {
	if (this.isMulticlass) this.level = this.startingClassLevel + this.secondClass.level;
	else this.level = this.startingClassLevel;
	next();
});


Character.schema.pre('save', function (next) {
	if (this.level < 5) this.profBonus = 2;
	else if (this.level < 8) this.profBonus = 3;
	else if (this.level < 13) this.profBonus = 4;
	else if (this.level < 17) this.profBonus = 5;
	else this.profBonus = 6;
	next();
});


Character.schema.virtual('initiativeModifier').get(function () {
	if (this.initiativeBonus) return this.initiativeBonus + this.dexMod;
	return this.dexMod;
});

transform.toJSON(Character);

Character.defaultColumns = 'name, level, race, startingClass';
Character.register();
