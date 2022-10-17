import axios from "axios";
let token = "";
if (typeof window !== "undefined") {
  token = JSON.parse(localStorage.getItem("token")) || null;
}
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:3000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
export default axiosClient;
