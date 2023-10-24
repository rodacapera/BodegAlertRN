import {
  ACTIONS,
  API,
  BUTTON_ACTION,
  GET_NETWORKS,
  MQTT,
  SET_STA,
  STATUS
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
  description?: string;
  error?: string | null;
};
let unique: Networks[] = [{error: null}];

const statusDevice = async () => {
  return await fetch(STATUS, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      //console.log('dataaaaa', data.bat.value); //estado de la batería
      return data;
    })
    .catch(err => {
      console.debug('err', err && err);
    });
};

const statusActionsDevice = async () => {
  return await fetch(ACTIONS, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    })
    .catch(err => {
      console.debug('err', err && err);
    });
};

const networks = async () => {
  return await fetch(GET_NETWORKS, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    })
    .catch(error => {
      return error && error.message;
    });
};
const showNetworks = async () => {
  const result = await networks();
  if (result.wifiscan === 'started' || result.wifiscan === 'inprogress') {
    unique.length == 1 && (await showNetworks());
  } else {
    if (result.results) {
      unique.length > 0 && (unique = []);
      result.results.map((val: UniqueData) => {
        const find = unique.findIndex((e: Networks) => e.name === val.ssid);
        if (find === -1) {
          unique.push({name: val.ssid, description: val.bssid});
        }
      });
    } else {
      unique = [{error: result}];
    }
  }
  return unique;
};

const staConfig = async (value: string) => {
  return await fetch(SET_STA + value, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    });
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
  return await fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    })
    .catch(err => {
      console.log('error', err);
    });
};

export const getConfig = async () => {
  return await fetch(API + '/settings', {method: 'GET'})
    .then(response => response.json())
    .then(async data => {
      return data;
    });
};

const finisSettButton = async (wifi_name: string, wifi_pass: string) => {
  console.log('wifi_name', wifi_name);
  console.log('wifi_pass', wifi_pass);
  const enable = 'enabled=1';
  const ssid = 'ssid=' + wifi_name;
  const key = 'key=' + wifi_pass;
  console.log('ssid', ssid);
  const statusSsidResponse = await staConfig(ssid).then(async () => {
    console.log('ssid', key);
    return await staConfig(key).then(async () => {
      console.log('key', enable);
      return await staConfig(enable);
    });
  });
  console.log('statusSsidResponse', statusSsidResponse);
  return statusSsidResponse;
};

const networkSettings = async () => {
  const myConfig = await getConfig();
  const btnAction = myConfig.device.hostname.split('-')[1];

  const mqttStat = '_enable=1';
  const mqttPeriod = '_update_period=90';
  const mqttServer = '_server=node02.myqtthub.com:1883';
  const mqttUser = '_user=pannic';
  const mqttPass = '_pass=p4nnic2022';

  const mqttStatusResponse = await mqttConfig(mqttStat);
  const mqttPeriodResponse = await mqttConfig(mqttPeriod);
  const mqttServerResponse = await mqttConfig(mqttServer);
  const mqttUserResponse = await mqttConfig(mqttUser);
  const mqttPasswordResponse = await mqttConfig(mqttPass);
  // const buttonConfigResponse = await buttonConfig(btnAction);
  const url = API + BUTTON_ACTION(btnAction);
  return {myConfig, button: url};
};

export {
  networkSettings,
  showNetworks,
  statusDevice,
  statusActionsDevice,
  finisSettButton
};
