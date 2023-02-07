import axios from "axios";

// const token = localStorage.getItem("token")
//   ? JSON.parse(localStorage.getItem("token"))
//   : null;

export const api = axios.create({
  // baseURL: "https://dummyjson.com/auth",
  // baseURL: "https://apingweb.com/api"
  baseURL: "http://192.168.106.178:3000/data",
  // baseURL: 'https://node-fake-api-server.herokuapp.com/'
  // baseURL: 'https://api.exgain.ir/wallet/api/v1'
});
