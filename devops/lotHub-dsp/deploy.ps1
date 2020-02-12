#Enter your resource group name and location.
$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"

$location = Read-Host -Prompt "Enter the location (i.e. centralus)"

#Your template URI
$templateUri = "https://raw.githubusercontent.com/iroenu/hello-world/master/dps-template.json"

#Deploying the IoT Hub Device Provisioning Service
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -Location $location