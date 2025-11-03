// src/services/api.js
import axios from "axios";
const API = axios.create({ baseURL: "/api" }); // change baseURL to your backend
export default API;
