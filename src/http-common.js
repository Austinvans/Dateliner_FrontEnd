import axios from "axios";

let token = window.localStorage.getItem("token")
export default axios.create({
  baseURL: "http://localhost:8080/dateliner",
  headers: {
    "Content-type": "application/json",
    "Authorization": `${token}`
  }
});