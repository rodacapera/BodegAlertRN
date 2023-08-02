export const API = 'http://192.168.33.1';
export const BUTTON_ACTION = reference => [
  `/settings/actions?index=0&name=shortpush_url&enabled=true&urls[]=http://20.22.184.175/api/pushB?id=${reference}`,
];
export const GET_NETWORKS = `${API}/wifiscan`;
export const SET_STA = `${API}/settings/sta?`;
export const MQTT = `${API}/settings?mqtt`;
export const STATUS = `${API}/status`;
