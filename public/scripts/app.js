
(function(){
	'use strict';
	angular.module('VotingApp', [
        'ngRoute',
        'ngMessages',
        'ngCookies',
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
            controllerAs: 'ctrl',
            access: { requiresLogin: true }
        }).when('/dashboard/poles/:id',{
    		templateUrl: './public/views/details.html',
            controller: 'PoleDetailsCtrl',
            controllerAs: 'ctrl',
            access: { requiresLogin: true }
    	}).when('/dashboard/new',{
            templateUrl: './public/views/new_pole.html',
            controller: 'NewPoleCtrl',
            controllerAs: 'ctrl',
            access: { requiresLogin: true }
        }).otherwise({redirectTo:'/'});
    }]).run(['$rootScope','$location','$session',
        function ($rootScope, $location, $session) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.access !== undefined) {
                    if(!$session.isLoggedIn()){
                        $location.path("/login");
                    }
                }
            });
        }]);
    angular.module('VotingApp').controller('MainCtrl', ['$session','$rootScope', '$location',
        function($session,$rootScope, $location){
            var self = this;
            self.current_user = $session.getUser();
            console.log(self.current_user);
            $rootScope.$on('login', function(event, args){
                console.log("On login");
                self.current_user = $session.getUser();
            });
            $rootScope.$on('logout', function(event,args){
                self.logout();
            });
            self.logout = function(){
                self.current_user = null;
                $session.logout();
                $location.url('/');
            };
        }]);
    angular.module('controllers',[]);
    angular.module('services',[]);
    angular.module('directives',[]);
    angular.module('filters',[]);
})();