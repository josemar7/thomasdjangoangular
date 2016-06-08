(function () {
  'use strict';

  angular
    .module('thomas.wordsGrid', [
      'thomas.wordsGrid.controllers',
      'ngTouch',
      'ui.grid',
      'ui.grid.pagination'
    ]);

  angular
    .module('thomas.wordsGrid.controllers', []);

})();

