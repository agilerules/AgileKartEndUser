angular.module('enduser').factory('AkUserAddressResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akuseraddresses/:Id',{Id:'@Id'},{'queryAll':{method:'GET',isArray:true},'update':{method:'PUT'}});
    return resource;
});