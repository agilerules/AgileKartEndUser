angular.module('enduser').factory('AkUsersResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akusers/mail?email=:mail');
    return resource;
});
