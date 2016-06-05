/**
* Words
* @namespace thomas.words.services
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.services')
    .factory('Posts', Posts);

  Posts.$inject = ['$http'];

  /**
  * @namespace Words
  * @returns {Factory}
  */
  function Words($http) {
    var Words = {
      all: all,
      create: create,
      get: get,
      update: update,
      destroy: destroy
    };

    return Words;

    ////////////////////

    /**
    * @name all
    * @desc Get all Posts
    * @returns {Promise}
    * @memberOf thomas.words.services.Words
    */
    function all() {
      return $http.get('/api/v1/words/');
    }


    /**
    * @name create
    * @desc Create a new Word
    * @param {string} content The content of the new Word
    * @returns {Promise}
    * @memberOf thomas.words.services.Words
    */
    function create(content) {
      return $http.post('/api/v1/words/', {
        content: content
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