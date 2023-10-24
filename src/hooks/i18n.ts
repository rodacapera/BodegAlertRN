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
          groupName: 'Group',
          support: 'Support',
          shareTitle: 'Hi, i need a support!',
          shareMessage:
            'Hi, I want help on something that is happening with my application.',
          shareSubject: 'Technical support'
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
          button: 'Button',
          banner:
            'Below you will find a list of the buttons registered in your shop/residence, which you can remove or add using the floating button!',
          buttonsNotFound:
            'We have not found any buttons registered to your shop/residence, we invite you to watch the following video to learn how to create one',
          alertTitleErrorDeleteButton: 'Remove button',
          alertDescriptionErrorDeleteButton:
            'Are you sure you want to delete this button, if so press Ok button.',
          buttonFindTitle:
            'We have detected the following button, to add it to your lists, click on the button below',
          buttonStatus: 'Status',
          buttonConnected: 'Connected',
          buttonUnconnected: 'Unconnected',
          buttonIp: 'Ip',
          searching: 'Searching',
          noDetectedButton:
            'Botón no detectado, desliza hacia abajo para buscar de nuevo.'
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
            'The group code does not exist in our system, try again or create a new group if required.',
          aliasPlaceHolder: 'Cofee shop/Unit 3 res 201'
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
          goBack: 'Back',
          errorUserNotExist: 'The user is not exist in our system.'
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
          continueResidence: 'Continue as residence',
          vehicle: 'Vehicle'
        },
        qrModal: {
          helperTitleQr:
            'Ask your collaborator to scan this code from their app in order to be able to to be able to register to your shop/residence!',
          helperFooterQrFirst: `Learn how it's done, click`
        },
        buttonsModal: {
          formTitle: 'Add your network settings',
          formTitleFinish: 'The last step',
          descriptionLastStep:
            '1* Please copy and past this link in your browser and press enter.\n2* Switch your current network to get internet.',
          formCaption: 'Pleas input your network password and press continue!',
          networkName: 'ISS',
          networkPass: 'Password',
          title: 'Select your network!',
          helperTitleQr:
            '1* Turn on your button.\n2* In your phone connect to the wifi network that one starts with shellybuton1.\n3* Go back to this screen and select your wifi network from the list below.\n4* Follow the next steps.',
          helperFooterQrFirst: `Learn how it's done, click`,
          internetError: 'Internet error, try again!',
          errorButtonExistTitle: 'Button found.',
          errorButtonExistDescription:
            'This button exist in our system, pleas try again with another button!',
          unConnectedShellyButton:
            'To continue please connect your device to the button network!',
          buttonNotReady:
            'The button is not full configured, copy and past the link in your browser and press enter!'
        },
        home: {
          panicButton: 'Request Support',
          alertTitleExitApp: 'Exit application',
          alertDescriptionExitApp:
            'Are you sure you want to exit the application?',
          shareToVehicle:
            'I share with you this application that will help you to request assistance from our community whenever you need it, for this you must install the application and register as a vehicle, this way you can enjoy its services and join our community',
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
            'Apparently you are out of coverage to send the notification.',
          disabledTitle: 'Usuario deshabilitado',
          disabledDescription:
            'Para activar tu usuario por favor contactate con soporte técnico, podrás encontrar esta opcion en el menú principal.'
        },
        qrScan: {
          title:
            'Scan the QR and register your data to send your first support notify!'
        },
        network: {
          alertErrorTitle: 'Network Error',
          alertErrorDescription:
            'Your current network have not internet access.'
        },
        update: {
          updateTitle: 'App update',
          updateDescription:
            'Pleas download the last version from the application store to continue using our services.'
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
          groupName: 'Grupo',
          support: 'Soporte',
          shareTitle: 'Hola requiero ayuda!',
          shareMessage:
            'Hola deseo ayuda sobre algo que está pasando con mi applicación',
          shareSubject: 'Soporte técnico'
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
          button: 'Botón',
          banner:
            'A continuación encontrará una lista de los botones registrados en su tienda/residencia, que puede eliminar o añadir utilizando el botón flotante!',
          buttonsNotFound:
            'No hemos encontrado ningún botón registrado en su tienda/residencia, te invitamos a ver el siguiente vídeo para aprender a crear uno, o agrega uno oprimiendo el botón de abajo.',
          alertTitleErrorDeleteButton: 'Remove button',
          alertDescriptionErrorDeleteButton:
            '¿Está seguro de que desea eliminar este botón, si es así pulse el botón Ok.',
          buttonFindTitle:
            'Hemos detectado el siguiente botón, para agregarlo a tu listas, oprime el botón de abajo',
          buttonStatus: 'Estatus',
          buttonConnected: 'Conectado',
          buttonUnconnected: 'Desconectado',
          buttonIp: 'Ip',
          searching: 'Buscando',
          noDetectedButton: 'Button was not detected, swip down to searh again.'
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
            'El código del grupo no existe en nuestro sistema, intenta de nuevo o crea un grupo nuevo si así lo requieres.',
          aliasPlaceHolder: 'Cafébar/torre 3 apto 201'
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
          goBack: 'Volver',
          errorUserNotExist: 'El usuario no existe en nuestro sistema.'
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
          continueResidence: 'Continuar como residencia',
          vehicle: 'Vehículo'
        },
        qrModal: {
          helperTitleQr:
            'Pidele a tu colaborador que escannee este código desde su app para poder registrarse a tu tienda/residencia!',
          helperFooterQrFirst: 'Conocer como se hace, click'
        },
        buttonsModal: {
          formTitle: 'Agrega tu configuración de red',
          formTitleFinish: 'El último paso',
          descriptionLastStep:
            '1* Por favor copia y pega el siguiente enlace en tu navegador y presiona enter.\n2* Vuelve a una red que tenga internet.',
          formCaption:
            'Por favor ingrese la contraseña de su red y oprima continuar!',
          networkName: 'ISS',
          networkPass: 'Contraseña',
          title: 'Selecciona tu red!',
          helperTitleQr:
            'Enciende tu botón y conectate a la red wifi que inicia con shellybuton1, volve a esta pantalla, selecciona tu red wifi del listado de abajo y segue los pasos!',
          helperFooterQrFirst: 'Conocer como se hace, click',
          internetError: 'Sin internet, intenta de nuevo!',
          errorButtonExistTitle: 'Botón encontrado.',
          errorButtonExistDescription:
            'Este botón existe en nuestro sistema, por favor intenta de nuevo con otro botón!',
          unConnectedShellyButton:
            'Para continuar por favor conecte su dispositivo a la red del botón!',
          buttonNotReady:
            'El botón no está completamente configurado, por favor copie el link, peguelo en su navegador y oprima enter!'
        },
        home: {
          panicButton: 'Solicitar Asistencia',
          alertTitleExitApp: 'Salir de la app',
          alertDescriptionExitApp:
            '¿Estás seguro que deseas saril de la aplicación?',
          shareToVehicle:
            'Te comparto esta aplicación que te ayudará a solicitar asistencia de nuestra comunidad cada vez que lo necesites, para ello debes instalar la aplicación y registrarte como vehículo, de esta manera podrás disfrutar de sus servicios y unirte a nuestra comunidad',
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
            'Al parecer estás fuera de cobertura para enviar la notificación.',
          disabledTitle: 'Usuario deshabilitado',
          disabledDescription:
            'Para activar tu usuario por favor contactate con soporte técnico, podrás encontrar esta opcion en el menú principal.'
        },
        qrScan: {
          title:
            'Scan the QR and register your data to send your first support notify!'
        },
        network: {
          alertErrorTitle: 'Error de conexión',
          alertErrorDescription:
            'Tu conexión no tiene internet, conectate a otra red e intenta de nuevo.'
        },
        update: {
          updateTitle: 'Actualizar app',
          updateDescription:
            'Por favor descarga la última version desde la tienda de applicaciones para seguir usando nuestros servicios.'
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
