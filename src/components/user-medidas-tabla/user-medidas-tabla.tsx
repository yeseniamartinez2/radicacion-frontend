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

  const getData = async (): Promise<Medida[]> => {
    let firstMedidas = [];
    let secondMedidas = [];

    await ms.getMedidasByEmail(accessToken, userEmail).then((res) => { firstMedidas = res.data });
    await rs.getRepresentanteByEmail(accessToken, userEmail).then((res) => secondMedidas = res.data.Medidas);
    firstMedidas.concat(secondMedidas);
    return secondMedidas.concat(firstMedidas);
  }

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
    getData().then((res) => {
      res.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.id - a.id
      });
      setMedidas(res);
    })
    if (medidas) {
      setLoading(false);
    }

  }, [accessToken, userEmail, loading, medidas]);
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