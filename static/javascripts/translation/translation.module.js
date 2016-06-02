(function () {
  'use strict';

    var translationsEn = {
      HEADLINE: 'What an awesome module!',
      PARAGRAPH: 'Srsly!',
      NAMESPACE: {
        PARAGRAPH: 'And it comes with awesome features!'
      },
      LOGO: 'Logo',
      HOME: 'Home',
      REGISTER: 'Register',
      LOGIN: 'Login',
      LOGOUT: 'Logout',
      VARIABLE_REPLACEMENT: 'Hi, {{name}}',
      BUTTON_LANG_ES: 'Spanish',
      BUTTON_LANG_EN: 'English'
    };

    var translationsEs = {
      HEADLINE: 'Qué módulo más maravilloso!',
      PARAGRAPH: 'Yeeeeeeeepa!',
      NAMESPACE: {
        PARAGRAPH: 'Viene con características maravillosas!'
      },
      LOGO: 'Logotipo',
      HOME: 'Casa',
      REGISTER: 'Registrarse',
      LOGIN: 'Conexión',
      LOGOUT: 'Desconexión',
      VARIABLE_REPLACEMENT: 'Hola, {{name}}',
      BUTTON_LANG_ES: 'Español',
      BUTTON_LANG_EN: 'Inglés'
    };

  angular
    .module('thomas.translation', [
      'pascalprecht.translate',
      'thomas.translation.controllers'
    ]);

  angular
    .module('thomas.translation.controllers', [])
        .config(['$translateProvider', function ($translateProvider) {
        /*
          // add translation table
          $translateProvider
            .translations('en', translations)
            .preferredLanguage('en');
            */

          // add translation tables
          $translateProvider.translations('en', translationsEn);
          $translateProvider.translations('es', translationsEs);
          $translateProvider.preferredLanguage('es');
          $translateProvider.fallbackLanguage('es');

        }]);

})();