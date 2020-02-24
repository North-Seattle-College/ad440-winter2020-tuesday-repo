<#
  Creates an empty key vaults
#>


#get variables from the admin who is creating
$resourceGroupName = Read-Host -Prompt "Enter resource group name (i.e. nam-rg-usw2-task128): "
$location = Read-Host -Prompt "Enter the same location that is used for creating the key vault (i.e. westus2): "

<#
#only used for testing purposes, uncomment if testing:
$projectName = "pog" #refers to pot of gold
$location = "westus2" #WA location
#>

#add templates for the file and parameters
$template = ".\template.json"
$parameters = ".\parameters.json"

#creates resource group only if it does not exist
Get-AzResourceGroup -Name $resourceGroupName -ErrorVariable notPresent -ErrorAction SilentlyContinue
if ($notPresent) {
  New-AzResourceGroup -Name $resourceGroupName -Location $location
}

#Creates empty key vault
New-AzResourceGroupDeployment `
    -ResourceGroupName $resourceGroupName `
    -TemplateFile $template `
    -TemplateParameterFile $parameters

<#
#removes resource group if needed
Remove-AzResourceGroup -Name $resourceGroupName
#>
