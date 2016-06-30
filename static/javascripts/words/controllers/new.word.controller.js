/**
* NewWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('NewWordController', NewWordController);

  NewWordController.$inject = ['$rootScope', '$scope', 'Utils', 'Words', 'ngDialog', '$state', '$log', 'Validations'];

  /**
  * @namespace NewWordController
  */
  function NewWordController($rootScope, $scope, Utils, Words, ngDialog, $state, $log, Validations) {

    $scope.submit = submit;

    /**
    * @name submit
    * @desc Create a new Word
    * @memberOf thomas.words.controllers.NewWordController
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
        Words.create(word).then(createWordSuccessFn, createWordErrorFn);
        $scope.closeThisDialog();
      }

      /**
      * @name createWordSuccessFn
      * @desc Show snackbar with success message
      */
      function createWordSuccessFn(data, status, headers, config) {
        Utils.getMessageWithSnack('CREATED_WORD', { word: data.data.name.toUpperCase()});
        $state.go("words2", {}, {reload: true});
      }


      /**
      * @name createWordErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createWordErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('word.created.error');
        Snackbar.error(data.error);
      }
    }


    $scope.clickToOpen = function () {
        ngDialog.open({
            template: '/static/templates/words/newWord.html',
            width: 800,
            controller: 'NewWordController',
            scope: $scope
        });
    };

    Words.allWordType()
    .then(
      function(result) {
          $scope.word = {
            favorite: 'true',
            //availableOptions: result,
            wordType: {id: result[1].id, description: result[1].description} //This sets the default value of the select in the ui
          };
          $scope.word.availableOptions = result;
      },
      function(error) {
        // handle errors here
        $log.log(error.statusText);
      }
    );

    $scope.$on('ngDialog.opened', function (e, $dialog) {
        if ($dialog.name == undefined || $dialog.name == 'dlgUpdate')
            $(wordform).formValidation(Validations.getValidationWords());
    });

  }

})();