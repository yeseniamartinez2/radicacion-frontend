import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterFullParams, GridValueGetterParams, GridSortModel } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {tipo_medidas, estado_medidas, Medida} from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from "react-router-dom";
import MedidaService from '../../services/Medida';
import { useSelector } from 'react-redux'

export default function MedidasTable() {
    const ms = new MedidaService;
    const [medidas, setMedidas] = React.useState<Medida[]>([]);
    const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);

    const [sortModel, setSortModel] = React.useState<GridSortModel>([
      {
        field: 'createdAt',
        sort: 'desc',
      },
    ]);

    const columns: GridColDef[] = [
      { 
        field: 'id', 
        headerName: 'ID', 
        width: 30
      },
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
      { 
        field: 'titulo', 
        headerName: 'Título', 
        renderCell: (params: GridValueGetterParams<string>) => { 
          console.log((params as GridValueGetterFullParams).value);
          if((params as GridValueGetterFullParams).value === null){
            
            return (<p className="no_asignado">Título no asignado</p>);
          }
          else {
            return (<p>{(params as GridValueGetterFullParams).value}</p>)
          } ;
        },
        width: 160 },
      { 
        field: 'tipo', 
        headerName: 'Tipo',
        renderCell: (params: GridValueGetterParams<string>) => { 
          var result = tipo_medidas.filter(obj => {
            return obj.value === (params as GridValueGetterFullParams).value
          });
          if(result.length > 0) {
            return (<p>{result[0].label}</p>);
          }
          else{
            return null;
          }
            
        }, 
        width: 120 },
       {
        field: 'filename',
        headerName: 'Archivo',
        sortable: false,
        renderCell: (params: GridValueGetterParams<string>) => { 
            const url = "http://localhost:9000/" + (params as GridValueGetterFullParams).value;
            return (<Button><a href={url} target="_blank">Ver</a></Button>);
             
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
          if(result.length > 0) {
            return (<p>{result[0].label}</p>);
          }
          else{
            return null;
          }
        }, 
        width: 100 },
      { field: 'numeroAsignado', headerName: 'Num.', width: 80 },
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
        ms.getMedidas(accessToken).then((res) =>{setMedidas(res.data)})
    }, [accessToken]);
  return (
    <div>
      <h2>Verificar Medidas</h2>
 
        <Card className="table-card">
            <div style={{ height: 400, width: '100%' }}>    
            <DataGrid
                rows={medidas}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                rowHeight={35}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
            </div>
           
        </Card>
    
    </div>


  );
}