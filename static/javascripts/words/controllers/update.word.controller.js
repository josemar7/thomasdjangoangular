/**
* UpdateWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('UpdateWordController', UpdateWordController);

  UpdateWordController.$inject = ['$rootScope', '$scope', 'Utils', 'Words', 'ngDialog', '$state', '$log', 'Validations'];

  /**
  * @namespace UpdateWordController
  */
  function UpdateWordController($rootScope, $scope, Utils, Words, ngDialog, $state, $log, Validations) {

    $scope.word = $scope.ngDialogData.word;
    //$scope.id = $scope.ngDialogData.word.id;
    var id = $scope.ngDialogData.word.id;

    $scope.submit = submit;

    /**
    * @name submit
    * @desc Update a new Word
    * @memberOf thomas.words.controllers.UpdateWordController
    */
    function submit(word) {

      var isValidForm = $(wordform).data('formValidation').isValid();
      if (isValidForm == null) {
        $(wordform).formValidation('destroy');
        $(wordform).formValidation(Validations.getValidationWords()).formValidation('validate');
        isValidForm = $(wordform).data('formValidation').isValid();
      }

      if (isValidForm) {
        $(wordform).formValidation('destroy');
        word.id = id;
        Words.update(word).then(createWordSuccessFn, createWordErrorFn);
        $scope.closeThisDialog();
      }

      /**
      * @name createWordSuccessFn
      * @desc Show snackbar with success message
      */
      function createWordSuccessFn(data, status, headers, config) {
        Utils.getMessageWithSnack('UPDATED_WORD', { word: data.data.name.toUpperCase()});
        $state.go("words2", {}, {reload: true});
      }


      /**
      * @name createWordErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createWordErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('word.created.error');
        $log.log(data.error);
      }
    }

    Words.allWordType()
    .then(
      function(result) {
        result.forEach(function(currentValue,index,arr) {
            if (currentValue.id == $scope.word.wordType) {
                $scope.word.wordType = currentValue;
                return;
            }
        });
        $scope.word.availableOptions = result;
      },
      function(error) {
        // handle errors here
        $log.log(error.statusText);
      }
    );

    $scope.$on('ngDialog.opened', function (e, $dialog) {

        $(wordform).formValidation(Validations.getValidationWords());

    });
  }


})();