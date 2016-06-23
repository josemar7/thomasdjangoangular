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


WordsGridController.$inject = ['$scope', '$http', 'ngDialog', 'words', 'Utils', 'Words'];


  /**
  * @namespace WordsGridController
  */
  function WordsGridController($scope, $http, ngDialog, words, Utils, Words) {

      var vm = this;

      //vm.hiddenColumn = 'name';

      vm.gridOptions = {
        enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        enablePaginationControls: false,
        paginationPageSize: 25,
        onRegisterApi: function(gridApi){
          vm.gridApi = gridApi;
        },
        columnDefs: [
          { name: Utils.getMessage('NAME'), field: 'name', cellTooltip: true, cellFilter: 'toUpperCase',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
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
        ],

      };

      vm.gridOptions.data = words;


      vm.refresh = function() {
        vm.gridOptions.data = [];

        Words.all()
            .then(
              function(result) {
                vm.gridOptions.data = result;
              },
              function(error) {
                // handle errors here
                console.log(error.statusText);
              }
        );

      };

    }

})();

