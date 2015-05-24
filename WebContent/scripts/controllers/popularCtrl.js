/**
 * 
 */
angular.module('enduser').controller('popularctrl',function ($scope,$http,$location,$routeParams,AkProductsResource,DataService) {
			var products=[];
			var filter=null;
			
			
			$scope.cart = DataService.cart;
			 $scope.matchesRoute = function(route) {
			        var path = $location.path();
			        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
			    };
			 
			$scope.blockData=AkProductsResource.queryAll();
			console.log("The block data is "+$scope.blockData);
			$scope.filterValue=function(){
				console.log("Entering inside the filter value function");
		        if ("blockpopular"== $routeParams.blockvalue){
		        	filter= 'productHitCount';
		        }
		        if ("blockspecials"== $routeParams.blockvalue){
		        	filter="productDiscountPercentage";
		        }
		        if ("blockbestsellers"== $routeParams.blockvalue){
		        	filter="productSoldCount";
		        }
		        return filter;
			};
			$scope.popularBoolean=false;
			$scope.hoverPopular = function(csspopular) {
			        // Shows/hides the delete button on hover
			      return csspopular.popularBoolean = ! csspopular.popularBoolean;
			      
			};
			$http.get("json/product_css.json").success(function(data){
			$scope.csspopular=data;
		});
			
		});