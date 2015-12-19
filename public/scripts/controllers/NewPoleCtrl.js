angular.module('controllers')
	.controller('NewPoleCtrl', ['PoleService','$session','$location',
		 function(PoleService, $session, $location){
		var self = this;
		self.pole = {};
		self.pole.options = [];
		self.option = "";
		self.msg_error = false;
		self.editing = null;
		self.addOption = function($event, option){
			self.pole.options.push({text:option});
			self.option = "";
			$event.preventDefault();
			return false;
		};
		self.editOption = function($event, option){
			self.editing = option;
			var a = angular.element($event.currentTarget).next();
			angular.element(a[0]).focus();
		}
		self.createPole = function(pole){
			if(pole.options.length < 2){
				self.msg_error = "Must add at least two options";
			}

			PoleService.create(pole).then(function(resp){
				$location.url('/dashboard');
			},function(resp){
				if(resp.status > 399 && resp.status < 500){
					$session.logout();
					$location.url('/login');
				}

				self.msg_error = resp.data.err;
			});
		};
	}]);