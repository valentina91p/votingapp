
(function(){
	'use strict';
	angular.module('VotingApp', [
        'ngRoute',
        'ngMessages',
        'controllers',
        'services'
    ]).config(['$routeProvider', function($routeProvider){
    	$routeProvider.when('/',{
            templateUrl: './public/views/home.html'
        }).when('/login',{
    		templateUrl: './public/views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'ctrl'
    	}).when('/signup',{
            templateUrl: './public/views/signup.html',
            controller: 'SignUpCtrl',
            controllerAs: 'ctrl'
        }).when('/dashboard',{
    		templateUrl: './public/views/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'ctrl'
    	}).otherwise({redirectTo:'/'});
    }])
    angular.module('controllers',[]);
    angular.module('services',[]);
    angular.module('directives',[]);
    angular.module('filters',[]);
})();