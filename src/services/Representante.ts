import axios from "axios";

const baseURL = "http://localhost:9000/representantes/";


export default class RepresentanteService {
    headers = {
        crossDomain: "true",
        Accept: "*/*",
       /* Authorization: `Bearer ${localStorage.token}`,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
        "Content-Type": "application/x-www-form-urlencoded",*/
      };
    getRepresentantes() {
        return axios.get(baseURL, {
            headers: this.headers,
          });
    }
}