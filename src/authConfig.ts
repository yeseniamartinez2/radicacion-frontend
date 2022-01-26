
export const msalConfig = {
    auth: {
      clientId: "5c04b3ab-dde3-4278-a431-b2c5540704fe",
      authority: "https://login.microsoftonline.com/37f136f0-dc06-467f-bceb-e65ae659cb4d", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:8081/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://portal.azure.com/"
  };