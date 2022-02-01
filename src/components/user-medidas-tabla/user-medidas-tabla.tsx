import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterFullParams, GridValueGetterParams, GridSortModel } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {tipo_medidas, estado_medidas, Representante, Medida} from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from "react-router-dom";
import MedidaService from '../../services/Medida';
import RepresentanteService from '../../services/Representante';
import { useSelector } from 'react-redux'

export default function UserMedidasTable() {
    const ms = new MedidaService;
    const rs = new RepresentanteService;
    const [representante, setRepresentante] = React.useState<Representante>();
    const [medidas, setMedidas] = React.useState<Medida[]>([]);
    const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
    const userEmail: string = useSelector((state: any) => state.userData.email);

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
          if((params as GridValueGetterFullParams).value === null){
            
            return (<p className="no_asignado">Título no asignado</p>);
          }
          else {
            return (<Tooltip title={(params as GridValueGetterFullParams).value}><p>{(params as GridValueGetterFullParams).value}</p></Tooltip>)
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
        { field: 'numeroAsignado', headerName: 'Num.', width: 80 },
      { 
        field: 'Representantes', 
        headerName: 'Autor/es', 
        renderCell: (params: GridValueGetterParams<string>) => { 
          let authors = '';
          (params as GridValueGetterFullParams).value.forEach((a, i) => {
            let autor = (a.nombre+" "+ a.apellido1+ " " +a.apellido2);
            if((i + 1) === (params as GridValueGetterFullParams).value.length){
              authors = authors + autor;
            }
            else {
              authors = authors + autor + ", ";
            }
            
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
      
        //ms.getMedidas(accessToken).then((res) =>{setMedidas(res.data)})
        rs.getRepresentanteByEmail(accessToken, userEmail).then((res) => {setMedidas(res.data.Medidas)});
       

     
    }, [accessToken, userEmail]);
  return (
    <div>
      { [].forEach(console.log)}
      <h2>Mis Medidas</h2>
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