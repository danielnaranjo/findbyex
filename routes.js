//Importar de Controllers Admin y Website
var website = require('./controllers/website');

/* Comprobacion de administrador */
function is_admin(req, res, next) {
  if(req.user && req.user.admin) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = function (app, passport) {
	/* website */
	app.get('/', website.index);
	app.get('/explorer', website.explorer);
	app.get('/nearby', website.nearby);
	app.get('/login', website.login);
	app.get('/profile', website.profile);
	app.get('/add', website.add);
	app.get('/view/:id', website.view);
	app.get('/contact', website.contact);

	/* administracion
	app.get('/admin', is_admin, admin.index);
	app.get('/admin/feedback', is_admin, admin.feedback);
	app.get('/admin/feedback/:date', is_admin, admin.feedback_single);
	app.get('/admin/users', is_admin, admin.users);
	app.get('/admin/socketReport', is_admin, admin.socketReport);
	app.post('/admin/update', is_admin, admin.update);
	*/
	
	// Auth Twitter
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
	
	// Auth Facebook
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
	app.get('/logout', function(req, res){ req.logout(); res.redirect('/'); });

	//Todo lo demas 404 NOT FOUND
	//app.all('*', website.notFound);
};


