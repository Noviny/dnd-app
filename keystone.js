var keystone = require('keystone');

keystone.init({

	'name': 'dnd-app',
	'brand': 'dnd-app',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '75337b73ccfd70db70fc2a3c460fc39e2e36a2e2862640698d930b654470d4435771134236346a7022a0d0cf6197712da0e4a3fd1b6fe24235d2221150d23165',

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	port: process.env.port || 8000,
});

keystone.set('routes', require('./routes'));
keystone.set('nav', {
	'users': 'users',
	'characters': 'characters',
	'details': ['races', 'classes', 'abilities', 'spells'],
	'DM': ['creatures', 'encounters'],
});

keystone.start();
