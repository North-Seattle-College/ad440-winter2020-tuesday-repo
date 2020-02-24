<#
  This is the deploy template for creating key vaults
#>

<#
Will undo comment once this launches correctly

#get variables from the admin who is creating
$projectName = Read-Host -Prompt "Enter acronym for the project name being (i.e. pog for Pot-o-Gold)"
$location = Read-Host -Prompt "Enter the same location that is used for creating the key vault (i.e. westus2)"
#>

#delete after testing:
$projectName = "pog"

#create variables
$resourceGroupName = "test-${projectName}-vault"

#add templates for the file and parameters
$template = ".\template.json"
$parameters = ".\parameters.json"

New-AzRmResourceGroup `
    -ResourceGroupName $resourceGroupName `
    -TemplateFile $template `
    -TemplateParameterFile $parameters
