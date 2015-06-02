/**
 * 
 */
angular.module('enduser').controller('productCtrl',function($scope,$http,$routeParams,AkProductsResource,AkProductOptionsResource,DataService,ngDialog){
	$scope.category=$routeParams.category;
	$scope.prodId=$routeParams.productId;
	$scope.productList=AkProductsResource.queryAll();
	var prodlocal=$scope.productList;
	$scope.product=function($scope){
		for(var i=0;i<prodlocal.length;i++){
			if(prodlocal[i].productId==$routeParams.productId){
				return prodlocal[i];
			}
		}
	};
	
	 $scope.cart = DataService.cart;
	 
	 var products=[];
	 var productUp=[];
	 $scope.addCartQuantity = function(item) {
			
	      if(item.prodInStock>item.prodQuantity){
	    	  item.prodQuantity = item.prodQuantity+1;
	      }
	};
	$scope.subCartQuantity = function(item) {
		 
	      if(item.prodQuantity>1){
	    	  item.prodQuantity = item.prodQuantity-1;
	      }
	};
	
	$scope.signUp = function(){
		  $scope.openDialogId = 
		        ngDialog.open({
		            template: 'views/end_user/signup.html',
		            scope: $scope,
		            controller: 'SignupCtrl'
		        });
		    };
	
	
	$scope.removeCartItem = function($index) { 
		  $scope.cart.items.splice($index, 1);     
		}
	
	 
	 $scope.productRest=AkProductsResource.queryAll();
	 $scope.productOptionsRest=AkProductOptionsResource.queryAll();
	 $scope.productRest.$promise.then(function(dataProduct){
		 $scope.productOptionsRest.$promise.then(function(dataProductOptions){
			 console.log("dataProductOptions"+dataProductOptions);
			 var postObject = new Object();
				for(var i=0;i<dataProduct.length;i++){
					if(dataProduct[i].productId==$routeParams.productId){
						postObject.categoryId = dataProduct[i].akProductCategories.categoryId;
					}
						
				}
				for(var j=0;j<dataProductOptions.length;j++){
					if(dataProductOptions[j].akProducts.productId==$routeParams.productId){
						console.log("dataProductOptions[j].akProducts.productId"+dataProductOptions[j].akProducts.productId);
						postObject.optionId=dataProductOptions[j].akOptions.optionId;
						postObject.optionGroupId=dataProductOptions[j].akOptionGroups.optionGroupId;
					}
				}
				console.log("CategoryId  "+postObject.categoryId);
				console.log("ProductOptionId "+postObject.optionId);
				 console.log("OptionGroupId "+postObject.optionGroupId);
				 $http.post("/AgileKartService/agilekart", postObject).success(function(brms){
					 console.log("HI");
					   $scope.bramscategory=brms.crosellProduct.categoryId;
					   $scope.bramsoption=brms.crosellProduct.optionId;
					   $scope.bramsgroupid=brms.crosellProduct.optionGroupId;
					   $scope.bramsupgroupid1=brms.upsellProduct.optionGroupId1;
					   $scope.bramsupgroupid2=brms.upsellProduct.optionGroupId2;
					   console.log("categoryId "+brms.crosellProduct.categoryId);
					   console.log("optionId "+brms.crosellProduct.optionId);
					   console.log("OptionGroupId "+brms.crosellProduct.optionGroupId);
					   products=[];
					   for(var i=0;i<dataProductOptions.length;i++){
						   if(brms.crosellProduct.optionId==dataProductOptions[i].akOptions.optionId
								   &&dataProductOptions[i].akOptionGroups.optionGroupId==brms.crosellProduct.optionGroupId
								   &&dataProductOptions[i].akProducts.akProductCategories.categoryId==brms.crosellProduct.categoryId){
							   products.push(dataProductOptions[i].akProducts);
						   }
					   }
					   $scope.productsCrossList=products;
					   console.log("products"+products);
					   for(var i=0;i<products.length;i++){
						   console.log(products[i].productCartDesc);
					   }
					   productUp=[];
					   for(var i=0;i<dataProductOptions.length;i++){
						   if(dataProductOptions[i].akOptionGroups.optionGroupId==brms.upsellProduct.optionGroupId1
								   ||dataProductOptions[i].akOptionGroups.optionGroupId.categoryId==brms.upsellProduct.optionGroupId2){
								   
								   productUp.push(dataProductOptions[i].akProducts);
					   }
					   }
					   function remove_duplicates(objectsArray) {
						    var usedObjects = {};

						    for (var i=objectsArray.length - 1;i>=0;i--) {
						        var so = JSON.stringify(objectsArray[i]);

						        if (usedObjects[so]) {
						            objectsArray.splice(i, 1);

						        } else {
						            usedObjects[so] = true;          
						        }
						    }

						    return objectsArray;

						}
					   $scope.productsUpList=remove_duplicates(productUp);;
					   console.log("check"+productUp);
					   
					}).
					  error(function() {
						    console.log("error");
						  });
		 });
	 });
	 
	 
});