<#
  Creates an empty key vault.

  Key vaults must be unique and after deleting a key vault, it will be "soft deleted"
  for 90 days before it is premanently gone.  Only the subscription owner can purge the
  key vault and as such, it will be unable to be copied once deleted.  If testing, try
  using a different resource group and manually changing the parameters.json for each test.
#>


#get variables from the admin who is creating
$resourceGroupName = Read-Host -Prompt "Enter resource group name (i.e. {abbr_name}-rg-usw2-task#): "
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
