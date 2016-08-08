(function () {
  'use strict';

  angular
    .module('thomas.words', [
      'thomas.words.controllers',
      'thomas.words.directives',
      'thomas.words.services'
    ]);

  angular
    .module('thomas.words.controllers', []);

  angular
    .module('thomas.words.directives', ['ngDialog']);

  angular
    .module('thomas.words.services', ['ngCookies']);


})();