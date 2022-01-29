import './styles.css'
import './components/someter-medida/someter-medida.css';
import './components/verificar-medida/verificar-medida.css';
import './components/sign-in-box/sign-in-box.css';
import './components/page-layout/page-layout.css';
import './components/verificar-medida-form/verificar-medida-form.css'
import SometerMedidaForm from './components/someter-medida/someter-medida';
import MedidasTable from "./components/verificar-medida/verificar-medida";
import VerificarMedidaForm from "./components/verificar-medida-form/verificar-medida-form";
import SideMenu from "./components/side-menu/side-menu";
import { SignInBox } from './components/sign-in-box/sign-in-box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import { PageLayout } from "./components/page-layout/page-layout";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";


function App(){
  
    return (
      <PageLayout>
        <div className='App'>
        <AuthenticatedTemplate> 
          <div className='authenticated-main'>
            <Router>
              <SideMenu />
              <div className="main-content">  
                  <Routes>      
                    <Route path="/verificacion" element={<MedidasTable />}  />
                    <Route path="/verificacion/:id" element={<VerificarMedidaForm />}/>
                    <Route path="/radicacion" element={<SometerMedidaForm />} />
                    </Routes> 
              </div>
            </Router>
          </div> 
           
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>

                <SignInBox />
        </UnauthenticatedTemplate>
        </div>
  
      </PageLayout>
    );
}

export default App;