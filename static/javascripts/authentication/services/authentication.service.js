/**
* Authentication
* @namespace thomas.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thomas.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$http', '$q'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($http, $q) {

    var deferred = $q.defer();

    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      login: login,
      logout: logout,
      current: current,
      register: register,
      checklogin: checklogin
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(email, password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }

    }

      /**
       * @name getAuthenticatedAccount
       * @desc Return the currently authenticated account
       * @returns {object|undefined} Account if authenticated, else `undefined`
       * @memberOf thinkster.authentication.services.Authentication
       */
       /*
      function getAuthenticatedAccount() {
        if (!$cookies.authenticatedAccount) {
          return;
        }

        return JSON.parse($cookies.authenticatedAccount);
      }
      */

      /**
       * @name login
       * @desc Try to log in with email `email` and password `password`
       * @param {string} email The email entered by the user
       * @param {string} password The password entered by the user
       * @returns {Promise}
       * @memberOf thinkster.authentication.services.Authentication
       */
      function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
              email: email, password: password
            }).then(loginSuccessFn, loginErrorFn);

          /**
           * @name loginSuccessFn
           * @desc Set the authenticated account and redirect to index
           */
          function loginSuccessFn(data, status, headers, config) {
            //Authentication.setAuthenticatedAccount(data.data);

            window.location = '/';
          }

          /**
           * @name loginErrorFn
           * @desc Log "Epic failure!" to the console
           */
          function loginErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
          }
      }

        /**
         * @name logout
         * @desc Try to log the user out
         * @returns {Promise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function logout() {
          return $http.post('/api/v1/auth/logout/')
            .then(logoutSuccessFn, logoutErrorFn);

          /**
           * @name logoutSuccessFn
           * @desc Unauthenticate and redirect to index with page reload
           */
          function logoutSuccessFn(data, status, headers, config) {
            window.location = '/';
          }

          /**
           * @name logoutErrorFn
           * @desc Log "Epic failure!" to the console
           */
          function logoutErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
          }
        }

        function current() {

            return $http.get('/api/v1/auth/current/')
              .then(function(response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                return deferred.promise;
              }, function(response) {
                // the following line rejects the promise
                deferred.reject(response);
                return deferred.promise;
              });

        }

        function checklogin() {

            return $http.get('/api/v1/auth/check/')
              .then(function(response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                return deferred.promise;
              }, function(response) {
                // the following line rejects the promise
                deferred.reject(response);
                return deferred.promise;
              });

        }


      /**
       * @name setAuthenticatedAccount
       * @desc Stringify the account object and store it in a cookie
       * @param {Object} user The account object to be stored
       * @returns {undefined}
       * @memberOf thinkster.authentication.services.Authentication
       */
       /*
      function setAuthenticatedAccount(account) {
        $cookies.authenticatedAccount = JSON.stringify(account);
      }
      */

  }
})();