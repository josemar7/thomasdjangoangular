/**
* Word
* @namespace thomas.words.directives
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.directives')
    .directive('word', word);

  /**
  * @namespace Word
  */
  function word() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf thomas.words.directives.Word
    */
    var directive = {
      restrict: 'E',
      scope: {
        word: '='
      },
      templateUrl: '/static/templates/words/word.html'
    };

    return directive;
  }
})();