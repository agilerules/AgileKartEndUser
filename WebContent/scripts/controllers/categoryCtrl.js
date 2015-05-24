/**
 * 
 */
angular.module('enduser').controller('CategoryCtrl',function($scope,$http,$timeout,$routeParams,AkOptionGroupsResource,AkOptionsResource,AkProductOptionsResource,AkProductsResource,DataService){
			var opslocal=[];
			var options=[];
			var proOptions=[];
			var proList=[];
			var productsIds=[];
			var products=[];
			var a=0;
			var check=0;
			$scope.routeCategory=$routeParams.categoryValue;
			var routeCatValue=$scope.routeCategory;
				$scope.optionsGroupsList=AkOptionGroupsResource.queryAll();
				$scope.optionsLists=AkOptionsResource.queryAll();
				$scope.productOptions=AkProductOptionsResource.queryAll();
				$scope.productsList=AkProductsResource.queryAll();
				$scope.optionsLists.$promise.then(function(opslocal){
				$scope.productsList.$promise.then(function(proList){
				$scope.productOptions.$promise.then(function(proOptions){
				
			$scope.optionsList=function(groupId){
				options=[];
				for(var i=0;i<opslocal.length;i++){
					if(groupId==opslocal[i].akOptionGroups.optionGroupId){
					 options.push(opslocal[i]);
					}
				}
					return  options;
				
			};
			$http.get("json/category_css.json").success(function(data){
				$scope.csspopular=data;
			});
			
			$scope.productIdList=function(groupId,optionId,flag){
				check++;
				if(check==1){
					productsIds.splice(0,productsIds.length)
					console.log("The products ids are productIdList : "+productsIds);
					console.log("Check value is equal to one : "+ check);
				}
				console.log("The group id, option id and flag details are"+groupId+" "+optionId+" "+flag);
				console.log("flag vlaue is "+$scope.flag+proOptions.length+"     "+productsIds.length);
				if(flag){
					var a=0;
				for(var i=0;i<proOptions.length;i++){
					if(groupId==proOptions[i].akOptionGroups.optionGroupId && optionId==proOptions[i].akOptions.optionId){
						console.log("Option id is" +proOptions[i].productOptionId);
						productsIds.push(proOptions[i].akProducts.productId);
					}
				}
			}
				else{
					for(var i=0;i<proOptions.length;i++){
						if(groupId==proOptions[i].akOptionGroups.optionGroupId && optionId==proOptions[i].akOptions.optionId){
							var index = productsIds.indexOf(proOptions[i].akProducts.productId);
							 if (index != -1) {
							        productsIds.splice(index, 1);
							    }
						}
					}
				}
				return  productsIds;
			};
			$scope.productList=function(){
				if(check<1){
					for(var i=0;i<proList.length;i++){
						productsIds.push(proList[i].productId);
					}
					console.log("Check value is checked for one : "+ check);
					console.log("The products ids are : "+productsIds);
				}
				if(check>=1){
					products=[];
					console.log("Check value is checked for more than one : "+ check);
				}
				
				console.log("Check value is checked: "+ check);
				
				for(var i=0;i<productsIds.length;i++){
					for(var j=0;j<proList.length;j++){
						if(proList[j].akProductCategories.categoryName==routeCatValue){
							console.log("The route Value is "+routeCatValue);
						if(proList[j].productId==productsIds[i]){
							if(products.length==0){
								products.push(proList[j]);
							}
							else {
								a=0;
								for(var k=0;k<products.length;k++){
									if(products[k].productId!=proList[j].productId){
										a++;
									}
								}
								if(products.length==a){
									products.push(proList[j]);
								}
							}
						}
					}
					}
				}
				$scope.noOfProducts=products.length;
					
				return products;
			};
				});
				});
				});
			 $scope.cart = DataService.cart;
		});