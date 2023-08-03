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
        names: 'Names',
        lastNames: 'Last Names',
        email: 'Email',
        address: 'Address',
        city: 'City',
        state: 'State',
        aliasName: 'Alias Name',
        titleCreateAccountAdmin: 'Create an account',
        titleCreateAccountUser: 'Join a registered account',
        resendOtp: 'Resend',
        errorOtp: 'The code is not valid, please try again.',
        titleOtp: 'OTP code verify',
        subTitleOtp:
          'An otp code has been sent to your cell phone, enter it below.',
        clear: 'Clear',
        send: 'Send',
        verify: 'Verify',
        errorPhone: 'The phone number is not valid or is empty',
        loginDescription:
          'Remember that in BodegAlert you will find an ally that will help you notify your entire community of the events in which you need attention from each one of them, making it easier for you to be more visible in those moments when you need it most.',
        continue: 'Continue',
        loginTitle: 'Login with your cell phone number!',
        scanButton: 'Scan',
        signIn: 'Sign in',
        signUp: 'Sign up',
        welcome: 'Welcome to',
        next: 'Next',
        back: 'Back',
        skip: 'Skip',
        about: 'About',
        home: 'Home',
        onboardingTitleOne: 'Do you have any emergency?',
        onboardingTitleTwo: 'Wit our messaging service',
        onboardingTitleThree: 'We are your best option',
        onboardingDescriptionOne:
          'Forget about calling the traditional emergency system.',
        onboardingDescriptionTwo:
          'You will be able to inform your entire community about what is happening',
        onboardingDescriptionThree:
          'For those moments when you need to warn about any event that is happening.',
      },
    },
    es: {
      translation: {
        name: 'Nombre',
        lastNames: 'Apellidos',
        email: 'Correo',
        address: 'Dirección',
        city: 'Ciudad',
        state: 'Estado/Departamento',
        aliasName: 'Alias',
        titleCreateAccountAdmin: 'Crear una cuenta',
        titleCreateAccountUser: 'Asociate a una cuententa registrada',
        resendOtp: 'Reenviar',
        errorOtp:
          'El código ingresado no es válido, por favor intenta nuevamente.',
        titleOtp: 'Código de verificación OTP',
        subTitleOtp:
          'Se ha enviado un codigo otp a su celular, ingresalo a continuación.',
        clear: 'Limpiar',
        send: 'Enviar',
        verify: 'Verificar',
        errorPhone: 'El número de teléfono no es válido o está vacío',
        loginDescription:
          'Recuerda que en BodegAlert encontrarás un aliado que te ayudará a notificar a toda tu comunidad los eventos en los que necesites la atención de cada uno de ellos, facilitándote ser más visible en los momentos en los que más lo necesites.',
        continue: 'Continuar',
        loginTitle: 'Ingresa con tu número celular!',
        scanButton: 'Escanear',
        signIn: 'Ingresar',
        signUp: 'Registrarse',
        welcome: 'Bienvenido a ',
        next: 'Siguiente',
        back: 'Volver',
        skip: 'Saltar',
        about: 'Sobre mí',
        home: 'Inicio',
        onboardingTitleOne: '¿Tienes alguna emergencia?',
        onboardingTitleTwo: 'Con nuestro servicio de envio de mensajes',
        onboardingTitleThree: 'Somos tu mejor opcion',
        onboardingDescriptionOne:
          'Olvidate de llamar al sistema de emergencias tradicional',
        onboardingDescriptionTwo:
          'Podrás informar a toda tu comunidad lo que esta sucediendo',
        onboardingDescriptionThree:
          'Para esos momentos en que necesitas avisar sobre cualquíer evento que este sucediendo',
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
