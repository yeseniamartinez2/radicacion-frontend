import axios from "axios";

const baseURL = "http://localhost:9000/medidas/";


export default class MedidaService {

    getMedidas(token: string) {
        const config = {
            Authorization: `Bearer ${token}`
        }
        return axios.get(baseURL, {
            headers: config,
          });
    }

    getMedida(id, token) {
        const config = {
            Authorization: `Bearer ${token}`
        }
        return axios.get(baseURL + id, {
            headers: config,
          });
    }

    config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

    createMedida(body){
        return axios.post("http://localhost:9000/medidas", body, this.config);
    }

    deleteAutor(authId, medId, token){
        const config = {
            Authorization: `Bearer ${token}`
        }
        const url = baseURL + 'delete_authors/' + authId + '/' + medId;
        axios.get(url, {
            headers: config,
          })
    }

    postAutor(authId, medId, token){
        const config = {
            Authorization: `Bearer ${token}`
        }
        const url = baseURL + 'autor/' + authId + '/' + medId;
        axios.get(url, {
            headers: config
          })
    }

    putMedida(id, body){
        axios.put(baseURL + id,  body );
    }
  


}