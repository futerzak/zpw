var appServices = angular.module('appServices', []);

appServices.service('dataService', function($http) {
    this.getData = function(path){
        return $http.get('temporary-data/' + path); // this will return a promise to controller
    }
});
