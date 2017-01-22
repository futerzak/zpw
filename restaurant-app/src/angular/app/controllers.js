var appControllers = angular.module('appControllers', []);

// page controllers
appControllers.controller('homeController', function($rootScope, $scope, dataService){
    $rootScope.pageTitle = "Strona domowa";

    dataService.getData('products.json').then((response) => {
        $scope.products = response.data;
    });
    // $dialog.dialog({}).open('views/home/comments.html');

});

appControllers.controller('menuController', function(){
    return;
});

appControllers.controller('orderController', function($rootScope, $scope){
    $rootScope.pageTitle = "Zamówienie";

    $scope.order = [{name: "Produkt 1"},{name: "Produkt 2"}];
});

appControllers.controller('contactController', function($rootScope, $scope, dataService){
    $rootScope.pageTitle = "Kontakt";

    dataService.getData('contacts.json').then((response) => {
        $scope.contacts = response.data;
    });
});

appControllers.controller('tableReservationController', function($rootScope, $scope, dataService){
    $rootScope.pageTitle = "Rezerwacja stolika";

    dataService.getData('tables.json').then((response) => {
        $scope.tables = response.data;
    });

});

appControllers.controller('productDetailController', function($rootScope, $scope, dataService, $routeParams){
    dataService.getData('products.json').then((response) => {
        var products = response.data;
        var product = {};
        angular.forEach(products, (value, key) => {
            if(value.id === $routeParams.productId){
                product = value;
            }
        });
        $rootScope.pageTitle = product.name;

        $scope.product = product;

    });


    $scope.rate = null;
    $scope.max = 5;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

});

// fragment controllers
appControllers.controller('slidesController', function($scope, dataService) {
    dataService.getData('slides.json').then((response) => {
        $scope.slides = response.data;
    });
});

appControllers.controller('productsController', function($scope, dataService) {
    dataService.getData('products.json').then((response) => {
        $scope.products = response.data;
    });
})
