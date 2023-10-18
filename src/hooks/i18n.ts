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
          users: 'Users',
          buttons: 'Buttons',
          preferences: 'Preferences',
          darkTheme: 'Dark theme',
          supportingEntities: 'Supporting entities',
          aliasName: 'Alias',
          notify: 'Notify',
          groupName: 'Group'
        },
        employeesView: {
          banner:
            'Below you will find a list of the users registered in your shop/residence, which you can delete or add using the floating button!',
          employeeNotFound:
            'We have not found any users registered to your shop/residence, we invite you to watch the following video to learn how to register one',
          alertTitleErrorDeleteUser: 'Remove user',
          alertDescriptionErrorDeleteUser:
            'Are you sure you want to delete this user, if so press Ok button.'
        },
        notifyView: {
          banner:
            'Below you will find a list of the notify registered in your shop/residence!',
          notifyNotFound:
            'We have not found any notify registered to your shop/residence'
        },
        buttonsView: {
          banner:
            'Below you will find a list of the buttons registered in your shop/residence, which you can remove or add using the floating button!',
          employeeNotFound:
            'We have not found any buttons registered to your shop/residence, we invite you to watch the following video to learn how to create one',
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
          aliasName: 'Alias',
          group: 'Group No',
          groupAlias: 'Alias group',
          placeHolderAliasGroup: 'My residential complex',
          alertGroupFoundTitle: 'Group not found',
          alertGroupFoundDescription:
            'The group code does not exist in our system, try again or create a new group if required.'
        },
        registerView: {
          banner:
            'The group number is the number of your community, for example, a residential unit, an apartment complex or a commercial complex, if you already have a group number please enter it in the Group No field and do not generate a new one.',
          titleCreateAccountAdmin: 'Create an account',
          titleCreateAccountUser: 'Join a registered account',
          errorUserRegisterTitle: 'Existing account',
          errorUserRegisterDescription:
            'The account exist in our system, please try another phone number.'
        },
        loginView: {
          title: 'Login with your cell phone number!',
          signIn: 'Sign in',
          scanButton: 'Scan',
          signUp: 'Sign up',
          errorPhone: 'The phone number is not valid or is empty',
          goBack: 'Back'
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
          scanning: 'Scanning',
          loading: 'Loading',
          continueBike: 'Continue as vehicle',
          continueResidence: 'Continue as residence'
        },
        qrModal: {
          helperTitleQr:
            'Ask your collaborator to scan this code from their app in order to be able to to be able to register to your shop/residence!',
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
          panicButton: 'Request Support',
          alertTitleExitApp: 'Exit application',
          alertDescriptionExitApp:
            'Are you sure you want to exit the application?',
          share:
            'I share with you this application that will help you to request assistance from our community whenever you need it, for this you must install the application and register with the code that I attach, this way you can enjoy its services and join our community',
          shareTitle: 'Hi this app is great!',
          code: 'My group code is',
          link: 'The link'
        },
        notifications: {
          title: 'I need support!',
          body: 'I have an event in progress and would like to have your assistance.',
          errorDistanceTitle: 'Shipping error!',
          errorDistanceDescription:
            'Apparently you are out of coverage to send the notification.'
        },
        qrScan: {
          title:
            'Scan the QR and register your data to send your first support notify!'
        },
        network: {
          alertErrorTitle: 'Network Error',
          alertErrorDescription:
            'Your current network have not internet access.'
        }
      }
    },
    es: {
      translation: {
        drawer: {
          home: 'Inicio',
          profile: 'Perfil',
          users: 'Usuarios',
          buttons: 'Botones',
          preferences: 'Preferencias',
          darkTheme: 'Modo oscuro',
          supportingEntities: 'Entidades que apoyan',
          aliasName: 'Alias',
          notify: 'Notificaciones',
          groupName: 'Grupo'
        },
        employeesView: {
          banner:
            'A continuación encontraras una lista de los empleados registrados en tu tienda/residencia, los cuales podrás eliminar o en su defecto agregar utilizando el botón flotante!',
          employeeNotFound:
            'No hemos encontrado empleados registrados a tu tienda/residencia, te invitamos a ver el siguiente video para que aprendas como debes registrar uno',
          alertTitleErrorDeleteUser: 'Eliminar usuario',
          alertDescriptionErrorDeleteUser:
            'Está seguro de eliminar este usuario?, si es así presione el boton OK.'
        },
        notifyView: {
          banner:
            'Below you will find a list of the notify registered in your shop/residence!',
          notifyNotFound:
            'We have not found any notify registered to your shop/residence'
        },
        buttonsView: {
          banner:
            'A continuación encontrará una lista de los botones registrados en su tienda/residencia, que puede eliminar o añadir utilizando el botón flotante!',
          employeeNotFound:
            'No hemos encontrado ningún botón registrado en su tienda/residencia, le invitamos a ver el siguiente vídeo para aprender a crear uno',
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
          aliasName: 'Alias',
          group: 'Grupo No',
          groupAlias: 'Alias del grupo',
          placeHolderAliasGroup: 'Mi unidad residencial',
          alertGroupFoundTitle: 'Grupo no encontrado',
          alertGroupFoundDescription:
            'El código del grupo no existe en nuestro sistema, intenta de nuevo o crea un grupo nuevo si así lo requieres.'
        },
        registerView: {
          banner:
            'El número de grupo es el número de su comunidad, por ejemplo, una unidad de residencia, un complejo de apartamentos o un complejo comercial, si ya tienes un numero de grupo por favor ingreselo en el campo Grupo No y no genere uno nuevo.',
          titleCreateAccountAdmin: 'Crear una cuenta',
          titleCreateAccountUser: 'Asociate a una cuententa registrada',
          errorUserRegisterTitle: 'Cuenta existente',
          errorUserRegisterDescription:
            'La cuenta ya existe en nuestro sistema, por favor intente con otro número telefónico.'
        },
        loginView: {
          title: 'Ingresa con tu número celular!',
          signIn: 'Ingresar',
          scanButton: 'Escanear',
          signUp: 'Registrarse',
          errorPhone: 'El número de teléfono no es válido o está vacío',
          goBack: 'Volver'
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
          scanning: 'Escaneando',
          loading: 'Cargando',
          continueBike: 'Continuar como vehículo',
          continueResidence: 'Continuar como residencia'
        },
        qrModal: {
          helperTitleQr:
            'Pidele a tu colaborador que escannee este código desde su app para poder registrarse a tu tienda/residencia!',
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
          panicButton: 'Solicitar Asistencia',
          alertTitleExitApp: 'Salir de la app',
          alertDescriptionExitApp:
            '¿Estás seguro que deseas saril de la aplicación?',
          share:
            'Te comparto esta aplicación que te ayudatá a solicitar asistencia de nuestra comunidad en el momento que necesites, para esto debes instalar la aplicación y registrarte con el código que te adjunto, de esta manera puedes disfrutar de sus servicios y te unas a nuestra comunidad.',
          shareTitle: 'Hola esta app es genial!',
          code: 'My código de grupo es',
          link: 'El link'
        },
        notifications: {
          title: 'Necesito asistencia!',
          body: 'tengo un evento en curso y desearía tener con tu asistencia.',
          errorDistanceTitle: 'Error de envío!',
          errorDistanceDescription:
            'Al parecer estás fuera de cobertura para enviar la notificación.'
        },
        qrScan: {
          title:
            'Scan the QR and register your data to send your first support notify!'
        },
        network: {
          alertErrorTitle: 'Error de conexión',
          alertErrorDescription:
            'Tu conexión no tiene internet, conectate a otra red e intenta de nuevo.'
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
