import { getLocalStorage } from "../helpers/localStorage";

export default function authHeader() {
  const { auth } = localStorage.getItem('accessToken');
  const token = JSON.parse(auth).user;
  if (auth && token) {
    return { "authorization": 'Bearer ' + token };
  } else {
    return {};
  }
}