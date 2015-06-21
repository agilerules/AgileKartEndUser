angular.module('enduser').factory('AkUserAddressResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akuseraddresses/:Id',{Id:'@Id'},{'update':{method:'PUT'}});
    return resource;
});
angular.module('enduser').factory('AkAddressResourceByUser', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akuseraddresses/user/:Id',{Id:'@Id'},{'getAll':{method:'GET',isArray:true}});
    return resource;
});