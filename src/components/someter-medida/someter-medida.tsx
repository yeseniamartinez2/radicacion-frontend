import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dropzone from 'react-dropzone';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {tipo_medidas, modal_style} from '../utils/utils';

async function postMedida(data){
  const medidas_url = "http://localhost:9000/medidas";
  const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  fetch(medidas_url, postRequestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();             
      })
      .catch(error => { 
          console.error('There was an error!', error);
      });
}

function SometerMedidaForm() {
    
    const [valueTipoMedida, setValueTipoMedida] = React.useState<string|undefined|null>('');
    const [valueMedidaFile, setValueMedidaFile] = React.useState<File|undefined|null>(undefined);
    const [modalMessage, setModalMessage] = React.useState<string|null|void>('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

  const handleSubmit = () => {
  
    var data = {
      'medidaFile': valueMedidaFile,
      'tipo': valueTipoMedida,
      'estado': 'sometida'
    }

    if(data.medidaFile && data.tipo){
      postMedida(data);
      setModalMessage('Medida añadida correctamente.')
    }
    else {
      setModalMessage('Asegurese de que la forma está completada.')
    }

    setOpen(true);
  };

  const clearForm = () => {
    setValueMedidaFile(null);
    //setValueTipoMedida(null);     
  }

  return (
   <div><h2>Radicar Medidas</h2>
    <Card className="upload-medida-card">
      <form onSubmit={handleSubmit}>
          <Autocomplete
            disablePortal
            size="small"
            options={tipo_medidas}
            getOptionLabel={(tipo) => tipo.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField  {...params} label="Tipo de Medida" />}
            onChange={(event,value) => {
              console.log(value?.value);
              setValueTipoMedida(value?.value);
              }
            }
          />
          <Dropzone onDrop={acceptedFiles => {
                console.log(acceptedFiles[0]);
                setValueMedidaFile(acceptedFiles[0]);
              }
            }
          >
            {({getRootProps, getInputProps}) => (
              <section>
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />                
                    { valueMedidaFile ? 
                      <div className="file">
                        <p>{valueMedidaFile.name}</p>
                        <IconButton className='delete-file' aria-label="delete" onClick={() => setValueMedidaFile(null)}  size="small">
                          <ClearIcon fontSize="small"/>
                        </IconButton>
                      </div>
                      :   
                      <p>Drag and drop some files here, or click to select files</p>
                    }
                </div>
              </section>
            )}
          </Dropzone>
          <div className='form_options'>
            <Button variant="contained" type="submit" color="primary" endIcon={<SaveIcon />}>
              Guardar
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

export default SometerMedidaForm;