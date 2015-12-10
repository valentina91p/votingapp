'use strict';

var path = require('path');
var Poles = require('../models/poles');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.send(401);
		}
	}

	app.get("/", function(req, res){
		res.sendFile("index.html", { root: path.join(__dirname, '../../public') });
	});
	app.post('/register',function(req,res,next){
		passport.authenticate('local-signup',function(err,user,info){
			if(err) res.status(500).json({err: err});
			if(!user)
				res.status(401).json({err: info});
			else{
				res.status(200).json({err: false, data: user});
			}
		})(req, res, next);;
	});
	app.post('/login',function(req,res,next){
		passport.authenticate('local-login',function(err, user, info){
			if(err)
				res.status(500).json({err: err});
			if(!user)
				res.status(401).json({err: info});
			else{
				req.logIn(user, function(err){
					if (err) {
				       return res.status(500).json({err: 'Could not log in user'});
				    }
				    user.local.password = "";
				    res.status(200).json({err: false, user: user});
				});
			}
		})(req, res, next);;
	});

	app.post('/logout',function (req, res) {
			req.logout();
			res.status(200).json("ok");
		});

	//Query all poles from the authenticated user
	app.route('/api/poles/')
		.get(isLoggedIn, function (req, res) {
			console.log(req.user.id);
			Poles.find({_owner: req.user.id},function(err, poles){
				console.log(poles);
				if(err)
					res.status(500).json({err: err});
				res.status(200).json({err: false, data: poles});
			});
		});

	//Submit vote to pole
	app.route('/api/poles/:id/vote')
		.post(function (req, res) {
			res.json('');
		});

	//Query data from pole
	app.route('/api/poles/:id')
		.get(function (req, res) {
			res.json('');
		})
		.delete(isLoggedIn, function (req, res) {
			res.json('');
		})
		.post(isLoggedIn, function (req, res) {
			res.json('');
		});
	//Add new pole
	app.route('/api/poles')
		.post(isLoggedIn,function (req, res) {
			res.json('');
		});

};
