/**
* TranslationController
* @namespace thomas.translation.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.translation.controllers')
    .controller('TranslationController', TranslationController);

  TranslationController.$inject = ['$translate', '$scope'];

  /**
  * @namespace TranslationController
  */
  function TranslationController($translate, $scope) {
      var vm = this;

      $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
  }
})();