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
      CURRENT_WORD: 'Word {{ current }} of {{ total }}',
      DELETED_WORD: 'The word has been deleted',
      EMAIL: 'Email',
      EMAIL_ERROR: 'Email is not valid',
      ENGLISH_SPANISH: 'English - Spanish',
      FAVORITE: 'Favorite',
      HIDDEN_COLUMN: 'Hidden column',
      MODALITY: 'Modality',
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
      SPANISH_ENGLISH: 'Spanish - English',
      TEST: 'Test',
      TEST_NUMBER: 'Number between 5 and 100',
      TRANSLATION: 'Translation',
      TYPE: 'Type',
      UPDATED_WORD: 'The word {{word}} has been updated',
      USERNAME: 'Username',
      VOCABULARY: 'Vocabulary',
      WORD_EXISTS: 'Word {{word}} exists in the data base',
      WORDS: 'Words',
      WORDS_NUMBER: 'Words number',
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
      CURRENT_WORD: 'Palabra {{ current }} de {{ total }}',
      DELETED_WORD: 'La palabra ha sido borrada',
      EMAIL: 'Email',
      EMAIL_ERROR: 'El Email es incorrecto',
      ENGLISH_SPANISH: 'Inglés - Español',
      FAVORITE: 'Favorita',
      HIDDEN_COLUMN: 'Ocultar columna',
      MODALITY: 'Modalidad',
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
      SPANISH_ENGLISH: 'Español - Inglés',
      TEST: 'Prueba',
      TEST_NUMBER: 'Número entre 5 y 100',
      TRANSLATION: 'Traducción',
      TYPE: 'Tipo',
      UPDATED_WORD: 'La palabra {{word}} ha sido actualizada',
      USERNAME: 'Usuario',
      VOCABULARY: 'Vocabulario',
      WORD_EXISTS: 'La palabra {{word}} ya existe en la base de datos',
      WORDS: 'Palabras',
      WORDS_NUMBER: 'Número de palabras',
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