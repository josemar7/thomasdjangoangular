/**
* Word
* @namespace thomas.forms.directives
*/
(function () {
  'use strict';

  angular
    .module('thomas.forms.directives')
    .directive('focus', focus);

  /**
  * @namespace Word
  */
  function focus($timeout) {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf thomas.words.directives.Word
    */
    var directive = {
        scope : {
            trigger : '@focus'
        },
        link : function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };

    return directive;
  }
})();