import GetLocation from 'react-native-get-location';

export const getLocationPermissions = () =>
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => {
      console.log(location);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

//   if (hasLocationPermission) {
//     Geolocation.getCurrentPosition(
//     (position) => {
//     console.log(position);
//     },
//     (error) => {
//     // See error code charts below.
//     console.log(error.code, error.message);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge:          10000 }
//     );
//     }
