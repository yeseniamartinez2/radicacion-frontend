import React from "react";
import './styles.css'
import './components/someter-medida/someter-medida.css';
import './components/verificar-medida/verificar-medida.css';
import SometerMedidaForm from './components/someter-medida/someter-medida';
import MedidasTable from "./components/verificar-medida/verificar-medida";
import VerificarMedidaForm from "./components/verificar-medida-form/verificar-medida-form";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import MedidaForm from "./components/verificar-medida/form";
const theme = createTheme({
  palette: {

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
  spacing: 4
});
function App()
{
    return (
      
        <ThemeProvider theme={theme}>
          <Router>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    {/*<IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cámara de Representantes
                    </Typography>
                    <Button><NavLink to="/verificacion">Verificacion</NavLink></Button> 
                    <Button><NavLink to="/radicacion">Radicacion</NavLink></Button>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        <div className='App'>
          
            <Routes>      
              <Route path="/verificacion" element={<MedidasTable />}  />
              <Route path="/verificacion/:id" element={<VerificarMedidaForm />}/>
              <Route path="/radicacion" element={<SometerMedidaForm />} />
            </Routes> 
        </div>
        </Router>
        </ThemeProvider>
      
    );
}

export default App;