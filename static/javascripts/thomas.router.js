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
        .state('words2', {
            url: "/words2",
            controller: 'WordsGrid1Controller',
            templateUrl: '/static/templates/wordsGrid/wordsGrid1.html',
            params: {reload: true, cache: false}
        })
        .state('newWord', {
            url: "/newWord",
            controller: 'NewWordController',
            templateUrl: '/static/templates/words/newWord.html'
        })
        .state('test', {
            url: "/test",
            controller: 'TestsController',
            templateUrl: '/static/templates/tests/test.html'
        })
        .state('testrunning', {
            url: "/testrunning/:modality/:words_number/:favorite",
            views: {

                // the main template will be placed here (relatively named)
                '': {
                    controller: 'TestsController',
                    templateUrl: '/static/templates/tests/test.html'
                },
                'testView@testrunning': {
                    controller: 'TestsRunningController',
                    templateUrl: '/static/templates/tests/testRunning.html'
                }
            }

        })
        .state('settings', {
            url: "/+:username/settings",
            controller: 'ProfileSettingsController',
            templateUrl: '/static/templates/profiles/settings.html'
        });

  }
})();