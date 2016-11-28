var appControllers = angular.module('appControllers',[]);

appControllers.controller('productsController',function($scope, $http, $filter, cartService) {

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

    $scope.query = '';

    $scope.currentPage = 1;
    $scope.productsPerPage = 3;
    $scope.maxSize = 5;

    $scope.products = [];

    $scope.getProducts = function() {
        $http
            .get("http://localhost:2403/products")
            .then(function(response){
                $scope.products = response.data;
                console.log($scope.products);
                $scope. = response.data;
            },
            function(errResponse) {
                console.log('Error response', errResponse);
            });
    }
    $scope.getProducts();



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

    $scope.getBeginPage = function() {

            var begin = parseInt($scope.currentPage - 1) * parseInt($scope.productsPerPage);
            var end = parseInt(begin) + parseInt($scope.productsPerPage);
            return  begin;

    }
    $scope.beginPage = $scope.getBeginPage();

});

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
                    var data = {};
                    $scope.products = $scope.getProducts(data);
                    console.log($scope.products);
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
