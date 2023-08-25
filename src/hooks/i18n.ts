import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const lang = i18n.language;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: lang,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        drawer: {
          profile: 'Profile',
          employees: 'Employees',
          buttons: 'Buttons',
          preferences: 'Preferences',
          darkTheme: 'Dark theme',
          supportingEntities: 'Supporting entities',
        },
        employeeNotFound:
          'We have not found any employees registered to your store, we invite you to watch the following video to learn how to register one.',
        cancel: 'Cancel',

        errorLocationPermissionsAlert: 'Permission denied',
        descriptionErrorLocationPermissionsAlert:
          'You have denied the use of geolocation, to validate it again you will have to uninstall the application and install it again.',

        profileTitle:
          'Below you will find your profile data registered in our system, if you wish you can update them right here!',
        names: 'Names',
        lastNames: 'Last Names',
        email: 'Email',
        address: 'Address',
        city: 'City',
        state: 'State',
        aliasName: 'Alias Shop',
        titleCreateAccountAdmin: 'Create an account',
        titleCreateAccountUser: 'Join a registered account',

        send: 'Send',

        loginView: {
          title: 'Login with your cell phone number!',
          signIn: 'Sign in',
          scanButton: 'Scan',
          signUp: 'Sign up',
          errorPhone: 'The phone number is not valid or is empty',
        },
        loginSplashView: {
          welcome: 'Welcome to',
          description:
            'Remember that in BodegAlert you will find an ally that will help you notify your entire community of the events in which you need attention from each one of them, making it easier for you to be more visible in those moments when you need it most.',
          continue: 'Continue',
        },
        about: 'About',
        home: 'Home',
        onboarding: {
          titleOne: 'Do you have any emergency?',
          titleTwo: 'Wit our messaging service',
          titleThree: 'We are your best option',
          titleFour: 'We need access to your location!',
          descriptionOne:
            'Forget about calling the traditional emergency system.',
          descriptionTwo:
            'You will be able to inform your entire community about what is happening',
          descriptionThree:
            'For those moments when you need to warn about any event that is happening.',
          descriptionFour:
            'To ensure that our application works correctly, we require access to your location so that we can additionally autocomplete your profile data.',
          next: 'Next',
          skip: 'Skip',
        },
        otp: {
          title: 'OTP code verify',
          subTitle:
            'An otp code has been sent to your cell phone, enter it below.',
          error: 'The code is not valid, please try again.',
          resend: 'Resend',
        },
        general: {
          phone: 'Phone',
          back: 'Back',
          clear: 'Clear',
          verify: 'Verify',
          ok: 'OK',
        },
      },
    },
    es: {
      translation: {
        drawer: {
          profile: 'Perfil',
          employees: 'Empleados',
          buttons: 'Botones',
          preferences: 'Preferencias',
          darkTheme: 'Modo oscuro',
          supportingEntities: 'Entidades que apoyan',
        },

        employeeNotFound:
          'No hemos encontrado empleados registrados a tu tienda, te invitamos a ver el siguiente video para que aprendas como debes registrar uno',
        cancel: 'Cancelar',
        errorLocationPermissionsAlert: 'Permiso denegado',
        descriptionErrorLocationPermissionsAlert:
          'Has negado el uso de la geolocalización, para volver a validarlo deberás desinstalar la aplicación e instalarla de nuevo.',
        profileTitle:
          'A continuación encuentras los datos de tu perfil registrados en nuestro sistema, si deseas puedes actualizarlos aquí mismo.',
        name: 'Nombre',
        lastNames: 'Apellidos',
        email: 'Correo',
        address: 'Dirección',
        city: 'Ciudad',
        state: 'Estado/Departamento',
        aliasName: 'Alias de la tienda',
        titleCreateAccountAdmin: 'Crear una cuenta',
        titleCreateAccountUser: 'Asociate a una cuententa registrada',

        send: 'Enviar',

        loginView: {
          title: 'Ingresa con tu número celular!',
          signIn: 'Ingresar',
          scanButton: 'Escanear',
          signUp: 'Registrarse',
          errorPhone: 'El número de teléfono no es válido o está vacío',
        },
        loginSplashView: {
          welcome: 'Bienvenido a ',
          description:
            'Recuerda que en BodegAlert encontrarás un aliado que te ayudará a notificar a toda tu comunidad los eventos en los que necesites la atención de cada uno de ellos, facilitándote ser más visible en los momentos en los que más lo necesites.',
          continue: 'Continuar',
        },
        about: 'Sobre mí',
        home: 'Inicio',
        onboarding: {
          titleOne: '¿Tienes alguna emergencia?',
          titleTwo: 'Con nuestro servicio de envio de mensajes',
          titleThree: 'Somos tu mejor opcion',
          titleFour: 'Necesitamos acceder a tu ubicación!',
          descriptionOne:
            'Olvidate de llamar al sistema de emergencias tradicional',
          descriptionTwo:
            'Podrás informar a toda tu comunidad lo que esta sucediendo',
          descriptionThree:
            'Para esos momentos en que necesitas avisar sobre cualquíer evento que este sucediendo',
          descriptionFour:
            'Para garantizar que nuestra aplicación funcione correctamente, requerimos acceder a tu ubicación adicionalemente podremos autocompletar los datos de tu perfil.',
          next: 'Siguiente',
          skip: 'Saltar',
        },
        otp: {
          title: 'Código de verificación OTP',
          subTitle:
            'Se ha enviado un codigo otp a su celular, ingresalo a continuación.',
          error:
            'El código ingresado no es válido, por favor intenta nuevamente.',
          resend: 'Reenviar',
        },
        general: {
          phone: 'Teléfono',
          back: 'Volver',
          clear: 'Limpiar',
          verify: 'Verificar',
          ok: 'OK',
        },
      },
    },
    it: {
      translation: {
        title: 'Applicazione multilingue',
        label: "Selezionare un'altra lingua ",
        about: 'Su di me',
        home: 'Casa',
      },
    },
  },
});

export default i18n;
