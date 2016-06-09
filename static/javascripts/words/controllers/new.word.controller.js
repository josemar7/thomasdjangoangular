/**
* NewWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('NewWordController', NewWordController);

  NewWordController.$inject = ['$rootScope', '$scope', 'Authentication', 'Utils', 'Words', 'wordsType'];

  /**
  * @namespace NewWordController
  */
  function NewWordController($rootScope, $scope, Authentication, Utils, Words, wordsType) {

    var vm = this;
    var parent = $scope.$parent;

    vm.submit = submit;
    vm.wordsType = wordsType.data;

    /**
    * @name submit
    * @desc Create a new Word
    * @memberOf thomas.words.controllers.NewWordController
    */
    function submit() {

      $scope.closeThisDialog();

      Words.create(vm.content).then(createWordSuccessFn, createWordErrorFn);

      /**
      * @name createWordSuccessFn
      * @desc Show snackbar with success message
      */
      function createWordSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Post created.');

          Words.all().then(wordsSuccessFn, wordsErrorFn);

          function wordsSuccessFn(data, status, headers, config) {
            parent.gridOptions.data = data.data;
          }

          function wordsErrorFn(data, status, headers, config) {
            //Utils.getMessageWithSnack('SNACK');
          }
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
  }
})();