import axios from "axios";


const url = "http://localhost:3001"
export const api = axios.create({
  baseURL: url,

});
