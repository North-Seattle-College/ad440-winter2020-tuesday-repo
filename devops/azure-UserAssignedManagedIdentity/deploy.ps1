# The parameters for the resource group and resources
param(
    [Parameter(Mandatory = $True)]
    [string]
    $Location,

    [Parameter(Mandatory = $True)]
    [string]
    $AppName,

    [Parameter(Mandatory = $True)]
    [string]
    $Environment
)

# Function to register the resource providers 
Function RegisterRP {
    Param(
        [string]$ResourceProviderNamespace
    )

    Write-Host "Registering resource provider '$ResourceProviderNamespace'";
    Register-AzResourceProvider -ProviderNamespace $ResourceProviderNamespace;
}

$ErrorActionPreference = "Stop"

# Register resource providers
$resourceProviders = @("microsoft.network", "microsoft.storage");
if ($resourceProviders.length) {
    Write-Host "Registering resource providers"
    foreach ($resourceProvider in $resourceProviders) {
        RegisterRP($resourceProvider);
    }
}

# Build the resource group name
$resourceGroupName = ("{0}-{1}-rg" -f $AppName, $Environment).ToLower(); # Build the name for the resource group

$resourceGroup = Get-AzResourceGroup -Name $resourceGroupName -ErrorAction SilentlyContinue
if (!$resourceGroup) {
    Write-Host "Resource group '$resourceGroupName' does not exist. To create a new resource group, location must be provided." -ForegroundColor "White";
    if (!$Location) {
        $Location = Read-Host "resourceGroupLocation";
    }
    Write-Host "Creating resource group '$resourceGroupName' in location '$Location'" -ForegroundColor "White";
    $resourceGroup = New-AzResourceGroup -Name $resourceGroupName -Location $Location -Tag $resourceTags;
}
else {
    Write-Host "Using existing resource group '$resourceGroupName'" -ForegroundColor "Green";
}

# Deployment
$deploymentName = ( -join ("deployment_", (Get-Date -Format "yyyy-MM-dd_HHmm").ToString()))

$Environment = $Environment.ToLower()
$currentFolderPath = Split-Path $MyInvocation.MyCommand.Path
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateFile "$currentFolderPath/deployment-scripts/template.json" -TemplateParameterFile "$currentFolderPath/deployment-scripts/parameters.json" -DeploymentName $deploymentName -Mode Complete -Verbose;