import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {tipo_medidas, modal_style, Representante, Medida} from '../utils/utils';
import { useParams } from 'react-router-dom';

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
      })
      .catch(error => { 
          console.error('There was an error!', error);
      });
}

async function postAutor(authId, medId){
    const medidas_url = "http://localhost:9000/medidas/autor/" + authId + "/" +medId;
    await fetch(medidas_url);
  }

async function deleteAutor(authId, medId){
    const medidas_url = "http://localhost:9000/medidas/delete_authors/"+ authId + "/" + medId;
    console.log('deleting:' + medidas_url);
    await fetch(medidas_url);
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

function VerificarMedidaForm() {
    
    const [valueTipoMedida, setTipoMedida] = React.useState<string|undefined|null>('');  
    const [representantes, setRepresentantes] = React.useState<Representante[]>([]);
    const [valueLabel, setValueLabel] = React.useState<any>(undefined);
    const id = useParams().id;
    const [valueTitle, setTitle] = React.useState<string>('');
    const [valueNumero, setNumero] = React.useState<number|undefined>(undefined);
    const [valueAuthors, setAuthors] = React.useState<Array<Representante>|null|undefined>([]);
    const [valueInitialAuthors, setInitialAuthors] = React.useState<Array<Representante>|null|undefined>([]);
    const [modalMessage, setModalMessage] = React.useState<string|null|void>('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const onTextChange = (e: any) => {
        setTitle(e.target.value)
      };

    const onNumberChange = (e: any) => {
        setNumero(e.target.value)
    };

    const test = () => {
        console.log(valueInitialAuthors);
        deleteAutor(1, 1);
    }

  const handleSubmit = () => {
    console.log(valueInitialAuthors);
    var data = {
        'titulo': valueTitle,
        'tipo': valueTipoMedida,
        'numeroAsignado': valueNumero,
        'estado': 'sometida'
    }

    if(data.tipo && data.titulo){
      putMedida(id, data);
      setModalMessage('Medida añadida correctamente.')
    }
    else {
      setModalMessage('Asegurese de que la forma está completada.')
    }

    valueInitialAuthors?.forEach((r) => {
        deleteAutor(r.id, id);
    })

    valueAuthors?.forEach((r)=> {
        postAutor(r.id, id);
    });

    setOpen(true);
  };

  const clearForm = () => {
    //setValueMedidaFile(null);
    //setValueTipoMedida(null);     
  }
  React.useEffect(() => {
    getRepresentantesData().then((data) =>{
      data.forEach(function (element) {
        element.label = element.nombre + " " + element.apellido1 + " " + element.apellido2;
      });
    setRepresentantes(data);     
    });   
    getMedida(id).then((data) => {
      setTitle(data.titulo);
      setTipoMedida(data.tipo);
      var result = tipo_medidas.filter(obj => {
        return obj.value === data.tipo;
      });
      setValueLabel(result[0]);
      setInitialAuthors(data.Representantes);
      
      
    }) 
}, []);


  return (
   <div><h2>Radicar Medidas</h2>
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
            disablePortal
            size="small"
            options={tipo_medidas}
            getOptionLabel={(tipo) => tipo.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField  {...params} label="Tipo de Medida" />}
            onChange={(event,value) => {
              setTipoMedida(value?.value);
              }
            }
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

                <TextField 
                  id="outlined-basic" 
                  label="Número Asignado" 
                  variant="outlined" 
                  size="small" 
                 // value={valueNumero}
                  onChange={onNumberChange}
        
                />
          
          <div className='form_options'>
            <Button variant="contained" type="submit" color="primary" endIcon={<SaveIcon />}>
              Guardar
            </Button>
            <Button variant="contained" onClick={test}>
              test
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

export default VerificarMedidaForm;