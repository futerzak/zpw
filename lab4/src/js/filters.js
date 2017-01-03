var appFilters = angular.module('appFilters', []);

appFilters.filter('monthName', function() {
    return function(monthNumber) {
        var monthNames = [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień'
        ];

        return monthNames[monthNumber-1];
    }
});
/**
 * change from en days of week to pl
 * @input day in format 'EEEE'
 * @type {Object}
 */
appFilters.filter('dayName', function() {
    return dayNames = {
        Monday: 'poniedziałek',
        Tuesday: 'wtorek',
        Wednesday: 'środa',
        Thursday: 'czwartek',
        Friday: 'piątek',
        Saturday: 'sobota',
        Sunday: 'nidziela'
    };

    return dayNames[dayName];
});

appFilters.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});
