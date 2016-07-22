/**
* TestsRunningController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
    .controller('TestsRunningController', TestsRunningController);
//    .directive('viewValue', function(){
//      return {
//        priority: 10,
//        require: 'ngModel',
//        link: function(scope, element, attrs, controller){
//          scope.$watch(attrs.viewValue, function(newValue, oldValue){
//            if (newValue !== oldValue){
//              if (controller.$viewValue !== undefined)
//                scope[attrs.viewValue] = controller.$viewValue.toUpperCase();
//              else
//                scope[attrs.viewValue] = controller.$viewValue;
//            }
//          });
//        }
//      }
//    });

  TestsRunningController.$inject = ['$scope', 'Tests', '$log'];

  /**
  * @namespace TestsRunningController
  */
  function TestsRunningController($scope, Tests, $log) {

        $scope.check = check;

        function check() {
            $log.log(this.result);
            var newString = '';
            if (this.result !== undefined)
                newString = this.result.insert(this.hint1, this.value[this.hint1]);
            $log.log(newString);
            if (newString.toUpperCase() === this.value)
                $scope.ok = true;
            else {
                $scope.result = undefined;
                if (this.ko1 === undefined) {
                    $scope.ko1 = true;
                    setMask(this.value, 1);
                }
                else if (this.ko2 === undefined) {
                    $scope.ko2 = true;
                    setMask(this.value, 2);
                }
                else if (this.ko3 === undefined) {
                    $scope.ko3 = true;
                    $scope.result = this.value;
                }

            }

        }

        String.prototype.insert = function (index, string) {
          if (index > 0)
            return this.substring(0, index) + string + this.substring(index, this.length);
          else
            return string + this;
        };

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
            //setMask($scope.value, 1);
        }

        function setMask(value, hint_number) {
            // to length - 1 because there's a bug in the ui-mask library
            var random_index = Math.floor(Math.random() * (value.length - 1));
            var hint1 = $scope.hint1;
            var hint2 = $scope.hint2;
            var hint3 = $scope.hint3;
            if (hint_number === 1) {
                $scope.hint1 = random_index;
                hint1 = random_index;
            }
            else if (hint_number === 2) {
                $scope.hint2 = random_index;
                hint2 = random_index;
            }
            else if (hint_number === 3) {
                $scope.hint3 = random_index;
                hint3 = random_index;
            }

            var mask = '';
            value.split('').forEach(function(element, index, array) {
                var i = undefined;
                if (index === hint1 )
                    i = hint1;
                else if (index === hint2)
                    i = hint2;
                else if (index === hint3)
                    i = hint3;

                if (index === i)
                    mask += '\\' + value[i];
                else
                    mask += 'A';
            });
            $log.log(mask);
            $scope.current_mask = mask;
        }

  }

})();