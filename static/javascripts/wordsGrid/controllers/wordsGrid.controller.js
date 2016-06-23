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

      var vm = this;

      vm.hiddenColumn = 'name';

      vm.gridOptions = {
        enableFiltering: false,
        //paginationPageSizes: [25, 50, 75],
        enablePaginationControls: false,
        paginationPageSize: 25,
        onRegisterApi: function(gridApi){
          vm.gridApi = gridApi;
        },
        columnDefs: [
          { name: Utils.getMessage('NAME'), field: 'name', cellTooltip: true, cellFilter: 'toUpperCase',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                console.log('yeeeeeeeepa');
                if (grid.appScope.vm.hiddenColumn == 'name')
                    return 'white';
            }
           },
          { name: Utils.getMessage('TRANSLATION'), field: 'translation', cellClass:'red', cellTooltip: true, cellFilter: 'toUpperCase',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                if (grid.appScope.vm.hiddenColumn == 'translation')
                    return 'white';
            }
          }
        ]
      };

      vm.gridOptions.data = words.data;


/*
        function refresh() {
            vm.gridApi.grid.refresh();
        }
        */

      vm.refresh = function() {
        vm.gridApi.grid.refresh();
      };

    }

})();

