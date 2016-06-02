(function () {
  'use strict';

    var translations = {
      HEADLINE: 'What an awesome module!',
      PARAGRAPH: 'Srsly!',
      NAMESPACE: {
        PARAGRAPH: 'And it comes with awesome features!'
      },
      LOGO: 'Logo',
      HOME: 'Home',
      REGISTER: 'Register',
      LOGIN: 'Login',
      LOGOUT: 'Logout'
    };

  angular
    .module('thomas.translation', [
      'pascalprecht.translate',
      'thomas.translation.controllers'
    ]);

  angular
    .module('thomas.translation.controllers', [])
        .config(['$translateProvider', function ($translateProvider) {
          // add translation table
          $translateProvider
            .translations('en', translations)
            .preferredLanguage('en');
        }])
        .controller('Ctrl', ['$scope', '$translate', function ($scope, $translate) {
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
        }]);


})();