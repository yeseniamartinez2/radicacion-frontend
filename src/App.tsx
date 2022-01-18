import React from "react";
import './styles.css'
import './components/someter-medida/someter-medida.css';
import SometerMedidaForm from './components/someter-medida/someter-medida';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
        main: '#2e4c32',
      },
      secondary: {
        main: '#d7bc39',
      },
      success: {
        main: '#17545b',
      },
  },
  typography: {   
    fontFamily:'Roboto',
    fontSize: 14,    
  },
});
function App()
{
    return (
        <ThemeProvider theme={theme}>
        <div className='App'>
            <h1>Radicación de Medidas</h1>
            <SometerMedidaForm />
        </div>
        </ThemeProvider>
    );
}

export default App;