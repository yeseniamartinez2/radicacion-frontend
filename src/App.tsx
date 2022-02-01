import './styles.css'
import './components/someter-medida/someter-medida.css';
import './components/medidas-tabla/medidas-tabla.css';
import './components/sign-in-box/sign-in-box.css';
import './components/page-layout/page-layout.css';
import './components/verificar-medida-form/verificar-medida-form.css'
import SometerMedidaForm from './components/someter-medida/someter-medida';
import MedidasTable from "./components/medidas-tabla/medidas-tabla";
import VerificarMedidaForm from "./components/verificar-medida-form/verificar-medida-form";
import SideMenu from "./components/side-menu/side-menu";
import UserMedidasTable from './components/user-medidas-tabla/user-medidas-tabla';
import { SignInBox } from './components/sign-in-box/sign-in-box';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from 'react';
import { PageLayout } from "./components/page-layout/page-layout";
import { useDispatch } from 'react-redux'
import { updateMSAccessToken, updateApiAccessToken, updateEmail, updateName, updateRoles, updateMedidas } from './app/reducers/userDataSlice'
import { loginRequest, protectedResources } from "./authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useSelector } from 'react-redux'
import MedidaService from './services/Medida';
import RepresentanteService from './services/Representante';

function App(){
  const ms = new MedidaService;
  const rs = new RepresentanteService;
  const { instance, accounts, inProgress } = useMsal();
  const dispatch = useDispatch();
  const accessToken: string = useSelector((state: any) => state.userData.apiAccessToken);
  const userEmail: string = useSelector((state: any) => state.userData.email);

  
  React.useEffect(() => {
    const msRequest = {
      ...loginRequest,
      account: accounts[0]
    };
    const apiRequest = {
      scopes: protectedResources.api.scopes,
      account: accounts[0]
    }  
    if (inProgress === "none" && accounts.length > 0) {
          // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(msRequest).then((response) => {
            dispatch(updateMSAccessToken(response.accessToken));
          }).catch((e) => {
            instance.acquireTokenPopup(msRequest).then((response) => {
              dispatch(updateMSAccessToken(response.accessToken));
            });
        });

        instance.acquireTokenSilent(apiRequest).then((response) => {
          dispatch(updateApiAccessToken(response.accessToken));
        }).catch((e) => {
        
        instance.acquireTokenPopup(apiRequest).then((response) => {
          dispatch(updateApiAccessToken(response.accessToken));
        });
      }); 

      dispatch(updateEmail(accounts[0].username));
      dispatch(updateName(accounts[0].name));
      dispatch(updateRoles(accounts[0].idTokenClaims));
      
  
    }

  
    
    

      
  }, [inProgress, accounts, instance, userEmail]);

  
    return (
      <PageLayout>
        <div className='App'>
        <AuthenticatedTemplate> 
          <div className='authenticated-main'>
            <Router>
              <SideMenu />
              <div className="main-content">  
                  <Routes>     
                    <Route path="/mis-medidas" element={<UserMedidasTable />}  /> 
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