var appControllers = angular.module('appControllers',[]);

appControllers.controller('productsController',function($scope, $http, $filter, cartService) {

    $scope.title = "Produkty";

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


    $scope.productsNumber = $scope.products.length;

    $scope.$watch('currentPage + productsPerPage', function() {
        var begin = parseInt($scope.currentPage - 1) * parseInt($scope.productsPerPage);
        var end = parseInt(begin) + parseInt($scope.productsPerPage);

        $scope.productsFiltered = $scope.products.slice(begin, end);
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
        console.log()
    };
});

appControllers.controller('productController',function($scope, $http, $routeParams) {

        $scope.title = "Produkt";

        for(var index in $scope.products) {
            if($routeParams.productId == $scope.products[index].id) {
                $scope.productDetail = $scope.products[index];
            }
        }
});

appControllers.controller('addProduct',function($scope) {

        $scope.title = "Dodaj produkt";

        $scope.addProduct = function() {
            $scope.products.push({
                id: $scope.products.length+1,
                name: $scope.product.name,
                price: $scope.product.price,
                category: $scope.product.category
            });
        };

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
