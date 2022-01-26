import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <Button color="inherit" variant="outlined" className="sign-out" onClick={() => handleLogout(instance)}>Salir</Button>
    );
}