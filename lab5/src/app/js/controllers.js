var appControllers = angular.module('appControllers', ['appFilters']);

appControllers.controller('productsController', ['$scope', '$http', '$filter', 'cartService', 'filterFilter' , function($scope, $http, $filter, cartService, filterFilter) {

    $scope.title = "Produkty";

    $scope.categories = [];

    $http.
        get("http://localhost:2403/categories")
        .then(function(response) {
            $scope.categories = response.data;
        },
        function(errResponse){
            console.log('Error response', errResponse);
        });

    $scope.products = [];

    $http
        .get("http://localhost:2403/products")
        .then(function(response){
            $scope.products = response.data;
        },
        function(errResponse) {
            console.log('Error response', errResponse);
        });



    $scope.addToCart = function (productId) {
        for(var product in $scope.products){
            if($scope.products[product].id == productId) {
                cartService.products.push({
                    id: $scope.products[product].id,
                    name: $scope.products[product].name,
                    price: $scope.products[product].price,
                    category: $scope.products[product].category
                });
            }
        }
    };

    $scope.currentPage = 1;
    $scope.productsPerPage = 3;
    $scope.maxSize = 5;

    $scope.search = {};
    $scope.search.$ = '';

    $scope.resetFilters = function () {
        $scope.search = {};
    };

    $scope.$watch('products', function () {
        $scope.filtered = $scope.products;
        $scope.products = $scope.filtered;
        $scope.totalItems = $scope.products.length;
        $scope.numberOfPages = Math.ceil($scope.totalItems / $scope.productsPerPage);
    })


    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = $scope.products;
		$scope.filtered = filterFilter($scope.products, newVal);
        console.log("filtered" + $scope.filtered);
		$scope.totalItems = $scope.filtered.length;
		$scope.numberOfPages = Math.ceil($scope.totalItems / $scope.productsPerPage);
		$scope.currentPage = 1;
	}, true);

}]);

appControllers.controller('productController',function($scope, $http, $routeParams) {

        $scope.title = "Produkt";

        for(var index in $scope.products) {
            if($routeParams.productId == $scope.products[index].id) {
                $scope.productDetail = $scope.products[index];
            }
        }
});

appControllers.controller('addProduct',function($scope, $http) {

        $scope.title = "Dodaj produkt";

        $scope.addProduct = function() {
            $http
                .post("http://localhost:2403/products", {
                    name: $scope.product.name,
                    price: $scope.product.price,
                    category: $scope.product.category
                })
                .then(function(response){
                    $http
                        .get("http://localhost:2403/products")
                        .then(function(response){
                            $scope.products = response.data;
                        },
                        function(errResponse) {
                            console.log('Error response', errResponse);
                        });
                },
                function(errResponse) {
                    console.log('Error response', errResponse);
                });
        }
});

appControllers.controller('cartController', function($scope, cartService) {
    $scope.title = "Twój koszyk";

    $scope.cartProducts = cartService.products;

    $scope.remove = function(productId) {
        for(var index in cartService.products){
            if(cartService.products[index].id == productId) {
                cartService.products.splice(index,1);
                console.log("usunięto")
            }
        }
    }

});
