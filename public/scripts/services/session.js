angular.module('services')
	.service('$session', ['$http',function($http){
		var session = {};
		var user = null;
		session.login = function(credentials){
			return $http.post('/login',credentials);
		}; 	
		session.setUser = function(u) {
			user = u;
		};
		session.logout = function(){
			return $http.post('/logout')
				.then(function(resp){
					user = null;
					return true;
				}).then(function(resp){
					return false;
				});
		};
		session.register = function(user){
			return $http.post('/register', user);
		};
		session.isLoggedIn = function(){
			return user !== null;
		};
		return session;
	}]);