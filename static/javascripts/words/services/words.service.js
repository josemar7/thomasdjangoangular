/**
* Words
* @namespace thomas.words.services
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.services')
    .factory('Words', Words);

  Words.$inject = ['$http', '$q'];

  /**
  * @namespace Words
  * @returns {Factory}
  */
  function Words($http, $q) {

    var deferred = $q.defer();

    var Words = {
      all: all,
      create: create,
      get: get,
      update: update,
      destroy: destroy,
      allWordType: allWordType
    };

    return Words;

    ////////////////////

    function allWordType() {

        return $http.get('/api/v1/wordsType/')
          .then(function(response) {
            // promise is fulfilled
            deferred.resolve(response.data);
            return deferred.promise;
          }, function(response) {
            // the following line rejects the promise
            deferred.reject(response);
            return deferred.promise;
          });

      //return $http.get('/api/v1/wordsType/');
    }

    /**
    * @name all
    * @desc Get all Words
    * @returns {Promise}
    * @memberOf thomas.words.services.Words
    */
    function all() {
      //return $http.get('/api/v1/words/');
        return $http.get('/api/v1/words/')
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
    * @name create
    * @desc Create a new Word
    * @param {string} content The content of the new Word
    * @returns {Promise}
    * @memberOf thomas.words.services.Words
    */
    function create(word) {
      return $http.post('/api/v1/words/', {
        name: word.name,
        translation: word.translation,
        comment: word.comment,
        favorite: word.favorite,
        wordType: word.wordType.id
      });
    }

    function update(word) {
      return $http.put('/api/v1/words/' + word.id + '/', word);
    }

    /**
     * @name get
     * @desc Get the Words of a given user
     * @param {string} username The username to get Words for
     * @returns {Promise}
     * @memberOf thomas.words.services.Words
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/words/');
    }

    function destroy(word) {
      return $http.delete('/api/v1/words/' + word + '/');
    }

  }
})();