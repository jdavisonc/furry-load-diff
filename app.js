var app = angular.module('furry', ['chart.js', 'ui.bootstrap']);

app.config(function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        responsive: true
    });
    // Configure all doughnut charts
    ChartJsProvider.setOptions('Doughnut', {
        animateScale: true
    });
});

app.controller('LineCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.init = function() {
		var results = Papa.parse("/data.csv", {
			download: true,
			complete: function(results) {
	            var serie = [], labels = [];
                angular.forEach(results.data, function(row) {
                    labels.push(row[0]);
                    serie.push(row[3]);
                });

                $scope.labels = labels;
                $scope.data = [];
                $scope.data.push(serie);
                $scope.$apply();
			}
		});
    };

    $scope.init();

}]);
