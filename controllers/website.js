var mongoose = require('mongoose'),
    Users = mongoose.model('Users');

exports.index = function(req, res) {res.render('index', { title: 'FindBY - Home', user: req.user });}
exports.login = function(req, res){ res.render('login', { title: 'Login', user: req.user }); }

exports.contact = function(req, res){ res.render('contact', { title: 'Contact' }); }
exports.add = function(req, res){ res.render('add', { title: 'Contact' }); }
exports.explorer = function(req, res ) { res.render('map', { title: 'Explorer' }); }
exports.nearby = function(req, res, next){ res.render('nearby', { title: 'Nearby' });}
exports.view = function(req, res) { res.render('detail', { title: 'User profile' }); }
exports.profile = function(req, res, next) { res.render('view', { title: 'User profile' }); }

/* Manejo de Errores */
exports.notFound = function (req, res) { res.status(404).render('404'); }
exports.badboy = function (req, res) { res.status(500).render('500'); }