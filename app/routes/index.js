'use strict';

var path = require('path');
var Pole = require('../models/poles');

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
			Pole.find({_owner: req.user.id},function(err, poles){
				console.log(poles);
				if(err)
					res.status(500).json({err: err});
				res.status(200).json({err: false, poles: poles});
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
			Pole.find({_id: req.params.id},function(err,pole){
				if(err)
					res.status(500).json({err:err});
				res.status(200).json({err:false,pole:pole});
			})
		})
		.delete(isLoggedIn, function (req, res) {
			Pole.remove({_id: req.params.id}, function(err){
				if(err)
					res.status(500).json({err: err});
				res.status(200);
			});
		})
		.post(isLoggedIn, function (req, res) {
			console.log(req.params.id);
			console.log(req.body.pole);
			Pole.update({ _id: req.params.id }, req.body.pole, function(err){
				console.log("after updating",err);
				if(err)
					res.status(500).json({err: err});
				res.status(200);
			});
		});
	//Add new pole
	app.route('/api/poles')
		.post(isLoggedIn,function (req, res) {
			var  pole = new Pole();
			pole.name = req.body.name;
			pole.multichoice = req.body.multichoice;
			pole.options = req.body.options;
			pole._owner = req.user.id;
			console.log(pole);
			pole.save(function(err){
				if(err)
					res.status(500).json({err: err});
				res.status(200).json({err: false, data: pole});
			});
		});

};
