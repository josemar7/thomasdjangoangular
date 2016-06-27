/**
* WordsGridController
* @namespace thomas.wordsGrid.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.wordsGrid.controllers', ['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.pinning', 'ui.grid.edit'])
    .controller('WordsGrid1Controller', WordsGrid1Controller)
    .filter('toUpperCase', function () {
      return function (value) {
        return value.toUpperCase();
      };
    });

WordsGrid1Controller.$inject = ['$scope', '$http', '$log', 'Words', 'Utils', 'ngDialog'];


  /**
  * @namespace WordsGridController
  */
  function WordsGrid1Controller($scope, $http, $log, Words, Utils, ngDialog) {

      function rowTemplate() {
        return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                     '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                     '</div>';
      }

      $scope.rowDblClick = function( row) {
        if (row.grid.appScope.hiddenColumn == undefined)
            return;
        var result;
        if (row.grid.appScope.hiddenColumn == 'name')
            result = row.entity.name;
        else if (row.grid.appScope.hiddenColumn == 'translation')
            result = row.entity.translation;

        ngDialog.open({
            template: '<p style=\'text-align: center;\'><b>' + result.toUpperCase() + '</b></p>',
            plain: true,
            width: 300
        });
      };

        $scope.pagination = {
            limit: '5',
            offset: undefined,
            totalItems: null,
            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.limit);
            },
            getCurrentPage: function () {
                if (this.offset == undefined)
                    return 1;
                return Math.ceil(Number(this.offset) / Number(this.limit)) + 1;

            },
            nextPage: function () {
                if (this.offset == undefined || Number(this.offset) < Number(this.totalItems)) {
                    if (this.offset == undefined)
                        this.offset = this.limit;
                    else
                        this.offset = Number(this.offset) + Number(this.limit);
                    $scope.load();
                }
            },
            previousPage: function () {
                if (this.offset != undefined) {
                    if (this.offset == this.limit)
                        this.offset = undefined;
                    else
                        this.offset = Number(this.offset) - Number(this.limit);
                    $scope.load();
                }
            }
        }

      $scope.gridOptions = {
        modifierKeysToMultiSelectCells: true,
        showGridFooter: false,
        rowTemplate: rowTemplate()
      };

        $scope.gridOptions.columnDefs = [
            { name: Utils.getMessage('NAME'), field: 'name', cellTooltip: true, cellFilter: 'toUpperCase',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                if (grid.appScope.hiddenColumn == 'name')
                    return 'hideField';
            }
            },
            { name: Utils.getMessage('TRANSLATION'), field: 'translation', cellClass:'red', cellTooltip: true, cellFilter: 'toUpperCase',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                if (grid.appScope.hiddenColumn == 'translation')
                    return 'hideField';
            }
            }
            /*
            { name: ' ',
            cellTemplate: '<div class="mycell"><a href="javascript:void(0)" ng-click="grid.appScope.buttonUpdateClick(row.entity)" >u&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><a href="javascript:void(0)" ng-click="grid.appScope.buttonCreateClick()" >+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><a href="javascript:void(0)" ng-click="grid.appScope.buttonDeleteClick(row.entity)" >-</a></div>'}
            */
        ];

        $scope.gridOptions.onRegisterApi = function(gridApi){
           $scope.gridApi = gridApi;
        };

        $scope.load = function () {
            Words.readAll($scope.pagination.limit, $scope.pagination.offset, $scope.sort, $scope.filter).then(function (response) {
                $scope.gridOptions.data = response.data.results;
                $scope.pagination.totalItems = response.data.count;
            });
        }

        $scope.load();

        $scope.refresh = function() {
            $scope.load();
        };

    }

})();

