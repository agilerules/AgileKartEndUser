angular.module('enduser').controller(
		'paymentCtrl',
		function($scope, $http, $rootScope, $location, $routeParams, AkUsersResource,
				AkUserAddressResource, DataService, ngDialog, addressData) {
			$scope.cart = DataService.cart;
			$scope.akOrders = $scope.akOrders || {};
			$scope.confirmPayment = function() {
				ngDialog.openConfirm({template: 'views/confirmPayment.html',
					className: 'ngdialog-theme-plain',
					  scope: $scope //Pass the scope object if you need to access in the template
					}).then(
						function(value) {
							$location.path("/summary/order");
						},
						function(value) {
							console.log("Cancel");
						}
					);
			};
			
		});