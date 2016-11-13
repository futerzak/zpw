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

	$scope.title = "Moja galeria zdjęć"
	$scope.query = ''

});

appControllers.controller('GalleryDetailCtrl', function($scope, $routeParams) {
	$scope.galleryId = $routeParams.galleryId; }
);
