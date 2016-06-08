/**
* WordsGridController
* @namespace thomas.wordsGrid.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.wordsGrid.controllers')
    .controller('WordsGridController', WordsGridController);

WordsGridController.$inject = ['$scope', '$http', 'ngDialog', 'words', 'Utils'];


  /**
  * @namespace WordsGridController
  */
  function WordsGridController($scope, $http, ngDialog, words, Utils) {

      $scope.gridOptions = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
          { name: Utils.getMessage('NAME'), field: 'name' },
          { name: Utils.getMessage('TRANSLATION'), field: 'translation' }
        ]
      };

      $scope.gridOptions.data = words.data;

    }

})();

