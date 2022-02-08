
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
    estado: string,
    RepresentanteMedidas?: {
        MedidaId: number,
        RepresentanteId: number
    },
    createdAt: Date,
    updatedAt: Date,
    numeroAsignado

}

export interface Representante {
    apellido1?: string,
    apellido2?: string,
    createdAt?: Date,
    siglas_partido: string,
    id?: number,
    label: string,
    nombre?: string,
    updatedAt?: Date,
    Medidas?: Array<Medida>,
    value?: string
}

//Set number of rows in table according to screen size
export const numberOfRows = (width) => {
    if (width < 900) {
        return 13;
    }
    else {
        return 8;
    }
}


//Function for logging out
export function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

//Format Dates to user friendly string 
export const formatDate = (value) => {
    let date: string | Date = new Date(value);
    date = (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear());
    return date;
}

//Tipo value to label 

export const valueToLabel = (value) => {
    var result = tipo_medidas.filter(obj => {
        return obj.value === value
      });
      if (result.length > 0) {
        return result[0].label;
      }
      else {
        return null;
      }
}

export const estadoValueToLabel = (value) => {
    var result = estado_medidas.filter(obj => {
        return obj.value === value
      });
      if (result.length > 0) {
        return result[0].label;
      }
      else {
        return null;
      }
}