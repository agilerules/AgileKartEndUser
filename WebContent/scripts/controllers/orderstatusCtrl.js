angular
		.module('enduser')
		.controller(
				'orderstatusCtrl',
				function($scope, $http, $rootScope, $location, $routeParams,
						locationParser, AkOrdersResource,
						AkOrderDetailByIdResource,DataService, ngDialog,
						addressData) {
					$scope.cart = {};
					$scope.cart.items = [];
					$scope.orderdet = [];
					$scope.akOrderDetails = {};
					$scope.isLoading1 = true;
				
					var successCallback = function(data) {
						console.log("Success callback");
						self.original = data;
						$scope.akOrders = new AkOrdersResource(self.original);
						$scope.cart.totalPrice = $scope.akOrders.orderAmount;
						var orderDetails = AkOrderDetailByIdResource.findbyOrderId({AkOrderId:$routeParams.orderId});
						orderDetails.$promise.then(function(data){
						console.log("Detail number" + data.length);
							for(var i=0;i<data.length;i++){
								console.log("Detail number" + i);
								var item = {};
								item.prodImgUrl = data[i].akProducts.productThumb;
								item.prodName = data[i].detailName;
								item.prodPrice = data[i].detailPrice;
								item.prodQuantity = data[i].detailQuantity;
								$scope.cart.items.push(item);
										}		
								})						
										
						var product = AkOrderDetailByIdResource.findbyOrderId({AkOrderId:$routeParams.orderId});
						product.$promise.then(function(data){
						for(var j=0;j<product.length;j++){
								var item2 = {};
							
								item2.prodctPrice = data[j].detailPrice;
						
								item2.productName = data[j].detailName;
								
								$scope.orderdet.push(item2);
								}
						
										    		
							});
					
												
						$scope.isLoading1 = false;
					};
					var errorCallback = function() {
						console.log("Error");
					};
					console.log("routeParams.id " + $routeParams.orderId);
					AkOrdersResource.get({
						AkOrdersId : $routeParams.orderId
					}, successCallback, errorCallback);

				});