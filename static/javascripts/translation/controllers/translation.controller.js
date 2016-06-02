/**
* TranslationController
* @namespace thomas.translation.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.translation.controllers')
    .controller('TranslationController', TranslationController);

  TranslationController.$inject = ['$scope', '$translate'];

  /**
  * @namespace TranslationController
  */
  function TranslationController($scope, $translate) {
      var vm = this;

      // expose translation via `$translate` service
      $translate('HEADLINE').then(function (headline) {
        $scope.headline = headline;
      });
      $translate('PARAGRAPH').then(function (paragraph) {
        $scope.paragraph = paragraph;
      });
      $translate('NAMESPACE.PARAGRAPH').then(function (anotherOne) {
        $scope.namespaced_paragraph = anotherOne;
      });
      $translate('LOGO').then(function (logo) {
        $scope.logo = logo;
      });
      $translate('HOME').then(function (home) {
        $scope.home = home;
      });
      $translate('REGISTER').then(function (register) {
        $scope.register = register;
      });
      $translate('LOGIN').then(function (login) {
        $scope.login = login;
      });
      $translate('LOGOUT').then(function (logout) {
        $scope.logout = logout;
      });

  }
})();