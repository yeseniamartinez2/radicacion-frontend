import * as React from 'react';
import Card from '@mui/material/Card';
import { estadoValueToLabel, Medida, formatDate, valueToLabel } from '../utils/utils';

import MedidaService from '../../services/Medida';
import RepresentanteService from '../../services/Representante';
import { useSelector } from 'react-redux'

export default function UserMedidasTable() {
  const ms = new MedidaService;
  const rs = new RepresentanteService;

  const [medidas, setMedidas] = React.useState<Medida[]>([]);
  const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
  const userEmail: string = useSelector((state: any) => state.userData.email);
  const [loading, setLoading] = React.useState(true);

 
  const medidasCards = medidas.map(function (m, i) {
    return (<Card className="medida-card">
      <h4 className='card-medida-id'>Medida: {m.id}</h4>
      <p className={m.estado}>{estadoValueToLabel(m.estado)}</p>
      <p className='date'><span className='date-label'>Sometida:</span> {formatDate((m.createdAt))}</p>

      {
        (m.estado === 'radicada') ?
          <p className='number'><span className='tipo-label'>{valueToLabel(m.tipo)}</span>{m?.numeroAsignado}</p>
          :
          null

      }
    </Card>);
  })

  React.useEffect(() => {
   
      ms.getMedidasByEmail(accessToken, userEmail).then((res) => { 
        let medidas = res.data;
        medidas.sort(function(a,b){
          return b.id - a.id
        });
        const last4 = medidas.slice(0, 4);
        setMedidas(last4);
       });
     
   
    if (medidas) {
      setLoading(false);
    }

  }, [accessToken]);
  return (
    <div>
      <h2>Mis Medidas</h2>
      {loading ?
        <p>Loading....</p> :
        <div className="tabla-medidas">
          {medidasCards}
        </div>

      }
    </div>
  );
}