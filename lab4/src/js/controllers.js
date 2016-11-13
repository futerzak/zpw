//var portfolioApp = angular.module('portfolioApp',[]);
var appControllers = angular.module('appControllers',[]);

appControllers.controller('GalleryListCtrl', function($scope, $http) {

	$scope.galleries = [];
	$scope.sortList = [];

	$http
		.get("photos/galleries.json")
		.then(function(response){
				$scope.galleries = response.data.galleries;
				$scope.sortList = response.data.sortList
				$scope.orderProp = $scope.sortList[0]
		},
		function(errResponse) {
			console.log('Error response', errResponse);
		}
	);

	$scope.title = "Moja galeria zdjęć";
	$scope.query = '';

});

appControllers.controller('GalleryDetailCtrl', function($scope, $http, $routeParams) {

    // $scope.gallery = {};

    $http
		.get("photos/rzym-2015.json")
        .then(function(response){
            $scope.gallery = response.data.gallery;
            $scope.title = "Moje podróże: " + $scope.gallery.title;
        },
        function(errResponse) {
            console.log('Error response', errResponse);
        });


    $scope.galleryId = $routeParams.galleryId;
});
