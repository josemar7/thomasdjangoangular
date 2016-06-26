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
    var anonymousToken = {
        'AnonymousToken': '78020290-5df3-44b8-9bdb-7b3b4fea2f25'
    };


    var Words = {
      all: all,
      readAll: readAll,
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

    function readAll(limit, offset, sort, filter) {
        return $http({
            method: 'GET',
            url: '/api/v1/words/',
            params: {
                limit: limit,
                offset: offset,
                sort: sort,
                filter: filter
            },
            headers: anonymousToken
        }).then(function (response) {
            return response;
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