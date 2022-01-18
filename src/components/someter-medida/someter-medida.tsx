import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dropzone from 'react-dropzone';
import Card from '@mui/material/Card';
//import LoadingButton from '@mui/lab/LoadingButton';
//import SaveIcon from '@mui/icons-material/Save';


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

          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
            //  const error = (data && data.message) || response.status;
              //return Promise.reject(error);
          }
      })
      .catch(error => { 
          console.error('There was an error!', error);
      });
}

function SometerMedidaForm() {
    
    const [valueTipoMedida, setValueTipoMedida] = React.useState<string|undefined>('');
    const [valueMedidaFile, setValueMedidaFile] = React.useState<Blob|File|undefined|null>(undefined);
    
    const tipo_medidas = [
      //'p_de_la_c', 'r_de_la_c', 'rc_de_la_c', 'r_conc_de_la_c', 'voto_explicativo', 'plan_de_reorganizacion'
        {
            "label": "P. de la C.",
            "value": "p_de_la_c"
        },
        {
            "label": "R. de la C.",
            "value": "r_de_la_c"
        },
        {
            "label": "R.C. de la C.",
            "value": "rc_de_la_c"
        },
        {
            "label": "R.Conc. de la C.",
            "value": "r_conc_de_la_c"
        },
        {
            "label": "Voto Explicativo",
            "value": "voto_explicativo"
        },
        {
            "label": "Plan de Reorganización",
            "value": "plan_de_reorganizacion"
        }
    ]

  
  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      'medidaFile': valueMedidaFile,
      'tipo': valueTipoMedida,
      'estado': 'sometida'
    }

    console.log(data);
    postMedida(data);
  };
  return (
    <Card className="upload-medida-card" variant="outlined">
      <form onSubmit={handleSubmit}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tipo_medidas}
            getOptionLabel={(tipo) => tipo.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Tipo de Medida" />}
            onChange={(event,value) => {
              console.log(value?.value);
              setValueTipoMedida(value?.value);}}
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
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        <button type="submit" className="btn btn-success" >ADD</button>
       {/*} <LoadingButton
            loading
            color="secondary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined">
            Save
            </LoadingButton> */}
      </form>       
    </Card>
  );
}

export default SometerMedidaForm;