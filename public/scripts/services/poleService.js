angular.module('services')
	.service('PoleService',['$http', function($http){
		var poles = {};
		poles.find = function(){
			return $http.get('/api/poles');
		};
		poles.findById = function(id){
			return $http.get('/api/poles/'+id);
		};
		poles.create = function(pole){
			return $http.post('/api/poles', pole);
		};

		poles.delete = function(pole){
			return $http.delete('/api/poles/'+pole._id);
		};
		poles.update = function(pole){
			var id = pole._id;
			delete pole._id;
			return $http.post('/api/poles/'+id, {pole:pole});	
		};
		return poles;
	}]);