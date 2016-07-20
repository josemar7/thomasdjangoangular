(function () {
  'use strict';

  angular
    .module('thomas.tests', [
      'thomas.tests.controllers',
      'thomas.tests.services'
    ]);

  angular
    .module('thomas.tests.controllers', ['ui.mask']);

  angular
    .module('thomas.tests.services', []);


})();