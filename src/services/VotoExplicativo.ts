import axios from "axios";

const baseURL = "http://localhost:9000/votos-explicativos/";


export default class VotoExplicativoService {

    getVotosExplicativos(token: string) {
        return axios.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          });
    }

    getVotoExplicativo(id, token) {
        return axios.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          });
    }

    createVotoExplicativo(body, token){
        const config = {     
            headers: { 
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
             }
        }
        return axios.post(baseURL , body, config);
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

    putVotoExplicativo(id, body, token){
        return axios.put(baseURL + id,  body, {
            headers: {
                Authorization: `Bearer ${token}`
            },
          } );
    }

    getVotoExplicativosByEmail(token,  email) {
        const config = {     
              headers: { 
                  Authorization: `Bearer ${token}`
               }
          }
          return axios.get(baseURL + "email/" + email, config);
      }
  


}