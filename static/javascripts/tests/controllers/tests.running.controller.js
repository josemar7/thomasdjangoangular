/**
* TestsRunningController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsRunningController', TestsRunningController);

  TestsRunningController.$inject = ['$scope', '$stateParams'];

  /**
  * @namespace TestsRunningController
  */
  function TestsRunningController($scope, $stateParams) {


        $scope.load = function () {
            //$scope.test = { modality: 'en_es' };
//            Tests.test(25).then(function (response) {
//                $log.log('hello!!!');
//            });
        }

        $scope.load();

  }

})();