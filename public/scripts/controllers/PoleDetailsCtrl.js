angular.module('controllers')
	.controller('PoleDetailsCtrl',['PoleService','$routeParams','$location','$session',
		function(PoleService,$routeParams,$location,$session){
			var self = this;
			self.pole = null;
			init();
			function init(){
				var id = $routeParams.id;
				PoleService.findById(id).then(function(resp){
					if(!resp.data.pole.length)
						return;
					self.pole = resp.data.pole[0];
					if(self.pole._owner !== $session.getUser()._id)
						$location.url('/poles/'+id);
					self.pole.total_votes = self.pole.options.reduce(function(s,v){
						return s+v.votes;
					},0)
				},function(resp){

				});
			}
		}]);