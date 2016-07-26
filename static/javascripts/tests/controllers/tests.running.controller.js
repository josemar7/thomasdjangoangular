/**
* TestsRunningController
* @namespace thomas.tests.controllers
*/
(function () {
  'use strict';

  angular
    .module('thomas.tests.controllers')
      .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
          chartColors: ['#FE2E2E', '#31B404'],
          responsive: false,
          animation: {animateScale: true},
          legend: {
              display: true,
              labels: {
                  function(chart) {
                    console.log(chart);
                  }
              }
          }
        })
      }])
    .directive("inputDisabled", function(){
      return function(scope, element, attrs){
        scope.$watch(attrs.inputDisabled, function(val){
          if(val === undefined || !val) {
            element.removeAttr("disabled");
            element.focus();
          }
          else
            element.attr("disabled", "disabled");
        });
      }
    })
    .controller('TestsRunningController', TestsRunningController);

  TestsRunningController.$inject = ['$scope', 'Tests', '$log', 'Utils'];

  /**
  * @namespace TestsRunningController
  */
  function TestsRunningController($scope, Tests, $log, Utils) {

        $scope.check = check;

        $scope.mykeyPress = function(keyEvent) {
          if (keyEvent.which === 13)
            check(this);
        }

        function check(objThis) {

            if (objThis === undefined)
                objThis = this;

            if (objThis.ok || objThis.ko3) {
                if (objThis.ok)
                    $scope.num_ok = objThis.num_ok + 1;
                else
                    $scope.num_ko = objThis.num_ko + 1;

                $scope.current_index = objThis.current_index + 1;
                if ($scope.current_index === objThis.list_words.length) {
                    $scope.labels = [Utils.getMessage('ERRORS', { errors: $scope.num_ko }),
                                    Utils.getMessage('SUCCESSES', { successes: $scope.num_ok })];
                    $scope.data = [$scope.num_ko, $scope.num_ok];
                    return;
                }
                setWordSettings(objThis.test.modality, objThis.list_words[$scope.current_index]);
                setMask($scope.value, 0);
                return;
            }

            var newString = objThis.result;
            if (newString !== undefined) {
                if (objThis.hint1 !== undefined && objThis.hint2 !== undefined) {
                    //if there is 2 hints, first process lesser and the greater
                    if (objThis.hint1 < objThis.hint2) {
                        //lesser
                        newString = objThis.result.insert(objThis.hint1, objThis.value[objThis.hint1]);
                        //greater
                        newString = newString.insert(objThis.hint2, objThis.value[objThis.hint2]);
                    }
                    else if (objThis.hint1 > objThis.hint2) {
                        //lesser
                        newString = objThis.result.insert(objThis.hint2, objThis.value[objThis.hint2]);
                        //greater
                        newString = newString.insert(objThis.hint1, objThis.value[objThis.hint1]);
                    }
                    //same hint
                    else {
                        newString = objThis.result.insert(objThis.hint2, objThis.value[objThis.hint2]);
                    }
                }
                //only hint1
                else if (objThis.hint1 !== undefined) {
                    newString = objThis.result.insert(objThis.hint1, objThis.value[objThis.hint1]);
                }
                //only hint2, practical impossible
                else if (objThis.hint2 !== undefined ) {
                    newString = objThis.result.insert(objThis.hint2, objThis.value[objThis.hint2]);
                }
            }
            else
                newString = '';

            if (newString.toUpperCase() === objThis.value)
                $scope.ok = true;
            else {
                $scope.result = undefined;
                if (objThis.ko1 === undefined) {
                    $scope.ko1 = true;
                    setMask(objThis.value, 1);
                }
                else if (objThis.ko2 === undefined) {
                    $scope.ko2 = true;
                    setMask(objThis.value, 2);
                }
                else if (objThis.ko3 === undefined) {
                    $scope.ko3 = true;
                    $scope.result = objThis.value;
                }

            }
            angular.element('#value').focus();
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
                $scope.num_ok = 0;
                $scope.num_ko = 0;
                setWordSettings($scope.test.modality, $scope.list_words[$scope.current_index]);
                setMask($scope.value, 0);
                angular.element('#value').focus();
            });
        }

        $scope.load($scope.$parent.test.words_number, $scope);

        function setWordSettings(modality, word) {
            //initializations
            $scope.result = undefined;
            $scope.hint1 = undefined;
            $scope.hint2 = undefined;
            $scope.hint3 = undefined;
            $scope.ok = undefined;
            $scope.ko1 = undefined;
            $scope.ko2 = undefined;
            $scope.ko3 = undefined;
            $scope.current_mask = undefined;

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

        function setMask(value, hint_number) {
            // to length - 1 because there's a bug in the ui-mask library
            var random_index = Math.floor(Math.random() * (value.length - 1));
            var hint1 = $scope.hint1;
            var hint2 = $scope.hint2;
            if (hint_number === 1) {
                $scope.hint1 = random_index;
                hint1 = random_index;
            }
            else if (hint_number === 2) {
                $scope.hint2 = random_index;
                hint2 = random_index;
            }

            var mask = '';
            value.split('').forEach(function(element, index, array) {
                var i = undefined;
                if (index === hint1 )
                    i = hint1;
                else if (index === hint2)
                    i = hint2;

                if (index === i)
                    mask += '\\' + value[i];
                else
                    mask += 'A';
            });
            $scope.current_mask = mask;

        }

  }

})();