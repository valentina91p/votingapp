angular.module('controllers')
	.controller('LoginCtrl', ['$scope','$session','$location', 
		function($scope, $session,$location){
			var self = this;
			self.credentials = {};
			self.rememberme = false;
			self.feedback = false;

			self.login = function(credentials, rememberme){
				var l = $session.login(credentials).then(function(resp){
					$session.setUser(resp.data.user);
					$location.url("/dashboard");
				},function(resp){
					self.feedback = resp.data.err;
				});
			};
			self.loginTwitter = function(){};
			self.loginFacebook = function(){};
		}]);