/* Dependiencias */
var fs = require('fs'),
    config = require('./config'),
    express = require('express'),
    request = require('request'),
    path = require('path'),
//    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    monk = require('monk'),
    connect = require('connect'),
//    newrelic = require('newrelic'),
//	uuid = require('node-uuid'),
	Static = require('node-static'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

/* MongoLab */
var db = monk('mongodb://' + config.dbname.name);

/* Mandrill API */
//var Mandrill = require('mandrill-api/mandrill');

//Mongoose para express
require('express-mongoose');
require('datejs/lib/date-es-ES');

/* Data Models */
//require('./models/post');
require('./models/user');

/* Estrategias de Passport TW y FB */
var auth = require('./auth');
passport.use(new TwitterStrategy({
	consumerKey: config.twitter.consumerKey,
	consumerSecret: config.twitter.consumerSecret,
	callbackURL: "http://localhost:5000/auth/twitter/callback"
}, auth.twitter));
passport.use(new FacebookStrategy({
	clientID: config.facebook.appId,
	clientSecret: config.facebook.appSecret,
	callbackURL: "http://localhost:5000/auth/facebook/callback"
}, auth.facebook));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(auth.user);


/* Configuracion de sesion */
var sessionStore = new (require('connect-mongo')(express))( {
	db: config.dbname.name,
	url: 'mongodb://' + config.dbname.name
});

/* Manejo eficiente de archivos estaticos */
var files = new Static.Server('./public');
function handler (request, response) {
	request.on('end', function() {
		files.serve(request, response);
		console.log(this);
    }).resume();
}
/*
server = http.createServer(function (request, response) {
    request.addListener('end', function () { fileServer.serve(request, response); }).resume(); }),
*/

/* Starter Express, HTTP, Socket.io */
var app = express(),
    http = require('http'),
    server = http.createServer(),
    io = require('socket.io').listen(server);


/* all environments */
app.configure(function() {

	/* Basic Magic */
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { pretty: true });
	/* HTML Bonito :) */
	app.locals.pretty = true;

	/* Evitar error de Express en 3.0 */
	app.use(connect.urlencoded());
	app.use(connect.json());

	/* Peticiones POST para Express */
	app.use(express.methodOverride());

	/* Manejo de Sessiones */
	app.use(express.cookieParser(config.cookie.secret));
	app.use(express.session({
		secret: config.session.secret,
		key: config.session.key,
		store: sessionStore
	}));

	/* Pasaport */
	app.use(passport.initialize());
	app.use(passport.session());
//	app.use(app.router);

	/* Directorio estatico y favicon */
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, '/public/')));
	app.use(express.favicon(__dirname + '/public/img/favicon.ico'));

	/* Establece apartir de la ip su localizacion y la guarda en la informacion del usuario */
	app.use(function (req, res, next) {
		if(req.user && !req.user.ip) {
			request({ url: 'https://mejorando.la/locateme?ip='+req.ip },
			function (err, response, body) {
				if(err) return next();
				req.user.ip = req.ip;
				req.user.pais = body;
				req.user.save();
				next();
			});
		} else {
			next();
		}
	});
	//Importa router de la app app.use(app.router);
});

//Permite establecer parametros de configuracion para entorno de desarrollo y produccion
app.configure('development', function(){
	app.use(express.logger('dev'));
	app.use(express.errorHandler());
});

/* Rutas */
require('./routes')(app, passport);

// delete to see more logs from sockets io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    socket.on('send:coords', function (data) {
        socket.broadcast.emit('load:coords', data);
    });
});

/* Servidor Real-time de verdaita! */
app.listen(app.get('port'), function(){
	console.log('A bunch of Magic running on port ' + app.get('port'));
});

