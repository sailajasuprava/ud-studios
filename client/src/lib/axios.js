import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ud-studios-task.onrender.com/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
