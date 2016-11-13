var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function($scope) {
    $scope.users = [
        {
            name: "Futer",
            products: [
                {name: "Milk", date: "2015-09-10 18:20:01", deleted: false, archived: false},
                {name: "Chrzan", date: "2016-01-15 16:20:11", deleted: false, archived: false},
                {name: "Cukier", date: "2016-04-10 08:20:01", deleted: false, archived: false}
            ]
        },
        {
            name: "Michał",
            products: [
                {name: "Milk", date: "2015-09-10 18:20:01", deleted: false, archived: false},
                {name: "Chrzan", date: "2016-01-15 16:45:41", deleted: false, archived: false},
                {name: "Cukier", date: "2016-04-10 08:20:21", deleted: false, archived: false}
            ]
        }
    ];

    $scope.addProduct = function (userId,newProduct) {
        $scope.errortext = "";
        if (!newProduct) {return;}
        if ($scope.checkProductList(userId, newProduct) == false) {
            $scope.users[userId].products.push({name: newProduct, date: Date().toString(), deleted: false, archived: false});
        } else {
            $scope.errortext = "Produkt aktualnie znajduje się na liście zakupów użytkownika " + $scope.users[userId].name;
        }

    }
    $scope.removeProduct = function (userId, productId) {
        $scope.errortext = "";
        $scope.users[userId].products.splice(productId,1);
    }

    $scope.checkProductList = function(userId, productName) {
        for(product in $scope.users[userId].products) {
            var product = $scope.users[userId].products[product];
            if (product.name === productName) { return true; }
        }
        return false;
    }

    $scope.isDeleted = function(item) {
        return item.deleted == true;
    }

    $scope.addToArchive = function(userId, productId) {

        var product = $scope.users[userId].products[productId];
        if(product.deleted == true && product.archived == false) {
            product.archived = true;
        } else if(product.deleted == false && product.archived == false){
            product.archived = false;
        } else {
            product.deleted = false;
            product.archived = false;
            console.log(product);
        }
    }

    $scope.restoreFromArchive = function(userId) {
        for(product in $scope.users[userId].products) {
            var product = $scope.users[userId].products[product];
            if(product.archived == true) {
                product.archived = false;
                product.deleted = true;
            }
        }
    }
});
