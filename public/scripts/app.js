
(function(){
	'use strict';
	angular.module('VotingApp', [
        'ngRoute',
        'ngMessages'
    ]).config(['$routeProvider', function($routeProvider){
    	$routeProvider.when('/login',{
    		templateUrl: './public/views/login.html'
    	}).when('/signup',{
    		templateUrl: './public/views/signup.html'
    	});;
    }]);
})();