angular.module('enduser').factory('AkProductsResource', function($resource){
    var resource = $resource('http://localhost:8089/AgileKartRest/rest/akproducts/:AkProductsId',{AkProductsId:'@productId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});