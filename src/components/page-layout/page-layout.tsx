import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../sign-in-button/SignInButton";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SignOutButton } from "../sign-out/sign-out-button";
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Cámara de Representantes
                        </Typography>
                        
                    
                    { isAuthenticated ?
                        <div>
                            <Button><a href="http://localhost:8081/verificacion">Verificacion</a></Button> 
                            <Button><a href="http://localhost:8081/radicacion">Radicacion</a></Button>
                            <SignOutButton />
                        </div> 
                        : <SignInButton /> }
            
                    
                        </Toolbar>
                    </AppBar>
                </Box>
     

            {props.children}
            </ThemeProvider>
        </>
    );
};

