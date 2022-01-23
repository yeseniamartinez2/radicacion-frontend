import * as React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import {tipo_medidas, modal_style, Medida, Representante} from '../utils/utils';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

async function putMedida(id, data){
    const medidas_url = "http://localhost:9000/medidas/" + id;
    const putRequestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(medidas_url, putRequestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log(response);             
        })
        .catch(error => { 
            console.error('There was an error!', error);
        });
  
}

async function getMedida(id){
  const medidas_url = "http://localhost:9000/medidas/" + id;
  const data = await fetch(medidas_url);
  const medidas = await data.json();
  return medidas;
}  

async function getRepresentantesData(){
    const representantes_url = "http://localhost:9000/representantes";
    const data = await fetch(representantes_url);
    const representantes = await data.json();
    return representantes;
  }  

const MedidaForm: React.FC = () => {
    const [representantes, setRepresentantes] = React.useState<Representante[]>([]);
    const [valueTipoMedida, setTipoMedida] = React.useState<string|undefined|null>('');
    const [valueLabel, setValueLabel] = React.useState<any>(undefined);
    
    const [valueTitle, setTitle] = React.useState<string>('');
    const [valueNumero, setNumero] = React.useState<number|undefined>(undefined);
    const [valueAuthors, setAuthors] = React.useState<Array<Representante>|null|undefined>([]);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [modalMessage, setModalMessage] = React.useState<string|null|void>('');
    
    const onTextChange = (e: any) => {
      console.log(e.target.value);
      setTitle(e.target.value)
    };

    const onNumberChange = (e: any) => {
      console.log(e.target.value);
      setNumero(e.target.value)
    };

    const id = useParams().id;
        console.log(typeof id);
  
    const handleSubmit = () => {  
      var tipoMedida = tipo_medidas.filter(obj => {
        return obj.value === valueTipoMedida
      });
 
      var data = {
        'titulo': valueTitle,
        'tipo': valueTipoMedida,
        'estado': 'radicada'
        //'numeroAsignado': valueNumero
      }
      if(data.titulo && data.tipo){
        putMedida(id, data);
        console.log(data);
        console.log(id);
      }
      
      
    };
 

    React.useEffect(() => {
        getRepresentantesData().then((data) =>{
          data.forEach(function (element) {
            element.label = element.nombre + " " + element.apellido1 + " " + element.apellido2;
          });
        setRepresentantes(data);     
        });   
        getMedida(id).then((data) => {
          console.log(data);
          setTitle(data.titulo);
          setTipoMedida(data.tipo);
          var result = tipo_medidas.filter(obj => {
            return obj.value === data.tipo;
          });
          setValueLabel(result[0]);
        }) 
    }, []);
    const navigate = useNavigate();
  return (  
    <div>
      <IconButton aria-label="delete" size="large">
        <ArrowBack onClick={() => navigate(-1)} fontSize="inherit" />
      </IconButton>
      <h3>Verificar Medida</h3>
      <Card className="upload-medida-card">
              <form onSubmit={handleSubmit}>
              <TextField 
                id="outlined-basic" 
                label="Título" 
                variant="outlined" 
                size="small" 
                //value={valueTitle}
                onChange={onTextChange}
      
              />
                <Autocomplete
                  size="small"
                  multiple
                  id="tags-outlined"
                  options={representantes}
                  getOptionLabel={(r) => r.label}
                  groupBy={(option) => option.siglas_partido}
                  defaultValue={[]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Autor/es"
                      placeholder="Autores"
                    />
                  )}
                  onChange={(event,value) => {
                    setAuthors(value);
                    }
                  }
                />
                <Autocomplete
                  disablePortal
                  size="small"
                  options={tipo_medidas}
                 // value={valueLabel}
                  getOptionLabel={(tipo) => tipo.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => <TextField  {...params}  label="Tipo de Medida" />}
                  onChange={(event,value) => {
                    setTipoMedida(value?.value);
                    setValueLabel(value);
                  }}
                />
                <TextField 
                  id="outlined-basic" 
                  label="Número Asignado" 
                  variant="outlined" 
                  size="small" 
                 // value={valueNumero}
                  onChange={onNumberChange}
        
                />
                <div className='form_options'>
                  <Button variant="contained" type="submit" color="primary" onClick={handleSubmit} endIcon={<CheckIcon />}>
                    Validar
                  </Button>
                </div>
          
        </form>  
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_style}>
            {modalMessage ? modalMessage : null}
          </Box>
        </Modal>

      </Card>
    </div> 
        
         
      
  );
}

export default MedidaForm;