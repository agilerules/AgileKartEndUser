angular.module('enduser').factory('AkOrdersResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akorders/:AkOrdersId',{AkOrdersId:'@orderId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});