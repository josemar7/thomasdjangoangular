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
    vm.wordsType = wordsType.data;

    /**
    * @name submit
    * @desc Create a new Word
    * @memberOf thomas.words.controllers.NewWordController
    */
    function submit(word) {


      Words.create(word).then(createWordSuccessFn, createWordErrorFn);

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
  }
})();