import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterFullParams, GridValueGetterParams } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {tipo_medidas, estado_medidas, Medida} from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from "react-router-dom";

async function getMedidasData(){
    const medidas_url = "http://localhost:9000/medidas";
    const data = await fetch(medidas_url);
    const medidas = await data.json();
    console.log(medidas);
    return medidas;
  }

export default function MedidasTable() {
    const [medidas, setMedidas] = React.useState<Medida[]>([]);
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 30 },
      { 
        field: 'createdAt', 
        headerName: 'Fecha', 
        renderCell: (params: GridValueGetterParams<Date>) => { 
          if((params as GridValueGetterFullParams).value){
            let date: string | Date = new Date((params as GridValueGetterFullParams).value);
            date = (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear());
            return (<p>{date}</p>);
          }
          else return null;
             
      },
        width: 100 },
      { field: 'titulo', headerName: 'Título', width: 160 },
      { 
        field: 'tipo', 
        headerName: 'Tipo',
        renderCell: (params: GridValueGetterParams<string>) => { 
          var result = tipo_medidas.filter(obj => {
            return obj.value === (params as GridValueGetterFullParams).value
          });
            return (<p>{result[0].label}</p>);
        }, 
        width: 120 },
      {
        field: 'medidaFile',
        headerName: 'Archivo',
        sortable: false,
        renderCell: (params: GridValueGetterParams<string>) => { 
            if((params as GridValueGetterFullParams).value){
                return (<Button>Download</Button>);
            }
            else return null;  
        },
        width: 100,
      },
      { 
        field: 'Representantes', 
        headerName: 'Autor/es', 
        renderCell: (params: GridValueGetterParams<string>) => { 
          let authors = '';
          (params as GridValueGetterFullParams).value.forEach((a) => {
            let autor = (a.nombre+" "+ a.apellido1+ " " +a.apellido2);
            console.log(autor);
            authors = authors + autor + ", ";
          })
          
          return (
            <Tooltip title={authors}><p>{authors}</p></Tooltip>); 
        },
        width: 160 },
      { 
        field: 'estado', 
        headerName: 'Estado', 
        renderCell: (params: GridValueGetterParams<string>) => { 
          var result = estado_medidas.filter(obj => {
            return obj.value === (params as GridValueGetterFullParams).value
          });
            return (<p>{result[0].label}</p>);
        }, 
        width: 100 },
      {
        field: 'options',
        headerName: '',
        sortable: false,
        renderCell: (params: GridValueGetterParams<string>) => { 
            return (
              <NavLink to={"/verificacion/" + params.row.id }>
                <Button>Verificar </Button>
              </NavLink>
            );
        },
        width: 100,
      }
    ];

    React.useEffect(() => {
        getMedidasData().then((data) =>{
            setMedidas(data);                     
      });
       
    }, []);
  return (
    <div>
      <h2>Validar Medidas</h2>
 
        <Card className="table-card">
            <div style={{ height: 400, width: '100%' }}>    
            <DataGrid
                rows={medidas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            </div>
           
        </Card>
    
    </div>


  );
}