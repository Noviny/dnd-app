var babelify = require('babelify');
var browserify = require('browserify-middleware');
var keystone = require('keystone');

var importRoutes = keystone.importer(__dirname);

const routes = {
	api: importRoutes('./api/'),
};

// Setup Route Bindings
exports = module.exports = function(app) {

	app.use('/js', browserify('./client/scripts', {
		transform: [babelify.configure({
			plugins: ['object-assign']
		})]
	}));

	// API endpoints
	app.get('/api/characters/partymembers', routes.api.characters.partymembers);

	// Catchall View route
	app.use(function(req, res) {
		res.render('index');
	});


};
