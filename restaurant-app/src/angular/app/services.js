var appServices = angular.module('appServices', []);

appServices.service('dataService', function($http) {
    this.getData = (path) => {
        return $http.get(path); // this will return a promise to controller
    }
    this.sendData = (path, data) => {
        return $http.post(path, data);
    }
});

appServices.service('reservationService', function() {
    this.data = [];

    return {
        getData: () => {
            return this.data;
        },
        setData: (data) => {
            this.data = data;
        },
        addElement: (element) => {
            if(this.data[element] == undefined || this.data[element] == 0){
                this.data[element] = 1;
            } else {
                this.data[element]++;
            }
        },
        removeElement: (element) => {
            this.data[element]--;
            if(this.data[element] <= 0){
                this.data.splice(this.data.indexOf(element), 1);
            }
        }
    }
})
