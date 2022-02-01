import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterFullParams, GridValueGetterParams, GridSortModel } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {tipo_medidas, estado_medidas, Medida} from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from "react-router-dom";
import MedidaService from '../../services/Medida';
import { useSelector } from 'react-redux'
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function MedidasTable() {
    const ms = new MedidaService;
    const [medidas, setMedidas] = React.useState<Medida[]>([]);
    const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
    
    const setEnEvaluacion = (row) => {
      var data = {
        'estado': 'en_evaluacion'
      }

      if(row.estado === "sometida"){

        ms.putMedida(row.id, data, accessToken);
      }
      
    }
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
        width: 30,
        align: 'center'
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
        width: 100,
        align: 'center',
        disableColumnMenu: true },
      { 
        field: 'titulo', 
        headerName: 'Título', 
        renderCell: (params: GridValueGetterParams<string>) => { 
          if((params as GridValueGetterFullParams).value === null){
            
            return (<p className="no_asignado">No asignado</p>);
          }
          else {
            return (<Tooltip title={(params as GridValueGetterFullParams).value}><p>{(params as GridValueGetterFullParams).value}</p></Tooltip>)
          } ;
        },
        width: 160,
        disableColumnMenu: true },
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
        width: 120,
        align: 'left',
        disableColumnMenu: true },
        { 
          field: 'numeroAsignado', 
          headerName: 'Num.', 
          width: 80, 
          align: 'center',
          renderCell: (params: GridValueGetterParams<string>) => { 
            if((params as GridValueGetterFullParams).value === null){
              
              return (<p className="no_asignado">N/A</p>);
            }
            else {
              return (<Tooltip title={(params as GridValueGetterFullParams).value}><p>{(params as GridValueGetterFullParams).value}</p></Tooltip>)
            } ;
          },
          disableColumnMenu: true 
        },
      { 
        field: 'Representantes', 
        headerName: 'Autor/es', 
        renderCell: (params: GridValueGetterParams<string>) => {
          if((params as GridValueGetterFullParams).value.length === 0){
            return (<p className="no_asignado">No asignados</p>);
          } 
          
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
        width: 160,
        disableColumnMenu: true },
      { 
        field: 'estado', 
        headerName: 'Estado', 
        renderCell: (params: GridValueGetterParams<string>) => { 
          var result = estado_medidas.filter(obj => {
            return obj.value === (params as GridValueGetterFullParams).value
          });
          if(result.length > 0) {
            return (<p className={(params as GridValueGetterFullParams).value}>{result[0].label}</p>);
          }
          else{
            return null;
          }
        }, 
        width: 100,
        align: 'center',
        disableColumnMenu: true },
        {
          field: 'filename',
          headerName: 'Archivo',
          sortable: false,
          renderCell: (params: GridValueGetterParams<string>) => { 
              const url = "http://localhost:9000/" + (params as GridValueGetterFullParams).value;
              return (<a href={url} target="_blank" className='download_icon'><DownloadIcon onClick={() => setEnEvaluacion((params as GridValueGetterFullParams).row)} /></a>);
               
          },
          width: 100,
          align: 'center',
          disableColumnMenu: true
        },
      {
        field: 'options',
        headerName: '',
        sortable: false,
        renderCell: (params: GridValueGetterParams<string>) => { 
            return (
              <NavLink to={"/verificacion/" + params.row.id }>
                {!(params.row.estado==="radicada") ?
                  <Button onClick={() => setEnEvaluacion((params as GridValueGetterFullParams).row)}>Radicar </Button>
                  :
                  <BorderColorIcon fontSize='small' className='edit_icon' />
                }
                
              </NavLink>
            );
        },
        width: 100,
        align: 'center',
        disableColumnMenu: true
      }
    ];

    React.useEffect(() => {
        ms.getMedidas(accessToken).then((res) =>{setMedidas(res.data)})
    }, [accessToken]);
  return (
    <div>
      <h2>Verificar Medidas</h2>
      {console.log(medidas)}
        <Card className="table-card">
            <div style={{ height: 400, width: '100%' }}>    
            <DataGrid
                rows={medidas}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                rowHeight={35}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
            </div>
           
        </Card>
    
    </div>


  );
}