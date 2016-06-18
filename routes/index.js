var keystone = require('keystone');

var importRoutes = keystone.importer(__dirname);

const routes = {
	api: importRoutes('./api/'),
	views: importRoutes('./views/'),
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// API endpoints
	app.get('/api/characters/partymembers', routes.api.characters.partymembers);

	// Catchall View route
	app.use('/', routes.views.home);


};
