/**
 * 
 */
angular.module('enduser').controller('productCtrl',function($scope,$http,$routeParams,AkProductsResource,AkProductOptionsResource,DataService,ngDialog){
	$scope.category=$routeParams.category;
	$scope.prodId=$routeParams.productId;
	$scope.isloading = true;
	$scope.isLoading1 = true;
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
	
	$scope.removeCartItem = function($index) { 
		  $scope.cart.items.splice($index, 1);     
		}
	
	 
	 $scope.productRest=AkProductsResource.queryAll();
	 $scope.productOptionsRest=AkProductOptionsResource.queryAll();
	 $scope.productRest.$promise.then(function(dataProduct){
		 $scope.productOptionsRest.$promise.then(function(dataProductOptions){
			 //console.log("dataProductOptions"+dataProductOptions); //48
			 //console.log("$routeParams.productId"+$routeParams.productId); //6
			 //console.log("dataProduct"+dataProduct.length) //15
			 var postObject = new Object();
			  //Loop on Product table
				for(var i=0;i<dataProduct.length;i++){
					//Check for the incoming Product Id match and fetch the respective Category Id
					if(dataProduct[i].productId==$routeParams.productId){
						postObject.categoryId = dataProduct[i].akProductCategories.categoryId;
					}
						
				}
				//Loop on Product Options table
				for(var j=0;j<dataProductOptions.length;j++){
					//Check for the incoming Product Id and fetch the respective Option Id and Option Group Id
					if(dataProductOptions[j].akProducts.productId==$routeParams.productId){

						if(dataProductOptions[j].akOptionGroups.optionGroupId=='3') {
							console.log("Check for option group 3");
							postObject.optionId=dataProductOptions[j].akOptions.optionId;
							postObject.optionGroupId=dataProductOptions[j].akOptionGroups.optionGroupId;
						}
					}
				}
				//Input to the BRMS Cross sell REST service
				console.log("Input CategoryId: "+postObject.categoryId);
				console.log("Input OptionGroupId: "+postObject.optionGroupId);
				console.log("Input OptionId:  "+postObject.optionId); 
				 
				
				//Invoke the BRMS Cross sell & Up sell REST service
				 $http.post("/AgileKartService/agilekart", postObject).success(function(brms){
					 console.log("HI");
					   $scope.bramscategory=brms.crosellProduct.categoryId;
					   $scope.bramsoption=brms.crosellProduct.optionId;
					   $scope.bramsgroupid=brms.crosellProduct.optionGroupId;
					   $scope.bramsupgroupid1=brms.upsellProduct.optionGroupId1;
					   $scope.bramsupgroupid2=brms.upsellProduct.optionGroupId2;
					   console.log("Output CategoryId: "+brms.crosellProduct.categoryId);
					   console.log("Output OptionGroupId: "+brms.crosellProduct.optionGroupId);
					   console.log("Upsell Option Group Id1: "+brms.upsellProduct.optionGroupId1);
					   console.log("Output optionGroupId2: "+brms.upsellProduct.optionGroupId2);
					   console.log("Output OptionId: "+brms.upsellProduct.optionGroupId2);
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
					   console.log("dataProductOptions.length="+dataProductOptions.length);
					   console.log("dataProductOptions[i].akOptionGroups.optionGroupId="+dataProductOptions[i].akOptionGroups.optionGroupId);
					   console.log("brms.upsellProduct.optionGroupId1="+brms.upsellProduct.optionGroupId1);
					   for(var i=0;i<dataProductOptions.length;i++){
						   console.log("dataProductOptions[i].akOptionGroups.optionGroupId="+dataProductOptions[i].akOptionGroups.optionGroupId);
						   console.log("brms.upsellProduct.optionGroupId1="+brms.upsellProduct.optionGroupId1);
						   if(dataProductOptions[i].akOptionGroups.optionGroupId==brms.upsellProduct.optionGroupId1 && dataProductOptions[i].akProducts.akProductCategories.categoryId == postObject.categoryId){
							   
							   
								   //if( brms.upsellProduct.optionGroupId2 != null) {
								   	//	for (j=0;(j<dataProductOptions.length && j!=i);j++){
							   				if (dataProductOptions[i].akOptions.optionId ==postObject.optionId && dataProductOptions[i].akProducts.productId!= $routeParams.productId){
							   					productUp.push(dataProductOptions[i].akProducts);
							   				}
								   		//}
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