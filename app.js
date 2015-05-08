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

app.controller('MenuCtrl', function($scope) {
    $scope.isCollapsed = true;
    $scope.charts = ['Line', 'Bar', 'Doughnut', 'Pie', 'Polar Area', 'Radar', 'Base'];
});

app.controller('LineCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.labels;
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [];
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };

    var load = function() {

		var results = Papa.parse("data.csv", {
			download: true,
			complete: function(results) {
				console.log(results);
			}
		});

		var serie = [], labels = [];
		angular.forEach(results.data, function(columns) {
			labels.push(columns[0]);
			serie.push(columns[1]);
		});

		$scope.labels = labels;
		$scope.data.push(serie);
    };

    load();

}]);
