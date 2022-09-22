import axios from "axios";

export const api = axios.create({
  baseURL: "https://server-nlw-production-bd86.up.railway.app",
});
