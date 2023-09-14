import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const lang = i18n.language;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: lang,
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: {
        drawer: {
          home: 'Home',
          profile: 'Profile',
          employees: 'Employees',
          buttons: 'Buttons',
          preferences: 'Preferences',
          darkTheme: 'Dark theme',
          supportingEntities: 'Supporting entities'
        },
        employeesView: {
          banner:
            'Below you will find a list of the employees registered in your store, which you can delete or add using the floating button!',
          employeeNotFound:
            'We have not found any employees registered to your store, we invite you to watch the following video to learn how to register one',
          alertTitleErrorDeleteUser: 'Remove user',
          alertDescriptionErrorDeleteUser:
            'Are you sure you want to delete this user, if so press Ok button.'
        },
        buttonsView: {
          banner:
            'Below you will find a list of the buttons registered in your store, which you can remove or add using the floating button!',
          employeeNotFound:
            'We have not found any buttons registered to your store, we invite you to watch the following video to learn how to create one',
          alertTitleErrorDeleteUser: 'Remove button',
          alertDescriptionErrorDeleteUser:
            'Are you sure you want to delete this button, if so press Ok button.'
        },
        geolocationAlert: {
          errorLocationPermissionsAlert: 'Permission denied',
          descriptionErrorLocationPermissionsAlert:
            'You have denied the use of geolocation, to validate it again you will have to uninstall the application and install it again.'
        },
        profileTitle:
          'Below you will find your profile data registered in our system, if you wish you can update them right here!',
        adminFormView: {
          names: 'Names',
          lastNames: 'Last Names',
          email: 'Email',
          address: 'Address',
          city: 'City',
          country: 'Country',
          state: 'State',
          aliasName: 'Alias Shop'
        },
        registerView: {
          titleCreateAccountAdmin: 'Create an account',
          titleCreateAccountUser: 'Join a registered account'
        },
        loginView: {
          title: 'Login with your cell phone number!',
          signIn: 'Sign in',
          scanButton: 'Scan',
          signUp: 'Sign up',
          errorPhone: 'The phone number is not valid or is empty'
        },
        loginSplashView: {
          welcome: 'Welcome to',
          description:
            'Remember that in BodegAlert you will find an ally that will help you notify your entire community of the events in which you need attention from each one of them, making it easier for you to be more visible in those moments when you need it most.'
        },
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
          skip: 'Skip'
        },
        otp: {
          title: 'OTP code verify',
          subTitle:
            'An otp code has been sent to your cell phone, enter it below.',
          error: 'The code is not valid, please try again.',
          resend: 'Resend'
        },
        general: {
          phone: 'Phone',
          back: 'Back',
          clear: 'Clear',
          verify: 'Verify',
          ok: 'OK',
          cancel: 'Cancel',
          send: 'Send',
          continue: 'Continue',
          here: 'here.',
          scanning: 'Scanning'
        },
        qrModal: {
          helperTitleQr:
            'Ask your collaborator to scan this code from their app in order to be able to to be able to register to your store!',
          helperFooterQrFirst: `Learn how it's done, click`
        },
        buttonsModal: {
          formTitle: 'Add your network settings',
          formCaption: 'Pleas input your network password and press continue!',
          networkName: 'ISS',
          networkPass: 'Password',
          title: 'Select your network!',
          helperTitleQr:
            'Turn on your button and connect to the wifi network that starts with shellybuton1, go back to this screen, select your wifi network from the list below and follow the steps!',
          helperFooterQrFirst: `Learn how it's done, click`
        },
        home: {
          panicButton: 'Send Notify'
        }
      }
    },
    es: {
      translation: {
        drawer: {
          home: 'Inicio',
          profile: 'Perfil',
          employees: 'Empleados',
          buttons: 'Botones',
          preferences: 'Preferencias',
          darkTheme: 'Modo oscuro',
          supportingEntities: 'Entidades que apoyan'
        },
        employeesView: {
          banner:
            'A continuación encontraras una lista de los empleados registrados en tu tienda, los cuales podrás eliminar o en su defecto agregar utilizando el botón flotante!',
          employeeNotFound:
            'No hemos encontrado empleados registrados a tu tienda, te invitamos a ver el siguiente video para que aprendas como debes registrar uno',
          alertTitleErrorDeleteUser: 'Eliminar usuario',
          alertDescriptionErrorDeleteUser:
            'Está seguro de eliminar este usuario?, si es así presione el boton OK.'
        },
        buttonsView: {
          banner:
            'A continuación encontrará una lista de los botones registrados en su tienda, que puede eliminar o añadir utilizando el botón flotante!',
          employeeNotFound:
            'No hemos encontrado ningún botón registrado en su tienda, le invitamos a ver el siguiente vídeo para aprender a crear uno',
          alertTitleErrorDeleteUser: 'Remove button',
          alertDescriptionErrorDeleteUser:
            '¿Está seguro de que desea eliminar este botón, si es así pulse el botón Ok.'
        },
        geolocationAlert: {
          errorLocationPermissionsAlert: 'Permiso denegado',
          descriptionErrorLocationPermissionsAlert:
            'Has negado el uso de la geolocalización, para volver a validarlo deberás desinstalar la aplicación e instalarla de nuevo.'
        },
        profileTitle:
          'A continuación encuentras los datos de tu perfil registrados en nuestro sistema, si deseas puedes actualizarlos aquí mismo.',
        adminFormView: {
          name: 'Nombre',
          lastName: 'Apellidos',
          email: 'Correo',
          address: 'Dirección',
          city: 'Ciudad',
          country: 'Country',
          state: 'Estado/Departamento',
          aliasName: 'Alias de la tienda'
        },
        registerView: {
          titleCreateAccountAdmin: 'Crear una cuenta',
          titleCreateAccountUser: 'Asociate a una cuententa registrada'
        },
        loginView: {
          title: 'Ingresa con tu número celular!',
          signIn: 'Ingresar',
          scanButton: 'Escanear',
          signUp: 'Registrarse',
          errorPhone: 'El número de teléfono no es válido o está vacío'
        },
        loginSplashView: {
          welcome: 'Bienvenido a ',
          description:
            'Recuerda que en BodegAlert encontrarás un aliado que te ayudará a notificar a toda tu comunidad los eventos en los que necesites la atención de cada uno de ellos, facilitándote ser más visible en los momentos en los que más lo necesites.'
        },
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
          skip: 'Saltar'
        },
        otp: {
          title: 'Código de verificación OTP',
          subTitle:
            'Se ha enviado un codigo otp a su celular, ingresalo a continuación.',
          error:
            'El código ingresado no es válido, por favor intenta nuevamente.',
          resend: 'Reenviar'
        },
        general: {
          phone: 'Teléfono',
          back: 'Volver',
          clear: 'Limpiar',
          verify: 'Verificar',
          ok: 'OK',
          cancel: 'Cancelar',
          send: 'Enviar',
          continue: 'Continuar',
          here: 'aquí.',
          scanning: 'Escaneando'
        },
        qrModal: {
          helperTitleQr:
            'Pidele a tu colaborador que escannee este código desde su app para poder registrarse a tu tienda!',
          helperFooterQrFirst: 'Conocer como se hace, click'
        },
        buttonsModal: {
          formTitle: 'Add your network settings',
          formCaption:
            'Por favor ingrese la contraseña de su red y oprima continuar!',
          networkName: 'ISS',
          networkPass: 'Contraseña',
          title: 'Selecciona tu red!',
          helperTitleQr:
            'Enciende tu botón y conectate a la red wifi que inicia con shellybuton1, volve a esta pantalla, selecciona tu red wifi del listado de abajo y segue los pasos!',
          helperFooterQrFirst: 'Conocer como se hace, click'
        },
        home: {
          panicButton: 'Enviar Noticia'
        }
      }
    },
    it: {
      translation: {
        title: 'Applicazione multilingue',
        label: "Selezionare un'altra lingua ",
        about: 'Su di me',
        home: 'Casa'
      }
    }
  }
});

export default i18n;
