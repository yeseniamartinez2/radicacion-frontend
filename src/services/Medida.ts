import axios from "axios";

const baseURL = "http://localhost:9000/medidas/";


export default class MedidaService {

    getMedidas(token: string) {
        return axios.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          });
    }

    getMedida(id, token) {
        return axios.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          });
    }

    

    createMedida(body, token){
        const config = {     
            headers: { 
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
             }
        }
        return axios.post("http://localhost:9000/medidas", body, config);
    }

    deleteAutor(authId, medId, token){
        const url = baseURL + 'delete_authors/' + authId + '/' + medId;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          })
    }

    postAutor(authId, medId, token){
        const url = baseURL + 'autor/' + authId + '/' + medId;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          })
    }

    putMedida(id, body, token){
        axios.put(baseURL + id,  body, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          } );
    }
  


}