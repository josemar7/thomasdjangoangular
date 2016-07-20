/**
* TestsRunningController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsRunningController', TestsRunningController);

  TestsRunningController.$inject = ['$scope', 'Tests', '$log'];

  /**
  * @namespace TestsRunningController
  */
  function TestsRunningController($scope, Tests, $log) {

        $scope.mymask = '9999';

        $scope.mykeyPress = function(keyEvent) {
//            $scope.result = '';
//            keyEvent.currentTarget.value.split('').forEach(function(c) {
//                if (c !== '-')
//                    $scope.result = $scope.result + c;
//            });
//            $log.log($scope.result);
        }

        $scope.mykeyUp = function(keyEvent) {
//            $scope.result = '';
//            keyEvent.currentTarget.value.split('').forEach(function(c) {
//                if (c === ' ')
//                    $scope.result = $scope.result + '-';
//                else
//                    $scope.result = $scope.result + c;
//            });
//            $log.log($scope.result);
//            $scope.result = String('-'.repeat($scope.value.length) + keyEvent.currentTarget.value).slice(-$scope.value.length);
        }

        $scope.load = function (words_number, $scope) {
            Tests.test(Number(words_number)).then(function (response) {
                $scope.list_words = response.data;
                $scope.current_index = 0;
                setWordSettings($scope.test.modality, $scope.list_words[$scope.current_index]);
            });
        }

        $scope.load($scope.$parent.test.words_number, $scope);

        function setWordSettings(modality, word) {
            if (modality === 'en_es') {
                $scope.name = word.name;
                $scope.value = word.translation;
                $scope.cols_name =  word.name.length * 100 / 5;
                $scope.cols_value =  word.translation.length * 100 / 5;
            }
            else if ($scope.test.modality === 'es_en') {
                $scope.name = word.translation;
                $scope.value = word.name;
                $scope.cols_name =  word.translation.length * 100 / 5;
                $scope.cols_value =  word.length * 100 / 5;
            }
        }

  }

})();