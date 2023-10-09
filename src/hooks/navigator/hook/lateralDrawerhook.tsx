import {useEffect} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const LateralDrawerHook = () => {
  const handleDynamicLink = (link: {url: string}) => {
    const other = dynamicLinks().app;
    console.log('ohter', link);

    // Handle dynamic link inside your own application
    console.log('link', link);

    if (link.url === 'https://bodegalert.page.link/register') {
      // ...navigate to your offers screen
      console.log('go to register');
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  return {};
};
export {LateralDrawerHook};
