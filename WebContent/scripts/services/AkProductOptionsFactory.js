angular.module('enduser').factory('AkProductOptionsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akproductoptions/:AkProductOptionsId',{AkProductOptionsId:'@productOptionId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});