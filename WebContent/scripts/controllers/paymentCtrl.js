angular.module('enduser').controller(
		'paymentCtrl',
		function($scope, $http, $rootScope, $location, $routeParams, locationParser, AkUsersResource,
				AkOrdersResource,
				AkOrderDetailsResource, AkUserAddressResource, DataService, ngDialog, addressData) {
			$scope.cart = DataService.cart;
			$scope.akOrders = $scope.akOrders || {};
			$scope.products = [];
			$scope.akOrderDetails = {};
			$scope.akOrders.akUsers = addressData.getUser();
			$scope.confirmPayment = function(paymentMode) {
				ngDialog.openConfirm({template: 'views/confirmPayment.html',
					className: 'ngdialog-theme-plain',
					  scope: $scope //Pass the scope object if you need to access in the template
					}).then(
						function(value) {
							addressData.setPayment(paymentMode);
							$scope.setOrder();
							$scope.setItems();
							$scope.setAndSaveOrderDetail();
						},
						function(value) {
							console.log("Cancel");
						}
					);
			};		

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

				$scope.akOrders.orderBillName = addressData
						.getBillingAddress().userFirstName
						+ " "
						+ addressData.getBillingAddress().userLastName
				$scope.akOrders.orderBillAddress = addressData
						.getBillingAddress().userAddress;
				$scope.akOrders.orderBillAddress2 = addressData
						.getBillingAddress().userAddress2;
				$scope.akOrders.orderBillCity = addressData
						.getBillingAddress().userCity;
				$scope.akOrders.orderBillState = addressData
						.getBillingAddress().userState;
				$scope.akOrders.orderBillZip = addressData
						.getBillingAddress().userZip;
				$scope.akOrders.orderBillCountry = addressData
						.getBillingAddress().userCountry;
				$scope.akOrders.orderBillPhone = addressData
						.getBillingAddress().userPhone;
				$scope.akOrders.orderBillFax = addressData
						.getBillingAddress().userFax;
				$scope.akOrders.orderPaymentMode = addressData.getPayment();
				$scope.akOrders.orderPaymentDesc = "Desc ";
				 
				
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
				AkOrdersResource.save($scope.akOrders, successCallback,
						errorCallback);
			};

			$scope.setAndSaveOrderDetail = function() {
				for (var i = 0; i < $scope.products.length; i++) {
					var item = $scope.products[i];
					$scope.akOrderDetails.akProducts = {};
					$scope.akOrderDetails.akProducts.productId = item.prodId;
					$scope.akOrderDetails.akOrders = $scope.akOrders;
					$scope.akOrderDetails.detailName = item.prodName;
					$scope.akOrderDetails.detailPrice = item.prodPrice;
					$scope.akOrderDetails.detailSku = "test";
					$scope.akOrderDetails.detailQuantity = item.prodQuantity;
					var successCallback = function(data,
							responseHeaders) {
						
						 var AkOrdersId = locationParser(responseHeaders);
						 console.log("Order ID"+AkOrdersId);
						 addressData.serOrderId(AkOrdersId);
				         $location.path('/summary/order/' + AkOrdersId);
						$scope.displayError = false;
					};
					var errorCallback = function() {
						$scope.displayError = true;
					};
					AkOrderDetailsResource.save($scope.akOrderDetails,
							successCallback, errorCallback);
				}
			}
		
		});