/**
* NewWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('NewWordController', NewWordController);

  NewWordController.$inject = ['$rootScope', '$scope', 'Authentication', 'Utils', 'Words', 'wordsType', '$location'];

  /**
  * @namespace NewWordController
  */
  function NewWordController($rootScope, $scope, Authentication, Utils, Words, wordsType, $location) {

    $scope.word = {};

    var vm = this;
    var parent = $scope.$parent;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Word
    * @memberOf thomas.words.controllers.NewWordController
    */
    function submit(word) {

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

        $(wordform).data('formValidation').validate();

      //$(wordform).data('formValidation').validate();
      var isValidForm = $(wordform).data('formValidation').isValid();
      console.log(isValidForm);

      //Words.create(word).then(createWordSuccessFn, createWordErrorFn);

      /**
      * @name createWordSuccessFn
      * @desc Show snackbar with success message
      */
      function createWordSuccessFn(data, status, headers, config) {
        //Snackbar.show('Success! Post created.');
          $location.path('words1');
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

    $scope.$on('$viewContentLoaded', function(){

      $scope.word = {
        favorite: 'true',
        availableOptions: wordsType.data,
        wordType: {id: wordsType.data[1].id, description: wordsType.data[1].description} //This sets the default value of the select in the ui
      };


    });


  }


})();