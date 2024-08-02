import axios from "axios";

export const api = axios.create({
  baseURL: 'http://riccettodev.online/' // substitua com o IP ou domínio da sua VPS e a porta correta
});
