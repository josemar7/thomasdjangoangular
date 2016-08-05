/**
* TestsController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsController', TestsController);

  TestsController.$inject = ['$scope', 'Validations', '$state', '$stateParams'];

  /**
  * @namespace TestsController
  */
  function TestsController($scope, Validations, $state, $stateParams) {

        $scope.test = {};

        if ($stateParams.modality != undefined) {
            $scope.test.modality = $stateParams.modality;
        }
        if ($stateParams.words_number != undefined) {
            $scope.test.words_number = Number($stateParams.words_number);
        }

        if ($stateParams.favorite != undefined) {
            $scope.test.favorite = $stateParams.favorite;
        }

        $scope.mykeyPress = function(keyEvent, test) {
          if (keyEvent.which === 13)
            submit(test);
        }

        $scope.submit = submit;

        function submit(test) {
            Validations.submit($(testform), Validations.getValidationTests(), function() {
                $state.go("testrunning", {modality: $(modality).val(), words_number: $(words_number).val(), favorite: $(favorite).val()}, {reload: true});
            });
        }

        $scope.load = function () {
        }

  }

})();