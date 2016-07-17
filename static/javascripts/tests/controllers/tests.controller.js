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
            $state.go("testrunning", {}, {reload: true});
          }

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