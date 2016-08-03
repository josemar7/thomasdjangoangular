/**
* Register controller
* @namespace thomas.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication', 'Validations'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication, Validations) {

    $scope.register = register;

    /**
    * @name register
    * @desc Register a new user
    * @memberOf thomas.authentication.controllers.RegisterController
    */
    function register(user) {

        Validations.submit($(regform), Validations.getValidationRegistration(), function() {
            Authentication.register(user.email, user.password, user.username);
        });

    }

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf thinkster.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      $location.url('/');
    }

  }
})();