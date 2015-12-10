angular.module('services')
	.service('$session', ['$http','$cookies','$q','$rootScope',
		function($http,$cookies,$q, $rootScope){
		var session = {};
		var user = undefined;
		session.login = function(credentials){
			return $q(function(resolve, reject){
				$http.post('/login',credentials).then(function(resp){
					user = resp.data.user;
					$cookies.putObject('u',user);
					$rootScope.$emit('login');
					resolve(true);
				},function(resp){
					reject(resp.data.err);
				});
			});
		}; 	
		session.getUser = function(){
			if(!user)
				user = $cookies.getObject('u');
			return user;
		};
		session.logout = function(){
			return $http.post('/logout')
				.then(function(resp){
					user = undefined;
					$cookies.remove('u');
					return true;
				});
		};
		session.register = function(user){
			return $http.post('/register', user);
		};
		session.isLoggedIn = function(){
			return this.getUser() !== undefined;
		};
		return session;
	}]);