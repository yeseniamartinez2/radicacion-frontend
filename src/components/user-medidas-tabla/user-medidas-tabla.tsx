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
    const [loading, setLoading] = React.useState(true);
    const [sortModel, setSortModel] = React.useState<GridSortModel>([
      {
        field: 'createdAt',
        sort: 'desc',
      },
    ]);

    const test = () => {
      var z = ['a'];
      var y = ['b'];
      console.log(z.concat(y));
    }

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
        align: 'center' },
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
        { field: 'numeroAsignado', headerName: 'Num.', width: 80, align: 'center' },
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
        align: 'center' },
        {
          field: 'filename',
          headerName: 'Archivo',
          sortable: false,
          renderCell: (params: GridValueGetterParams<string>) => { 
              const url = "http://localhost:9000/" + (params as GridValueGetterFullParams).value;
              return (<Button><a href={url} target="_blank">Ver</a></Button>);
               
          },
          width: 100,
        }
    ];  

    const getData = async (): Promise<Medida[]> => {
      let firstMedidas = [];
      let secondMedidas = [];
   
      await ms.getMedidasByEmail(accessToken, userEmail).then((res) =>{firstMedidas = res.data});
      await rs.getRepresentanteByEmail(accessToken, userEmail).then((res) => secondMedidas = res.data.Medidas);

      firstMedidas.concat(secondMedidas);

      return secondMedidas.concat(firstMedidas);

    }

        
    React.useEffect(() => {
        getData().then((res) => {
          setMedidas(res);
        })
        
          
     

        if(medidas) {
          setLoading(false);
        }
     
    }, [accessToken, userEmail, loading]);
  return (
    <div>
      { test() }
      <h2>Mis Medidas</h2>
      { loading ? 
        <p>Loading....</p> : 
        <Card className="user-table-card">
        <div style={{ height: 450, width: '100%' }}>    
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
        
        
      }
      
        
    
    </div>


  );
}