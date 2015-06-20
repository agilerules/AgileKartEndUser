angular
		.module('enduser')
		.controller(
				'orderCtrl',
				function($scope, $http, $rootScope, $location, $routeParams,
						locationParser, AkOrdersResource,
						AkOrderDetailByIdResource,DataService, ngDialog,
						addressData) {
					$scope.cart = {};
					email = ' ';
					address = ' ';
					name = ' ';
					products = [];
					$scope.cart.items = [];
					$scope.orderdet = [];
					var postObject = new Object();
					$scope.akOrderDetails = {};
					$scope.isLoading1 = true;
				
					var successCallback = function(data) {
						console.log("Success callback");
						self.original = data;
						$scope.akOrders = new AkOrdersResource(self.original);
						email = $scope.akOrders.orderEmail;
						address = $scope.akOrders.orderCity;
						name = $scope.akOrders.orderShipName;
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
						
							postObject.orderId =$routeParams.orderId;
			    			postObject.email =email; 
			    			postObject.address =address;
			    			postObject.name = name;
			    		
							$http.post("/test/orderprocess", postObject).success(function(output){
								 console.log("BPM call"+  output );
							});
						});
					
						postObject.products = $scope.orderdet;
						
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