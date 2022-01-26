import './styles.css'
import './components/someter-medida/someter-medida.css';
import './components/verificar-medida/verificar-medida.css';
import './components/sign-in-box/sign-in-box.css';
import SometerMedidaForm from './components/someter-medida/someter-medida';
import MedidasTable from "./components/verificar-medida/verificar-medida";
import VerificarMedidaForm from "./components/verificar-medida-form/verificar-medida-form";
import { SignInBox } from './components/sign-in-box/sign-in-box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { PageLayout } from "./components/page-layout/page-layout";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
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
function App(){
  const isAuthenticated = useIsAuthenticated();
    return (
      <PageLayout>
        <ThemeProvider theme={theme}>
        <div className='App'>
        <AuthenticatedTemplate>
          <Router>
            
                <Routes>      
                  <Route path="/verificacion" element={<MedidasTable />}  />
                  <Route path="/verificacion/:id" element={<VerificarMedidaForm />}/>
                  <Route path="/radicacion" element={<SometerMedidaForm />} />
                </Routes> 
            
          </Router>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
                <SignInBox />
        </UnauthenticatedTemplate>
        </div>
        </ThemeProvider>
      </PageLayout>
    );
}

export default App;