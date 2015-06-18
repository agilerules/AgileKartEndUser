angular.module('enduser').controller(
		'addressCtrl',
		function($scope, $http, $rootScope, $location, $routeParams, AkUsersResource,
				AkUserAddressResource,AkAddressResourceByUser, DataService, ngDialog, addressData) {
			$scope.addressType = [];
			$scope.akUserAddress = $scope.akUserAddress || {};
			$scope.akUser = $scope.akUser || {};
			$scope.akUserAddress.akUsers = {};
			$scope.isLoading1 = true;
			$scope.get = function() {
				$scope.addressType = [];
				var users = AkUsersResource.get({
					mail : $rootScope.user
				});
				users.$promise.then(function(data) {
					$scope.akUser = users;
					addressData.setUser($scope.akUser);
					$scope.userId = data.userId;
					var userAddrs = AkAddressResourceByUser.listAll({
						Id : $scope.userId
					});
					console.log("UserAddressResource");
					userAddrs.$promise.then(function(dataAdres) {
						console.log("UserAddressResourcePromise");
						for (var i = 0; i < dataAdres.length; i++) {
							console.log(userAddrs[i].userAddress);
							console.log(userAddrs[i].userTypeName);
							var addressPair = [];
							addressPair.push(userAddrs[i].userTypeName,
									userAddrs[i]);
							$scope.addressType.push(addressPair);
							console.log($scope.addressType)
							$scope.isLoading1 = false;
						}
					});
				});
			};

			$scope.updateDelAdrs = function() {
				$scope.openDialogId = ngDialog.open({
					className: 'ngdialog-theme-plain',
					template : 'views/updateDeliveyAdress.html',
					scope : $scope
				});
			};
			$scope.updateDeliveryAddress = function() {
				var selected = $scope.selected;
				AkUserAddressResource.update({
					Id : $scope.selected[1].addressId
				}, $scope.selected[1]);
				$scope.get();
				$scope.selected[1] = selected[1];
				ngDialog.closeAll();
			};
			$scope.updateBilAdrs = function() {
				$scope.openDialogId = ngDialog.open({
					className: 'ngdialog-theme-plain',
					template : 'views/updateBillingAdress.html',
					scope : $scope
				});
			};
			$scope.updateBillingAddress = function() {
				var selected = $scope.selectedBill;
				AkUserAddressResource.update({
					Id : $scope.selectedBill[1].addressId
				}, $scope.selectedBill[1]);
				$scope.get();
				$scope.selectedBill[1] = selected[1];
				ngDialog.closeAll();
			};

			$scope.addAddressFnctn = function() {
				$scope.openDialogId = ngDialog.open({
					template : 'views/addAddress.html',
					scope : $scope
				});
			};
			$scope.addAddress = function() {
				$scope.akUserAddress.akUsers = $scope.akUser;
				var successCallback = function(data, responseHeaders) {
					$scope.displayError = false;
					$scope.get();
					ngDialog.closeAll();
				};
				var errorCallback = function() {
					$scope.displayError = true;
				};
				AkUserAddressResource.save($scope.akUserAddress,
						successCallback, errorCallback);

			};
			$scope.proceedCheckOut = function() {
				addressData.setDeliveryAddress($scope.selected[1]);
				addressData.setBillingAddress($scope.selectedBill[1]);
				$location.path("/summary/shipping");
			};
			$scope.get();
		});
angular.module('enduser').factory('addressData', function() {
	var deliveryAddress = {};
	var billingAddress = {};
	var shipping = {};
	var user = {};
	var payment = {};
	var orderId = {};
	return {
		getDeliveryAddress : function() {
			return deliveryAddress;
		},
		getBillingAddress : function() {
			return billingAddress;
		},
		getShipping : function() {
			return shipping;
		},
		getUser : function() {
			return user;
		},
		getPayment : function() {
			return payment;
		},
		getOrderId : function() {
			return orderId;
		},
		setDeliveryAddress : function(newFormData) {
			deliveryAddress = newFormData;
		},
		setBillingAddress : function(newFormData) {
			billingAddress = newFormData;
		},
		setShipping : function(newFormData) {
			shipping = newFormData;
		},
		setUser : function(newFormData) {
			user = newFormData;
		},
		setPayment : function(newFormData) {
			payment = newFormData;
		},
		serOrderId : function(newFormData) {
			orderId = newFormData;
		},
		resetData : function() {
			deliveryAddress = {};
			billingAddress = {};
			shipping = {};
			payment = {};
		}
	};
});
