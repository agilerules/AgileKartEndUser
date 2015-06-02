/**
 * 
 */
var agileKart = angular.module('enduser',['ngRoute','ngResource','MessageModule','ngDialog']);
agileKart.config(function($routeProvider) {
	$routeProvider.when('/block/:blockvalue', {
		controller : 'popularctrl',
		templateUrl : 'views/blockpopular.html'
	}).when('/category/:categoryValue', {
		controller : 'CategoryCtrl',
		templateUrl : 'views/categoryPage.html'
	}).when('/product/:category/:productId', {
		controller : 'productCtrl',
		templateUrl : 'views/productPage.html'
	}).when('/summary', {
		controller : 'productCtrl',
		templateUrl : 'views/shoppingSummary.html'
	}).when('/summary/login', {
		controller : 'productCtrl',
		templateUrl : 'views/checkoutlogin.html'
	}).when('/summary/address', {
		controller : 'addressCtrl',
		templateUrl : 'views/address.html'
	}).when('/summary/shipping', {
		controller : 'shippingCtrl',
		templateUrl : 'views/shipping.html'
	}).when('/summary/payment', {
		controller : 'paymentCtrl',
		templateUrl : 'views/payment.html'
	}).when('/summary/order', {
		controller : 'orderCtrl',
		templateUrl : 'views/orderSummary.html'
	}).otherwise({
		redirectTo : '/block/blockpopular'
	});
});
agileKart.factory('authHttpResponseInterceptor', ['$q', '$rootScope', '$location', 'SecurityService', 'MessageService', function($q, $rootScope, $location, SecurityService, MessageService) {
    return {
	'request' : function(config) {
	    SecurityService.secureRequest(config);
	    return config || $q.when(config);
	},

	'response' : function(response) {
	    return response || $q.when(response);
	},
	
	'responseError' : function(rejection) {
                console.log("Server Response Status: " + rejection.status);
                console.log(rejection);

                if (rejection.data && rejection.data.message) {
                    MessageService.setMessages(rejection.data.message);
                } else {
                    MessageService.setMessages(["Unexpected error from server."]);
                }
    
                if (rejection.status === 401) {
                    console.log("[INFO] Unauthorized response.");
                    SecurityService.endSession();
                    $location.path('/login');
                    MessageService.setMessages(["Please, provide your credentials."]);
                } else if (rejection.status == 400) {
                    console.log("[ERROR] Bad request response from the server.");
                } else if (rejection.status == 500) {
                    console.log("[ERROR] Internal server error.");
                } else {
                    console.log("[ERROR] Unexpected error from server.");
                }

	    return $q.reject(rejection);
	}
    }
} ]).config([ '$httpProvider', function($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    } ]).run(function($rootScope, $location, MessageService) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            MessageService.clearMessages();
        });
});


	agileKart.factory("DataService", function () {
	    
	    var myCart = new shoppingCart("AgileKart");
	    
	    myCart.addCheckoutParameters("PayPal", "jaugustin@agilerulesconsultants.com");

	    // enable Google Wallet checkout
	    // note: the second parameter identifies the merchant; in order to use the 
	    // shopping cart with Google Wallet, you have to create a merchant account with 
	    // Google. You can do that here:
	    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
	    myCart.addCheckoutParameters("Google", "500640663394527",
	        {
	            ship_method_name_1: "UPS Next Day Air",
	            ship_method_price_1: "20.00",
	            ship_method_currency_1: "USD",
	            ship_method_name_2: "UPS Ground",
	            ship_method_price_2: "15.00",
	            ship_method_currency_2: "USD"
	        }
	    );

	    // return data object with store and cart
	    return {
	        cart: myCart
	    };
	});
		
	angular.module('MessageModule', ['ngResource', 'ngRoute'])
	.factory('MessageService', ['$rootScope', function($rootScope) {
	    $rootScope.messages = [];

	    var MessageService = function() {
	        this.setMessages = function(messages) {
	            console.log(messages);
	            $rootScope.messages = messages;
	        };

	        this.hasMessages = function() {
	            return $rootScope.messages && $rootScope.messages.length > 0;
	        }

	        this.clearMessages = function() {
	            $rootScope.messages = [];
	        }
	    };

	    return new MessageService();
	}]);
		