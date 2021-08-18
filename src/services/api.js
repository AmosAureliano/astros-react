import axios from "axios";

const api = axios.create({
  baseURL: "https://api.nasa.gov/neo/rest/v1/",
});

export default api;