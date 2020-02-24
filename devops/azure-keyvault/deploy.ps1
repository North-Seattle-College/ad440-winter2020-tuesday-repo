<#
  This is the deploy template for creating key vaults
#>

#get variables from the admin who is creating
$projectName = Read-Host -Prompt "Enter acronym for the project name being (i.e. pog for Pot-o-Gold)"
$location = Read-Host -Prompt "Enter the same location that is used for creating the key vault (i.e. westus2)"

#create variables
$resourceGroupName = "${projectName}-keyvault"

New-AzResourceGroupDeployment `
    -ResourceGroupName $resourceGroupName `
    -TemplateFile "./template.json" `
    -TemplateParameterFile "./parameters.json"
