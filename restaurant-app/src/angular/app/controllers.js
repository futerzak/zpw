var appControllers = angular.module('appControllers', []);

// page controllers
appControllers.controller('homeController', function($rootScope, $scope, dataService, reservationService){
    $rootScope.pageTitle = "Strona domowa";

    dataService.getData('/products').then((response) => {
        $scope.products = response.data;
    });
    // $dialog.dialog({}).open('views/home/comments.html');


});

appControllers.controller('menuController', function($scope, reservationService, dataService){

    dataService.getData('/products').then((response) => {
        return response.data;
    })
    .then((products) => {
        $scope.addToCart = (productId) => {
            angular.forEach(products, (product, key) => {
                if(productId == product.id) {
                    reservationService.addElement(product.id);
                }
            })

        };
    });

    console.log(reservationService.getData());
});

appControllers.controller('orderController', function($rootScope, $scope, reservationService, dataService){
    $rootScope.pageTitle = "Zamówienie";

    dataService.getData('/products').then((response) => {
        return response.data;
    })
    .then(products => {
        let orderProducts = [];
        angular.forEach(reservationService.getData(), (order, orderKey) => {
            angular.forEach(products, (product, productKey) => {
                if(product.id == orderKey ) {
                    product.count = order;
                    orderProducts.push(product);
                }
            })
        })
        $scope.order = orderProducts;
    });

    $scope.removeElement = (element) => {
        reservationService.removeElement(element);
        dataService.getData('/products').then((response) => {
            return response.data;
        })
        .then(products => {
            let orderProducts = [];
            angular.forEach(reservationService.getData(), (order, orderKey) => {
                angular.forEach(products, (product, productKey) => {
                    if(product.id == orderKey ) {
                        product.count = order;
                        orderProducts.push(product);
                    }
                })
            })
            $scope.order = orderProducts;
        });
    }
});

appControllers.controller('contactController', function($rootScope, $scope, dataService){
    $rootScope.pageTitle = "Kontakt";

    dataService.getData('/contacts').then((response) => {
        $scope.contacts = response.data;
    });
});

appControllers.controller('tableReservationController', function($rootScope, $scope, dataService, $http, reservationService){
    $rootScope.pageTitle = "Rezerwacja stolika";

    dataService.getData('/tables').then((response) => {
        $scope.tables = response.data;
    });

    $scope.submit = () => {
        if($scope.firstname && $scope.surname && $scope.phone && $scope.date && $scope.time && $scope.table && $scope.accept) {

            const order = reservationService.getData();
            let dish = [];

            angular.forEach(order, (value, key) => {
                dish.push({productId: key, count: value});
            });

            const newReservation = {
                firstname: $scope.firstname,
                surname: $scope.surname,
                phone: $scope.phone,
                date: $scope.date + " " + $scope.time,
                tableId: $scope.table,
                order: dish
            }
            $dataService.sendData('/reservation', newReservation)
                .then((response) => {
                    $scope.disableSubmit = true;
                    console.log(response.data);
                });
        }
    }

});

appControllers.controller('productDetailController', function($rootScope, $scope, dataService, $routeParams){
    dataService.getData('/products').then((response) => {
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
    dataService.getData('/slides').then((response) => {
        $scope.slides = response.data;
    });
});

appControllers.controller('productsController', function($scope, dataService) {
    dataService.getData('/products').then((response) => {
        $scope.products = response.data;
    });
})
