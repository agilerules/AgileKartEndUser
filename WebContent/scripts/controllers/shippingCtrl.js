angular.module('enduser').controller(
		'shippingCtrl',
		function($scope, $http, $location, $routeParams, 
				addressData) {
			$scope.address = addressData.getBillingAddress();
			
		});