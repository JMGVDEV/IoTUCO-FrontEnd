/*
 * URL SERVER
 */

export const SERVER_URL = 'http://3.22.57.173:3000';

/*
 * SERVER PATHS
 */
export const LOGIN_URL = '/api/login';
export const USERS_URL = '/api/users';

/*----------------------------------------------------------
* 
*                     API REQUESTS
*
 ----------------------------------------------------------/*

/*
 * User login
 */

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
  localStorage.setItem('role', 'admin');

  return;
};

/*
 * List all users
 */
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

/*
 * Crete user
 */

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

  return response.json;
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
    requestOptions
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
    requestOptions
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json;
};
