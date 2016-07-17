/**
* Validations
* @namespace thomas.validations
*/
(function () {
  'use strict';

  angular
    .module('thomas.validations')
    .factory('Validations', Validations);

  Validations.$inject = ['Utils'];

  /**
  * @namespace Validations
  * @returns {Factory}
  */
  function Validations(Utils) {
    var Validations = {
      getValidationWords: getValidationWords,
      getValidationRegistration: getValidationRegistration,
      getValidationTests: getValidationTests
    };

    return Validations;

    ////////////////////

      function getValidationWords() {

        var validateOptions =
        {
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('NAME') })
                        }
                    }
                },
                translation: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('TRANSLATION') })
                        }
                    }
                }

            }
        };
        return validateOptions;

      }

      function getValidationRegistration() {

        var validateOptions =
        {
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('EMAIL') })
                        },
                        emailAddress: {
                            message: Utils.getMessage('EMAIL_ERROR')
                        }
                    }
                },
                username: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('USERNAME') })
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('PASSWORD') })
                        }
                    }
                }

            }
        };
        return validateOptions;

      }


      function getValidationTests() {

        var validateOptions =
        {
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                modality: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('MODALITY') })
                        }
                    }
                },
                words_number: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('WORDS_NUMBER') })
                        },
                        between: {
                            min: 5,
                            max: 100,
                            message: Utils.getMessage('TEST_NUMBER')
                        }
                    }
                }

            }
        };
        return validateOptions;

      }



  }
})();