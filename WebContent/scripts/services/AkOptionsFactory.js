angular.module('enduser').factory('AkOptionsResource', function($resource){
    var resource = $resource('http://localhost:8089/AgileKartRest/rest/akoptions/:AkOptionsId',{AkOptionsId:'@optionId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});