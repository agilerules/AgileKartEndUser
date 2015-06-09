/**
 * 
 */
angular.module('enduser').controller('MainHeader', function($scope,$rootScope,$location,SecurityService,LogoutResource,AkProductCategoriesResource,DataService){
	$scope.headerCategories=AkProductCategoriesResource.queryAll();
	    $scope.cart = DataService.cart;
	    
	    $scope.logout = function() {
	        LogoutResource.logout(function(resp) {
	            SecurityService.endSession();
	            $rootScope.user = null;
	            $location.path( "/" );
	        });
	    };
    
});