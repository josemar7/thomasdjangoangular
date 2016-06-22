/**
* WordsGridController
* @namespace thomas.wordsGrid.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.wordsGrid.controllers')
    .controller('WordsGridController', WordsGridController)
    .filter('toUpperCase', function () {
      return function (value) {
        return value.toUpperCase();
      };
    });


WordsGridController.$inject = ['$scope', '$http', 'ngDialog', 'words', 'Utils'];


  /**
  * @namespace WordsGridController
  */
  function WordsGridController($scope, $http, ngDialog, words, Utils) {

      $scope.gridOptions = {
        //paginationPageSizes: [25, 50, 75],
        enablePaginationControls: false,
        paginationPageSize: 25,
        columnDefs: [
          { name: Utils.getMessage('NAME'), field: 'name', cellTooltip: true, cellFilter: 'toUpperCase' },
          { name: Utils.getMessage('TRANSLATION'), field: 'translation', cellTooltip: true, cellFilter: 'toUpperCase' }
        ]
      };

      $scope.gridOptions.data = words.data;

      $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
      }

    }

})();

