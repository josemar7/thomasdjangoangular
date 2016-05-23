(function () {
  'use strict';

  angular
    .module('thomas', [
      'thomas.config',
      'thomas.routes',
      'thomas.authentication'
    ])
    .run(run);

  angular
    .module('thomas.routes', ['ngRoute']);

    run.$inject = ['$http'];

    /**
    * @name run
    * @desc Update xsrf $http headers to align with Django's defaults
    */
    function run($http) {
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();
U