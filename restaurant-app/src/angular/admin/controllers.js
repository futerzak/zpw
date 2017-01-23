var appControllers = angular.module('appControllers', []);

appControllers.controller('homeController', function($rootScope, $scope){
    $rootScope.pageTitle = "Strona domowa";


});

appControllers.controller('menuController', function($rootScope, $scope, dataService){
    $rootScope.pageTitle = "Zarządzanie menu";

    dataService.getData('/products')
        .then(response => {
            $scope.products = response.data;
        })

});

appControllers.controller('productEditController', function($rootScope, $scope, dataService, $routeParams) {
    $rootScope.pageTitle = "Modyfikacja produktu"
    dataService.getData('/products')
        .then(response => {
            angular.forEach(response.data, (product, key) => {
                if(product._id === $routeParams.productId) {
                    $scope.product = product;
                }
            })
        });

    $scope.submit = () => {
        dataService.sendData('/admin/product', product)
            .then(response => {
                console.log(response);
            });
    }
})

appControllers.controller('ordersController', function($rootScope, $scope, dataService) {
    $rootScope.pageTitle = "Zamówienia";


    dataService.getData('/admin/orders')
        .then(response => {
            $scope.orders = response.data;
        });
})

appControllers.controller('orderDetailController', function($rootScope, $scope, dataService, $routeParams){
    $rootScope.pageTitle = "Szczegóły zamówienia";


    dataService.getData('/admin/orders')
        .then(response => {
            angular.forEach(response.data, (order, key) => {
                if(order._id === $routeParams.orderId) {
                    $scope.order = order;
                }
            })
        });
})
