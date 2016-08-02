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
      getValidationTests: getValidationTests,
      getValidationProfile: getValidationProfile,
      submit: submit
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

      function getValidationProfile() {

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
                password: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('PASSWORD') })
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: Utils.getMessage('PASSWORD_CONFIRM_ERROR')
                        }
                    }
                },
                confirm_password: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('CONFIRM_PASSWORD') })
                        },
                        identical: {
                            field: 'password',
                            message: Utils.getMessage('PASSWORD_CONFIRM_ERROR')
                        }
                    }
                },
                username: {
                    validators: {
                        notEmpty: {
                            message: Utils.getMessage('REQUIRED_FIELD', { field: Utils.getMessage('USERNAME') })
                        }
                    }
                }
            }
        };
        return validateOptions;

      }

      function submit(form, validation, action) {
          if (form.data('formValidation') == undefined)
            form.formValidation(validation);

          var isValidForm = form.data('formValidation').isValid();
          if (isValidForm == null) {
            form.formValidation('destroy');
            form.formValidation(validation).formValidation('validate');
            isValidForm = form.data('formValidation').isValid();
          }

          if (isValidForm) {
            form.formValidation('destroy');
            action();
          }
          else
            if (form.data('formValidation').$invalidFields !== undefined &&
                form.data('formValidation').$invalidFields.length > 0)
                    form.data('formValidation').$invalidFields[0].focus();

      }

  }
})();