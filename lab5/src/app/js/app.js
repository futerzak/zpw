var groceryStoreApp = angular.module(
    'groceryStoreApp',
    [
        'ngRoute',
        'appControllers',
        'appFilters',
        'appServices',
        'appDirectives',
        'appProviders',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap'
    ]
);


groceryStoreApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/products.html',
            controller: 'productsController'
        }).
        when('/product/:productId', {
            templateUrl: 'views/product.html',
            controller: 'productController'
        }).when('/cart',{
            templateUrl: 'views/cart.html',
            controller: 'cartController'
        }).
        when('/addProduct', {
            templateUrl: 'views/addProduct.html',
            controller: 'addProduct'
        }).
        otherwise({redirectTo: '/'});
}]);
