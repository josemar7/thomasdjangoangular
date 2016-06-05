/**
* Words
* @namespace thomas.words.directives
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.directives')
    .directive('words', words);

  /**
  * @namespace Words
  */
  function words() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf thomas.words.directives.Words
    */
    var directive = {
      controller: 'WordsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        posts: '='
      },
      templateUrl: '/static/templates/words/words.html'
    };

    return directive;
  }
})();