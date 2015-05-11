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
});

app.controller('LineCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.charts = {};
	$scope.series = [ 
		{ path: "/data/data.csv" }, 
		{ path: "/data/data2.csv"}, 
		{ path: "/data/data3.csv"} 
	];

	$scope.addSerie = function() {
		$scope.series.push({ path: ""});
	};

	$scope.deleteSerie = function(index) {
		$scope.series.splice(index, 1);
	};

    $scope.draw = function() {
    	$scope.charts = {};
    	console.log($scope.series);
    	angular.forEach($scope.series, function(serie) {
			Papa.parse(serie.path, {
				header: true,
				download: true,
				complete: function(results) {
		            var datas = [], labels = [];
		            var fields = results.meta.fields;
	                
	                // transform csv data into an series array
	                angular.forEach(results.data, function(row) {
	                    labels.push(row[fields[0]]); // field one must be the X axis
	                    for (var i = 0; i < fields.length - 1; i++) {
	                    	if (!datas[i]) {
	                    		datas[i] = [];
	                    	}
	                    	datas[i].push(row[fields[i+1]]);
	                    };
	                    
	                });

	                // create chart data-type to hold chart information
	                var i = 1; // ignoring first column
	                angular.forEach(datas, function(data) {
	                	var name = results.meta.fields[i++];
	                	if (!$scope.charts[name]) {
		                	$scope.charts[name] = {
		                		labels: labels,
		                		data: [ data ],
		                		series: [ serie.path ],
		                		title: name
		                	};
		                } else {
		                	$scope.charts[name].data.push(data);
		                	$scope.charts[name].series.push(serie.path);
		                }
	                });
	                $scope.$apply();
				}
			});
		});
    };

    $scope.draw();

}]);
