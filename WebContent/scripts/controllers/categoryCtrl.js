/**
 * 
 */
angular.module('enduser').controller('CategoryCtrl',function($scope,$http,$timeout,$routeParams,$activityIndicator,AkCategoryOptionsResource,AkOptionsResource,AkProductOptionsResource,AkProductsResource,DataService, _){
			var opslocal=[];
			var options=[];
			var proOptions=[];
			var proList=[];
			var productsIds=[];
			var products=[];
			var check = 0;
			var a=0;
			var productGrpList =[];
			$scope.optionGrpset = [];
			$scope.isLoading1 = true;
			$scope.isLoading2 = true;
			$scope.routeCategory=$routeParams.categoryValue;
			$scope.layout = 'grid';
			$scope.start = function () {
				console.log("Starting");
				$activityIndicator.startAnimating();
			};

			$scope.stop = function () {
				console.log("Stopping");
				$activityIndicator.stopAnimating();
			};
			$scope.start();
			var routeCatValue=$scope.routeCategory;
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
			$scope.removeOptionGrpset = function(groupId,optionId){
				for(var i=0;i<$scope.optionGrpset.length;i++){
					if(groupId==$scope.optionGrpset[i].group&&optionId==$scope.optionGrpset[i].option){
						$scope.optionGrpset.splice(i, 1);
						break;
					}
				}
			}
			$scope.productIdList=function(groupId,optionId,flag){
				if(flag){
					$scope.optionGrpset.push({group:groupId,option:optionId});
				}else{
					$scope.removeOptionGrpset(groupId,optionId);
				}
				$scope.sortOptionGrpset=_.groupBy($scope.optionGrpset,"group");
				productGrpList =[];
				for(var key in $scope.sortOptionGrpset) {
				    var value = $scope.sortOptionGrpset[key];
				    var product = [];
				   for(var j=0;j<value.length;j++){
					   console.log(value[j].group+"   "+value[j].option);
					   for(var i=0;i<proOptions.length;i++){
							if(value[j].group==proOptions[i].akOptionGroups.optionGroupId && value[j].option==proOptions[i].akOptions.optionId){
								console.log("Option id is" +proOptions[i].productOptionId);
								product.push(proOptions[i].akProducts.productId);
							}
						}
				   }
				   productGrpList.push(product);
				}
				console.log(productGrpList);
				productsIds = _.intersection.apply(_, productGrpList);
				console.log("Result"+_.intersection.apply(_, productGrpList));
				
			};
			$scope.productList=function(){
				products = [];
				console.log("Inside productList method")
				if($scope.optionGrpset==='undefined'||$scope.optionGrpset.length==0){
					console.log("Inside if method")
					productsIds = [];
					for(var i=0;i<proList.length;i++){
						productsIds.push(proList[i].productId);
					}
					console.log("The products ids are : "+productsIds);
				}
				for(var i=0;i<productsIds.length;i++){
						for(var j=0;j<proList.length;j++){
							if(proList[j].akProductCategories.categoryName==routeCatValue){
								$scope.routeCategoryId = proList[j].akProductCategories.categoryId;
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
				console.log("Length :"+$scope.noOfProducts);
				$scope.isLoading1 = false;
				return products;
			};
				});
				});
				
				});
				
				$scope.optionsGroupsList = AkCategoryOptionsResource.queryAll();
				$scope.optionsGroupsList.$promise.then(function(catopslocal){
					
				$scope.optionsGroupsList=function(catId){
					catoptions=[];
					for(var i=0;i<catopslocal.length;i++){
						if(catId==catopslocal[i].akProductCategories.categoryId){
						 catoptions.push(catopslocal[i]);
						}
					}
						return  catoptions;
					
				};
				$scope.isLoading2 = false;
				});
				
			 $scope.cart = DataService.cart;
			 
		});