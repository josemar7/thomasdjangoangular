/**
* Utils
* @namespace thomas.utils
*/
(function () {
  'use strict';

  angular
    .module('thomas.utils')
    .factory('Utils', Utils);

  Utils.$inject = ['$translate'];

  /**
  * @namespace Utils
  * @returns {Factory}
  */
  function Utils($translate) {
    var Utils = {
      getMessage: getMessage,
      getMessageWithSnack: getMessageWithSnack
    };

    return Utils;

    ////////////////////

      function getMessage(name, parameters) {
        if (parameters == undefined)
            return $translate.instant(name);
        else
            return $translate.instant(name, parameters);
      }

      function getMessageWithSnack(name) {

        $translate(name).then(function (translation) {
            $.snackbar({content: translation});
        });
      }

  }
})();