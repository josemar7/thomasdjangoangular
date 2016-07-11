(function () {
  'use strict';

  angular
    .module('thomas', [
      'thomas.config',
      'thomas.router',
      'thomas.authentication',
      'thomas.layout',
      'thomas.translation',
      'thomas.words',
      'thomas.wordsGrid',
      'thomas.utils',
      'thomas.validations',
      'thomas.forms',
      'thomas.tests'
    ])
    .run(run);

    angular
        .module('thomas.config', []);

    run.$inject = ['$http'];

    /**
    * @name run
    * @desc Update xsrf $http headers to align with Django's defaults
    */
    function run($http) {
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';
    }

  angular
    .module('thomas.utils', []);
  angular
    .module('thomas.validations', []);


})();
