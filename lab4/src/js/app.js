var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'appControllers']);


portfolioApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/galleries', {
                templateUrl: 'views/galleries.html',
                controller: 'GalleryListCtrl'
            }).
        when('/galleries/:galleryId', {
                templateUrl: 'views/gallery.html',
                controller: 'GalleryDetailCtrl'
            }).
        otherwise({redirectTo: '/galleries'});
}]);
