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

      if ($(regform).data('formValidation') == undefined)
        $(regform).formValidation(Validations.getValidationRegistration());

      var isValidForm = $(regform).data('formValidation').isValid();
      if (isValidForm == null) {
        $(regform).formValidation('destroy');
        $(regform).formValidation(Validations.getValidationRegistration()).formValidation('validate');
        isValidForm = $(regform).data('formValidation').isValid();
      }

      if (isValidForm) {
        $(regform).formValidation('destroy');
        Authentication.register(user.email, user.password, user.username);
      }

    }

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf thinkster.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

  }
})();