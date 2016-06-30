/**
* DeleteWordController
* @namespace thomas.words.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.words.controllers')
    .controller('DeleteWordController', DeleteWordController);

  DeleteWordController.$inject = ['$scope', 'Words', '$rootScope', 'Authentication', 'Utils', '$state', '$log'];

  /**
  * @namespace DeleteWordController
  */
  function DeleteWordController($scope, Words, $rootScope, Authentication, Utils, $state, $log) {
    $scope.word = $scope.ngDialogData.word;
    $scope.submit = submit;
    var parent = $scope.$parent;

    /**
    * @name update
    * @desc Update this user's profile
    * @memberOf thomas.words.controllers.DeleteWordController
    */
    function submit() {
      var wordcpy = $scope.word;
      $scope.closeThisDialog();

      Words.destroy($scope.word).then(deleteWordSuccessFn, deleteWordErrorFn);

      /**
      * @name deleteWordSuccessFn
      * @desc Show snackbar with success message
      */
      function deleteWordSuccessFn(data, status, headers, config) {
          Utils.getMessageWithSnack('DELETED_WORD');
          $state.go("words2", {}, {reload: true});
      }


      /**
      * @name deleteWordErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function deleteWordErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('post.created.error');
        $log.log(data.error);
      }

    }

    $scope.$on('ngDialog.opened', function (e, $dialog) {
        $log.log('opened!!!');
    });

  }


})();