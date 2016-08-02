/**
* ProfileSettingsController
* @namespace thomas.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.profiles.controllers')
    .controller('ProfileSettingsController', ProfileSettingsController);

  ProfileSettingsController.$inject = [
    '$scope', '$location', '$stateParams', 'Authentication', 'Profile', 'Utils'
  ];

  /**
  * @namespace ProfileSettingsController
  */
  function ProfileSettingsController($scope, $location, $stateParams, Authentication, Profile, Utils) {

    $scope.destroy = destroy;
    $scope.update = update;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thomas.profiles.controllers.ProfileSettingsController
    */
    function activate() {
      Authentication.current().then(function (response) {
              var username = $stateParams.username;

              // Redirect if not logged in
              if (!response) {
                $location.url('/');
                Utils.getMessageWithSnack('PAGE_ERROR');
              } else {
                // Redirect if logged in, but not the owner of this profile.
                if (response.username !== username) {
                  $location.url('/');
                  Utils.getMessageWithSnack('PAGE_ERROR');
                }
              }

              Profile.get(username).then(profileSuccessFn, profileErrorFn);

              /**
              * @name profileSuccessFn
              * @desc Update `profile` for view
              */
              function profileSuccessFn(data, status, headers, config) {
                $scope.profile = data.data;
              }

              /**
              * @name profileErrorFn
              * @desc Redirect to index
              */
              function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Utils.getMessageWithSnack('USER_NOT_EXISTS');
              }

            });
    }


    /**
    * @name destroy
    * @desc Destroy this user's profile
    * @memberOf thomas.profiles.controllers.ProfileSettingsController
    */
    function destroy() {
      Profile.destroy($scope.profile.username).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        window.location = '/';
        Utils.getMessageWithSnack('ACCOUNT_DELETED');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
//        Snackbar.error(data.error);
      }
    }


    /**
    * @name update
    * @desc Update this user's profile
    * @memberOf thomas.profiles.controllers.ProfileSettingsController
    */
    function update() {
      Profile.update($scope.profile).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Show success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Utils.getMessageWithSnack('PROFILE_UPDATED');
      }


      /**
      * @name profileErrorFn
      * @desc Show error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
//        Snackbar.error(data.error);
      }
    }
  }
})();