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

        Validations.submit($(wordform), Validations.getValidationWords(), function() {
            Words.create(word).then(function(data) {
                $scope.closeThisDialog();
                Utils.getMessageWithSnack('CREATED_WORD', { word: data.data.name.toUpperCase()});
                $state.go("words2", {}, {reload: true});
            },
            function() {
                if (data.status == 666)
                    Utils.getMessageWithSnack('WORD_EXISTS', { word: data.data.name.toUpperCase()});
            });
        });

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