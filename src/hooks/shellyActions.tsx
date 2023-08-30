import {Alert} from 'react-native';
import {
  API,
  BUTTON_ACTION,
  GET_NETWORKS,
  MQTT
} from '../globals/constants/shelly';
type UniqueData = {
  auth: number;
  bssid: string;
  channel: number;
  rssi: number;
  ssid: string;
};

export type Networks = {
  name?: string;
  error?: string;
};
let unique: Networks[] = [];

const networks = async () => {
  return await fetch(GET_NETWORKS, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    })
    .catch(error => {
      return error.message;
    });
};
const showNetworks = async () => {
  const result = await networks();
  if (result.wifiscan === 'started' || result.wifiscan === 'inprogress') {
    await showNetworks();
  } else {
    if (result.results) {
      unique.length > 0 && (unique = []);
      result.results.map((val: UniqueData) => {
        const find = unique.findIndex((e: Networks) => e.name === val.ssid);
        if (find === -1) {
          unique.push({name: val.ssid});
        }
      });
    } else {
      unique = [{error: result}];
    }
  }
  return unique;
};

const mqttConfig = async (value: string) => {
  return await fetch(MQTT + value, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    });
};

const buttonConfig = async (value: string) => {
  const url = API + BUTTON_ACTION(value);
  const result = await fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    });

  console.log('result', result);
};

const getConfig = async () => {
  return await fetch(API + '/settings', {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    });
};

const networkSettings = async (wifi_name: string, wifi_pass: string) => {
  const myConfig = await getConfig();
  const enable = 'enabled=1';
  const ssid = 'ssid=' + wifi_name; //recibir el nombre del wifi por parametro
  const key = 'key=' + wifi_pass; //recibir la clave del wifi por parametro
  const mqttStat = '_enable=1';
  const mqttPeriod = '_update_period=90';
  const mqttServer = '_server=node02.myqtthub.com:1883';
  const mqttUser = '_user=pannic';
  const mqttPass = '_pass=p4nnic2022';
  const btnAction = myConfig.device.hostname.split('-')[1];
  const dataBtnBd = {
    //esta es la data que se debe enviar a la coleccion buttons para crear el nuevo botón en la bd
    body: 'we need help! in ',
    cost: 0,
    date: Date.now(),
    name: myConfig.device.hostname,
    reference: btnAction,
    shop: '/shops/' //obtener la tienda del usuario e insertarla como una referencia
  };

  console.log(dataBtnBd);

  const mqttStatusResponse = await mqttConfig(mqttStat);
  const mqttPeriodResponse = await mqttConfig(mqttPeriod);
  const mqttServerResponse = await mqttConfig(mqttServer);
  const mqttUserResponse = await mqttConfig(mqttUser);
  const mqttPasswordResponse = await mqttConfig(mqttPass);
  const buttonConfigResponse = await buttonConfig(btnAction);

  // const statusSsidResponse = await staConfig(enable);
  // const nameSsidResponse = await staConfig(ssid);
  // const passwordSsidResponse = await staConfig(key);
  console.log('finish');
};

export {networkSettings, showNetworks};
