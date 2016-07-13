/**
* TestsController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsController', TestsController);

  TestsController.$inject = ['$scope', '$log', 'Tests', 'Validations'];

  /**
  * @namespace TestsController
  */
  function TestsController($scope, $log, Tests, Validations) {

        $scope.submit = submit;

        function submit(modality, words_number) {
          if ($(testform).data('formValidation') == undefined)
            $(testform).formValidation(Validations.getValidationTests());

          var isValidForm = $(testform).data('formValidation').isValid();
          if (isValidForm == null) {
            $(testform).formValidation('destroy');
            $(testform).formValidation(Validations.getValidationTests()).formValidation('validate');
            isValidForm = $(testform).data('formValidation').isValid();
          }

          if (isValidForm) {
            $(testform).formValidation('destroy');
          }

        }

        $scope.load = function () {
//            Tests.test(25).then(function (response) {
//                $log.log('hello!!!');
//            });
        }

        $scope.$on('$viewContentLoaded', function(){
            $(testform).formValidation(Validations.getValidationTests());
        });


        $scope.load();

  }

})();