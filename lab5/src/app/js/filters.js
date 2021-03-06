var appFilters = angular.module('appFilters',[]);

appFilters.filter('categoryFilter', ['$scope',function() {
   return function(categoryId) {
       var products = [];
       if (categoryId != '' && typeof categoryId != 'undefined') {
           angular.forEach($scope.products, function (product) {
               if (product.category == categoryId) {
                   products.push(product);
               }
           });
           return products;
       }
       return $scope.products;
   }}]
);