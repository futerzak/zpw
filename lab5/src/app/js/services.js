var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('cartService',  function($resource) {
    return {
        products: []
    };

});

