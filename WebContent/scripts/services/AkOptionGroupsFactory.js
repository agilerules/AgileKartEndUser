angular.module('enduser').factory('AkOptionGroupsResource', function($resource){
    var resource = $resource('http://localhost:8089/AgileKartRest/rest/akoptiongroups/:AkOptionGroupsId',{AkOptionGroupsId:'@optionGroupId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});