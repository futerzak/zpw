var appServices = angular.module('appServices', []);

appServices.factory('cartService',  function() {
    return {
        products: []
    };

});
