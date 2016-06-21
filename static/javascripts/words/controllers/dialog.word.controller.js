/**
* MyCtrl
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('DialogWordController', DialogWordController);

  DialogWordController.$inject = ['$scope', 'ngDialog', 'Words', 'Utils'];

  /**
  * @namespace DialogWordController
  */
  function DialogWordController($scope, ngDialog, Words, Utils) {

    $scope.clickToOpen = function () {

      Words.allWordType()
        .then(
          function(result) {
              $scope.word = {
                favorite: 'true',
                availableOptions: result,
                wordType: {id: result[1].id, description: result[1].description} //This sets the default value of the select in the ui
              };

                ngDialog.open({
                    template: '/static/templates/words/newWord.html',
                    width: 800,
                    controller: 'NewWordController as vm',
                    scope: $scope
                });

          },
          function(error) {
            // handle errors here
            console.log(error.statusText);
          }
        );

    };

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