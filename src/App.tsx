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
import { SignInBox } from './components/sign-in-box/sign-in-box';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from 'react';
import { PageLayout } from "./components/page-layout/page-layout";
import { useDispatch } from 'react-redux'
import { updateMSAccessToken, updateApiAccessToken, updateEmail, updateName } from './app/reducers/userDataSlice'
import { loginRequest, protectedResources } from "./authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

import MedidaService from './services/Medida';
function App(){
  const ms = new MedidaService;
  const { instance, accounts, inProgress } = useMsal();
  const dispatch = useDispatch();
  /*const requestToken = () => {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
        dispatch(updateAccesToken(response.accessToken));
    }).catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          dispatch(updateAccesToken(response.accessToken));
        });
    });
  }*/

  React.useEffect(() => {
    const msRequest = {
      ...loginRequest,
      account: accounts[0]
    };
    if (inProgress === "none" && accounts.length > 0) {
        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(msRequest).then((response) => {
        dispatch(updateMSAccessToken(response.accessToken));
    }).catch((e) => {
        instance.acquireTokenPopup(msRequest).then((response) => {
          dispatch(updateMSAccessToken(response.accessToken));
        });
    });
      }
    const apiRequest = {
      scopes: protectedResources.api.scopes,
      account: accounts[0]
    }  

      if (inProgress === "none" && accounts.length > 0) {
        
        instance.acquireTokenSilent(apiRequest).then((response) => {
            dispatch(updateApiAccessToken(response.accessToken));
        }).catch((e) => {
          
          instance.acquireTokenPopup(apiRequest).then((response) => {
            dispatch(updateApiAccessToken(response.accessToken));
          });
        });  
      }
  }, [inProgress, accounts, instance]);

  
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