(function () {
  'use strict';

  angular
    .module('thomas.router',['ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('register', {
            url: "/register",
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/register.html'
        })
        .state('login', {
            url: "/login",
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        })
        .state('words', {
            url: "/words",
            controller: 'WordsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/words/words.html',
            resolve: {
                words: function(Words) {
                    return Words.all();
                }
            }
        })
        .state('words1', {
            url: "/words1",
            controller: 'WordsGridController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/wordsGrid/wordsGrid.html',
            resolve: {
                words: function(Words) {
                    return Words.all();
                }
            }
        })
        .state('words2', {
            url: "/words2",
            controller: 'WordsGrid1Controller',
            templateUrl: '/static/templates/wordsGrid/wordsGrid1.html'
        })
        .state('newWord', {
            url: "/newWord",
            controller: 'NewWordController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/words/newWord.html',
            resolve: {
                wordsType: function(Words) {
                    return Words.allWordType();
                }
            }
        })
        .state('newWord1', {
            url: "/newWord1",
            controller: 'DialogWordController',
            controllerAs: 'vm',
            resolve: {
                wordsType: function(Words) {
                    return Words.allWordType();
                }
            }
        });

  }
})();