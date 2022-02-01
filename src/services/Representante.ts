import axios from "axios";

const baseURL = "http://localhost:9000/representantes/";


export default class RepresentanteService {
    
    getRepresentantes(token) {
      const config = {
        Authorization: `Bearer ${token}`
    }
        return axios.get(baseURL, {
            headers: config
          });
    }

    getRepresentanteByEmail(token,  email) {
      const config = {     
            headers: { 
                Authorization: `Bearer ${token}`
             }
        }
        return axios.get(baseURL + "email/" + email, config);
    }
}