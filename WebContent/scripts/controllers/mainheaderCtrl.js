/**
 * 
 */
angular.module('enduser').controller('MainHeader', function($scope,AkProductCategoriesResource,DataService){
	$scope.headerCategories=AkProductCategoriesResource.queryAll();
	    $scope.cart = DataService.cart;
});