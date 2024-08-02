import axios from "axios";

export const api = axios.create({
  baseURL: 'http://91.108.126.64:3001' // substitua com o IP ou domínio da sua VPS e a porta correta
});
