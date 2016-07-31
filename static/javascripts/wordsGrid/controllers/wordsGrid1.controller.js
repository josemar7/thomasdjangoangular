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
        rowTemplate: rowTemplate(),
        useExternalSorting: true,
        useExternalFiltering: true,
        enableFiltering: true
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
            },
            { name: ' ', maxWidth: 90, enableFiltering: false, enableSorting: false, enableColumnMenu: false,
            cellTemplate: '<div><a href="javascript:void(0)" ng-click="grid.appScope.buttonUpdateClick(row.entity)" class="col-sm-1" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' +
                                '<a href="javascript:void(0)" ng-click="grid.appScope.buttonDeleteClick(row.entity)" class="col-sm-1"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>' +
                                '<a href="javascript:void(0)" ng-show="row.entity.favorite === true" ng-click="grid.appScope.buttonFavoriteClick(row.entity, !row.entity.favorite)" class="col-sm-1"><span class="glyphicon glyphicon-star" aria-hidden="true"></span></a>' +
                                '<a href="javascript:void(0)" ng-hide="row.entity.favorite === true" ng-click="grid.appScope.buttonFavoriteClick(row.entity, !row.entity.favorite)" class="col-sm-1"><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span></a>' +
                                '</div>'
            }
        ];

        $scope.buttonUpdateClick = function (value) {
            ngDialog.open({
                template: '/static/templates/words/newWord.html',
                data: {
                'word': value
                },
                width: 800,
                controller: 'UpdateWordController',
                scope: $scope,
                name: 'dlgUpdate'
            });
        };

        $scope.buttonFavoriteClick = function (word, value) {
            word.favorite = value;
            var wordTypeId = word.wordType;
            word.wordType = {id: wordTypeId};
            Words.update(word).then(function(data) {
            }, function(data) {
                $log.log(data.error);
            });
        };

        $scope.buttonDeleteClick = function(value) {
            ngDialog.openConfirm({
                template: '/static/templates/words/delete-word.html',
                data: {
                'word': value
                },
                controller: 'DeleteWordController',
                scope: $scope,
                name: 'dlgDelete'
            }).then(function (confirm) {
                submit();
            }, function(reject) {
                $log.log('Rejected');
            });
        };


        $scope.gridOptions.onRegisterApi = function(gridApi){
           $scope.gridApi = gridApi;

            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                $scope.sort = [];
                angular.forEach(sortColumns, function (sortColumn) {
                    $scope.sort.push({
                        fieldName: sortColumn.field,
                        order: sortColumn.sort.direction
                    });
                });
                $scope.load();
            });

            $scope.gridApi.core.on.filterChanged($scope, function () {
                $scope.filter = [];

                var grid = this.grid;
                angular.forEach(grid.columns, function (column) {
                    var fieldName = column.field;
                    var value = column.filters[0].term;
                    if (value) {
                        $scope.filter.push({
                            fieldName: fieldName,
                            value: value
                        })
                    }
                });

                $scope.pagination.offset = undefined;
                $scope.pagination.totalItems = null;

                $scope.load();
            });

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

