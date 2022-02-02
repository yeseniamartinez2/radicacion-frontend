import './styles.css'
import './components/someter-medida/someter-medida.css';
import './components/medidas-tabla/medidas-tabla.css';
import './components/sign-in-box/sign-in-box.css';
import './components/page-layout/page-layout.css';
import './components/verificar-medida-form/verificar-medida-form.css'
import './components/user-medidas-tabla/user-medidas-tabla.css';
import './components/inicio/inicio.css';
import SometerMedidaForm from './components/someter-medida/someter-medida';
import Inicio from './components/inicio/inicio';
import MedidasTable from "./components/medidas-tabla/medidas-tabla";
import VerificarMedidaForm from "./components/verificar-medida-form/verificar-medida-form";
import SideMenu from "./components/side-menu/side-menu";
import UserMedidasTable from './components/user-medidas-tabla/user-medidas-tabla';
import { SignInBox } from './components/sign-in-box/sign-in-box';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import { PageLayout } from "./components/page-layout/page-layout";
import { useDispatch } from 'react-redux'
import {
  updateMSAccessToken,
  updateApiAccessToken,
  updateEmail,
  updateName,
  updateRoles,
  updateAdminStatus
} from './app/reducers/userDataSlice';

import {
  updateWidth,
  updateHeight,
  updateRows
} from './app/reducers/appDataSlice';

import { numberOfRows } from './components/utils/utils';
import { loginRequest, protectedResources } from "./authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useSelector } from 'react-redux'
import { useWindowDimensions } from './components/utils/useWindowsDimensions';
function App() {
  const { height, width } = useWindowDimensions();
  const { instance, accounts, inProgress } = useMsal();
  const dispatch = useDispatch();
  const userEmail: string = useSelector((state: any) => state.userData.email);
  const roles: Array<string> = useSelector((state: any) => state.userData.roles);


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

      let itc: any = accounts[0]?.idTokenClaims;
      let intersection = itc.roles.filter(role => role.includes("Medida.Radicar"));
      if (intersection.length > 0) {
        dispatch(updateAdminStatus(true));
      }
      dispatch(updateEmail(accounts[0].username));
      dispatch(updateName(accounts[0].name));
      dispatch(updateRoles(accounts[0].idTokenClaims));
    }

    dispatch(updateHeight(height));
    dispatch(updateWidth(width));
    dispatch(updateRows(numberOfRows(width)));
  }, [inProgress, accounts, instance, userEmail, width, roles]);


  return (
    <Router>
      <PageLayout>
        <div className='App'>
          <AuthenticatedTemplate>
            <div className='authenticated-main'>

              <SideMenu />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/mis-medidas" element={<UserMedidasTable />} />
                  <Route path="/verificacion" element={<MedidasTable />} />
                  <Route path="/verificacion/:id" element={<VerificarMedidaForm />} />
                  <Route path="/radicacion" element={<SometerMedidaForm />} />
                </Routes>
              </div>

            </div>

          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>

            <SignInBox />
          </UnauthenticatedTemplate>
        </div>

      </PageLayout>
    </Router>
  );
}

export default App;