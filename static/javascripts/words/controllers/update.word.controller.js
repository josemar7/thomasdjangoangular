/**
* UpdateWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('UpdateWordController', UpdateWordController);

  UpdateWordController.$inject = ['$rootScope', '$scope', 'Authentication', 'Utils', 'Words', '$location', 'ngDialog', '$state', '$log'];

  /**
  * @namespace UpdateWordController
  */
  function UpdateWordController($rootScope, $scope, Authentication, Utils, Words, $location, ngDialog, $state, $log) {

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

      $scope.closeThisDialog();
      var isValidForm = $(wordform).data('formValidation').isValid();

      if (isValidForm)
        $(wordform).formValidation('destroy');

      word.id = id;

      Words.update(word).then(createWordSuccessFn, createWordErrorFn);

      /**
      * @name createWordSuccessFn
      * @desc Show snackbar with success message
      */
      function createWordSuccessFn(data, status, headers, config) {
      /*
        Utils.getMessageWithSnack('UPDATED_WORD', { word: data.data.name.toUpperCase()});
        $state.go("words2", {}, {reload: true});
        */
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

        $(wordform).formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('NAME') })
                        }
                    }
                },
                translation: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('TRANSLATION') })
                        }
                    }
                }

            }
        });

    });
  }


})();