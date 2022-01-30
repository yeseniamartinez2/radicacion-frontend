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


function SometerMedidaForm() {
    const ms = new MedidaService();
    const [valueTipoMedida, setTipoMedida] = React.useState<string>('');
    const [valueMedidaFile, setMedidaFile] = React.useState<Blob | string>('');
    const [valueFilename, setFilename] = React.useState<string>('');
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
  
  const handleClose = () => setError(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('tipo', valueTipoMedida);
    formData.append('estado', 'sometida');
    formData.append('filename', valueFilename);
    formData.append('medidaFile', valueMedidaFile);

    if(valueMedidaFile === '' || valueTipoMedida === ''){
      setError(true);
      
    }
    else {
      ms.createMedida(formData, accessToken).then((res) => {
        if(res.status === 200) {
          setSuccess(true);
        }
      });
    }
  };


  const clearForm = () => {
  //setMedidaFile('');
    //setTipoMedida(null);     
  }

  return (
   <div><h2>Radicar Medidas</h2>
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
    
    </div>

  );
}

export default SometerMedidaForm;