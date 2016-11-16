'use strict';

(function () {

    angular.module('exampleD3.controllers', []);
    angular.module('exampleD3.services', []);

    angular.module('exampleD3', ['exampleD3.controllers', 'exampleD3.services', 'ui.router', 'nvd3']);
})();
'use strict';

(function () {

    var RouteConfig = function RouteConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/start');

        $stateProvider.state('start', {
            url: '/start',
            templateUrl: '/resources/partials/graph.html',
            controller: 'd3Ctrl'
        });
    };

    angular.module('exampleD3').config(RouteConfig);
})();
"use strict";

(function () {

    var d3Ctrl = function d3Ctrl($scope, bookListSrv) {

        var Books = bookListSrv.getBooks();

        var setup = function setup() {
            setBasicGraph();
            setAdvanceGraph();
        };

        var setBasicGraph = function setBasicGraph() {
            $scope.options = {
                "chart": {
                    "type": "historicalBarChart",
                    "height": 450,
                    "margin": {
                        "top": 20,
                        "right": 20,
                        "bottom": 60,
                        "left": 40
                    },
                    "duration": 500,
                    "useInteractiveGuideline": true,
                    "xAxis": {
                        "axisLabel": "Dates",
                        tickFormat: function tickFormat(d) {
                            return d3.time.format('%x')(new Date(d));
                        }
                    },
                    "yAxis": {
                        "axisLabel": "Sales"
                    }
                }
            };

            $scope.data = [{
                values: Books,
                key: 'Book',
                color: '#ff7f0e'
            }];
        };

        var setAdvanceGraph = function setAdvanceGraph() {
            var dataGroup = getDataGroup();

            $scope.options2 = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: function x(d) {
                        return d.key;
                    },
                    y: function y(d) {
                        return d.y;
                    },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

            $scope.data2 = [{
                y: dataGroup.firstWeek.y,
                key: 'First week',
                color: '#ff0000'
            }, {
                y: dataGroup.twoWeek.y,
                key: 'Second week',
                color: '#007f0e'
            }, {
                y: dataGroup.threeWeek.y,
                key: 'Three week',
                color: '#0000de'
            }, {
                y: dataGroup.fourWeek.y,
                key: 'Four week',
                color: '#1f4f0e'
            }];
        };

        var getDataGroup = function getDataGroup() {
            var firstWeek = new Date(2015, 2, 1);
            var twoWeek = new Date(2015, 2, 7);
            var threeWeek = new Date(2015, 2, 14);
            var fourWeek = new Date(2015, 2, 21);

            var arrayAux = {
                firstWeek: {
                    x: firstWeek.getTime(),
                    y: 0
                },
                twoWeek: {
                    x: twoWeek.getTime(),
                    y: 0
                },
                threeWeek: {
                    x: threeWeek.getTime(),
                    y: 0
                },
                fourWeek: {
                    x: fourWeek.getTime(),
                    y: 0
                }
            };

            angular.forEach(Books, function (value, key) {
                if (value.x < twoWeek.getTime()) {
                    arrayAux.firstWeek.y += value.y;
                } else if (value.x < threeWeek.getTime()) {
                    arrayAux.twoWeek.y += value.y;
                } else if (value.x < fourWeek.getTime()) {
                    arrayAux.threeWeek.y += value.y;
                } else {
                    arrayAux.fourWeek.y += value.y;
                }
            });

            return arrayAux;
        };

        setup();
    };

    angular.module('exampleD3.controllers').controller('d3Ctrl', d3Ctrl);
})();
'use strict';

(function () {

        var bookListSrv = function bookListSrv() {

                var bookList = [];
                var api = {};

                var generateData = function generateData() {

                        for (var i = 0; i < 100; i++) {
                                var day = parseInt(Math.random() * 28) + 1;
                                var hour = parseInt(Math.random() * 24);
                                var minute = parseInt(Math.random() * 60);
                                var newDate = new Date(2015, 2, day);

                                bookList.push({
                                        x: newDate.getTime(),
                                        y: parseInt(Math.random() * 100 + 1)
                                });
                        }
                };

                generateData();

                api.getBooks = function () {
                        return bookList;
                };

                return api;
        };

        angular.module('exampleD3.services').service('bookListSrv', bookListSrv);
})();