var agileKart = angular.module('enduser', [ 'ngRoute', 'ngResource',
		'MessageModule', 'ngDialog', 'PicketLinkSecurityModule', 'ngActivityIndicator' ]);
console.log("Sucess");
agileKart.config(function($routeProvider) {
	$routeProvider.when('/block/:blockvalue', {
		controller : 'popularctrl',
		templateUrl : 'views/blockpopular.html',
		access : {
			isFree : true
		}

	}).when('/category/:categoryValue', {
		controller : 'CategoryCtrl',
		templateUrl : 'views/categoryPage.html',
		access : {
			isFree : true
		}

	}).when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'views/login.html',
		access : {
			isFree : true
		}

	}).when('/logout', {
		controller : 'LogoutCtrl',
		templateUrl : 'views/login.html',
		access : {
			isFree : true
		}

	}).when('/product/:category/:productId', {
		controller : 'productCtrl',
		templateUrl : 'views/productPage.html',
		access : {
			isFree : true
		}

	}).when('/summary', {
		controller : 'productCtrl',
		templateUrl : 'views/shoppingSummary.html',
		access : {
			isFree : true
		}

	}).when('/summary/login', {
		controller : 'productCtrl',
		templateUrl : 'views/checkoutlogin.html',
		access : {
			isFree : true
		}

	}).when('/summary/address', {
		controller : 'addressCtrl',
		templateUrl : 'views/address.html',
		access : {
			isFree : false
		}

	}).when('/summary/shipping', {
		controller : 'shippingCtrl',
		templateUrl : 'views/shipping.html',
		access : {
			isFree : false
		}

	}).when('/summary/payment', {
		controller : 'paymentCtrl',
		templateUrl : 'views/payment.html',
		access : {
			isFree : false
		}

	}).when('/summary/order/:orderId', {
		controller : 'orderCtrl',
		templateUrl : 'views/orderSummary.html',
		access : {
			isFree : true
		}
	}).otherwise({
		redirectTo : '/block/blockpopular',
		
	});
});
agileKart.factory("DataService", function() {

	var myCart = new shoppingCart("AgileKart");

	myCart.addCheckoutParameters("PayPal",
			"jaugustin@agilerulesconsultants.com");

	// enable Google Wallet checkout
	// note: the second parameter identifies the merchant; in order to use the
	// shopping cart with Google Wallet, you have to create a merchant account
	// with
	// Google. You can do that here:
	// https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
	myCart.addCheckoutParameters("Google", "500640663394527", {
		ship_method_name_1 : "UPS Next Day Air",
		ship_method_price_1 : "20.00",
		ship_method_currency_1 : "USD",
		ship_method_name_2 : "UPS Ground",
		ship_method_price_2 : "15.00",
		ship_method_currency_2 : "USD"
	});

	// return data object with store and cart
	return {
		cart : myCart
	};
});

angular.module('MessageModule', [ 'ngResource', 'ngRoute' ]).factory(
		'MessageService',
		[
				'$rootScope',
				function($rootScope) {
					$rootScope.messages = [];

					var MessageService = function() {
						this.setMessages = function(messages) {
							console.log(messages);
							$rootScope.messages = messages;
						};

						this.hasMessages = function() {
							return $rootScope.messages
									&& $rootScope.messages.length > 0;
						}

						this.clearMessages = function() {
							$rootScope.messages = [];
						}
					};

					return new MessageService();
				} ]);

agileKart.directive('imageonload', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            element.bind('load', function() {
            	scope.$parent.isloading = false;
               
            });
        }
    };
});
