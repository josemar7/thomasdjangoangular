/**
* TestsRunningController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsRunningController', TestsRunningController);

  TestsRunningController.$inject = ['$scope', 'Tests', '$log'];

  /**
  * @namespace TestsRunningController
  */
  function TestsRunningController($scope, Tests, $log) {


        $scope.load = function (words_number, $scope) {
            Tests.test(Number(words_number)).then(function (response) {
                $scope.list_words = response.data;
                $scope.current_index = 0;
                $scope.cols =  $scope.list_words[$scope.current_index].name.length * 100 / 5;
                $log.log($scope.list_words[$scope.current_index].name.length);
                $log.log($scope.cols);
                //$scope.cols =  5 * 20;
            });
        }

        $scope.load($scope.$parent.test.words_number, $scope);

        function getSize() {


        }

  }

})();