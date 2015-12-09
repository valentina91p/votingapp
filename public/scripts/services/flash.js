angular.module('services')
	.service('$flash', function(){
		var flash = {};
		var message = false;
		flash.retrieve = function(){
			if(!message)
				return false;
			var m = message;
			message = false;
			return m;
		};
		flash.hasFlash = function(){
			return message?true:false;
		}
		flash.setError = function(msg){
			message = {
				type:'ERROR',
				data:msg
			};
		};
		flash.setInfo = function(msg){
			message = {
				type:'INFO',
				data:msg
			};
		};flash.setWarning = function(msg){
			message = {
				type:'WARNING',
				data:msg
			};
		};flash.setSuccess = function(msg){
			message = {
				type:'SUCCESS',
				data:msg
			};
		};
		return flash;
	});