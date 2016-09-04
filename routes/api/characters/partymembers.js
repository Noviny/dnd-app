const keystone = require('keystone');
const Character = keystone.list('Character');

module.exports = (req, res) => {

	var output = {};

	var success = function () { res.json(Object.assign(output, { success: true })); };
	var error = function () { res.json({ success: false }); };

	Character.model.find({ isPartyMember: true })
		.exec((err, characters) => {
			if (err || !characters) return error();
			console.log(characters);
			output.characters = characters;
			success();
		});
};
