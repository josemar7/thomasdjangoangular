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
      getValidationRegistration: getValidationRegistration
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



  }
})();