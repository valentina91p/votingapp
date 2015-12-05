'use strict';

//var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;
//var configAuth = require('./auth');

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback : true
		}, function (req, email, password, done) {
				process.nextTick(function () {
					User.findOne({ 'local.email': email }, function (err, user) {
						if (err) {
							return done(err);
						}

						if (user) {
							return done(null, false,"Email already in use.");
						} else {
							var newUser = new User();

							newUser.local.email = email;
							newUser.local.password = newUser.generateHash(password);
							newUser.local.name = req.param('name');

							newUser.save(function (err) {
								if (err) {
									return done(err);
								}
								return done(null, newUser);
							});
						}
					});
				});
		}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback : true
		}, function(req, email, password, done){
			User.findOne({'local.email':email},function(err,user){
				if(err)
					return done(err);
				if(!user || !user.validPassword(password))
					return done(null, false, 'Email or password incorrect.');
				else{
					return done(null,user);
				}
			});
		})
	);
};
