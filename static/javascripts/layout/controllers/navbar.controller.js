/**
* NavbarController
* @namespace thomas.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.layout.controllers')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', 'Authentication', '$log'];

  /**
  * @namespace NavbarController
  */
  function NavbarController($scope, Authentication, $log) {
    var vm = this;

    vm.logout = logout;

    /**
    * @name logout
    * @desc Log the user out
    * @memberOf thomas.layout.controllers.NavbarController
    */
    function logout() {
      Authentication.current().then(function(response) {
            $log.log(response);
            Authentication.logout();
      });

    }
  }
})();