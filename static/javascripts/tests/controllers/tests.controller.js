/**
* TestsController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsController', TestsController);

  TestsController.$inject = ['$scope', '$log', 'Tests'];

  /**
  * @namespace TestsController
  */
  function TestsController($scope, $log, Tests) {

        $scope.load = function () {
            Tests.test(25).then(function (response) {
                $log.log('hello!!!');
            });
        }

        $scope.load();

  }

})();