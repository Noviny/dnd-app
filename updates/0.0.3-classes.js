exports.create = {
  Class: [
    { name: 'Barbarian', hitDieType: 12, startingSkillCount: 2, spellcaster: false },
    { name: 'Bard', hitDieType: 8, startingSkillCount: 3, spellcaster: true, spellCastingAbility: 'charisma' },
    { name: 'Cleric', hitDieType: 8, startingSkillCount: 2, spellcaster: true, spellCastingAbility: 'wisdom' },
    { name: 'Druid', hitDieType: 8, startingSkillCount: 2, spellcaster: true, spellCastingAbility: 'wisdom' },
    { name: 'Fighter', hitDieType: 10, startingSkillCount: 2 },
    { name: 'Monk', hitDieType: 8, startingSkillCount: 2 },
    { name: 'Paladin', hitDieType: 10, startingSkillCount: 2, spellcaster: true, spellCastingAbility: 'charisma' },
    { name: 'Ranger', hitDieType: 10, startingSkillCount: 3, spellcaster: true, spellCastingAbility: 'wisdom' },
    { name: 'Rogue', hitDieType: 8, startingSkillCount: 4 },
    { name: 'Sorcerer', hitDieType: 6, startingSkillCount: 2, spellcaster: true, spellCastingAbility: 'charisma' },
    { name: 'Warlock', hitDieType: 8, startingSkillCount: 2, spellcaster: true, spellCastingAbility: 'charisma' },
    { name: 'Wizard', hitDieType: 6, startingSkillCount: 2, spellcaster: true, spellCastingAbility: 'intelligence' },
  ]
}
