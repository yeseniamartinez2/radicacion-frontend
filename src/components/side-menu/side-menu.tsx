import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function SideMenu() {
  const isAdmin = useSelector((state: any) => state.userData.admin);




  return (
    <Paper className="sidemenu" sx={{ width: 220 }} elevation={4} square>
      <MenuList dense>
        <NavLink to="/">
          <MenuItem>
            <ListItemText>Inicio</ListItemText>
          </MenuItem>
        </NavLink>
        {isAdmin ?
          <NavLink to="/verificacion">
            <MenuItem>
              <ListItemText>Verificar Medidas</ListItemText>
            </MenuItem>
          </NavLink>
          :
          <div>
            <NavLink to="/mis-medidas">
              <MenuItem>
                <ListItemText>Mis Medidas</ListItemText>
              </MenuItem>
            </NavLink>
            <NavLink to="/someter-medida">
              <MenuItem>
                <ListItemText>Someter Medida</ListItemText>
              </MenuItem>
            </NavLink>
            <NavLink to="/someter-voto-explicativo">
              <MenuItem>
                <ListItemText>Someter Voto Explicativo</ListItemText>
              </MenuItem>
            </NavLink>
            <NavLink to="/someter-informe-de-comision">
              <MenuItem>
                <ListItemText>Someter Informe de Comisión</ListItemText>
              </MenuItem>
            </NavLink>
          </div>}

      </MenuList>
    </Paper>
  );
}
