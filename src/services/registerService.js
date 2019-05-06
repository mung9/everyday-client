import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + "/users";

export async function register(user) {
  return await http.post(apiEndpoint, {
    username: user.username,
    password: user.password
  });
}