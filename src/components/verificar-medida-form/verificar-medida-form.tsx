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
import RepresentanteService from '../../services/Representante';
import MedidaService from '../../services/Medida';

function VerificarMedidaForm() {

    const rs = new RepresentanteService();
    const ms = new MedidaService();
    
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

  const handleSubmit = () => {
    console.log(valueInitialAuthors);
    var data = {
        'titulo': valueTitle,
        'tipo': valueTipoMedida,
        'numeroAsignado': valueNumero,
        'estado': 'sometida'
    }

  
      ms.putMedida(id, data);
      setModalMessage('Medida añadida correctamente.')
    
   

    valueInitialAuthors?.forEach((r) => {
        ms.deleteAutor(r.id, id);
    })

    valueAuthors?.forEach((r)=> {
        ms.postAutor(r.id, id);
    });

    setOpen(true);
  };

  const clearForm = () => {
    //setValueMedidaFile(null);
    //setValueTipoMedida(null);     
  }
  React.useEffect(() => {
    rs.getRepresentantes().then((res) =>{
      res.data.forEach(function (element) {
        element.label = element.nombre + " " + element.apellido1 + " " + element.apellido2;
      });
    setRepresentantes(res.data);     
    });   
    ms.getMedida(id).then((res) => {
      console.log(res);
      setTitle(res.data.titulo);
      setTipoMedida(res.data.tipo);
      var result = tipo_medidas.filter(obj => {
        return obj.value === res.data.tipo;
      });
      setValueLabel(result[0]);
      setInitialAuthors(res.data.Representantes);
      
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
            <Button variant="contained" onClick={handleSubmit} color="primary" endIcon={<SaveIcon />}>
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

export default VerificarMedidaForm;