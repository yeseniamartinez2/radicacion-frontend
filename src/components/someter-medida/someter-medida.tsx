import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dropzone from 'react-dropzone';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {tipo_medidas, modal_style} from '../utils/utils';
import MedidaService from '../../services/Medida';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function SometerMedidaForm() {
    const ms = new MedidaService();
    const [valueTipoMedida, setTipoMedida] = React.useState<string>('');
    const [valueMedidaFile, setMedidaFile] = React.useState<Blob | string>('');
    const [valueFilename, setFilename] = React.useState<string>('');
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  const clearForm = () => {
    setMedidaFile(''); 
    setFilename('');  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('tipo', valueTipoMedida);
    formData.append('estado', 'sometida');
    formData.append('filename', valueFilename);
    formData.append('medidaFile', valueMedidaFile);

    if(valueMedidaFile === '' || valueTipoMedida === '' || typeof valueTipoMedida === "undefined" || valueTipoMedida === null){
      setError(true);
      setSuccess(false);
      
    }
    else if (valueMedidaFile && valueTipoMedida && valueFilename) {
      ms.createMedida(formData, accessToken).then((res) => {
        if(res.status === 200) {
          setSuccess(true);
          setError(false);
          clearForm();
      
        }
      }).catch((e) => {
        console.log(e);
        handleOpen();

      });
    }
  };

  
  return (
   <div><h2>Someter Medida</h2>
    <Card className="upload-medida-card">
      <form encType="multipart/form">
          <Autocomplete
            disablePortal
            size="small"
            options={tipo_medidas}
            getOptionLabel={(tipo) => tipo.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField  {...params} label="Tipo de Medida" />}
            onChange={(event,value) => {
              console.log(value?.value);
              if(value){
                setTipoMedida(value.value);
              }
            }}
          />
          <Dropzone onDrop={acceptedFiles => {
                console.log(acceptedFiles[0]);
                setFilename(acceptedFiles[0].name);
                setMedidaFile(acceptedFiles[0]);                
              }
            }
          >
            {({getRootProps, getInputProps}) => (
              <section>
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} type="file" name="medidaFile" id="medidaFile" />                
                    { valueMedidaFile ? 
                      <div className="file">
                        <p>{valueFilename}</p>
                        <IconButton 
                          className='delete-file' 
                          aria-label="delete" 
                          onClick={() => setMedidaFile('')}  
                          size="small">
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
            <Button variant="contained" type='submit' onClick={handleSubmit} color="primary" endIcon={<SaveIcon />}>
              Someter
            </Button>
          </div>
        
      </form>  
      

    </Card>
    { error ? 
      <Alert className="feedback-message" severity="error">Asegúrese de que la forma esté completada.</Alert> 
    : null }
    { success ? 
      <Alert className="feedback-message" severity= "success">La medida fue sometida exitosamente.</Alert> 
    : null }

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ha ocurrido un error en el sistema. Favor notificar a la oficina de Tecnología e Informática.  
          </Typography>
        </Box>
      </Modal>
    
    </div>


  );
}

export default SometerMedidaForm;