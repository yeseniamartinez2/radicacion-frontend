import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useMsal } from "@azure/msal-react";


export default function SideMenu() {
  const { instance, accounts, inProgress } = useMsal();
    const name = accounts[0] && accounts[0].name;

    const [isAdmin, setIsAdmin] = React.useState(false);
    const roles = useSelector((state: any) => state.userData.roles);

  const onLoad = async () => {
    if (inProgress === "none" && accounts.length > 0) {
        let intersection = roles.filter(role => role.includes("Medida.Radicar"));
        
        if (intersection.length > 0) {
            setIsAdmin(true);
        }
    }
}

React.useEffect(() => {
    onLoad();
}, [roles]);

  
  return (
    <Paper sx={{ width: 210 }} elevation={4} square>
      <MenuList dense>
      
     
        { isAdmin ? 
        <MenuItem>
        <ListItemText><NavLink to="/verificacion">Verificar Medidas</NavLink></ListItemText>
        </MenuItem>
        : 
        <>
        <MenuItem>
          <ListItemText><NavLink to="/mis-medidas">Mis Medidas</NavLink></ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText><NavLink to="/radicacion">Someter Medida</NavLink></ListItemText>
        </MenuItem></> }
        
      </MenuList>
    </Paper>
  );
}
