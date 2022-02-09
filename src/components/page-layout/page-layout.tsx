import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../sign-in-button/SignInButton";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SignOutButton } from "../sign-out/sign-out-button";
import logo from "../../assets/logo.png";
import { useMsal } from "@azure/msal-react";
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux'
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import { handleLogout } from '../utils/utils'

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
        fontFamily: 'Roboto',
        fontSize: 14,
    },
    spacing: 4
});
export const PageLayout = (props) => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    const isAdmin = useSelector((state: any) => state.userData.admin);
    const name = accounts[0] && accounts[0].name;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar className="toolbar">

                            <img src={logo} className="logo" alt="logo de la Cámara de Representantes de Puerto Rico" />
                            <Typography variant="h6" className="header" component="div" sx={{ flexGrow: 1 }}>
                                Cámara de Representantes
                            </Typography>


                            {isAuthenticated ?
                                <div className="top-bar-login">
                                    <p className="user-welcome"><strong>Hola, </strong>{name}</p>
                                    <SignOutButton />
                                    <div className="toggle-menu">
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            sx={{ mr: 2 }}
                                            onClick={handleClick}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </div>
                                </div>


                                :
                                <SignInButton />}


                        </Toolbar>
                    </AppBar>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
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

                    <Divider />
                    <MenuItem onClick={() => handleLogout(instance)}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Salir
                    </MenuItem>
                </Menu>

                {props.children}
            </ThemeProvider>
        </>
    );
};

