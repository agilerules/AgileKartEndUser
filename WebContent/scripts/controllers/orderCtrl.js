angular
		.module('enduser')
		.controller(
				'orderCtrl',
				function($scope, $http, $rootScope, $location, $routeParams,
						locationParser, AkOrdersResource, AkOrderDetailsResource, DataService,
						ngDialog, addressData) {
					$scope.products = [];
					$scope.cart = DataService.cart;
					$scope.akOrders = {};
					$scope.akOrderDetails = {};
					$scope.akOrders.akUsers = addressData.getUser();
					console.log($scope.akOrders.akUsers.userId);
					$scope.setOrder = function() {
						$scope.akOrders.orderAmount = $scope.cart
								.getTotalPrice();
						$scope.akOrders.orderShipName = addressData
								.getDeliveryAddress().userFirstName
								+ " "
								+ addressData.getDeliveryAddress().userLastName
						$scope.akOrders.orderShipAddress = addressData
								.getDeliveryAddress().userAddress;
						$scope.akOrders.orderShipAddress2 = addressData
								.getDeliveryAddress().userAddress2;
						$scope.akOrders.orderCity = addressData
								.getDeliveryAddress().userCity;
						$scope.akOrders.orderState = addressData
								.getDeliveryAddress().userState;
						$scope.akOrders.orderZip = addressData
								.getDeliveryAddress().userZip;
						$scope.akOrders.orderCountry = addressData
								.getDeliveryAddress().userCountry;
						$scope.akOrders.orderPhone = addressData
								.getDeliveryAddress().userPhone;
						$scope.akOrders.orderFax = addressData
								.getDeliveryAddress().userFax;
						$scope.akOrders.orderShipping = 7;
						$scope.akOrders.orderTax = 0;
						$scope.akOrders.orderEmail = $scope.akOrders.akUsers.userEmail;
						$scope.akOrders.orderDate = new Date();
						$scope.akOrders.orderShipped = false;
						$scope.akOrders.orderStatus = "To be Proccessed";
					};
					$scope.setItems = function() {
						for (var i = 0; i < $scope.cart.items.length; i++) {
							var item = $scope.cart.items[i];
							if (item.prodId != null && item.prodName != null
									&& item.prodPrice != null
									&& item.prodQuantity != null
									&& item.prodImgUrl != null
									&& item.prodInStock != null) {
								item = new cartItem(item.prodId, item.prodName,
										item.prodPrice, item.prodQuantity,
										item.prodImgUrl, item.prodInStock);
								$scope.products.push(item);
							}
						}
					};
					
					$scope.saveOrder = function() {
						var successCallback = function(data, responseHeaders) {
							 var id = locationParser(responseHeaders);
							 $scope.akOrders.orderId = id;
							$scope.displayError = false;
						};
						var errorCallback = function() {
							$scope.displayError = true;
						};
						AkOrdersResource.save($scope.akOrders,
								successCallback, errorCallback);	
					};
					
					
					
					$scope.setAndSaveOrderDetail = function() {
						for(var i=0; i<$scope.products.length;i++) {
							var item = $scope.products[i];
							$scope.akOrderDetails.akProducts = {};
							$scope.akOrderDetails.akProducts.productId = item.prodId;
							$scope.akOrderDetails.akOrders = $scope.akOrders;
							$scope.akOrderDetails.detailName = item.prodName;
							$scope.akOrderDetails.detailPrice = item.prodPrice;
							$scope.akOrderDetails.detailSku = "test";
							$scope.akOrderDetails.detailQuantity = item.prodQuantity;
							var successCallback = function(data, responseHeaders) {
								$scope.displayError = false;
							};
							var errorCallback = function() {
								$scope.displayError = true;
							};
							AkOrderDetailsResource.save($scope.akOrderDetails,
									successCallback, errorCallback);						
						}
					}
					
					$scope.setOrder();
					$scope.setItems();
					$scope.saveOrder();
					$scope.setAndSaveOrderDetail();

				});