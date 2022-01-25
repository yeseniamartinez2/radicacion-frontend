import axios from "axios";

const baseURL = "http://localhost:9000/medidas/";


export default class MedidaService {
    headers = {
        crossDomain: "true",
        Accept: "*/*",
       /* Authorization: `Bearer ${localStorage.token}`,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
        "Content-Type": "application/x-www-form-urlencoded",*/
      };
    getMedidas() {
        return axios.get(baseURL, {
            headers: this.headers,
          });
    }

    getMedida(id) {
        return axios.get(baseURL + id, {
            headers: this.headers,
          });
    }

    createMedida(body){
        axios.post(baseURL, body);
    }

    deleteAutor(authId, medId){
        const url = baseURL + 'delete_authors/' + authId + '/' + medId;
        axios.get(url, {
            headers: this.headers,
          })
    }

    postAutor(authId, medId){
        const url = baseURL + 'autor/' + authId + '/' + medId;
        axios.get(url, {
            headers: this.headers,
          })
    }

    putMedida(id, body){
        axios.put(baseURL + id,  body );
    }
  


}