import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + "/todos";

export async function getTodos(year, month, date) {
  return await http.get(`${apiEndpoint}/${year}/${month}/${date}`);
}

export async function deleteTodo(id){
  return await http.delete(`${apiEndpoint}/${id}`);
}

export async function addTodo(todo){
  return await http.post(`${apiEndpoint}`, todo);
}

export async function updateTodo(todo){
  return await http.put(`${apiEndpoint}/${todo._id}`, todo);
}