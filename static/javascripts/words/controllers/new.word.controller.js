/**
* NewWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('NewWordController', NewWordController);

  NewWordController.$inject = ['$rootScope', '$scope', 'Authentication', 'Utils', 'Words', '$location', 'ngDialog', '$state'];

  /**
  * @namespace NewWordController
  */
  function NewWordController($rootScope, $scope, Authentication, Utils, Words, $location, ngDialog, $state) {

    $scope.word = {};

    var parent = $scope.$parent;

    $scope.submit = submit;

    /**
    * @name submit
    * @desc Create a new Word
    * @memberOf thomas.words.controllers.NewWordController
    */
    function submit(word) {
        $scope.closeThisDialog();

      var isValidForm = $(wordform).data('formValidation').isValid();
      if (isValidForm)
        $(wordform).formValidation('destroy');

      Words.create(word).then(createWordSuccessFn, createWordErrorFn);

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

    $scope.$on('ngDialog.opened', function (e, $dialog) {

      Words.allWordType()
        .then(
          function(result) {
              $scope.word = {
                favorite: 'true',
                availableOptions: result,
                wordType: {id: result[1].id, description: result[1].description} //This sets the default value of the select in the ui
              };
          },
          function(error) {
            // handle errors here
            console.log(error.statusText);
          }
        );

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