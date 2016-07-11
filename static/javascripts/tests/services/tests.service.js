/**
* Tests
* @namespace thomas.tests.services
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.services')
    .factory('Tests', Tests);

  Tests.$inject = ['$http', '$q'];

  /**
  * @namespace Tests
  * @returns {Factory}
  */
  function Tests($http, $q) {

    var deferred = $q.defer();
    var anonymousToken = {
        'AnonymousToken': '78020290-5df3-44b8-9bdb-7b3b4fea2f25'
    };


    var Tests = {
      test: test
    };

    return Tests;

    ////////////////////

    /**
    * @name all
    * @desc Get all Tests
    * @returns {Promise}
    * @memberOf thomas.tests.services.Tests
    */
    function test() {
      //return $http.get('/api/v1/words/');
        return $http.get('/api/v1/tests/')
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


  }
})();