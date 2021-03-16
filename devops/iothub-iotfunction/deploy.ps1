#Enter your resource group name and location
$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"

$location = Read-Host -Prompt "Enter the location (i.e. centralus)"

#Enter your template URI
$templateUri = "https://raw.githubusercontent.com/Yozelinm/yoz-repo/master/iotfunction"

#Deploying the Azure Function
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -Location $location