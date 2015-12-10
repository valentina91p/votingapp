angular.module('controllers')
	.controller('LoginCtrl', ['$scope','$session','$location','$rootScope', 
		function($scope, $session,$location){
			var self = this;
			self.credentials = {};
			self.feedback = false;

			self.login = function(credentials){
				$session.login(credentials).then(function(resp){
					$location.url("/dashboard");
				},function(error){
					self.feedback = error;
				});
			};
			self.loginTwitter = function(){};
			self.loginFacebook = function(){};
		}]);