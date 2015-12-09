angular.module('controllers')
	.controller('SignUpCtrl', ['$session','$flash','$location',
	 function($session,$flash,$location){
		var self = this;
		self.user = {};
		self.feedback = false;
		self.signup = function(user){
			console.log(user);
			$session.register(user).then(function(resp){
				$flash.setInfo('Welcome to VotingApp. Now log in');
				$location.url('/login');
			},function(resp){
				self.feedback = resp.data.err;
			});
		};
	}]);