/**
* TestsController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsController', TestsController);

  TestsController.$inject = ['$scope', 'Validations', '$state'];

  /**
  * @namespace TestsController
  */
  function TestsController($scope, Validations, $state) {

        $scope.submit = submit;

        function submit(test) {
            Validations.submit($(testform), Validations.getValidationTests(), function() {
                $state.go("testrunning", {modality: $(modality).val(), words_number: $(words_number).val()}, {reload: true});
            });
        }

        $scope.load = function () {
            //$scope.test = { modality: 'en_es' };
//            Tests.test(25).then(function (response) {
//                $log.log('hello!!!');
//            });
        }

        $scope.load();

  }

})();