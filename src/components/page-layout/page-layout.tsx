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
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    const name = accounts[0] && accounts[0].name;


    return (
        <>
            <ThemeProvider theme={theme}>
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
                        <img src={logo} className="logo" alt="logo de la Cámara de Representantes de Puerto Rico" />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Cámara de Representantes
                        </Typography>
                        
                    
                    { isAuthenticated ?
                        <div className="top-bar-login">
                            <p><strong>Hola, </strong>{name}</p>
                            <SignOutButton />
                        </div> 
                        : 
                        <SignInButton /> }
            
                    
                        </Toolbar>
                    </AppBar>
                </Box>
     

            {props.children}
            </ThemeProvider>
        </>
    );
};

