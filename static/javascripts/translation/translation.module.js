(function () {
  'use strict';

    var translationsEn = {
      HEADLINE: 'What an awesome module!',
      PARAGRAPH: 'Srsly!',
      NAMESPACE: {
        PARAGRAPH: 'And it comes with awesome features!'
      },
      HOME: 'Home',
      REGISTER: 'Register',
      LOGIN: 'Login',
      LOGOUT: 'Logout',
      VARIABLE_REPLACEMENT: 'Hi, {{name}}',
      BUTTON_LANG_ES: 'Spanish',
      BUTTON_LANG_EN: 'English',
      ACCEPT: 'Accept',
      ACCOUNT_DELETED: 'Your account has been deleted',
      COMMENT: 'Comment',
      CONFIRM: 'Are you sure?',
      CONFIRM_PASSWORD: 'Confirm Password',
      CREATED_WORD: 'The word {{word}} has been created',
      CURRENT_PAGE: 'Current page',
      CURRENT_WORD: 'Word {{ current }} of {{ total }}',
      DELETE_ACCOUNT: 'Delete Account',
      DELETED_WORD: 'The word has been deleted',
      EMAIL: 'Email',
      EMAIL_ERROR: 'Email is not valid',
      ENGLISH_SPANISH: 'English - Spanish',
      ERRORS: 'Errors : {{errors}}',
      FAVORITE: 'Favorite',
      HIDDEN_COLUMN: 'Hidden column',
      LOGO: 'Carla Thomas',
      MODALITY: 'Modality',
      NAME: 'Name',
      NEW: 'New',
      NEW_PASSWORD: 'New Password',
      NEW_WORD: 'New Word',
      NEXT_PAGE: 'Next',
      NO: 'No',
      PAGE_ERROR: 'You are not authorized to view this page',
      PAGE_NUMBERS: 'Page numbers',
      PAGINATION_MESSAGE: 'Current page: {{ current }} of {{ total }}',
      PASSWORD: 'Password',
      PASSWORD_CONFIRM_ERROR: 'The password and its confirm are not the same',
      PREVIOUS_PAGE: 'Previous',
      PROFILE_UPDATED: 'Your profile has been updated',
      REQUIRED_FIELD: 'The field "{{field}}" is required',
      SAVE: 'Save',
      SNACK: 'This is my awesome snackbar!',
      SPANISH_ENGLISH: 'Spanish - English',
      SUCCESSES: 'Successes : {{successes}}',
      TAGLINE: 'Tagline',
      TEST: 'Test',
      TEST_RESULT: 'Test Result',
      TEST_NUMBER: 'Number between 5 and 100',
      TRANSLATION: 'Translation',
      TYPE: 'Type',
      UPDATE: 'Update',
      UPDATED_WORD: 'The word {{word}} has been updated',
      USER_ACCOUNT: 'User Account',
      USER_NOT_EXISTS: 'That user does not exist',
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
      HOME: 'Casa',
      REGISTER: 'Registrarse',
      LOGIN: 'Conexión',
      LOGOUT: 'Desconexión',
      VARIABLE_REPLACEMENT: 'Hola, {{name}}',
      BUTTON_LANG_ES: 'Español',
      BUTTON_LANG_EN: 'Inglés',
      ACCEPT: 'Aceptar',
      ACCOUNT_DELETED: 'Tú cuenta ha sido borrada',
      COMMENT: 'Comentario',
      CONFIRM: '¿Estás seguro?',
      CONFIRM_PASSWORD: 'Confirmar Contraseña',
      CREATED_WORD: 'La palabra {{word}} ha sido creada',
      CURRENT_PAGE: 'Página actual',
      CURRENT_WORD: 'Palabra {{ current }} de {{ total }}',
      DELETE_ACCOUNT: 'Borrar Cuenta',
      DELETED_WORD: 'La palabra ha sido borrada',
      EMAIL: 'Email',
      EMAIL_ERROR: 'El Email es incorrecto',
      ENGLISH_SPANISH: 'Inglés - Español',
      ERRORS: 'Errores : {{errors}}',
      FAVORITE: 'Favorita',
      HIDDEN_COLUMN: 'Ocultar columna',
      LOGO: 'Carla Thomas',
      MODALITY: 'Modalidad',
      NAME: 'Nombre',
      NEW: 'Nuevo',
      NEW_PASSWORD: 'Nueva Contraseña',
      NEW_WORD: 'Nueva Palabra',
      NEXT_PAGE: 'Siguiente',
      NO: 'No',
      PAGE_ERROR: 'No está autorizado para ver esta página',
      PAGE_NUMBERS: 'Número de páginas',
      PAGINATION_MESSAGE: 'Página actual: {{ current }} de {{ total }}',
      PASSWORD: 'Contraseña',
      PASSWORD_CONFIRM_ERROR: 'La contraseña y su confirmación no son los mismos',
      PREVIOUS_PAGE: 'Anterior',
      PROFILE_UPDATED: 'Tú perfil ha sido actualizado',
      REQUIRED_FIELD: 'El campo "{{field}}" es obligatorio',
      SAVE: 'Guardar',
      SNACK: 'Este es el maravilloso snackbar!',
      SPANISH_ENGLISH: 'Español - Inglés',
      SUCCESSES: 'Aciertos : {{successes}}',
      TAGLINE: 'Observaciones',
      TEST: 'Prueba',
      TEST_RESULT: 'Resultado de la prueba',
      TEST_NUMBER: 'Número entre 5 y 100',
      TRANSLATION: 'Traducción',
      TYPE: 'Tipo',
      UPDATE: 'Actualizar',
      UPDATED_WORD: 'La palabra {{word}} ha sido actualizada',
      USER_ACCOUNT: 'Cuenta de Usuario',
      USER_NOT_EXISTS: 'Ese usuario no existe',
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