(function () {
  'use strict';

  angular
    .module('thomas.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    }).when('/login', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).when('/words', {
      controller: 'WordsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/words/words.html'
    }).otherwise('/');
  }
})();