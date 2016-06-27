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
      BUTTON_LANG_EN: 'English',
      EMAIL: 'Email',
      PASSWORD: 'Password',
      ACCEPT: 'Accept',
      COMMENT: 'Comment',
      CREATED_WORD: 'The word {{word}} has been created',
      CURRENT_PAGE: 'Current page',
      FAVORITE: 'Favorite',
      HIDDEN_COLUMN: 'Hidden column',
      NAME: 'Name',
      NEW: 'New',
      NEW_WORD: 'New Word',
      NEXT_PAGE: 'Next',
      NO: 'No',
      PAGE_NUMBERS: 'Page numbers',
      PAGINATION_MESSAGE: 'Current page: {{ current }} of {{ total }}',
      PREVIOUS_PAGE: 'Previous',
      REQUIRED_FIELD: 'The field "{{field}}" is required',
      SAVE: 'Save',
      SNACK: 'This is my awesome snackbar!',
      TRANSLATION: 'Translation',
      TYPE: 'Type',
      USERNAME: 'Username',
      VOCABULARY: 'Vocabulary',
      WORDS: 'Words',
      YES: 'Yes'
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
      BUTTON_LANG_EN: 'Inglés',
      EMAIL: 'Email',
      PASSWORD: 'Contraseña',
      ACCEPT: 'Aceptar',
      COMMENT: 'Comentario',
      CREATED_WORD: 'La palabra {{word}} ha sido creada',
      CURRENT_PAGE: 'Página actual',
      FAVORITE: 'Favorita',
      HIDDEN_COLUMN: 'Ocultar columna',
      NAME: 'Nombre',
      NEW: 'Nuevo',
      NEW_WORD: 'Nueva Palabra',
      NEXT_PAGE: 'Siguiente',
      NO: 'No',
      PAGE_NUMBERS: 'Número de páginas',
      PAGINATION_MESSAGE: 'Página actual: {{ current }} de {{ total }}',
      PREVIOUS_PAGE: 'Anterior',
      REQUIRED_FIELD: 'El campo "{{field}}" es obligatorio',
      SAVE: 'Guardar',
      SNACK: 'Este es el maravilloso snackbar!',
      TRANSLATION: 'Traducción',
      TYPE: 'Tipo',
      USERNAME: 'Usuario',
      VOCABULARY: 'Vocabulario',
      WORDS: 'Palabras',
      YES: 'Si'

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