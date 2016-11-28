var appControllers = angular.module('appControllers',[]);

appControllers.controller(
    'productsController',
    [
        '$scope',
        '$http',
        '$filter',
        'cartService',
        function($scope, $http, $filter, cartService) {

            $scope.title = "Produkty";

            $scope.products = [];

            for(var i=0;i<100;i++){
                var tempProducts = ["Gruszka", "Jabłko", "Orzechy", "Kapusta", "Ogórek zielony"];
                $scope.products.push({
                    id: i,
                    name: tempProducts[Math.floor((Math.random() * 10) % 5)],
                    price: Math.round((Math.random() * 1000))/100,
                    category: Math.floor((Math.random() * 10) % 5),
                    thumbnailUrl: "http://placehold.it/200x100/#ff4422/#0066ff"
                });
            }

            $scope.sortList = [];
            $scope.categories = [
                {
                    id: 0,
                    name: "warzywa"
                },
                {
                    id: 1,
                    name: "owoce"
                },
                {
                    id: 2,
                    name: "napoje"
                },
                {
                    id: 3,
                    name: "pieczywo"
                },
            ];

            $scope.query = '';

            $scope.currentPage = 1;
            $scope.productsPerPage = 3;
            $scope.maxSize = 5;
            $scope.cartProducts = [];

            $scope.addProduct = function() {
                $scope.products.push({
                    id: $scope.products.length+1,
                    name: $scope.product.name,
                    price: $scope.product.price,
                    category: $scope.product.category
                });
            };

            $scope.productsNumber = $scope.products.length;

            $scope.$watch('currentPage + productsPerPage', function() {
                var begin = parseInt($scope.currentPage - 1) * parseInt($scope.productsPerPage);
                var end = parseInt(begin) + parseInt($scope.productsPerPage);

                $scope.productsFiltered = $scope.products.slice(begin, end);
            });

            $scope.addToCart = function (product) {
                cartService.data.push(product);
                console.log(cartService.data);
            };

            $scope.$watch('cartProducts', function(){
                console.log($scope.cartProducts);
            });
        }
    ]
);
appControllers.controller('productController',['$scope','$http','$routeParams',function($scope, $http, $routeParams) {

        $scope.title = "Produkt";
        }
    ]
);
appControllers.controller('cartController', ['$scope', 'cartService', function($scope, cartService) {
    $scope.title = "Twój koszyk";

    $scope.cartProducts = cartService.data;

}]);
