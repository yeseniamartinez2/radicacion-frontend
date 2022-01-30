import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import {tipo_medidas, modal_style, Representante, Medida} from '../utils/utils';
import { useParams,  useNavigate } from 'react-router-dom';
import RepresentanteService from '../../services/Representante';
import MedidaService from '../../services/Medida';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux'


function VerificarMedidaForm() {

    const rs = new RepresentanteService();
    const ms = new MedidaService();
    const navigate = useNavigate();
    const [valueTipoMedida, setTipoMedida] = React.useState<string|undefined|null>('');  
    const [tipoMedidaObj, setTipoMedidaObj] = React.useState<{ label: string; value: string; } | null | undefined>(null);
    const [representantes, setRepresentantes] = React.useState<Representante[]>([]);
    const id = useParams().id;
    const [valueTitle, setTitle] = React.useState<string>('');
    const [valueNumero, setNumero] = React.useState<number|undefined>(undefined);
    const [valueAuthors, setAuthors] = React.useState<Array<Representante>|null|undefined>([]);
    const [valueInitialAuthors, setInitialAuthors] = React.useState<Array<Representante>|null|undefined>([]);
    const [modalMessage, setModalMessage] = React.useState<string|null|void>('');
    const [open, setOpen] = React.useState(false);
    const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

    const onTextChange = (e: any) => {
        setTitle(e.target.value)
      };

    const onNumberChange = (e: any) => {
        setNumero(e.target.value)
    };

  const handleSubmit = () => {
    console.log(valueInitialAuthors);
    var data = {
        'titulo': valueTitle,
        'tipo': valueTipoMedida,
        'numeroAsignado': valueNumero,
        'estado': 'sometida'
    }

  
      ms.putMedida(id, data, accessToken);
      setModalMessage('Medida añadida correctamente.')
    
   

    valueInitialAuthors?.forEach((r) => {
        ms.deleteAutor(r.id, id, null);
    })

    valueAuthors?.forEach((r)=> {
        ms.postAutor(r.id, id, null);
    });

    setOpen(true);
  };

  const clearForm = () => {
    //setValueMedidaFile(null);
    //setValueTipoMedida(null);     
  }
  React.useEffect(() => {
    rs.getRepresentantes(accessToken).then((res) =>{
      res.data.forEach(function (element) {
        element.label = element.nombre + " " + element.apellido1 + " " + element.apellido2;
      });
    setRepresentantes(res.data);     
    });   
    ms.getMedida(id, accessToken).then((res) => {
      console.log(res);
      setTitle(res.data.titulo);
      setTipoMedida(res.data.tipo);
      var result = tipo_medidas.filter(obj => {
        return obj.value === res.data.tipo;
      });
      setTipoMedidaObj(result[0]);
      setInitialAuthors(res.data.Representantes);
      
    }) 
}, [accessToken]);


  return (
   <div className="verificar-medida-form">
      <IconButton className="back-button" aria-label="back" size="large">
        <NavLink to="/verificacion"><ArrowBackIcon /></NavLink>
      </IconButton>
    <div>
    <h3>Verificar Medida: {id}</h3>
    <Card className="upload-medida-card">
      <form onSubmit={handleSubmit}>
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
            <Button variant="contained" onClick={() => {
              handleSubmit();
              navigate("/verificacion");
            }} color="primary" endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </div>
        
      </form>  
     

    </Card>

    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>  
    </div>

  );
}

export default VerificarMedidaForm;