angular.module('enduser').factory('AkCategoryOptionsResource', function($resource){
    var resource = $resource('http://localhost:8080/AgileKartRest/rest/akcategoryoptions/:AkCategoryOptionsId',{AkCategoryOptionsId:'@categoryOptionId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});