import axios from 'axios';
export const getAxios = axios.create();

// Passing configuration object to axios
// axios({
//   method: 'get',
//   url: `${baseUrl}/api/users/1`
// }).then(response => {
//   console.log(response.data);
// });

// Invoking the get method to perform a GET request
// axios.get(`${baseUrl}/api/users/1`).then(response => {
//   console.log(response.data);
// });
