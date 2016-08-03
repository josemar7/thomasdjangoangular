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
    '$scope', '$location', '$stateParams', 'Authentication', 'Profile', 'Utils', 'Validations'
  ];

  /**
  * @namespace ProfileSettingsController
  */
  function ProfileSettingsController($scope, $location, $stateParams, Authentication, Profile, Utils, Validations) {

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

        Validations.submit($(settingsform), Validations.getValidationProfile(), function() {

              Authentication.checklogin($scope.profile.email, $scope.profile.password).then(function(response) {
                  Profile.destroy($scope.profile.username).then(function() {
                    Utils.getMessageWithSnack('ACCOUNT_DELETED');
                    setTimeout(function(){ window.location = '/'; }, 3000);
                  }, function() {
                  });

              }, function(response) {
                Utils.getMessageWithSnack('ACCOUNT_CAN_NOT_DELETE');
              });

        });
    }

    /**
    * @name update
    * @desc Update this user's profile
    * @memberOf thomas.profiles.controllers.ProfileSettingsController
    */
    function update() {

        Validations.submit($(settingsform), Validations.getValidationProfile(), function() {
              Profile.update($scope.profile).then(profileSuccessFn, profileErrorFn);

              /**
              * @name profileSuccessFn
              * @desc Show success snackbar
              */
              function profileSuccessFn(data, status, headers, config) {
                 Authentication.login(data.data.email, data.data.password);
                Utils.getMessageWithSnack('PROFILE_UPDATED');
              }

              /**
              * @name profileErrorFn
              * @desc Show error snackbar
              */
              function profileErrorFn(data, status, headers, config) {
              }

        });

    }
  }
})();