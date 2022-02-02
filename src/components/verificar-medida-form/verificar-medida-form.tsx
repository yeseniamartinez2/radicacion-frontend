import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { tipo_medidas, modal_style, Representante, Medida } from '../utils/utils';
import { useParams } from 'react-router-dom';
import RepresentanteService from '../../services/Representante';
import MedidaService from '../../services/Medida';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
function VerificarMedidaForm() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const rs = new RepresentanteService();
  const ms = new MedidaService();
  const [valueTipoMedida, setTipoMedida] = React.useState<string | undefined | null>('');
  const [tipoMedidaObj, setTipoMedidaObj] = React.useState<{ label: string; value: string; } | null | undefined>(null);
  const [representantes, setRepresentantes] = React.useState<Representante[]>([]);
  const [medidaURL, setMedidaUrl] = React.useState<string>('');
  const id = useParams().id;
  const [valueTitle, setTitle] = React.useState<string>('');
  const [valueNumero, setNumero] = React.useState<number | undefined>(undefined);
  const [valueAuthors, setAuthors] = React.useState<Array<Representante>>([]);
  const [valueInitialAuthors, setInitialAuthors] = React.useState<Array<Representante> | null | undefined>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenDialog(true);
  const handleCloseModal = () => setOpenDialog(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDialog(false);
  };

  const handleCloseAndPut = (event: React.SyntheticEvent | Event, reason?: string) => {
    var data = {
      'titulo': valueTitle,
      'tipo': valueTipoMedida,
      'numeroAsignado': valueNumero,
      'estado': 'radicada'
    }

    setOpenDialog(false);
    if (valueTitle && valueTipoMedida && valueNumero && valueAuthors?.length > 0) {
      ms.putMedida(id, data, accessToken).then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setError(false);
          valueInitialAuthors?.forEach((r) => {
            ms.deleteAutor(r.id, id, null);
          })

          valueAuthors?.forEach((r) => {
            ms.postAutor(r.id, id, null);
          });
        }
      }).catch((e) => {
        console.log(e);
        handleOpenModal();

      });
    }
    else {
      setSuccess(false);
      setError(true);
    }


  };


  const onTextChange = (e: any) => {
    setTitle(e.target.value)
  };

  const onNumberChange = (e: any) => {
    setNumero(e.target.value)
  };

  const handleSubmit = () => {
    handleClickOpenDialog();
  };

  const clearForm = () => {
    //setValueMedidaFile(null);
    //setValueTipoMedida(null);     
  }
  React.useEffect(() => {
    rs.getRepresentantes(accessToken).then((res) => {
      let data: Representante[] = [];
      data.push({ label: "Delegación PPD", siglas_partido: "PPD", value: "delegacion" });
      data.push({ label: "Delegación PNP", siglas_partido: "PNP", value: "delegacion" });
      data.push({ label: "Delegación PIP", siglas_partido: "PIP", value: "delegacion" });
      data.push({ label: "Delegación MVC", siglas_partido: "MVC", value: "delegacion" });
      data.push({ label: "Delegación PD", siglas_partido: "PD", value: "delegacion" });
      data.push({ label: "Todos los Representantes", siglas_partido: "Todos", value: "delegacion" });
      res.data.forEach(function (element) {
        element.label = element.nombre + " " + element.apellido1 + " " + element.apellido2;
      });
      let rep_data = res.data;
      ;
      setRepresentantes(rep_data.concat(data));

    });
    ms.getMedida(id, accessToken).then((res) => {
      console.log(res);
      setTitle(res.data.titulo);
      setTipoMedida(res.data.tipo);
      setNumero(res.data.numeroAsignado);
      var result = tipo_medidas.filter(obj => {
        return obj.value === res.data.tipo;
      });
      setTipoMedidaObj(result[0]);
      setInitialAuthors(res.data.Representantes);
      setMedidaUrl("http://localhost:9000/" + res.data.filename);

    })
  }, [accessToken]);


  return (
    <div className="verificar-medida-form">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/verificacion">
          Verificar Medidas
        </Link>
        <Typography color="text.primary">Radicar</Typography>
      </Breadcrumbs>

      <div>
        <h3>Radicar Medida: {id}</h3>
        <Card className="upload-medida-card">
          <form onSubmit={handleSubmit}>
            <a href={medidaURL} target="_blank"><Button variant="outlined">Abrir Archivo</Button></a>
            <TextField
              id="outlined-basic"
              label="Título"
              variant="outlined"
              size="small"
              value={valueTitle}
              onChange={onTextChange}

            />
            <Autocomplete
              disablePortal
              size="small"
              options={tipo_medidas}
              value={tipoMedidaObj}
              getOptionLabel={(tipo) => tipo.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => <TextField  {...params} label="Tipo de Medida" />}
              onChange={(event, value) => {
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
              onChange={(event, value) => {
                setAuthors(value);
              }
              }
            />

            <TextField
              id="outlined-basic"
              label="Número Asignado"
              variant="outlined"
              size="small"
              type="number"
              value={valueNumero}
              onChange={onNumberChange}
              InputLabelProps={{
                shrink: true,
              }}

            />

            <div className='form_options'>
              <Button variant="contained" onClick={() => {
                handleSubmit();

              }} color="primary" endIcon={<SaveIcon />}>
                Guardar
              </Button>
            </div>

          </form>


        </Card>

        {error ?
          <Alert className="feedback-message" severity="error">Asegúrese de que la forma esté completada.</Alert>
          : null}
        {success ?
          <Alert className="feedback-message" severity="success">La medida fue sometida exitosamente.</Alert>
          : null}

        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Radicar medidas es irreversible."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirma que quieres continuar con esta acción.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button onClick={handleCloseAndPut} autoFocus>
              Continuar
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
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
    </div>

  );
}

export default VerificarMedidaForm;