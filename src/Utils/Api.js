/*
 * URL SERVER
 */

//const SERVER_URL = 'http://3.22.57.173:3000';
const SERVER_URL = 'http://127.0.0.1:3001';

/*
 * SERVER PATHS
 */
const LOGIN_URL = '/api/login';
const USERS_URL = '/api/users';
const GROWBEDS_URL = '/api/grow_beds';
const GREEN_HOUSES_URL = '/api/grow_houses';
const PEST_URL = '/api/pests';
const INSPECTIONS_URL = '/api/inspection';
const LIGHTS_URL = '/api/control/lights';
const BLINDS_CONTROL_URL = '/api/control/blinds';
const DOOR_CONTROL_URL = '/api/control/door';

/*----------------------------------------------------------
* 
*                     API REQUESTS
*
 ----------------------------------------------------------*/

/*-----------------------------------------------------------
 *                      Users requests
 *----------------------------------------------------------*/

export const loginUser = async (email, password) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append('email', email);
  urlencoded.append('password', password);

  console.log('start');
  var requestOptions = {
    method: 'POST',
    body: urlencoded,
    redirect: 'follow',
  };

  let res = await fetch(SERVER_URL + LOGIN_URL, requestOptions);
  if (!res.ok) {
    throw new Error();
  }

  let json = await res.json();
  localStorage.setItem('token', json.jwt);
  localStorage.setItem('role', json.role);

  return;
};

export const getAllUsers = async () => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + USERS_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  let json = await response.json();
  return json.users;
};

export const createUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var urlencoded = new URLSearchParams(user);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + USERS_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  let json = await response.json();
  return json.TwoFactorUrl;
};

export const updateUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var urlencoded = new URLSearchParams(user);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let response = await fetch(
    SERVER_URL + USERS_URL + `/${user.id}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json;
};

export const deleteUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var urlencoded = new URLSearchParams();

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let response = await fetch(
    SERVER_URL + USERS_URL + `/${user.id}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json;
};

/*-----------------------------------------------------------
 *        Environment requests
 *---------------------------------------------------------*/

export const getGrowBedEnvironment = async (growbed_id) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  let response = await fetch(
    SERVER_URL + GROWBEDS_URL + `/${growbed_id}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error();
  }

  let json = await response.json();
  return json.environment;
};

export const getGreenHouses = async () => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + GREEN_HOUSES_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  let json = await response.json();
  return json.green_houses;
};

export const getGrowBeds = async () => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + GROWBEDS_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  let json = await response.json();
  return json.grow_beds;
};

/**
 *                 Diseases
 */

export const getDiseases = async () => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + PEST_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  let json = await response.json();
  return json.pests;
};

export const saveInspection = async (inspection) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(inspection);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + INSPECTIONS_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  return response;
};

export const getInspection = async (growbed_id) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let response = await fetch(
    SERVER_URL + INSPECTIONS_URL + `/?growbed_id=${growbed_id}`,
    requestOptions,
  );
  return response.json();
};

/*
 *                    Actions
 */

export const configLights = async (config, securityCode) => {
  console.log(securityCode);
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));
  myHeaders.append('totp_code', securityCode);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var urlencoded = new URLSearchParams(config);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + LIGHTS_URL, requestOptions);
  if (!response.ok) {
    throw new Error();
  }

  return response;
};

export const configBlinds = async (config, securityCode) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));
  myHeaders.append('totp_code', securityCode);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var urlencoded = new URLSearchParams(config);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + BLINDS_CONTROL_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

export const configDoor = async (config, securityCode) => {
  var myHeaders = new Headers();
  myHeaders.append('token', localStorage.getItem('token'));
  myHeaders.append('totp_code', securityCode);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var urlencoded = new URLSearchParams(config);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let response = await fetch(SERVER_URL + DOOR_CONTROL_URL, requestOptions);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};
