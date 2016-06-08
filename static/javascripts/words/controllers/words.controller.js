/**
* WordsController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('WordsController', WordsController);

  WordsController.$inject = ['$scope', 'words', 'Utils'];

  /**
  * @namespace WordsController
  */
  function WordsController($scope, words, Utils) {
    var vm = this;
    vm.words = words.data;
    Utils.getMessageWithSnack('SNACK');
  }

})();