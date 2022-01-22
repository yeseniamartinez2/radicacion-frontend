export const tipo_medidas = [
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

export const estado_medidas = [
    {
        "label": "Sometida",
        "value": "sometida"
    },
    {
        "label": "En evaluación",
        "value": 'en_evaluacion'
    },
    {
        "label": "Radicada",
        "value": "radicada"
    }
]

export const modal_style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    p: 4
  };

export interface Medida {
    id: number,
    titulo: string,
    tipo: string,
    medidaFile: any,
    Representantes: any,
    estado: string

}

export interface Representante {
  apellido1: string,
  apellido2: string,
  createdAt: Date,
  siglas_partido: string,
  id: number,
  label: string,
  nombre: string,
  updatedAt: Date  
}