import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dropzone from 'react-dropzone';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { tipo_medidas, modal_style, Medida, valueToLabel } from '../utils/utils';
import MedidaService from '../../services/Medida';
import VotoExplicativoService from '../../services/VotoExplicativo';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function SometerVotoExplicativo() {
  const ms = new MedidaService();
  const ves = new VotoExplicativoService();
  const [valueFile, setFile] = React.useState<Array<Blob>>([]);
  const [valueFilename, setFilename] = React.useState<Array<string>>([]);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
  const sometidaPor: string = useSelector((state: any) => state.userData.email);
  const [open, setOpen] = React.useState(false);
  const [medidasRadicadas, setMedidasRadicadas] = React.useState<Medida[]>([]);
  const [valueMedidaId, setMedidaId] = React.useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clearForm = () => {
    setFile([]);
    setFilename([]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();


    if (valueFile.length === 0) {
      setError(true);
      setSuccess(false);

    }
    else if (valueFile && valueFilename) {

      let formData = new FormData();
      console.log(valueMedidaId);
      formData.append('estado', 'sometido');
      valueFile.forEach((file, i) => {
        formData.append('votoExplicativoFile', file)
        formData.append('filename', valueFilename[i]);
        console.log(valueFilename[i]);
      })
      formData.append('sometidaPor', sometidaPor);
      formData.append('MedidaId', valueMedidaId);
      console.log(formData);
      ves.createVotoExplicativo(formData, accessToken).then((res) => {

        if (res.status === 200) {
          setSuccess(true);
          setError(false);
          console.log(formData);
          clearForm();

        }
      }).catch((e) => {
        console.log(e);
        handleOpen();

      });
    }
  };

  React.useEffect(() => {
    ms.getMedidasRadicadas(accessToken).then((res) => 
    {
      setMedidasRadicadas(res.data)
    });
  }, [accessToken]);


  return (
    <div><h2>Someter Voto Explicativo</h2>
      <Card className="upload-medida-card">
        <form encType="multipart/form">
          <Autocomplete
            disablePortal
            size="small"
            options={medidasRadicadas}
            getOptionLabel={(m) => valueToLabel(m.tipo) + " " + m.numeroAsignado}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField  {...params} label="Medida" />}
            onChange={(event, value) => {
              if (value) {
                setMedidaId(value.id.toString());
              }
            }}
          />
          <Dropzone onDrop={acceptedFiles => {
            console.log(acceptedFiles);
            setFile(acceptedFiles);
            setFilename([acceptedFiles[0].name]);
          }
          }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} type="file" name="votoExplicativoFile" id="votoExplicativoFile" />
                  {(valueFile.length > 0) ?
                    <div className="file">
                      <p>{valueFilename}</p>
                      <IconButton
                        className='delete-file'
                        aria-label="delete"
                        onClick={() => setFile([])}
                        size="small">
                        <ClearIcon fontSize="small" />
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
      {error ?
        <Alert className="feedback-message" severity="error">Asegúrese de que la forma esté completada.</Alert>
        : null}
      {success ?
        <Alert className="feedback-message" severity="success">El voto explicativo fue sometido exitosamente.</Alert>
        : null}

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

export default SometerVotoExplicativo;