import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import { handleLogout } from '../utils/utils'

export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <div className="sign-out">
            <Button size="small" color="inherit" variant="outlined" onClick={() => handleLogout(instance)}>Salir</Button>
        </div>
    );
}