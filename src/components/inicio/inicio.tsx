
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Inicio() {
  return (
    <Card className="inicio">
      <CardContent>

        <Typography variant="h5" component="div">
          Bienvenido a la plataforma de radicación electrónica
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

        </Typography>
        <Typography variant="body2">
          Aquí podrá someter sus medidas y verificar el estado de estas.
          Para aclarar cualquier duda sobre cómo utilizar esta plataforma,
          favor ponerse en contacto con la oficina de Tecnología e Informática.
        </Typography>
      </CardContent>
    </Card>
  );
}
