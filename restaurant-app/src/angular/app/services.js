var appServices = angular.module('appServices', []);

appServices.service('dataService', function($http) {
    this.getData = function(path){
        return $http.get('/' + path); // this will return a promise to controller
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
            // this.data.push(element);
        },
        removeElement: (element) => {
            // let tempData = [];
            // angular.forEach(this.data, (object, key) => {
            //     if(element.id !== object.id) {
            //         tempData.push(object);
            //     }
            // });
            // this.data = tempData;
            console.log("element",element, this.data);
            this.data[element]--;
            if(this.data[element] <= 0){
                this.data.splice(this.data.indexOf(element), 1);
            }
            console.log(this.data);
        }
    }
})
