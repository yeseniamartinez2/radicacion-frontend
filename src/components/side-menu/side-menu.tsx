import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { NavLink } from 'react-router-dom';
export default function SideMenu() {
  return (
    <Paper sx={{ width: 210 }} elevation={4} square>
      <MenuList dense>
        <MenuItem>
          <ListItemText><NavLink to="/radicacion">Radicar Medida</NavLink></ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
        <ListItemText><NavLink to="/verificacion">Verificar Medidas</NavLink></ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
