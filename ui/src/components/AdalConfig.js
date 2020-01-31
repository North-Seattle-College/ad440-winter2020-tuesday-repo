// src/config/AdalConfig.js
export default {
  clientId: 'ecb37f55-02d0-4cab-902d-b7aaaecca80e',
  //endpoints: {
    //api: "ENTER THE APPLICATION ID OF THE REGISTERED API APP ON AZURE" // Necessary for CORS requests, for more info see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/CORS-usage
  //},
  // 'tenant' is the Azure AD instance.
  //tenant: 'ENTER YOUR TENANT ID',
  // 'cacheLocation' is set to 'sessionStorage' by default (see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/Config-authentication-context#configurable-options.
  // We change it to'localStorage' because 'sessionStorage' does not work when our app is served on 'localhost' in development.
  //cacheLocation: 'localStorage'
}

