angular.module('enduser').factory('AkOrderDetailsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akorderdetails/:AkOrderDetailsId',{AkOrderDetailsId:'@detailId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});
angular.module('enduser').factory('AkOrderDetailByIdResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akorderdetails/order/:AkOrderId',{AkOrderId:'@AkOrderId'},{'findbyOrderId':{method:'GET',isArray:true}});
    return resource;
});


