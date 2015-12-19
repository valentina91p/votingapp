angular.module('controllers')
	.controller('DashboardCtrl', ['PoleService',function(PoleService){
		var self = this;
		self.poles = [];
		self.selected = null;
		init();
		self.selectPole = function(pole){
			self.selected = pole;
		};
		self.deletePole = function(pole){
			if(!pole)
				return;
			PoleService.delete(pole).then(function(resp){
				for(var i = 0, len = self.poles.length; i < len; i++){
					if(self.poles[i]._id === pole._id){
						self.poles.splice(i,1);
						break;
					}
				}
			},function(resp){
				self.msg = resp.err;
			});
			self.selected = null;
		};
		self.togglePole = function(pole){
			pole.open = !pole.open;
			var data = {_id: pole._id, open: pole.open};
			PoleService.update(data).then(function(resp){
				
			},function(resp){
				self.msg = resp.err;
				pole.open = !pole.open;
			});

		};
		function init(){
			PoleService.find().then(function(resp){
				self.poles = resp.data.poles;
			},function(resp){});
		}



	}]);