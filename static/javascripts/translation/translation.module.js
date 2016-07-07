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
      ACCEPT: 'Accept',
      COMMENT: 'Comment',
      CONFIRM: 'Are you sure?',
      CREATED_WORD: 'The word {{word}} has been created',
      CURRENT_PAGE: 'Current page',
      DELETED_WORD: 'The word has been deleted',
      EMAIL: 'Email',
      EMAIL_ERROR: 'Email is not valid',
      FAVORITE: 'Favorite',
      HIDDEN_COLUMN: 'Hidden column',
      NAME: 'Name',
      NEW: 'New',
      NEW_WORD: 'New Word',
      NEXT_PAGE: 'Next',
      NO: 'No',
      PAGE_NUMBERS: 'Page numbers',
      PAGINATION_MESSAGE: 'Current page: {{ current }} of {{ total }}',
      PASSWORD: 'Password',
      PREVIOUS_PAGE: 'Previous',
      REQUIRED_FIELD: 'The field "{{field}}" is required',
      SAVE: 'Save',
      SNACK: 'This is my awesome snackbar!',
      TEST: 'Test',
      TRANSLATION: 'Translation',
      TYPE: 'Type',
      UPDATED_WORD: 'The word {{word}} has been updated',
      USERNAME: 'Username',
      VOCABULARY: 'Vocabulary',
      WORD_EXISTS: 'Word {{word}} exists in the data base',
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
      ACCEPT: 'Aceptar',
      COMMENT: 'Comentario',
      CONFIRM: '¿Estás seguro?',
      CREATED_WORD: 'La palabra {{word}} ha sido creada',
      CURRENT_PAGE: 'Página actual',
      DELETED_WORD: 'La palabra ha sido borrada',
      EMAIL: 'Email',
      EMAIL_ERROR: 'El Email es incorrecto',
      FAVORITE: 'Favorita',
      HIDDEN_COLUMN: 'Ocultar columna',
      NAME: 'Nombre',
      NEW: 'Nuevo',
      NEW_WORD: 'Nueva Palabra',
      NEXT_PAGE: 'Siguiente',
      NO: 'No',
      PAGE_NUMBERS: 'Número de páginas',
      PAGINATION_MESSAGE: 'Página actual: {{ current }} de {{ total }}',
      PASSWORD: 'Contraseña',
      PREVIOUS_PAGE: 'Anterior',
      REQUIRED_FIELD: 'El campo "{{field}}" es obligatorio',
      SAVE: 'Guardar',
      SNACK: 'Este es el maravilloso snackbar!',
      TEST: 'Prueba',
      TRANSLATION: 'Traducción',
      TYPE: 'Tipo',
      UPDATED_WORD: 'La palabra {{word}} ha sido actualizada',
      USERNAME: 'Usuario',
      VOCABULARY: 'Vocabulario',
      WORD_EXISTS: 'La palabra {{word}} ya existe en la base de datos',
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