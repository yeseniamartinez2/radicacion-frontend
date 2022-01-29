import Button from '@mui/material/Button';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import React from 'react';
import { ProfileData } from "../profile-data/profile-data";
import { callMsGraph } from "../../graph";

export function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = React.useState<any>(null);

    const name = accounts[0] && accounts[0].name;

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    return (
        <>
        <h5 className="card-title">Welcome {name}</h5>
        {console.log(graphData)}
        {graphData ? 
            <ProfileData graphData={graphData} />
            :
            <Button onClick={RequestProfileData}>Request Profile Information</Button>
        }
    </>
    );
};