angular
		.module('enduser')
		.controller(
				'orderCtrl',
				function($scope, $http, $rootScope, $location, $routeParams,
						locationParser, AkOrdersResource,
						AkOrderDetailsResource,DataService, ngDialog,
						addressData) {
					$scope.cart = {};
					$scope.cart.items = [];
					$scope.akOrderDetails = {};

					var successCallback = function(data) {
						console.log("Success callback");
						self.original = data;
						$scope.akOrders = new AkOrdersResource(self.original);
						AkOrderDetailsResource.queryAll(function(items) {
							 console.log("fsdfsfsfs");
				                              if(item.akOrders.orderId == $scope.akOrders.orderId) {
				               
				                    }

				            });
						console.log($scope.akOrders.akOrderDetailses);
							var item = {};							

					};
					var errorCallback = function() {
						console.log("Error");
					};
					console.log("routeParams.id " + addressData.getOrderId());
					AkOrdersResource.get({
						AkOrdersId : addressData.getOrderId()
					}, successCallback, errorCallback);

				});